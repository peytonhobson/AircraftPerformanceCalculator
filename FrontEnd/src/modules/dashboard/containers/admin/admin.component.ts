import { Component, ViewEncapsulation, OnInit, ViewChild, ElementRef } from "@angular/core";
import { AlertService } from "@app/services/alert.service";
import { ApiService } from "@app/services/api.service";
import { ActivityLog } from "@modules/dashboard/models/activity-log";
import jsPDF from "jspdf";
import html2canvas from 'html2canvas';

declare var require: any
const FileSaver = require('file-saver');

@Component({
    selector: 'admin-dashboard',
    templateUrl: './admin.component.html',
    styleUrls: ['admin.component.scss'],
})
export class AdminComponent implements OnInit {
  @ViewChild('pdfData') pdfData!: ElementRef;
    
  constructor(private apiService: ApiService,
    private alertService: AlertService) {}

  LOG = [];
  displayLog = 'none';

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
      this.LOG = [];

      if(allButton.className.match('btn-dark')) {
        this.apiService.get('activity-log/all').subscribe(res => {
          res.data.activityLogs.forEach(element => {
            this.displayLog = 'block'
            this.LOG.push(element);
            document.getElementById('main-container').style.opacity = '40%';
          })
        });
      }
      else {
        this.apiService.get(`activity-log/${localStorage.getItem('username')}`).subscribe(res => {
          res.data.activityLogs.forEach(element => {
            this.displayLog = 'block'
            this.LOG.push(element);
            document.getElementById('main-container').style.opacity = '40%';
          })
        });
      }
    });
  }

  public openPDF(): void {
    let DATA: any = document.getElementById('pdfData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.output('dataurlnewwindow');
    });
  }

  closeModal() {
    this.displayLog = 'none';
    document.getElementById('main-container').style.opacity = '100%';
  }
}

