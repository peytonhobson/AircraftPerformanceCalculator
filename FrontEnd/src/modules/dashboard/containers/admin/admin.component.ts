import { Component, ViewEncapsulation, OnInit, ViewChild, ElementRef } from "@angular/core";
import { AlertService } from "@app/services/alert.service";
import { ApiService } from "@app/services/api.service";
import { ActivityLog } from "@modules/dashboard/models/activity-log";
import jsPDF from "jspdf";
import html2canvas from 'html2canvas';
import { AuthenticationCode } from "@app/models/authentication.code.model";
import { User } from "@app/models/user";

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
  displayPassword = 'none';
  displayDelete = 'none';

  codeCopied = false;
  codeSaved = false;
  userChanged = false;
  userDeleted = false;

  selectedDeleteUser = "";
  selectedPasswordUser = "";
  newPassword = "";

  ngOnInit() {

    // Get profiles and populate drop down
    const editUserSelect = document.getElementById('EditUserSelect') as HTMLSelectElement;
    const deleteUserSelect = document.getElementById('DeleteUserSelect') as HTMLSelectElement;
    this.apiService.get(`users/all`).subscribe(res => {
        res.data.users.forEach((user) => {
            if(user.role !== "ROLE_ADMIN") {
              editUserSelect.add(new Option(user.username, user.username), undefined)
              deleteUserSelect.add(new Option(user.username, user.username), undefined)
            }
        });
    },
    error => {
        this.alertService.error('Profiles could not be retrieved.')
    });

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
        },
        error => {
          this.alertService.error("Activity log could not be found.")
        });
      }
      else {
        this.apiService.get(`activity-log/${localStorage.getItem('username')}`).subscribe(res => {
          res.data.activityLogs.forEach(element => {
            this.displayLog = 'block'
            this.LOG.push(element);
            document.getElementById('main-container').style.opacity = '40%';
          })
        },
        error => {
          this.alertService.error("Activity log could not be found.")
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

  copyCode() {
    /* Get the text field */
    var copyText = document.getElementById("GeneratedCodeInput") as HTMLInputElement;
  
    /* Select the text field */
    copyText.select();
  
     /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText.value);
  
    this.codeCopied = true;

    setTimeout(() => {
      this.codeCopied = false;
    }, 4000);
  } 

  makeCode() {
    var result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for ( var i = 0; i < 8; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
      characters.length));
    }
   return result;
  }

  generateCode() {
    const codeInput = document.getElementById('GeneratedCodeInput') as HTMLInputElement;
    codeInput.value = this.makeCode();
  }

  saveCode() {
    const codeInput = document.getElementById('GeneratedCodeInput') as HTMLInputElement;
    this.apiService.post(`register/save`, new AuthenticationCode(codeInput.value)).subscribe(res => {
      this.codeSaved = true;

      setTimeout(() => {
        this.codeSaved = false;
      }, 4000);
    })
  }

  openPasswordModal() {
    this.displayPassword = 'block';

    document.getElementById('main-container').style.opacity = '40%';

    this.selectedPasswordUser = (document.getElementById('EditUserSelect') as HTMLInputElement).value;
    this.newPassword = (document.getElementById('NewPasswordInput') as HTMLInputElement).value;
  }

  closePasswordModal() {
    this.displayPassword = 'none';

    document.getElementById('main-container').style.opacity = '100%';
  }

  changePassword() {

    var user: User;

    this.apiService.get(`users/${this.selectedPasswordUser}`).subscribe(res => {
      user = res.data.user;

      user.password = this.newPassword;

      this.apiService.post(`users/save`, user).subscribe(res => {
        this.userChanged = true;

        setTimeout(() => {
          this.userChanged = false;
        }, 4000);
      })
    })

    this.closePasswordModal();
  }

  openDeleteUserModal() {
    this.displayDelete = 'block';

    document.getElementById('main-container').style.opacity = '40%';

    this.selectedDeleteUser = (document.getElementById('DeleteUserSelect') as HTMLInputElement).value;
  }

  closeDeleteModal() {
    this.displayDelete = 'none';

    document.getElementById('main-container').style.opacity = '100%';
  }

  deleteUser() {

    this.apiService.post(`users/delete`, this.selectedDeleteUser).subscribe(res => {

      this.userDeleted = true;

      setTimeout(() => {
        this.userDeleted = false;
      }, 4000);

      (document.getElementById('DeleteUserSelect') as HTMLInputElement).value = "Select User"
    })
    

    this.closeDeleteModal();
  }
}

