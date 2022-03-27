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
  AttachmentsUsed = [];

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
          internalVal.innerHTML = (Number(rangeInternal.value)*2.88).toFixed(0) + " gal"
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
    }
      
    onDrop(event: CdkDragDrop<string[]>) {
      if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      } else {
        transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
      }
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
    const internalTankVal = document.getElementById('InternalTankRange') as HTMLInputElement;
    const dropTankVal = document.getElementById('DropTankRange') as HTMLInputElement;
    const tipTankVal = document.getElementById('TipTankRange') as HTMLInputElement;

    const profile = new Profile(user,profileName.value, Number(internalTankVal.value),
      Number(dropTankVal.value), Number(tipTankVal.value), this.AttachmentsUsed);

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

    const imperialButton = document.getElementById('ImperialButton');

    if(imperialButton.className.match('btn-dark')) {
      this.Attachments.push(new Attachment(name.value, user, Number(mass.value)/2.20462));
    }
    else {
      this.Attachments.push(new Attachment(name.value, user, Number(mass.value)));
    }

    name.value = "";
    mass.value = "";
  }

  createPilot() {
    const name = document.getElementById('PilotName') as HTMLInputElement;
    const mass = document.getElementById('PilotMass') as HTMLInputElement;
    const user = localStorage.getItem('username');

    const imperialButton = document.getElementById('ImperialButton');

    if(imperialButton.className.match('btn-dark')) {
      this.apiService.post('pilots/save', new Pilot(name.value, user, Number(mass.value)/2.20462)).pipe(first())
      .subscribe(
        res => {
          this.alertService.success("Pilot profile saved!")
        }
      );
    }
    else {
      this.apiService.post('pilots/save', new Pilot(name.value, user, Number(mass.value))).pipe(first())
      .subscribe(
        res => {
          this.alertService.success("Pilot profile saved!")
        }
      );
    }

    name.value = "";
    mass.value = "";
  }

  toImperialString(attachment : Attachment) {
    return attachment.name + " - Mass = " + Math.round(attachment.mass*2.20462*10)/10 + " lbs";
  }

  //TODO: Convert metric factor
  toMetricString(attachment: Attachment) {
    return attachment.name + " - Mass = " + Math.round(attachment.mass*10)/10 + " kgs";
  }
}
