import { CdkDragDrop, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import { Component, OnInit } from "@angular/core";
import { ApiService } from "@app/services/api.service";
import { Attachment } from "@app/models/attachment";
import { UserService } from '@modules/auth/services';
import { async } from "rxjs";
import { first, map } from "rxjs/operators";

@Component({
    selector: 'add-profiles',
    templateUrl: './add-profiles.component.html',
    styleUrls: ['add-profiles.component.scss'],
})
export class AddProfilesComponent implements OnInit {
    
  constructor(private apiService: ApiService) {}

  CreatedAttachments = [];
  ExistingAttachments = [];
  Attachments = [];
  AttachmentsUsed = [];

    ngOnInit() {

      const user = localStorage.getItem('username');

      this.apiService.get(`attachments/getAll/${user}`).subscribe(
        element => {
          element.data.attachments.forEach((e) => {
            this.ExistingAttachments.push(e);
            this.Attachments.push(this.toImperialString(e));
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
            rangeTipTank.disabled = true;
        }
      })
      const pilot1Check = document.getElementById('pilot1Check') as HTMLInputElement;
      const pilot1Weight = document.getElementById('pilot1Weight') as HTMLInputElement;
      pilot1Weight.disabled = true;

      pilot1Check.addEventListener('change', (e) => {
         if(pilot1Check.checked) {
            pilot1Weight.disabled = false;
        }
           else {
            pilot1Weight.disabled = true;
        }
      })
      const pilot2Check = document.getElementById('pilot2Check') as HTMLInputElement;
      const pilot2Weight = document.getElementById('pilot2Weight') as HTMLInputElement;
      pilot2Weight.disabled = true;

      pilot2Check.addEventListener('change', (e) => {
         if(pilot2Check.checked) {
            pilot2Weight.disabled = false;
        }
           else {
            pilot2Weight.disabled = true;
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

    console.log("here");
    const profileName = document.getElementById('ProfileName') as HTMLInputElement;

    this.CreatedAttachments.forEach((x) => {
      x.profile = profileName.value;
    })

    this.apiService.post('attachments/save',this.CreatedAttachments).subscribe();

  }

  createAttachment() {

    const name = document.getElementById('AttachmentName') as HTMLInputElement;
    const mass = document.getElementById('AttachmentMass') as HTMLInputElement;
    const user = localStorage.getItem('username');

    this.Attachments.push(name.value + " - Mass = " + mass.value);
    this.CreatedAttachments.push(new Attachment(user + "_" + name.value, name.value, null, user, Number(mass.value)));
  }

  toImperialString(attachment : Attachment) {
    return attachment.name + " - Mass = " + attachment.mass + " lbs";
}

//TODO: Convert metric factor
toMetricString(attachment: Attachment) {
    return attachment.name + " - Mass = " + attachment.mass + " kgs";
}
}
