import { CdkDragDrop, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import { Component, OnInit } from "@angular/core";
import { ApiService } from "@app/services/api.service";
import { Attachment } from "@app/models/attachment";
import { UserService } from '@modules/auth/services';
import { async } from "rxjs";
import { first, map } from "rxjs/operators";
import { Profile } from "@app/models/profile.model";
import { NgbProgressbar } from "@ng-bootstrap/ng-bootstrap";
import { Pilot } from "@app/models/pilot";
import { AlertService } from "@app/services/alert.service";
import { ObjectUnsubscribedError } from "rxjs";
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from "@angular/forms";
import { Constants } from "@app/models/constants";

@Component({
    selector: 'add-profiles',
    templateUrl: './add-profiles.component.html',
    styleUrls: ['add-profiles.component.scss'],
})
export class AddProfilesComponent implements OnInit {
    
  constructor(private apiService: ApiService,
    private alertService: AlertService,
    private formBuilder: FormBuilder) {}

  displaySaveProfile = "none";
  displayDeleteAircraft = "none";
  displayDeletePilot = "none";

  currentAircraft: String;
  currentPilot: String;

  formSavePilot: FormGroup;
  formSaveProfile: FormGroup;

  submittedSaveProfile = false;
  submittedSavePilot = false;

  agileYes = false;

  constants: Constants;
  weightSum: number;
  momentSum: number;
  internalTank: number;
  tipTank: number;
  underwingTank: number;
  outboard: number;
  agilePodARM: number;
  agileWeight: number;

  ngOnInit() {

    this.formSaveProfile = this.formBuilder.group({
      internalTank: ['', [Validators.required, Validators.min(60), Validators.max(288), Validators.pattern(/^[0-9]/)]],
      tipTank: ['', [Validators.required, Validators.min(0), Validators.max(52), Validators.pattern(/^[0-9]/)]],
      underwingTank: ['', [Validators.required, Validators.min(0), Validators.max(80), Validators.pattern(/^[0-9]/)]],
      agilePayload: ['', [Validators.required, Validators.min(0), Validators.max(150), Validators.pattern(/^[0-9]/)]],
      outboardWeight: ['', [Validators.required, Validators.min(0), Validators.pattern(/^[0-9]/)]],
    });

    this.formSavePilot = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-z0-9]/)]],
      weight: ['', [Validators.required, Validators.min(0), Validators.pattern(/^[0-9]/)]],
    });

    this.apiService.get('constants').subscribe(res => {
      this.constants = res.data.constants;
      this.weightSum = res.data.constants.basicEmptyAircraftWeight;
      this.momentSum = res.data.constants.basicEmptyAircraftWeight*res.data.constants.basicEmptyAircraft;
  })

    let profileInputs = []

    profileInputs.push(document.getElementById('InternalTankInput') as HTMLInputElement);
    profileInputs.push(document.getElementById('UnderwingTankInput') as HTMLInputElement);
    profileInputs.push(document.getElementById('TipTankInput') as HTMLInputElement);
    profileInputs.push(document.getElementById('OutboardInput') as HTMLInputElement);
    profileInputs.push(document.getElementById('AgilePayload') as HTMLInputElement);

    profileInputs.forEach(input => {
      input.addEventListener('click', (e) => {
        this.submittedSaveProfile = false;
      })
    });

    let pilotInputs = []

    pilotInputs.push(document.getElementById('PilotName') as HTMLInputElement);
    pilotInputs.push(document.getElementById('PilotWeight') as HTMLInputElement);

    pilotInputs.forEach(input => {
      input.addEventListener('click', (e) => {
        this.submittedSavePilot = false;
      })
    });
  
    const user = localStorage.getItem('username');
    const agileYesRadio = document.getElementById("AgileYesRadio") as HTMLInputElement;
    const agileNoRadio = document.getElementById("AgileNoRadio") as HTMLInputElement;
    const agileWeightInput = document.getElementById('AgilePayload') as HTMLInputElement;
    agileWeightInput.disabled = true;

    agileYesRadio.addEventListener('click', (e) => {
      agileYesRadio.checked = true;
      agileNoRadio.checked = false;
      agileWeightInput.disabled = false;
      agileWeightInput.value = "0";
      this.submittedSaveProfile = false;
      this.agileYes = true;
    });

    agileNoRadio.addEventListener('click', (e) => {
      agileNoRadio.checked = true;
      agileYesRadio.checked = false;
      agileWeightInput.disabled = true;
      agileWeightInput.value = "0";
      this.submittedSaveProfile = false;
      this.agileYes = false;
    });



    const aircraftSelect = document.getElementById('AircraftSelect') as HTMLSelectElement;
    this.apiService.get(`profiles/${user}/all`).subscribe(res => {
      res.data.profiles.forEach(profile => {
        aircraftSelect.add(new Option(profile.name, profile.name), undefined)
      })
    });

    aircraftSelect.addEventListener('change', (e) => {
      if(aircraftSelect.value !== "Choose Aircraft Profile") {
        this.currentAircraft = aircraftSelect.value;
      }
      else {
        this.currentAircraft = undefined;
      }
    });

    const pilotSelect = document.getElementById('PilotSelect') as HTMLSelectElement;
    this.apiService.get(`pilots/${user}/all`).subscribe(res => {
      res.data.pilots.forEach(pilot => {
        pilotSelect.add(new Option(pilot.name, pilot.name), undefined)
      })
    })

    pilotSelect.addEventListener('change', (e) => {
      if(pilotSelect.value !== "Choose Pilot") {
        this.currentPilot = pilotSelect.value;
      }
      else {
        this.currentPilot = undefined;
      }
    })
  }

  
  openSaveModal() {
    this.submittedSaveProfile = true;
    if(this.formSaveProfile.invalid) {
      if(!(this.fSave['agilePayload'].errors['required'] && !this.agileYes)) {
        return;
      }
    }

    const internalTank = document.getElementById('InternalTankInput') as HTMLInputElement;
    const underwingTank = document.getElementById('UnderwingTankInput') as HTMLInputElement;
    const tipTank = document.getElementById('TipTankInput') as HTMLInputElement;
    const outboard = document.getElementById('OutboardInput') as HTMLInputElement;
    const agileYesRadio = document.getElementById("AgileYesRadio") as HTMLInputElement;

    this.internalTank = Number(internalTank.value);
    this.underwingTank = Number(underwingTank.value);
    this.tipTank = Number(tipTank.value);
    this.outboard = Number(outboard.value);

    this.weightSum = this.internalTank*6.815 + this.underwingTank*6.815 + this.tipTank*6.815 + this.outboard + this.constants.basicEmptyAircraftWeight;
    this.momentSum = this.internalTank*6.815*this.constants.tanks + this.underwingTank*6.815*this.constants.tanks + this.tipTank*6.815*this.constants.tanks +
    this.outboard*this.constants.tanks + this.constants.basicEmptyAircraft*this.constants.basicEmptyAircraftWeight;

    if(agileYesRadio.checked) {
      const agileWeightInput = document.getElementById('AgilePayload') as HTMLInputElement;
      this.agileWeight = Number(agileWeightInput.value);
      this.agilePodARM = (this.constants.emptyAgilePodWeight*this.constants.emptyAgilePod + this.constants.agileRailWeight*this.constants.agileRail
        + this.constants.podPayload*this.agileWeight)/(this.constants.emptyAgilePodWeight+this.constants.agileRailWeight+this.agileWeight);
    }



    this.displaySaveProfile = "block";
    document.getElementById('main-container').style.opacity = '40%';
  }

  closeSaveModal(save: boolean) {
    this.displaySaveProfile = "none";

    document.getElementById('main-container').style.opacity = '100%';

    if(save) {
      this.save();
    }
  }

  get fSave() { return this.formSaveProfile.controls; }

  openAircraftDeleteModal() {

    if(!this.currentAircraft) {
      this.alertService.error("Please select an aircraft profile to delete.")
      return;
    }

    document.getElementById('main-container').style.opacity = '40%';

    this.displayDeleteAircraft = 'flex';
  }

  closeAircraftDeleteModal(save: boolean) {
    this.displayDeleteAircraft = "none";

    document.getElementById('main-container').style.opacity = '100%';
  }

  deleteAircraft() {
    this.displayDeleteAircraft = "none";
    document.getElementById('main-container').style.opacity = '100%';

    this.apiService.post('profiles/delete', { username: localStorage.getItem('username'), name: this.currentAircraft }).subscribe(res => {
      const aircraftSelect = document.getElementById('AircraftSelect') as HTMLSelectElement;

      aircraftSelect.value = "Choose Aircraft Profile";
      for(var i = 0; i < aircraftSelect.options.length; i++) {
        if(aircraftSelect.options.item(i).value == this.currentAircraft) {
          aircraftSelect.options.remove(i);
          this.currentAircraft = undefined;
          break;
        }
      }
        
      });
  }

  openPilotDeleteModal() {

    if(!this.currentPilot) {
      this.alertService.error("Please select an pilot to delete.")
      return;
    }

    document.getElementById('main-container').style.opacity = '40%';

    this.displayDeletePilot = 'flex';
  }

  closePilotDeleteModal(save: boolean) {
    this.displayDeletePilot = "none";

    document.getElementById('main-container').style.opacity = '100%';
  }

  deletePilot() {
    this.displayDeletePilot = "none";
    document.getElementById('main-container').style.opacity = '100%';

    this.apiService.post('pilots/delete', { username: localStorage.getItem('username'), name: this.currentPilot }).subscribe(res => {
      const pilotSelect = document.getElementById('PilotSelect') as HTMLSelectElement;

      pilotSelect.value = "Choose Pilot";
      for(var i = 0; i < pilotSelect.options.length; i++) {
        if(pilotSelect.options.item(i).value == this.currentPilot) {
          pilotSelect.options.remove(i);
          this.currentPilot = undefined;
          break;
        }
      }
        
      });
  }

  save() {

    const profileName = document.getElementById('ProfileName') as HTMLInputElement;
    const user = localStorage.getItem('username');
    const internalTankVal = document.getElementById('InternalTankInput') as HTMLInputElement;
    const underwingTankVal = document.getElementById('UnderwingTankInput') as HTMLInputElement;
    const tipTankVal = document.getElementById('TipTankInput') as HTMLInputElement;
    const outboard = document.getElementById('OutboardInput') as HTMLInputElement;

    const agileYesRadio = document.getElementById("AgileYesRadio") as HTMLInputElement;
    var agileWeight = 0;
    var agilePod = false;

    if(agileYesRadio.checked) {
      const agileWeightInput = document.getElementById('AgilePayload') as HTMLInputElement;
      agileWeight = Number(agileWeightInput.value);

      agilePod = true;
    }

    const profile = new Profile(user,profileName.value, Number(internalTankVal.value),
      Number(underwingTankVal.value), Number(tipTankVal.value), Number(outboard.value), agilePod, agileWeight);

    this.apiService.post('profiles/save',profile).pipe(first())
    .subscribe(
      res => {
        this.alertService.success("Aircraft profile saved!")

        const aircraftSelect = document.getElementById('AircraftSelect') as HTMLSelectElement;
        aircraftSelect.add(new Option(profile.name, profile.name), undefined)
      }
    );
  }

  createPilot() {

    this.submittedSavePilot = true;

    if(!this.formSavePilot.valid) {
      return;
    }

    const name = document.getElementById('PilotName') as HTMLInputElement;
    const mass = document.getElementById('PilotWeight') as HTMLInputElement;
    const user = localStorage.getItem('username');

    const currentName = name.value;

    this.apiService.post('pilots/save', new Pilot(name.value, user, Number(mass.value))).pipe(first())
    .subscribe(
      res => {
        this.alertService.success("Pilot profile saved!")

        const pilotSelect = document.getElementById('PilotSelect') as HTMLSelectElement;
        pilotSelect.add(new Option(currentName, currentName), undefined)
      }   
    );

    name.value = "";
    mass.value = "";
  }

  get fSavePilot() { return this.formSavePilot.controls; }
}
