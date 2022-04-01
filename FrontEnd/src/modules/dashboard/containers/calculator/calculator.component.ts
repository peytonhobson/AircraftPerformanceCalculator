
import { ApplicationRef, Component, ComponentFactoryResolver, Injector, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Attachment } from '@app/models/attachment';
import { CalculatorInput } from '@app/models/calculator-input';
import { CalculatorOutput } from '@app/models/calculator-output';
import { Constants } from '@app/models/constants';
import { Pilot } from '@app/models/pilot';
import { Profile } from '@app/models/profile.model';
import { RunwayConditions } from '@app/models/runway-conditions';
import { AccountService } from '@app/services/account.service';
import { AlertService } from '@app/services/alert.service';
import { ApiService } from '@app/services/api.service';
import { faUnderline } from '@fortawesome/free-solid-svg-icons';
import { first} from 'rxjs/operators';
  

@Component({
    selector: 'calculator',
    templateUrl: './calculator.component.html',
    styleUrls: ['calculator.component.scss'],
})
export class CalculatorComponent implements OnInit {
    title = 'FrontEnd';

    form: FormGroup;
    formManualModal: FormGroup;
    formAutomaticModal: FormGroup;
    runwayConditions = {
        "airportID": "",
        "temp": null,
        "pressureAltitude": null,
        "precipitation": null,
        "headWind": null,
        "runwayLength": null,
        "runwayType": null,
        "slope": null,
    };
    runwayButtonNumber: number;
    airportID: string;

    displaySaveStyleAutomatic = 'none';
    displaySaveStyleManual = 'none';
    submittedManualModal = false;
    submittedAutomaticModal = false;

    displayTakeoff = 'block';
    displayLanding = 'none';
    displaySpeeds = 'none';
    displayPlanes = 'none';
    displayProfileInfo = 'none';
    displayPerformance = 'none';

    runwaysLoading = false;
    calculateLoading = false;
    notCalculated = true;
    pilot1NotSelected = true;
    performanceOutput = {
            "groundRunDistance": 0,
            "takeoffSpeed": 0,
            "takeoffDistance": 0,
            "accelStopDistance": 0,
            "speedOverObstacle": 0,
            "stallSpeedVS1": 0,
            "landingDistance": 0,
            "approachSpeed": 0,
            "touchDownSpeed": 0,
            "stallSpeedVS0GD": 0,
            "stallSpeedVS0GU": 0
    };
    pilot1: Pilot;
    pilot2: Pilot;
    outboard: number;
    constants: Constants;
    weightSum: number;
    momentSum: number;
    zeroWeightSum: number;
    zeroMomentSum: number;
    agilePodARM: number;
    baggage1 = 0;
    baggage2 = 0;

    emptyAircraftMAC: number;

    calculatorOutputImperial = new CalculatorOutput();
    calculatorOutputMetric = new CalculatorOutput();

    currentProfile: Profile;

    constructor(
        private restClassifier: ApiService,
        private accountService: AccountService,
        private formBuilder: FormBuilder,
        private alertService: AlertService,
    ) {
        this.pilot1 = new Pilot(null, null, 0);
        this.pilot2 = new Pilot(null, null, 0);
    }

