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

@Component({
    selector: 'add-profiles',
    templateUrl: './add-profiles.component.html',
    styleUrls: ['add-profiles.component.scss'],
})
export class AddProfilesComponent implements OnInit {
    
  constructor(private apiService: ApiService,
    private alertService: AlertService) {}

  Attachments = [];

    ngOnInit() {

      const user = localStorage.getItem('username');

      this.apiService.get(`attachments/getAll/${user}`).subscribe(
        element => {
          element.data.attachments.forEach((e) => {
            this.Attachments.push(e);
          });
      })
      
      //TODO: Might need to change to input instead of slider
      const rangeInternal = document.getElementById('InternalTankRange') as HTMLInputElement;
      const internalVal = document.getElementById('InternalTankVal') as HTMLInputElement;
      rangeInternal.addEventListener('change', (e) => {
          internalVal.innerHTML = (Number(rangeInternal.value)*2.22+60).toFixed(0) + " gal"
      }); 

      const rangeTipTank = document.getElementById('TipTankRange') as HTMLInputElement;
      const TipTankVal = document.getElementById('TipTankVal') as HTMLInputElement;
      rangeTipTank.addEventListener('change', (e) => {
          TipTankVal.innerHTML = "&nbsp;" + (Number(rangeTipTank.value)*0.52).toFixed(0) + " gal"
      }); 

      const rangeDropTank = document.getElementById('DropTankRange') as HTMLInputElement;
      const dropTankVal = document.getElementById('DropTankVal') as HTMLInputElement;
      rangeDropTank.addEventListener('change', (e) => {
          dropTankVal.innerHTML = "&nbsp;" + (Number(rangeDropTank.value)*0.8).toFixed(0) + " gal"
      }); 

      const agileYesRadio = document.getElementById("AgileYesRadio") as HTMLInputElement;
      const agileNoRadio = document.getElementById("AgileNoRadio") as HTMLInputElement;
      const agileWeightInput = document.getElementById('AgileWeightInput') as HTMLInputElement;
      agileWeightInput.disabled = false;

      agileYesRadio.addEventListener('click', (e) => {
        agileYesRadio.checked = true;
        agileNoRadio.checked = false;
        agileWeightInput.disabled = false;
      })

      agileNoRadio.addEventListener('click', (e) => {
        agileNoRadio.checked = true;
        agileYesRadio.checked = false;
        agileWeightInput.disabled = true;
        agileWeightInput.value = "";
      })

      const pylon1Select = document.getElementById('Pylon1Select') as HTMLSelectElement;
      const pylon2Select = document.getElementById('Pylon2Select') as HTMLSelectElement;
      const pylon3Select = document.getElementById('Pylon3Select') as HTMLSelectElement;
      const pylon4Select = document.getElementById('Pylon4Select') as HTMLSelectElement;

      pylon1Select.addEventListener('change', (e) => {

        const weightInput = document.getElementById('Pylon1WeightInput') as HTMLInputElement;

        if(pylon1Select.value !== "Choose Attachment" && pylon1Select.value !== "None") {
          this.Attachments.forEach(element => {
            if(element.name === pylon1Select.value) {
              weightInput.value = element.mass;
            }
          })
        }
        else {
          weightInput.value = "";
        }
      })

      pylon2Select.addEventListener('change', (e) => {

        const weightInput = document.getElementById('Pylon2WeightInput') as HTMLInputElement;

        if(pylon2Select.value !== "Choose Attachment" && pylon2Select.value !== "None") {
          this.Attachments.forEach(element => {
            if(element.name === pylon2Select.value) {
              weightInput.value = element.mass;
            }
          })
        }
        else {
          weightInput.value = "";
        }
      })

      pylon3Select.addEventListener('change', (e) => {

        const weightInput = document.getElementById('Pylon3WeightInput') as HTMLInputElement;

        if(pylon3Select.value !== "Choose Attachment" && pylon3Select.value !== "None") {
          this.Attachments.forEach(element => {
            if(element.name === pylon3Select.value) {
              weightInput.value = element.mass;
            }
          })
        }
        else {
          weightInput.value = "";
        }
      })

      pylon4Select.addEventListener('change', (e) => {

        const weightInput = document.getElementById('Pylon4WeightInput') as HTMLInputElement;

        if(pylon4Select.value !== "Choose Attachment" && pylon4Select.value !== "None") {
          this.Attachments.forEach(element => {
            if(element.name === pylon4Select.value) {
              weightInput.value = element.mass;
            }
          })
        }
        else {
          weightInput.value = "";
        }
      })

    }

