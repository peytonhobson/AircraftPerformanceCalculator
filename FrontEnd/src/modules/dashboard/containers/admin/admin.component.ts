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

  // Empty array initialized for activity logs
  LOG = [];

  // Display styles for modals
  displayLog = 'none';
  displayPassword = 'none';
  displayDelete = 'none';
  displayDeleteAdmin = 'none';

  // Display alerts
  codeCopied = false;
  codeSaved = false;
  userChanged = false;
  userDeleted = false;
  adminSaved = false;
  adminDeleted = false;

  // Vars for angular injection
  selectedDeleteAdmin = "";
  selectedDeleteUser = "";
  selectedPasswordUser = "";
  newPassword = "";

  ngOnInit() {

    // Get users and populate drop downs
    const editUserSelect = document.getElementById('EditUserSelect') as HTMLSelectElement;
    const deleteUserSelect = document.getElementById('DeleteUserSelect') as HTMLSelectElement;
    const deleteAdminSelect = document.getElementById('DeleteAdminSelect') as HTMLSelectElement;
    this.apiService.get(`users/all`).subscribe(res => {
        res.data.users.forEach((user) => {
            if(user.role !== "ROLE_ADMIN") {
              editUserSelect.add(new Option(user.username, user.username), undefined);
              deleteUserSelect.add(new Option(user.username, user.username), undefined);
            }
            else {
              deleteAdminSelect.add(new Option(user.username, user.username), undefined);
            }
        });
    },
    error => {
        this.alertService.error('Users could not be retrieved.')
    });

    const usernameInput = document.getElementById("UsernameInput") as HTMLInputElement;
    usernameInput.disabled = true;

    // Changes style of username/all buttons
    const allButton = document.getElementById("AllButton") as HTMLButtonElement;
    allButton.addEventListener('click', (e) => {
      usernameButton.className = usernameButton.className.replace('btn-dark', 'btn-secondary');
      allButton.className = allButton.className.replace('btn-secondary', 'btn-dark')
      usernameInput.disabled = true;
    })

    // Changes style of username/all buttons
    const usernameButton = document.getElementById("UsernameButton") as HTMLButtonElement;
    usernameButton.addEventListener('click', (e) => {
      allButton.className = usernameButton.className.replace('btn-dark', 'btn-secondary');
      usernameButton.className = allButton.className.replace('btn-secondary', 'btn-dark')
      usernameInput.disabled = false;
    })

    // Event listener for submit button for activity log
    const submitButton = document.getElementById("SubmitButton") as HTMLButtonElement;
    submitButton.addEventListener('click', (e) => {
      this.LOG = [];

      if(allButton.className.match('btn-dark')) {

        //Return all activity logs if all button is pressed
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

        // Return activity logs by username
        const usernameInput = document.getElementById("UsernameInput") as HTMLInputElement;
        this.apiService.get(`activity-log/${usernameInput.value}`).subscribe(res => {
          res.data.activityLogs.forEach(element => {
            this.displayLog = 'block'
            this.LOG.push(element);
            document.getElementById('main-container').style.opacity = '40%';
          })

          if(res.data.activityLogs.length == 0) {
            this.alertService.error("Activity log could not be found for " + usernameInput.value)
          }
        },
        error => {
          this.alertService.error("Activity log could not be found for " + usernameInput.value)
        });
      }
    });
  }

  // Function to create new PDF for activity log
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
  
    // Display confirmation message to user
    this.codeCopied = true;

    // Timeout for confirmation message
    setTimeout(() => {
      this.codeCopied = false;
    }, 4000);
  }

  // Generate random 8 digit authentication code
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

    // Save new authentication code in db
    const codeInput = document.getElementById('GeneratedCodeInput') as HTMLInputElement;
    this.apiService.post(`register/save`, new AuthenticationCode(codeInput.value)).subscribe(res => {

      // Display confirmation message to user
      this.codeSaved = true;

      // Timeout for confirmation message
      setTimeout(() => {
        this.codeSaved = false;
      }, 4000);
    },
    error => {
      this.alertService.error("Authentication code could not be saved.");
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

    // Get user from db
    this.apiService.get(`users/${this.selectedPasswordUser}`).subscribe(res => {
      user = res.data.user;

      user.password = this.newPassword;

      // Save/update user in db
      this.apiService.post(`users/save`, user).subscribe(res => {

        // Display confirmation message to user
        this.userChanged = true;

        // Timeout for confirmation message
        setTimeout(() => {
          this.userChanged = false;
        }, 4000);
      },
      error => {
        this.alertService.error("User could not be saved.");
      });
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

    this.apiService.post(`users/delete`, { username: this.selectedDeleteUser }).subscribe(res => {

      // Display confirmation message to user
      this.userDeleted = true;

      // Timeout for confirmation message
      setTimeout(() => {
        this.userDeleted = false;
      }, 4000);

      const deleteUserSelect = document.getElementById('DeleteUserSelect') as HTMLSelectElement
      deleteUserSelect.value = "Select User"

      // Remove user from delete select
      for(var i = 0; deleteUserSelect.options.length; i++) {
        if(deleteUserSelect.options.item(i).value == this.selectedDeleteUser) {
          deleteUserSelect.options.remove(i);
          break;
        }
      }

      const changeUserSelect = document.getElementById('EditUserSelect') as HTMLSelectElement
      changeUserSelect.value = "Select User"

      // Remove user from change select
      for(var i = 0; changeUserSelect.options.length; i++) {
        if(changeUserSelect.options.item(i).value == this.selectedDeleteUser) {
          changeUserSelect.options.remove(i);
          break;
        }
      }
    },
    error => {
      this.alertService.error("User could not be deleted.");
    });
    
    this.closeDeleteModal();
  }

  saveAdmin() {

    const username = document.getElementById('AdminUsernameInput') as HTMLInputElement
    const password = document.getElementById('AdminPasswordInput') as HTMLInputElement


    this.apiService.post(`users/save`, new User(username.value, password.value, "ROLE_ADMIN")).subscribe(res => {

      // Display confirmation message to user
      this.adminSaved = true;

      // Timeout for confirmation message
      setTimeout(() => {
        this.adminSaved = false;
      }, 4000);

      const deleteAdminSelect = document.getElementById('DeleteAdminSelect') as HTMLSelectElement;

      var alreadyExists = false;

      // Dont add another admin if already there
      for(var i = 0; i < deleteAdminSelect.options.length; i++) {
        if(deleteAdminSelect.options.item(i).value == username.value) {
          alreadyExists = true
        }
      }
      
      if(!alreadyExists) {
        deleteAdminSelect.add(new Option(username. value, username.value), undefined);
      }
    },
    error => {
      this.alertService.error("Admin could not be saved.");
    })
  }

  openDeleteAdminModal() {
    this.displayDeleteAdmin = 'block';

    document.getElementById('main-container').style.opacity = '40%';

    this.selectedDeleteAdmin = (document.getElementById('DeleteAdminSelect') as HTMLSelectElement).value;
  }

  closeDeleteAdminModal() {
    this.displayDeleteAdmin = 'none';

    document.getElementById('main-container').style.opacity = '100%';
  }

  deleteAdmin() {

    this.apiService.post(`users/delete`, { username: this.selectedDeleteAdmin }).subscribe(res => {

      // Display confirmation message to user
      this.adminDeleted = true;

      // Timeout for confirmation message
      setTimeout(() => {
        this.adminDeleted = false;
      }, 4000);

      const deleteAdminSelect = document.getElementById('DeleteAdminSelect') as HTMLSelectElement
      deleteAdminSelect.value = "Select Admin"

      // Remove admin from delete select
      for(var i = 0; deleteAdminSelect.options.length; i++) {
        if(deleteAdminSelect.options.item(i).value == this.selectedDeleteAdmin) {
          deleteAdminSelect.options.remove(i);
        }
      }
    },
    error => {
      this.alertService.error("Admin could not be deleted.");
    })
    
    this.closeDeleteAdminModal();
  }
}

