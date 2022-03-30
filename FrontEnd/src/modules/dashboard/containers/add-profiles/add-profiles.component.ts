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
    const internalTankVal = document.getElementById('InternalTankInput') as HTMLInputElement;
    const dropTankVal = document.getElementById('DropTankInput') as HTMLInputElement;
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
      Number(dropTankVal.value), Number(tipTankVal.value), outboard.value, agilePod, agileWeight);

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
