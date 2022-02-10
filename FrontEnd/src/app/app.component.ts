import { Component } from '@angular/core';
import { ApiService } from './services/api.service';
import { HttpClient } from '@angular/common/http';
import { AccountService } from './services/account.service';
import { User } from './models/user';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'FrontEnd';

  user: User;

  constructor(private app: ApiService, private http: HttpClient, private accountService: AccountService) {
    
  }

  logout() {
      this.accountService.logout();
  }
}
