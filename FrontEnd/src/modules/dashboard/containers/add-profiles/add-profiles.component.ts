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

@Component({
    selector: 'add-profiles',
    templateUrl: './add-profiles.component.html',
    styleUrls: ['add-profiles.component.scss'],
})
export class AddProfilesComponent implements OnInit {
    
  constructor(private apiService: ApiService) {}

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
         
      const rangeInternal = document.getElementById('InternalTankRange') as HTMLInputElement;
      const internalVal = document.getElementById('InternalTankVal') as HTMLInputElement;
      rangeInternal.addEventListener('change', (e) => {
          internalVal.innerHTML = rangeInternal.value + "%"
        }); 
      const rangeDropTank = document.getElementById('DropTankRange') as HTMLInputElement;
      const dropTankVal = document.getElementById('DropTankVal') as HTMLInputElement;
      rangeDropTank.disabled = true;
      rangeDropTank.addEventListener('change', (e) => {
          dropTankVal.innerHTML = "&nbsp;" + rangeDropTank.value + "%"
        }); 

      const dropTankCheck = document.getElementById("DropTankCheck") as HTMLInputElement;

      dropTankCheck.addEventListener('change', (e) => {
         if(dropTankCheck.checked) {
            rangeDropTank.disabled = false;
        }
           else {
            rangeDropTank.value = '0';
            dropTankVal.innerHTML = '&nbsp0%'
            rangeDropTank.disabled = true;
        }
      })
      const rangeTipTank = document.getElementById('TipTankRange') as HTMLInputElement;
      const TipTankVal = document.getElementById('TipTankVal') as HTMLInputElement;
      rangeTipTank.disabled = true;
      rangeTipTank.addEventListener('change', (e) => {
          TipTankVal.innerHTML = "&nbsp;" + rangeTipTank.value + "%"
        }); 

      const tipTankCheck = document.getElementById("TipTankCheck") as HTMLInputElement;

      tipTankCheck.addEventListener('change', (e) => {
         if(tipTankCheck.checked) {
            rangeTipTank.disabled = false;
        }
           else {
            rangeTipTank.value = '0';
            TipTankVal.innerHTML = '&nbsp0%'
            rangeTipTank.disabled = true;
        }
      })
      
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
    const profile = new Profile(user,profileName.value, this.AttachmentsUsed);

    this.apiService.post('profiles/saveAll',  this.AttachmentsUsed);
    this.apiService.post('profiles/save',profile).subscribe();
  }

  createAttachment() {

    const name = document.getElementById('AttachmentName') as HTMLInputElement;
    const mass = document.getElementById('AttachmentMass') as HTMLInputElement;
    const user = localStorage.getItem('username');

    this.Attachments.push(new Attachment(name.value, user, Number(mass.value)));

    name.value = "";
    mass.value = "";
  }

  createPilot() {
    const name = document.getElementById('PilotName') as HTMLInputElement;
    const mass = document.getElementById('PilotMass') as HTMLInputElement;
    const user = localStorage.getItem('username');


    this.apiService.post('pilots/save', new Pilot(name.value, user, Number(mass.value))).subscribe();

    name.value = "";
    mass.value = "";
  }

  toImperialString(attachment : Attachment) {
    return attachment.name + " - Mass = " + attachment.mass + " lbs";
  }

  //TODO: Convert metric factor
  toMetricString(attachment: Attachment) {
    return attachment.name + " - Mass = " + attachment.mass + " kgs";
  }
}
