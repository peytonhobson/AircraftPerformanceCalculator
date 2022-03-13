import { temporaryAllocator } from '@angular/compiler/src/render3/view/util';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Profile } from '@app/models/profile.model';
import { RunwayConditions } from '@app/models/runway-conditions';
import { AccountService } from '@app/services/account.service';
import { ApiService } from '@app/services/api.service';
import { positionElements } from '@ng-bootstrap/ng-bootstrap/util/positioning';

@Component({
    selector: 'calculator',
    templateUrl: './calculator.component.html',
    styleUrls: ['calculator.component.scss'],
})
export class CalculatorComponent implements OnInit {
    constructor(
        private restClassifier: ApiService,
        private accountService: AccountService,
        private formBuilder: FormBuilder,
    ) {}
    title = 'FrontEnd';

    form: FormGroup;
    formManualModal: FormGroup;
    formAutomaticModal: FormGroup;
    runwayConditions: RunwayConditions;
    runwayButtonNumber: number;
    airportID: string;

    displaySaveStyleAutomatic = 'none';
    displaySaveStyleManual = 'none';
    submittedManualModal = false;
    submittedAutomaticModal = false;


    ngOnInit() {

        this.form = this.formBuilder.group({
            airportInput: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(4)]]
        });

        this.formManualModal = this.formBuilder.group({
            temperature: ['', [Validators.required, Validators.maxLength(3), Validators.pattern(/^[0-9]/)]],
            //TODO: add pattern to check for only "double" type numbers
            slope: [''],
            pressureAltitude: ['', [Validators.required, Validators.maxLength(5), Validators.pattern(/^[0-9]/)]],
            headwind: ['', [Validators.required, Validators.maxLength(3), Validators.pattern(/^[0-9]/)]],
            concreteRunway: [''],
            grassRunway: [''],
            precipitationYes: [''],
            precipitationNo: [''],
            runwayLength: ['', [Validators.required, Validators.maxLength(3), Validators.pattern(/^[0-9]/)]]
        });

        this.formAutomaticModal = this.formBuilder.group({
            airportInput: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(4)]]
        });

        this.restClassifier.get(`profiles/${localStorage.getItem('username')}/all`).subscribe(res => {
            const aircraftProfileSelect = document.getElementById('AircraftProfileSelect') as HTMLSelectElement;

            res.data.profiles.forEach((profile) => {
                aircraftProfileSelect.add(new Option(profile.name, profile.name), undefined)
            });
        });

        this.restClassifier.get(`pilots/${localStorage.getItem('username')}/all`).subscribe(res => {
            const pilotProfileSelect = document.getElementById('PilotProfileSelect') as HTMLSelectElement;

            res.data.pilots.forEach((profile) => {
                pilotProfileSelect.add(new Option(profile.name, profile.name), undefined)
            });
        });

        this.runwayButtonNumber = 0;
        const sideButton1 = document.getElementById('RunwaySideButton1') as HTMLButtonElement;
        sideButton1.addEventListener('click', (e) => {
            this.runwaySideClick(sideButton1.getAttribute('id'));
        })
        sideButton1.disabled = true;

        const sideButton2 = document.getElementById('RunwaySideButton2') as HTMLButtonElement;
        sideButton2.addEventListener('click', (e) => {
            this.runwaySideClick(sideButton2.getAttribute('id'));
        })
        sideButton2.disabled = true;

        const idInput = document.getElementById('airportID') as HTMLInputElement;
        idInput.addEventListener('change', (e) => {
            this.submittedAutomaticModal = false;
        })
    }

    submit() {


        

        // this.restClassifier.calculate(profile).subscribe(res => {
        //     console.log(res.data.output);
        //     res.data.output.replace(/\n/g, '<br/>');
        //     document.getElementById('outputContainer').innerHTML = res.data.output;
        // });
    }

    saveManualModal() {
        this.submittedManualModal = true;

        if(!this.fManual['temperature'].errors) {
            this.displaySaveStyleManual = 'none';
            document.getElementById('main-container').style.opacity = '100%';

            const temperature = this.formManualModal.get('temperature').value
            const slope = this.fManual['slope'].value
            const runwayLength = this.fManual['runwayLength'].value
            let precipitation = 0;

            if(this.fManual['precipitationYes']) {
                precipitation = 1;
            }
            
            let runwayType = "Grass"

            if(this.fManual['concreteRunway']) {
                runwayType = "Concrete"
            }

            const pressureAltitude = this.fManual['pressureAltitude'].value
            const headwind = this.fManual['headwind'].value

            this.runwayConditions = new RunwayConditions(null, Number(temperature), Number(pressureAltitude), precipitation, Number(headwind),
                Number(runwayLength), runwayType, Number(slope))

            console.log(this.runwayConditions);

            for(var name in this.formManualModal.controls) {
                (<FormControl>this.formManualModal.controls[name]).setValue('');
                this.formManualModal.controls[name].setErrors(null);
            }

            this.submittedManualModal=false;
        }
    }

    saveAutomaticModal() {
        
        let runwayNumbers = document.getElementsByClassName('runway-button');
        let sideNumbers = document.getElementsByClassName('side-button');
        var runwayNumber, runwaySideNumber;

        for(var i = 0; i < runwayNumbers.length; i++) {
            console.log(runwayNumbers[i])
            if(runwayNumbers[i].getAttribute('class').includes('btn-dark')) {
                runwayNumber = runwayNumbers[i];
            }
        }

        for(var i = 0; i < sideNumbers.length; i++) {
            if(sideNumbers[i].getAttribute('class').includes('btn-dark')) {
                runwaySideNumber = sideNumbers[i];
            }
        }

        const runwayReplace = runwayNumber.innerHTML.replace("/", "_")
        this.restClassifier
            .get(`airport/runway/${this.airportID}/${runwayReplace}/${runwaySideNumber.innerHTML}`)
            .subscribe(res => {
                this.runwayConditions = res.data.runwayCondition
            });
    
    }

    get fAutomatic() { return this.formAutomaticModal.controls; }

    openAutomaticModal() {
        this.displaySaveStyleAutomatic = 'block';
        document.getElementById('main-container').style.opacity = '40%';
    }

    closeAutomaticModal(save: boolean) {


        if (save) {
            this.saveAutomaticModal();
        }

        this.fAutomatic['airportInput'].setValue('');
        const runwayButtonGroup = document.getElementById('runway-button-group');
        while (runwayButtonGroup.firstChild) {
            runwayButtonGroup.removeChild(runwayButtonGroup.lastChild);
        }

        const sideButton1 = document.getElementById('RunwaySideButton1') as HTMLButtonElement;
        sideButton1.innerHTML = "Side 1"
        sideButton1.disabled = true;
        sideButton1.className = sideButton1.className.replace('btn-dark', 'btn-outline-dark');

        const sideButton2 = document.getElementById('RunwaySideButton2') as HTMLButtonElement;
        sideButton2.innerHTML = "Side 2"
        sideButton2.disabled = true;
        sideButton2.className = sideButton2.className.replace('btn-dark', 'btn-outline-dark');

        document.getElementById('main-container').style.opacity = '100%';
        this.displaySaveStyleAutomatic = 'none';
    }

    get fManual() { return this.formManualModal.controls; }

    openManualModal() {
        this.displaySaveStyleManual = 'block';
        document.getElementById('main-container').style.opacity = '40%';
    }

    closeManualModal(save: boolean) {

        if (save) {
            this.saveManualModal();
        }
        else {
            this.displaySaveStyleManual = 'none';
            document.getElementById('main-container').style.opacity = '100%';

            for(var name in this.formManualModal.controls) {
                (<FormControl>this.formManualModal.controls[name]).setValue('');
                this.formManualModal.controls[name].setErrors(null);
            }

            this.submittedManualModal=false;
        }
    }

    findRunways() {

        this.submittedAutomaticModal = true;

        if (this.formAutomaticModal.invalid) {
            return;
        }

        const airportID = document.getElementById('airportID') as HTMLInputElement;
        this.airportID = airportID.value;
        const runwayButtonGroup = document.getElementById('runway-button-group');

        while (runwayButtonGroup.firstChild) {
            runwayButtonGroup.removeChild(runwayButtonGroup.lastChild);
        }

        this.restClassifier.get(`airport/runways/${this.fAutomatic['airportInput'].value}`).subscribe(res => {

            if(res.data.airportRunways) {
                res.data.airportRunways.forEach(x=> {
                    const newButton = document.createElement('button');
                    newButton.setAttribute('class','btn-sm btn-outline-dark runway-button');
                    newButton.setAttribute('id', 'runwayButton' + this.runwayButtonNumber)
                    newButton.addEventListener('click', (e) => {
                        this.runwayClick(newButton.getAttribute('id'))
                    });
                    newButton.innerHTML = x.replace('_', '/'), x.replace('_', '/');
                    this.runwayButtonNumber++;
                    runwayButtonGroup.appendChild(newButton);
                });
            }
        });
    }

    runwaySideClick(id: string) {
        const button = document.getElementById(id);
        const buttons = document.getElementsByClassName('side-button')

        for(var i = 0; i < buttons.length; i++) {
            buttons[i].className = buttons[i].className.replace('active', '');
            buttons[i].className = buttons[i].className.replace('btn-dark', 'btn-outline-dark');
        }

        button.className = button.className.replace('btn-outline-dark', 'btn-dark')
        button.className += ' active'
    }

    runwayClick(id: string) {
        const button = document.getElementById(id);
        const buttons = document.getElementsByClassName('runway-button')

        for(var i = 0; i < buttons.length; i++) {
            buttons[i].className = buttons[i].className.replace('active', '');
            buttons[i].className = buttons[i].className.replace('btn-dark', 'btn-outline-dark');
        }

        button.className = button.className.replace('btn-outline-dark', 'btn-dark')
        button.className += ' active'

        const sideButton1 = document.getElementById('RunwaySideButton1') as HTMLButtonElement;
        sideButton1.disabled = false;

        const sideButton2 = document.getElementById('RunwaySideButton2') as HTMLButtonElement;
        sideButton2.disabled = false;

        const sides = button.innerHTML.split("/");
        sideButton1.innerHTML=sides[0];
        sideButton2.innerHTML=sides[1];
    }

    logout() {
        this.accountService.logout();
    }
}