    displaySaveStyle = "none";
  
  openSaveModal() {
    this.displaySaveStyle = "block";
    document.getElementById('main-container').style.opacity = '40%';
  }

  closeSaveModal(save: boolean) {
    this.displaySaveStyle = "none";

    document.getElementById('main-container').style.opacity = '100%';

    if(save) {
      this.save();
    }
  }

  save() {

    const profileName = document.getElementById('ProfileName') as HTMLInputElement;
    const user = localStorage.getItem('username');
    const internalTankVal = parseInt(document.getElementById('InternalTankVal').innerHTML.replace(/\D/g, ""));
    const dropTankVal = parseInt(document.getElementById('DropTankVal').innerHTML.replace(/\D/g, ""));
    const tipTankVal = parseInt(document.getElementById('TipTankRange').innerHTML.replace(/\D/g, ""));

    console.log(document.getElementById('InternalTankVal').innerHTML)

    const pylon1Select = document.getElementById('Pylon1Select') as HTMLSelectElement;
    const pylon2Select = document.getElementById('Pylon2Select') as HTMLSelectElement;
    const pylon3Select = document.getElementById('Pylon3Select') as HTMLSelectElement;
    const pylon4Select = document.getElementById('Pylon4Select') as HTMLSelectElement;

    if(pylon1Select.value === "Choose Attachment") {
      this.alertService.error("Please specify attachments for pylon 1.")
    }
    if(pylon2Select.value === "Choose Attachment") {
      this.alertService.error("Please specify attachments for pylon 2.")
    }
    if(pylon3Select.value === "Choose Attachment") {
      this.alertService.error("Please specify attachments for pylon 3.")
    }
    if(pylon4Select.value === "Choose Attachment") {
      this.alertService.error("Please specify attachments for pylon 4.")
    }

    const agileYesRadio = document.getElementById("AgileYesRadio") as HTMLInputElement;
    var agileWeight = 0;
    var agilePod = false;

    if(agileYesRadio.checked) {
      const agileWeightInput = document.getElementById('AgileWeightInput') as HTMLInputElement;
      agilePod = true;
    }

    const profile = new Profile(user,profileName.value, internalTankVal,
      dropTankVal, tipTankVal, pylon1Select.value, pylon2Select.value, pylon3Select.value,
      pylon4Select.value, agilePod, agileWeight);

    this.apiService.post('profiles/save',profile).pipe(first())
    .subscribe(
      res => {
        this.alertService.success("Aircraft profile saved!")
      }
    );
  }

  createAttachment() {

    const name = document.getElementById('AttachmentName') as HTMLInputElement;
    const mass = document.getElementById('AttachmentMass') as HTMLInputElement;
    const user = localStorage.getItem('username');

    const attachment = new Attachment(name.value, user, Number(mass.value));

    this.Attachments.push(attachment);
  
    this.apiService.post('attachments/save', attachment).pipe(first())
    .subscribe(
      res => {
        this.alertService.success("Attachment saved!")
      }
    );

    name.value = "";
    mass.value = "";
  }

  createPilot() {
    const name = document.getElementById('PilotName') as HTMLInputElement;
    const mass = document.getElementById('PilotMass') as HTMLInputElement;
    const user = localStorage.getItem('username');

    this.apiService.post('pilots/save', new Pilot(name.value, user, Number(mass.value))).pipe(first())
    .subscribe(
      res => {
        this.alertService.success("Pilot profile saved!")
      }
    );

    name.value = "";
    mass.value = "";
  }
}
