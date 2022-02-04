import { Component} from '@angular/core';
import { ApiService } from './service/api.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { finalize } from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    HTMLInputElement // added class in the providers
  ]
})
export class AppComponent {
  title = 'FrontEnd';

  constructor(private app: ApiService, private http: HttpClient, private router: Router) {
    this.app.authenticate(undefined, undefined);
  }

  logout() {
    this.http.post('logout', {}).pipe(finalize(() => {
        this.app.authenticated = false;
        this.router.navigateByUrl('/login');
    })).subscribe();
  }

}
