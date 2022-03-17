import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CalculatorInput } from '@app/models/calculator-input';
import { RunwayConditions } from '@app/models/runway-conditions';
import { AccountService } from '@app/services/account.service';
import { AlertService } from '@app/services/alert.service';
import { ApiService } from '@app/services/api.service';
import { positionElements } from '@ng-bootstrap/ng-bootstrap/util/positioning';
import { timer } from 'rxjs';
import { delay } from 'rxjs/operators';

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
        private alertService: AlertService
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

    displayTakeoff = 'block';
    displayLanding = 'none';
    displaySpeeds = 'none';

    runwaysLoading = false;
    calculateLoading = false;
    notCalculated = true;
    pilot1NotSelected = true;

    ngOnInit() {

        this.form = this.formBuilder.group({
            airportInput: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(4)]]
        });


        // TODO: More validators needed
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

        const pilot1ProfileSelect = document.getElementById('Pilot1ProfileSelect') as HTMLSelectElement;
        const pilot2ProfileSelect = document.getElementById('Pilot2ProfileSelect') as HTMLSelectElement;

        this.restClassifier.get(`pilots/${localStorage.getItem('username')}/all`).subscribe(res => {

            res.data.pilots.forEach((profile) => {
                pilot1ProfileSelect.add(new Option(profile.name, profile.name), undefined)
                pilot2ProfileSelect.add(new Option(profile.name, profile.name), undefined)
            });
        });

        this.runwayButtonNumber = 0;
        const sideButton1 = document.getElementById('RunwaySideButton1') as HTMLButtonElement;
        sideButton1.addEventListener('click', (e) => {
            this.runwaySideClick(sideButton1.getAttribute('id'));
        })
        sideButton1.disabled = true;

        const sideButton2 = document.getElementById('RunwaySideButton2') as HTMLButtonElement;
        sideButton2.addEventListener('click',  (e) => {
            this.runwaySideClick(sideButton2.getAttribute('id'));
        })
        sideButton2.disabled = true;

        const idInput = document.getElementById('airportID') as HTMLInputElement;
        idInput.addEventListener('change', (e) => {
            this.submittedAutomaticModal = false;
        })

        const takeoffOutputButton = document.getElementById('DisplayTakeoffButton') as HTMLButtonElement;
        const landingOutputButton = document.getElementById('DisplayLandingButton') as HTMLButtonElement;
        const speedOutputButton = document.getElementById('DisplayStallSpeedButton') as HTMLButtonElement;

        takeoffOutputButton.addEventListener('click', (e) => {
            this.displayTakeoff = 'block';
            this.displayLanding = 'none';
            this.displaySpeeds = 'none'

            takeoffOutputButton.className = landingOutputButton.className.replace('btn-outline-dark', 'btn-dark')
            landingOutputButton.className = landingOutputButton.className.replace('btn-dark', 'btn-outline-dark')
            speedOutputButton.className = speedOutputButton.className.replace('btn-dark', 'btn-outline-dark')
        })

        landingOutputButton.addEventListener('click', (e) => {
            this.displayTakeoff = 'none';
            this.displayLanding = 'block';
            this.displaySpeeds = 'none'

            landingOutputButton.className = landingOutputButton.className.replace('btn-outline-dark', 'btn-dark')
            takeoffOutputButton.className = landingOutputButton.className.replace('btn-dark', 'btn-outline-dark')
            speedOutputButton.className = speedOutputButton.className.replace('btn-dark', 'btn-outline-dark')
        })

        speedOutputButton.addEventListener('click', (e) => {
            this.displayTakeoff = 'none';
            this.displayLanding = 'none';
            this.displaySpeeds = 'block'

            speedOutputButton.className = landingOutputButton.className.replace('btn-outline-dark', 'btn-dark')
            takeoffOutputButton.className = landingOutputButton.className.replace('btn-dark', 'btn-outline-dark')
            landingOutputButton.className = speedOutputButton.className.replace('btn-dark', 'btn-outline-dark')
        })

        const imperialButton = document.getElementById('ImperialButton') as HTMLButtonElement;
        const metricButton = document.getElementById('MetricButton') as HTMLButtonElement;

        imperialButton.addEventListener('click', (e) => {
            imperialButton.className = imperialButton.className.replace('btn-outline-dark', 'btn-dark');
            metricButton.className = imperialButton.className.replace('btn-dark', 'btn-outline-dark');

            document.getElementById('takeoff-speed-unit').innerHTML = 'kts';
            document.getElementById('takeoff-distance-unit').innerHTML = 'ft';
            document.getElementById('ground-run-unit').innerHTML = 'ft';
            document.getElementById('accel-stop-unit').innerHTML = 'ft';
            document.getElementById('speed-over-unit').innerHTML = 'kts';
            document.getElementById('landing-distance-unit').innerHTML = 'ft';
            document.getElementById('approach-speed-unit').innerHTML = 'kts';
            document.getElementById('touch-down-unit').innerHTML = 'kts';
            document.getElementById('vs1-unit').innerHTML = 'kts';
            document.getElementById('vs0-gu-unit').innerHTML = 'kts';
            document.getElementById('vs0-gd-unit').innerHTML = 'kts';

            var bigUnit1 = document.getElementsByClassName('unit-block-big').item(0) as HTMLElement;
            bigUnit1.style.paddingInlineEnd = "2.95%";
            bigUnit1.style.paddingInlineStart = "2.95%";

            var bigUnit2 = document.getElementsByClassName('unit-block-big').item(1) as HTMLElement;
            bigUnit2.style.paddingInlineEnd = "2.95%";
            bigUnit2.style.paddingInlineStart = "2.95%";
        })

        metricButton.addEventListener('click', (e) => {
            metricButton.className = imperialButton.className.replace('btn-outline-dark', 'btn-dark');
            imperialButton.className = imperialButton.className.replace('btn-dark', 'btn-outline-dark');

            document.getElementById('takeoff-speed-unit').innerHTML = 'km/h';
            document.getElementById('takeoff-distance-unit').innerHTML = 'm';
            document.getElementById('ground-run-unit').innerHTML = 'm';
            document.getElementById('accel-stop-unit').innerHTML = 'm';
            document.getElementById('speed-over-unit').innerHTML = 'km/h';
            document.getElementById('landing-distance-unit').innerHTML = 'm';
            document.getElementById('approach-speed-unit').innerHTML = 'km/h';
            document.getElementById('touch-down-unit').innerHTML = 'km/h';
            document.getElementById('vs1-unit').innerHTML = 'km/h';
            document.getElementById('vs0-gu-unit').innerHTML = 'km/h';
            document.getElementById('vs0-gd-unit').innerHTML = 'km/h';

            var bigUnit1 = document.getElementsByClassName('unit-block-big').item(0) as HTMLElement;
            bigUnit1.style.paddingInlineEnd = "1.45%";
            bigUnit1.style.paddingInlineStart = "1.45%";

            var bigUnit2 = document.getElementsByClassName('unit-block-big').item(1) as HTMLElement;
            bigUnit2.style.paddingInlineEnd = "1.45%";
            bigUnit2.style.paddingInlineStart = "1.45%";

            var speedUnits = document.getElementsByClassName('speed-unit-block');
            var curElement;
            
            for(var i = 0; i < speedUnits.length; i++) {

                curElement = speedUnits.item(i) as HTMLElement;
                console.log(curElement);
                curElement.style.paddingInlineEnd = '0%';
                curElement.style.paddingInlineStart = '0%';
            }

        });

        pilot1ProfileSelect.addEventListener('change', (e) => {

            var i = 2;

            //TODO: Make this more efficient
            while(pilot2ProfileSelect.options.length > 2) {
                pilot2ProfileSelect.options.remove(i);
            }

            for(var i = 1; i < pilot1ProfileSelect.options.length; i++) {
                if(i !== pilot1ProfileSelect.options.selectedIndex) {
                    pilot2ProfileSelect.options.add(new Option(pilot1ProfileSelect.options.item(i).value));
                }
            }

            if(pilot1ProfileSelect.value !== "Choose Pilot 1") {
                this.pilot1NotSelected = false;
            }
            else {
                this.pilot1NotSelected = true;
            }
        });
    }

    calculate() {

        this.calculateLoading = true;

        const pilot1Name = document.getElementById('Pilot1ProfileSelect') as HTMLSelectElement;
        const pilot2Name = document.getElementById('Pilot2ProfileSelect') as HTMLSelectElement;

        if(pilot1Name.value === "Choose Pilot 1" || pilot2Name.value === "Choose Pilot 2") {
            this.alertService.error("Please select pilots.")
            this.calculateLoading = false;
            return;
        }
        
        const aircraftProfileName = document.getElementById('AircraftProfileSelect') as HTMLSelectElement;
        
        if(aircraftProfileName.value === "Choose Profile") {
            this.alertService.error("Please select aircraft profile.")
            this.calculateLoading = false;
            return;
        }

        const missionTime = document.getElementById('MissionTimeInput') as HTMLInputElement;

        if(missionTime.value == "" || !missionTime.value.match(/^[0-9]/)) {
            this.alertService.error("Please input correct flight time.")
            this.calculateLoading = false;
            return;
        }

        if(this.runwayConditions === undefined) {
            this.alertService.error("Please input runway conditions.")
            this.calculateLoading = false;
            return;
        }

        var wetRunway;

        if(this.runwayConditions.precipitation > 0) {
            wetRunway = true;
        }

        const username = localStorage.getItem('username');

        var rollingFriction, brakingFriction;

        if(wetRunway && this.runwayConditions.runwayType == "Concrete") {
            rollingFriction = 0.05;
            brakingFriction = 0.2 //TODO: May need to change based on levels of precipitation
        }
        if(!wetRunway && this.runwayConditions.runwayType == "Concrete") {
            rollingFriction = 0.04;
            brakingFriction = 0.4 //TODO: May need to change based on levels of precipitation
        }
        if(wetRunway && this.runwayConditions.runwayType == "Grass") {
            rollingFriction = 0.08;
            brakingFriction = 0.2 //TODO: May need to change based on levels of precipitation
        }
        if(!wetRunway && this.runwayConditions.runwayType == "Grass") {
            rollingFriction = 0.04;
            brakingFriction = 0.3 //TODO: May need to change based on levels of precipitation
        }

        var mass= 3544; // Basic empty aircraft in kg

        this.restClassifier.get(`profiles/${username}/${aircraftProfileName.value}`).subscribe((res) => {
            res.data.profile.attachments.forEach(element => {
                mass += Number(element.mass);
            });
            mass += Number((res.data.profile.internalTank/100)*1100*0.818);
            mass += Number((res.data.profile.dropTank/100)*300*0.818);
            mass += Number((res.data.profile.tipTank/100)*200*0.818);

            this.restClassifier.get(`pilots/${username}_${pilot1Name.value}`).subscribe((res) => {
                mass += Number(res.data.pilot.mass);

                if(pilot2Name.value !== "None") {
                    this.restClassifier.get(`pilots/${username}_${pilot2Name.value}`).subscribe(res => {
                        mass += Number(res.data.pilot.mass);
        
                        const calculatorInput = new CalculatorInput(mass, Number(missionTime.value), this.runwayConditions.pressureAltitude, this.runwayConditions.headWind,
                        this.runwayConditions.temp, this.runwayConditions.slope, rollingFriction, brakingFriction, this.runwayConditions.runwayType)
         
                        this.restClassifier.post(`calculate`, calculatorInput).subscribe(res => {
                            console.log(res.data.calculatorOutput);
                            const calculatorOutput = res.data.calculatorOutput
                            document.getElementById('takeoff-speed-output').innerHTML = (calculatorOutput.takeoffSpeed*0.539957).toString()
                            document.getElementById('takeoff-distance-output').innerHTML = (calculatorOutput.takeoffDistance*.3048).toString()
                            document.getElementById('ground-distance-output').innerHTML = (calculatorOutput.groundRunDistance*.3048).toString()
                            document.getElementById('accel-distance-output').innerHTML = (calculatorOutput.accelStopDistance*.3048).toString()
                            document.getElementById('speed-over-obstacle-output').innerHTML = (calculatorOutput.speedOverObstacle*0.539957).toString()
                            document.getElementById('approach-speed-output').innerHTML = (calculatorOutput.approachSpeed*0.539957).toString()
                            document.getElementById('touch-down-speed-output').innerHTML = (calculatorOutput.touchDownSpeed*0.539957).toString()
                            document.getElementById('landing-distance-output').innerHTML = (calculatorOutput.landingDistance*.3048).toString()
                            document.getElementById('vs1-output').innerHTML = (calculatorOutput.stallSpeedVS1*0.539957).toString()
                            document.getElementById('vs0-gu-output').innerHTML = (calculatorOutput.stallSpeedVS0GU*0.539957).toString()
                            document.getElementById('vs0-gd-output').innerHTML = (calculatorOutput.stallSpeedVS0GD*0.539957).toString()

                            this.calculateLoading = false;
                            this.notCalculated = false;
                        },
                        error => {
                            this.alertService.error("Conditions could not be calculated.")
                            this.calculateLoading = false;
                            return;
                        });
                    });
                }
                else {
                    const calculatorInput = new CalculatorInput(mass, Number(missionTime.value), this.runwayConditions.pressureAltitude, this.runwayConditions.headWind,
                    this.runwayConditions.temp, this.runwayConditions.slope, rollingFriction, brakingFriction, this.runwayConditions.runwayType)
           
                    this.restClassifier.post(`calculate`, calculatorInput).subscribe(res => { 
                        console.log(res.data.calculatorOutput);
                        const calculatorOutput = res.data.calculatorOutput
                        document.getElementById('takeoff-speed-output').innerHTML = (calculatorOutput.takeoffSpeed*0.539957).toString()
                            document.getElementById('takeoff-distance-output').innerHTML = (calculatorOutput.takeoffDistance*.3048).toString()
                            document.getElementById('ground-distance-output').innerHTML = (calculatorOutput.groundRunDistance*.3048).toString()
                            document.getElementById('accel-distance-output').innerHTML = (calculatorOutput.accelStopDistance*.3048).toString()
                            document.getElementById('speed-over-obstacle-output').innerHTML = (calculatorOutput.speedOverObstacle*0.539957).toString()
                            document.getElementById('approach-speed-output').innerHTML = (calculatorOutput.approachSpeed*0.539957).toString()
                            document.getElementById('touch-down-speed-output').innerHTML = (calculatorOutput.touchDownSpeed*0.539957).toString()
                            document.getElementById('landing-distance-output').innerHTML = (calculatorOutput.landingDistance*.3048).toString()
                            document.getElementById('vs1-output').innerHTML = (calculatorOutput.stallSpeedVS1*0.539957).toString()
                            document.getElementById('vs0-gu-output').innerHTML = (calculatorOutput.stallSpeedVS0GU*0.539957).toString()
                            document.getElementById('vs0-gd-output').innerHTML = (Math.round(calculatorOutput.stallSpeedVS0GD*0.539957*100)/100).toString()

                        this.calculateLoading = false;
                        this.notCalculated = false;
                    },
                    error => {
                        this.alertService.error("Conditions could not be calculated.")
                        this.calculateLoading = false;
                        return;
                    });
                }
            },
            error => {
                this.alertService.error("Cant find pilot:" + pilot1Name.value)
                this.calculateLoading = false;
                return;
            });
        },
        error => {
            this.alertService.error("Cant find aircraft profile:" + aircraftProfileName.value)
            this.calculateLoading = false;
            return;
        })

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


            for(var name in this.formManualModal.controls) {
                (<FormControl>this.formManualModal.controls[name]).setValue('');
                this.formManualModal.controls[name].setErrors(null);
            }

            this.submittedManualModal=false;

            const manualButton = document.getElementById('ManualButton') as HTMLButtonElement;
            manualButton.innerHTML = "Manual &#x2713;"
            manualButton.className = manualButton.className.replace('btn-dark', 'btn-success')
        }
    }

    saveAutomaticModal() {
        
        this.submittedAutomaticModal = true;

        let runwayNumbers = document.getElementsByClassName('runway-button');
        let sideNumbers = document.getElementsByClassName('side-button');
        var runwayNumber, runwaySideNumber;

        for(var i = 0; i < runwayNumbers.length; i++) {
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

                if(this.runwayConditions.runwayType.toUpperCase() === "CONC" || this.runwayConditions.runwayType.toUpperCase() === "ASPH") {
                    this.runwayConditions.runwayType = "Concrete"
                }
                else if(this.runwayConditions.runwayType.toUpperCase() === "BRICK") {
                    this.runwayConditions.runwayType = "Brick"
                }
                else if(this.runwayConditions.runwayType.toUpperCase() === "WOOD") {
                    this.runwayConditions.runwayType = "Wood"
                }
                else {
                    this.runwayConditions.runwayType = "Grass"
                }

                const automaticButton = document.getElementById('AutomaticButton') as HTMLButtonElement;
                automaticButton.innerHTML = "Automatic &#x2713;"
                automaticButton.className = automaticButton.className.replace('btn-dark', 'btn-success')
            });
    
    }

    get fAutomatic() { return this.formAutomaticModal.controls; }

    openAutomaticModal() {
        this.displaySaveStyleAutomatic = 'block';
        document.getElementById('main-container').style.opacity = '40%';
        this.submittedAutomaticModal = false;
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

        this.runwaysLoading = true;

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

            this.runwaysLoading = false;
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
        sideButton1.className = sideButton1.className.replace('btn-outline-dark', 'btn-dark');
    }

    logout() {
        this.accountService.logout();
    }

}
