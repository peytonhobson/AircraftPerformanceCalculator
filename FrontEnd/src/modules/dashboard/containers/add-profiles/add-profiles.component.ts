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

  form: FormGroup;
  formSaveProfile: FormGroup;

  submittedSaveProfile = false;

  agileYes = false;

  ngOnInit() {

    this.formSaveProfile = this.formBuilder.group({
      internalTank: ['', [Validators.required, Validators.min(60), Validators.max(288), Validators.pattern(/^[0-9]/)]],
      tipTank: ['', [Validators.required, Validators.min(60), Validators.max(52), Validators.pattern(/^[0-9]/)]],
      underwingTank: ['', [Validators.required, Validators.min(0), Validators.max(80), Validators.pattern(/^[0-9]/)]],
      agilePayload: ['', [Validators.min(0), Validators.max(150), Validators.pattern(/^[0-9]/)]],
      outboardWeight: ['', [Validators.required, Validators.min(0), Validators.pattern(/^[0-9]/)]],
    });

    let inputs = []

    inputs.push(document.getElementById('InternalTankInput') as HTMLInputElement);
    inputs.push(document.getElementById('UnderwingTankInput') as HTMLInputElement);
    inputs.push(document.getElementById('TipTankInput') as HTMLInputElement);
    inputs.push(document.getElementById('OutboardInput') as HTMLInputElement);
    inputs.push(document.getElementById('AgilePayload') as HTMLInputElement);

    inputs.forEach(input => {
      input.addEventListener('click', (e) => {
        this.submittedSaveProfile = false;
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
      console.log(this.submittedSaveProfile && this.fSave['internalTank'].errors && this.fSave['internalTank'].errors['required'])
      return;
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
      const agileWeightInput = document.getElementById('AgileWeightInput') as HTMLInputElement;
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
    const name = document.getElementById('PilotName') as HTMLInputElement;
    const mass = document.getElementById('PilotMass') as HTMLInputElement;
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
}