    ngOnInit() {

        this.form = this.formBuilder.group({
            airportInput: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(4)]]
        });

        this.restClassifier.get('constants').subscribe(res => {
            this.constants = res.data.constants;
            this.weightSum = res.data.constants.basicEmptyAircraftWeight;
            this.momentSum = res.data.constants.basicEmptyAircraftWeight*res.data.constants.basicEmptyAircraft;
            this.zeroWeightSum = res.data.constants.basicEmptyAircraftWeight+409;
            this.zeroMomentSum = (res.data.constants.basicEmptyAircraftWeight+409)*res.data.constants.basicEmptyAircraft;
            this.emptyAircraftMAC = ((this.constants.basicEmptyAircraft-this.constants.macrefDatum)*100)/this.constants.macl39;
        })

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

        const aircraftProfileSelect = document.getElementById('AircraftProfileSelect') as HTMLSelectElement;

        aircraftProfileSelect.addEventListener('change', (e) => {
            if(aircraftProfileSelect.value !== "Choose Profile") {

                const username = localStorage.getItem('username');

                this.restClassifier.get(`profiles/${username}/${aircraftProfileSelect.value}`).subscribe(
                    res => {
                        this.currentProfile = res.data.profile;

                        if(this.currentProfile.agilePod) {
                            document.getElementById('AgilePodText').innerHTML = "Agile Pod";
                            this.weightSum +=  this.constants.emptyAgilePodWeight + this.currentProfile.agileWeight;
                            this.momentSum += this.constants.emptyAgilePodWeight*this.constants.emptyAgilePod + this.currentProfile.agileWeight*this.constants.emptyAgilePod;

                            this.agilePodARM = (this.constants.emptyAgilePodWeight*this.constants.emptyAgilePod + this.constants.agileRailWeight*this.constants.agileRail
                                + this.constants.podPayload*this.currentProfile.agileWeight)/(this.constants.emptyAgilePodWeight+this.constants.agileRailWeight+this.currentProfile.agileWeight);
                        }

                        this.outboard = this.currentProfile.outboard;

                        this.weightSum += this.currentProfile.outboard;
                        this.momentSum += this.currentProfile.outboard*this.constants.tanks;

                        this.weightSum += this.currentProfile.internalTank*6.815 + this.currentProfile.tipTank*6.815 + this.currentProfile.underwingTank*6.815;
                        this.momentSum += (this.currentProfile.internalTank*6.815 + this.currentProfile.tipTank*6.815 + this.currentProfile.underwingTank*6.815)*this.constants.tanks;

      
                    }
                )
            }
            else {

                if(this.currentProfile.agilePod) {
                    this.weightSum -=  this.constants.emptyAgilePodWeight + this.currentProfile.agileWeight;
                    this.momentSum -= this.constants.emptyAgilePodWeight*this.constants.emptyAgilePod + this.currentProfile.agileWeight*this.constants.emptyAgilePod;
                }

                document.getElementById('AgilePodText').innerHTML = "";

                this.weightSum -= this.currentProfile.outboard;
                this.momentSum -= this.currentProfile.outboard*this.constants.tanks;

                this.weightSum -= this.currentProfile.internalTank*6.815 + this.currentProfile.tipTank*6.815 + this.currentProfile.underwingTank*6.815;
                this.momentSum -= (this.currentProfile.internalTank*6.815 + this.currentProfile.tipTank*6.815 + this.currentProfile.underwingTank*6.815)*this.constants.tanks;

                this.currentProfile = undefined;
                this.outboard = undefined;
            }
        });

        this.restClassifier.get(`profiles/${localStorage.getItem('username')}/all`).subscribe(res => {
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

            if(pilot1ProfileSelect.value !== "Pilot 1") {
                this.pilot1NotSelected = false;
                document.getElementById("PilotBox1Text").innerHTML = pilot1ProfileSelect.value;
                this.restClassifier.get(`pilots/${localStorage.getItem('username')}_${pilot1ProfileSelect.value}`)
                .subscribe( res => {
                    this.pilot1 = res.data.pilot;
                    this.weightSum +=  this.pilot1.mass;
                    this.momentSum += this.pilot1.mass*this.constants.pilot1;
                    this.zeroWeightSum += this.pilot1.mass;
                    this.zeroMomentSum += this.pilot1.mass*this.constants.pilot1;
                });
            }
            else {
                this.pilot1NotSelected = true;
                document.getElementById("PilotBox1Text").innerHTML = "";
                document.getElementById("PilotBox2Text").innerHTML = "";
                if(this.pilot1) {
                    this.weightSum -=  this.pilot1.mass;
                    this.momentSum -= this.pilot1.mass*this.constants.pilot1;
                    this.zeroWeightSum -= this.pilot1.mass;
                    this.zeroMomentSum -= this.pilot1.mass*this.constants.pilot1;
                    this.pilot1 = undefined;
                }
            }
        });

        pilot2ProfileSelect.addEventListener('change', (e) => {

            if(pilot2ProfileSelect.value !== "Pilot 2" && pilot2ProfileSelect.value !== "None") {
                document.getElementById("PilotBox2Text").innerHTML = pilot2ProfileSelect.value;

                const baggage2 = document.getElementById('Baggage2') as HTMLInputElement;
                baggage2.disabled = false;

                this.restClassifier.get(`pilots/${localStorage.getItem('username')}_${pilot2ProfileSelect.value}`)
                .subscribe( res => {
                    this.pilot2 = res.data.pilot;
                    this.weightSum +=  this.pilot2.mass;
                    this.momentSum += this.pilot2.mass*this.constants.pilot2;
                    this.zeroWeightSum += this.pilot2.mass;
                    this.zeroMomentSum += this.pilot2.mass*this.constants.pilot2;
                });
            }
            else {
                document.getElementById("PilotBox2Text").innerHTML = "";
                if(this.pilot2) {
                    this.weightSum -=  this.pilot2.mass;
                    this.momentSum -= this.pilot2.mass*this.constants.pilot2;
                    this.zeroWeightSum -= this.pilot2.mass;
                    this.zeroMomentSum -= this.pilot2.mass*this.constants.pilot2;
                    this.pilot2 = undefined;
                    const baggage2 = document.getElementById('Baggage2') as HTMLInputElement;
                }
                baggage2.disabled = true;
            }

        });

        const baggage1 = document.getElementById('Baggage1') as HTMLInputElement;
        const baggage2 = document.getElementById('Baggage2') as HTMLInputElement;

        baggage1.addEventListener('change', (e) => {
            if(baggage1.value.match(/^[0-9]/g)) {
                this.baggage1 = Number(baggage1.value);
                this.weightSum += this.baggage1;
                this.momentSum += this.baggage1*this.constants.baggage1;
                this.zeroWeightSum += this.baggage1;
                this.zeroMomentSum += this.baggage1*this.constants.baggage1;
            }
            else {
                this.weightSum -= this.baggage1;
                this.momentSum -= this.baggage1*this.constants.baggage1;
                this.zeroWeightSum -= this.baggage1;
                this.zeroMomentSum -= this.baggage1*this.constants.baggage1;
                this.baggage1 = undefined;
            }
        })

        baggage2.addEventListener('change', (e) => {
            if(baggage2.value.match(/^[0-9]/g)) {
                this.baggage2 = Number(baggage2.value);
                this.weightSum += this.baggage2;
                this.momentSum += this.baggage2*this.constants.baggage2;
                this.zeroWeightSum += this.baggage2;
                this.zeroMomentSum += this.baggage2*this.constants.baggage2;
            }
            else {
                this.weightSum -= this.baggage2;
                this.momentSum -= this.baggage2*this.constants.baggage2;
                this.zeroWeightSum -= this.baggage2;
                this.zeroMomentSum -= this.baggage2*this.constants.baggage2;
                this.baggage2 = undefined;
            }
        })
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

        const landingWeight = document.getElementById('LandingWeightInput') as HTMLInputElement;

        if(landingWeight.value == "" || !landingWeight.value.match(/^[0-9]/)) {
            this.alertService.error("Please input landing weight.")
            this.calculateLoading = false;
            return;
        }

        if(this.runwayConditions === undefined) {
            this.alertService.error("Please input runway conditions.")
            this.calculateLoading = false;
            return;
        }

        const username = localStorage.getItem('username');

        const calculatorInput = new CalculatorInput(this.currentProfile, Number(landingWeight), this.runwayConditions);

        this.restClassifier.post(`calculate`, calculatorInput).pipe(first())
        .subscribe(
            res => {
           
            this.performanceOutput = res.data.calculatorOutput;

            this.calculateLoading = false;
            this.notCalculated = false;

            const takeoffLineDistance = 100*(this.performanceOutput.takeoffDistance/(this.runwayConditions.runwayLength*3.28084));
            const takeoffLine = document.getElementById('takeoff-red-line') as HTMLImageElement;

            takeoffLine.style.width = takeoffLineDistance.toString() + "%";

            const takeoffPlane = document.getElementById('takeoff-plane') as HTMLImageElement;
            takeoffPlane.style.left = takeoffLineDistance.toString() + "%";

            const landingLineDistance = 100*(this.performanceOutput.landingDistance/(this.runwayConditions.runwayLength*3.28084));
            const landingLine = document.getElementById('landing-red-line') as HTMLImageElement;

            landingLine.style.width = landingLineDistance.toString() + "%";

            this.displayPlanes = 'block';
            this.displayPerformance = 'block';

            document.getElementById('main-container').style.opacity = '40%';
            },
            error => {
                this.alertService.error("Conditions could not be calculated.")
                this.calculateLoading = false;
                return;
            }
        )
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
            
            let runwayType = "TURF"

            if(this.fManual['concreteRunway']) {
                runwayType = "CONC"
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

            const automaticButton = document.getElementById('AutomaticButton') as HTMLButtonElement;
            automaticButton.innerHTML = "Automatic"
            automaticButton.className = automaticButton.className.replace('btn-success', 'btn-dark')
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
        this.restClassifier.get(`airport/runway/${this.airportID}/${runwayReplace}/${runwaySideNumber.innerHTML}`)
        .subscribe(res => {
            this.runwayConditions = res.data.runwayCondition

            const automaticButton = document.getElementById('AutomaticButton') as HTMLButtonElement;
            automaticButton.innerHTML = "Automatic &#x2713;"
            automaticButton.className = automaticButton.className.replace('btn-dark', 'btn-success')

            const manualButton = document.getElementById('ManualButton') as HTMLButtonElement;
            manualButton.innerHTML = "Manual"
            manualButton.className = manualButton.className.replace('btn-success', 'btn-dark')
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

    closePerformanceModal() {
        this.displayPerformance = 'none';
        document.getElementById('main-container').style.opacity = '100%';
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

    getProfileInfo() {

        const aircraftProfileName = document.getElementById('AircraftProfileSelect') as HTMLSelectElement;
        const username = localStorage.getItem('username');

        this.restClassifier.get(`profiles/${username}/${aircraftProfileName.value}`).pipe(first())
        .subscribe( res => {
            this.currentProfile = res.data.profile;
            this.displayProfileInfo = 'block';
            document.getElementById('main-container').style.opacity = '40%';
        })
    }

    closeProfileModal() {
        this.displayProfileInfo = 'none';
        document.getElementById('main-container').style.opacity = '100%';
    }

    printCard(): void {
        window.print();
    }
     
    logout() {
        this.accountService.logout();
    }
}
