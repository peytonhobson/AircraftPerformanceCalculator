import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Constants } from '@app/models/constants';
import { Pilot } from '@app/models/pilot';
import { Profile } from '@app/models/profile.model';
import { AlertService } from '@app/services/alert.service';
import { ApiService } from '@app/services/api.service';
import { first } from 'rxjs/operators';

@Component({
    selector: 'profiles',
    templateUrl: './profiles.component.html',
    styleUrls: ['profiles.component.scss'],
})
export class ProfilesComponent implements OnInit {

  constructor(private apiService: ApiService,
    private alertService: AlertService,
    private formBuilder: FormBuilder) {}

  // Display style for save profile modal
  displaySaveProfile = 'none';

  // Display style for delete aircraft modal
  displayDeleteAircraft = 'none';

  // Display style for delete pilot modal
  displayDeletePilot = 'none';

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
      internalTank: [{ value: 60, disabled: false }, [Validators.required, Validators.min(60), Validators.max(288), Validators.pattern(/^[0-9]/)]],
      tipTank: [{ value: 0, disabled: false }, [Validators.required, Validators.min(0), Validators.max(52), Validators.pattern(/^[0-9]/)]],
      underwingTank: [{ value: 0, disabled: false }, [Validators.required, Validators.min(0), Validators.max(80), Validators.pattern(/^[0-9]/)]],
      agilePayload: ['', [Validators.required, Validators.min(0), Validators.max(150), Validators.pattern(/^[0-9]/)]],
      outboardWeight: [{ value: 0, disabled: false }, [Validators.required, Validators.min(0), Validators.pattern(/^[0-9]/)]],
    });

    this.formSavePilot = this.formBuilder.group({
      name: [{ value: '', disabled: false }, [Validators.required, Validators.pattern(/^[A-Za-z0-9]/)]],
      weight: [{ value: 0, disabled: false }, [Validators.required, Validators.min(1), Validators.pattern(/^[0-9]/)]],
    });

    this.apiService.get('constants').subscribe(res => {
      this.constants = res.data.constants;
      this.weightSum = res.data.constants.basicEmptyAircraftWeight;
      this.momentSum = res.data.constants.basicEmptyAircraftWeight*res.data.constants.basicEmptyAircraft;
    })

    const profileInputs = []

    profileInputs.push(document.getElementById('InternalTankInput') as HTMLInputElement);
    profileInputs.push(document.getElementById('UnderwingTankInput') as HTMLInputElement);
    profileInputs.push(document.getElementById('TipTankInput') as HTMLInputElement);
    profileInputs.push(document.getElementById('OutboardInput') as HTMLInputElement);
    profileInputs.push(document.getElementById('AgilePayload') as HTMLInputElement);

    // If form inputs for saving profile are clicked, errors will disappear
    profileInputs.forEach(input => {
      input.addEventListener('click', (e) => {
        this.submittedSaveProfile = false;
      })
    });

    const pilotInputs = []

    pilotInputs.push(document.getElementById('PilotName') as HTMLInputElement);
    pilotInputs.push(document.getElementById('PilotWeight') as HTMLInputElement);

    // If form inputs for saving pilot are clicked, errors will disappear
    pilotInputs.forEach(input => {
      input.addEventListener('click', (e) => {
        this.submittedSavePilot = false;
      })
    });

    const user = localStorage.getItem('username');
    const agileYesRadio = document.getElementById('AgileYesRadio') as HTMLInputElement;
    const agileNoRadio = document.getElementById('AgileNoRadio') as HTMLInputElement;
    const agileWeightInput = document.getElementById('AgilePayload') as HTMLInputElement;
    agileWeightInput.disabled = true;

    // Event listeners for agile pod radios
    agileYesRadio.addEventListener('click', (e) => {
      agileYesRadio.checked = true;
      agileNoRadio.checked = false;
      agileWeightInput.disabled = false;
      agileWeightInput.value = '0';
      this.submittedSaveProfile = false;
      this.agileYes = true;
    });

    agileNoRadio.addEventListener('click', (e) => {
      agileNoRadio.checked = true;
      agileYesRadio.checked = false;
      agileWeightInput.disabled = true;
      agileWeightInput.value = '0';
      this.submittedSaveProfile = false;
      this.agileYes = false;
    });


    // Initialize aircraft dropdown for user profiles
    const aircraftSelect = document.getElementById('AircraftSelect') as HTMLSelectElement;
    this.apiService.get(`profiles/${user}/all`).subscribe(res => {
      res.data.profiles.forEach(profile => {
        aircraftSelect.add(new Option(profile.name, profile.name), undefined)
      })
    },
    error => {
      this.alertService.error('Profiles could not be found.')
    });

    aircraftSelect.addEventListener('change', (e) => {
      if(aircraftSelect.value !== 'Choose Aircraft Profile') {
        this.currentAircraft = aircraftSelect.value;
      }
      else {
        this.currentAircraft = undefined;
      }
    });

    // Initialize pilot drop down
    const pilotSelect = document.getElementById('PilotSelect') as HTMLSelectElement;
    this.apiService.get(`pilots/${user}/all`).subscribe(res => {
      res.data.pilots.forEach(pilot => {
        pilotSelect.add(new Option(pilot.name, pilot.name), undefined)
      })
    },
    error => {
      this.alertService.error('Pilots could not be found.')
    })

    pilotSelect.addEventListener('change', (e) => {
      if(pilotSelect.value !== 'Choose Pilot') {
        this.currentPilot = pilotSelect.value;
      }
      else {
        this.currentPilot = undefined;
      }
    })
  }

  get fSave() { return this.formSaveProfile.controls; }
  get fSavePilot() { return this.formSavePilot.controls; }

  // Function for opening modal to save aircraft profile
  openSaveModal() {
    this.submittedSaveProfile = true;
    if(this.formSaveProfile.invalid) {
      if(!(this.fSave.agilePayload.errors.required && !this.agileYes)) {
        return;
      }
    }

    const internalTank = document.getElementById('InternalTankInput') as HTMLInputElement;
    const underwingTank = document.getElementById('UnderwingTankInput') as HTMLInputElement;
    const tipTank = document.getElementById('TipTankInput') as HTMLInputElement;
    const outboard = document.getElementById('OutboardInput') as HTMLInputElement;
    const agileYesRadio = document.getElementById('AgileYesRadio') as HTMLInputElement;

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

    this.displaySaveProfile = 'block';
    document.getElementById('main-container').style.opacity = '40%';
  }

  // Close save modal and return opacity to normal
  closeSaveModal(save: boolean) {
    this.displaySaveProfile = 'none';

    document.getElementById('main-container').style.opacity = '100%';

    if(save) {
      this.save();
    }
  }

  // Open modal to delete aircraft
  openAircraftDeleteModal() {

    if(!this.currentAircraft) {
      this.alertService.error('Please select an aircraft profile to delete.')
      return;
    }

    document.getElementById('main-container').style.opacity = '40%';

    this.displayDeleteAircraft = 'flex';
  }

  // Function to close aircraft delete modal
  closeAircraftDeleteModal() {
    this.displayDeleteAircraft = 'none';

    document.getElementById('main-container').style.opacity = '100%';
  }

  // Delete aircraft from DB
  deleteAircraft() {
    this.displayDeleteAircraft = 'none';
    document.getElementById('main-container').style.opacity = '100%';

    // HTTP request to delete
    this.apiService.post('profiles/delete', { username: localStorage.getItem('username'), name: this.currentAircraft }).subscribe(res => {
      const aircraftSelect = document.getElementById('AircraftSelect') as HTMLSelectElement;

      // Remove profile name from drop down menu
      aircraftSelect.value = 'Choose Aircraft Profile';
      for(let i = 0; i < aircraftSelect.options.length; i++) {
        if(aircraftSelect.options.item(i).value == this.currentAircraft) {
          aircraftSelect.options.remove(i);
          this.currentAircraft = undefined;
          break;
        }
      }

      this.alertService.success('Aircraft profile deleted.')

    },
    error => {
      this.alertService.error('Aircraft profile could not be deleted.')
    });
  }

  // Open pilot delete modal if pilot selected
  openPilotDeleteModal() {

    if(!this.currentPilot) {
      this.alertService.error('Please select an pilot to delete.')
      return;
    }

    document.getElementById('main-container').style.opacity = '40%';

    this.displayDeletePilot = 'flex';
  }

  closePilotDeleteModal(save: boolean) {
    this.displayDeletePilot = 'none';

    document.getElementById('main-container').style.opacity = '100%';
  }

  deletePilot() {
    this.displayDeletePilot = 'none';
    document.getElementById('main-container').style.opacity = '100%';

    // Delete pilot from DB
    this.apiService.post('pilots/delete', { username: localStorage.getItem('username'), name: this.currentPilot }).subscribe(res => {
      const pilotSelect = document.getElementById('PilotSelect') as HTMLSelectElement;

      // Remove pilot from drop down
      pilotSelect.value = 'Choose Pilot';
      for(let i = 0; i < pilotSelect.options.length; i++) {
        if(pilotSelect.options.item(i).value == this.currentPilot) {
          pilotSelect.options.remove(i);
          this.currentPilot = undefined;
          break;
        }
      }

      this.alertService.success('Pilot deleted!')

    },
    error => {
      this.alertService.error('Pilot could not be deleted.')
    });
  }

  // Function for saving aircraft profile
  save() {

    const profileName = document.getElementById('ProfileName') as HTMLInputElement;
    const user = localStorage.getItem('username');
    const internalTankVal = document.getElementById('InternalTankInput') as HTMLInputElement;
    const underwingTankVal = document.getElementById('UnderwingTankInput') as HTMLInputElement;
    const tipTankVal = document.getElementById('TipTankInput') as HTMLInputElement;
    const outboard = document.getElementById('OutboardInput') as HTMLInputElement;

    const agileYesRadio = document.getElementById('AgileYesRadio') as HTMLInputElement;
    let agileWeight = 0;
    let agilePod = false;

    // Adds agile weight if applicable
    if(agileYesRadio.checked) {
      const agileWeightInput = document.getElementById('AgilePayload') as HTMLInputElement;
      agileWeight = Number(agileWeightInput.value);

      agilePod = true;
    }

    // Profile to return to back end
    const profile = new Profile(user,profileName.value, Number(internalTankVal.value),
      Number(underwingTankVal.value), Number(tipTankVal.value), Number(outboard.value), agilePod, agileWeight);

    // HTTP request to save profile
    this.apiService.post('profiles/save',profile).pipe(first())
    .subscribe(
      res => {
        this.alertService.success('Aircraft profile saved!')

        var alreadyExists = false;
        const aircraftSelect = document.getElementById('AircraftSelect') as HTMLSelectElement;
        for(var i = 0; i < aircraftSelect.options.length; i++) {
          if(aircraftSelect.options.item(i).value == profile.name) {
            alreadyExists = true
          }
        }
        
        if(!alreadyExists) {
          aircraftSelect.add(new Option(profile.name, profile.name), undefined);
        }

        internalTankVal.value = "60";
        tipTankVal.value = "0";
        underwingTankVal.value = "0";
        (document.getElementById('AgileNoRadio')).click;
        outboard.value = "0";
      },
      error => {
        this.alertService.error('Profile could not be saved.')
      }
    );
  }

  // Function to save new pilot
  createPilot() {

    this.submittedSavePilot = true;

    if(!this.formSavePilot.valid) {
      return;
    }

    const name = document.getElementById('PilotName') as HTMLInputElement;
    const mass = document.getElementById('PilotWeight') as HTMLInputElement;
    const user = localStorage.getItem('username');

    const currentName = name.value;

    // HTTP request to save
    this.apiService.post('pilots/save', new Pilot(name.value, user, Number(mass.value))).pipe(first())
    .subscribe(
      res => {
        this.alertService.success('Pilot profile saved!')

        var alreadyExists = false;
        const pilotSelect = document.getElementById('PilotSelect') as HTMLSelectElement;
        for(var i = 0; i < pilotSelect.options.length; i++) {
          if(pilotSelect.options.item(i).value == currentName) {
            alreadyExists = true
          }
        }
        
        if(!alreadyExists) {
          pilotSelect.add(new Option(currentName, currentName), undefined)
        }      

        name.value = "";
        mass.value = "0";
      },
      error => {
        this.alertService.error('Pilot could not be saved.')
      }
    );

    name.value = '';
    mass.value = '';
  }
}
