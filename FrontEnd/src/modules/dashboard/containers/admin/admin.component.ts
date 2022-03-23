import { CdkDragDrop, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ApiService } from "@app/services/api.service";
import { Attachment } from "@app/models/attachment";
import { UserService } from '@modules/auth/services';

import { first, map } from "rxjs/operators";
import { Profile } from "@app/models/profile.model";
import { NgbProgressbar } from "@ng-bootstrap/ng-bootstrap";
import { Pilot } from "@app/models/pilot";
import { AlertService } from "@app/services/alert.service";
import { ActivityLog } from "@modules/dashboard/models/activity-log";



@Component({
    selector: 'admin-dashboard',
    templateUrl: './admin.component.html',
    styleUrls: ['admin.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AdminComponent implements OnInit {
    
  constructor(private apiService: ApiService,
    private alertService: AlertService) {}

  LOG = [];

  // public openPDF(): void {
  //   let DATA: any = document.getElementById('pdfData');
  //   html2canvas(DATA).then((canvas) => {
  //     let fileWidth = 208;
  //     let fileHeight = (canvas.height * fileWidth) / canvas.width;
  //     const FILEURI = canvas.toDataURL('image/png');
  //     let PDF = new jsPDF('p', 'mm', 'a4');
  //     let position = 0;
  //     PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
  //     PDF.save('angular-demo.pdf');
  //   });
  // }

  ngOnInit() {

    const allButton = document.getElementById("AllButton") as HTMLButtonElement;
    const usernameButton = document.getElementById("UsernameButton") as HTMLButtonElement;
    const usernameInput = document.getElementById("UsernameInput") as HTMLInputElement;
    const submitButton = document.getElementById("SubmitButton") as HTMLButtonElement;
    usernameInput.disabled = true;

    allButton.addEventListener('click', (e) => {
      usernameButton.className = usernameButton.className.replace('btn-dark', 'btn-secondary');
      allButton.className = allButton.className.replace('btn-secondary', 'btn-dark')
      usernameInput.disabled = true;
    })

    usernameButton.addEventListener('click', (e) => {
      allButton.className = usernameButton.className.replace('btn-dark', 'btn-secondary');
      usernameButton.className = allButton.className.replace('btn-secondary', 'btn-dark')
      usernameInput.disabled = false;
    })

    submitButton.addEventListener('click', (e) => {
      this.apiService.get('activity-log/all').subscribe(res => {
        res.data.activityLogs.forEach(element => {

          this.LOG.push(element);
        })
        console.log(this.LOG)
        console.log()
      });
    });
  }
}
function html2canvas(DATA: any) {
  throw new Error("Function not implemented.");
}

