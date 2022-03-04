import { CdkDragDrop, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import { Component, OnInit } from "@angular/core";
import { Attachment } from "@modules/dashboard/models/attachment";



@Component({
    selector: 'add-profiles',
    templateUrl: './add-profiles.component.html',
    styleUrls: ['add-profiles.component.scss'],
})
export class AddProfilesComponent implements OnInit {
    

    ngOnInit() {

        const rangeTip = document.getElementById('tipRange') as HTMLInputElement;
        const tipVal = document.getElementById('tipTankVal') as HTMLInputElement;
        rangeTip.disabled = true;

        rangeTip.addEventListener('change', (e) => {
            tipVal.innerHTML = rangeTip.value + "%"
          }); 
  
        const tipTankCheck = document.getElementById("tipTankCheck") as HTMLInputElement;
  
        tipTankCheck.addEventListener('change', (e) => {
           if(tipTankCheck.checked) {
              rangeTip.disabled = false;
          }
             else {
              rangeTip.disabled = true;
          }
        })

        const rangeOtherTank1 = document.getElementById('other1Range') as HTMLInputElement;
        const other1Val = document.getElementById('otherTank1Val') as HTMLInputElement;
        rangeOtherTank1.disabled = true;

        rangeOtherTank1.addEventListener('change', (e) => {
            other1Val.innerHTML = rangeOtherTank1.value + "%"
          }); 
  
        const other1Check = document.getElementById("otherTank1Check") as HTMLInputElement;
  
        other1Check.addEventListener('change', (e) => {
           if(other1Check.checked) {
              rangeOtherTank1.disabled = false;
          }
             else {
              rangeOtherTank1.disabled = true;
          }
        })

        const rangeOtherTank2 = document.getElementById('other2Range') as HTMLInputElement;
        const other2Val = document.getElementById('otherTank2Val') as HTMLInputElement;
        rangeOtherTank2.disabled = true;

        rangeOtherTank2.addEventListener('change', (e) => {
            other2Val.innerHTML = rangeOtherTank2.value + "%"
          }); 
  
        const other2Check = document.getElementById("otherTank2Check") as HTMLInputElement;
  
        other2Check.addEventListener('change', (e) => {
           if(other2Check.checked) {
              rangeOtherTank2.disabled = false;
          }
             else {
              rangeOtherTank2.disabled = true;
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

    Attachments = [
        new Attachment("Attachment 1", 300).toString(),
        new Attachment("Attachment 2", 400).toString(),
        new Attachment("Attachment 3", 600).toString(),
        new Attachment("Attachment 4", 900).toString(),
        new Attachment("Attachment 5", 300).toString()
    ];

    AttachmentsUsed = [
    ];

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

    createNew() {
      const name = document.getElementById('AttachmentName') as HTMLInputElement
      const mass = document.getElementById('AttachmentMass') as HTMLInputElement

      this.Attachments.push(new Attachment(name.value, Number(mass.value)).toString())
    }

    
}
