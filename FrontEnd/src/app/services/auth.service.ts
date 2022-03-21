import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from '@environments/environment';
import { AuthenticationCode } from '../models/authentication.code.model';
import { AuthenticationResponse } from '../models/response';
import { User } from '../models/user';
import { AlertService } from './alert.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // BASE_PATH: 'http://localhost:8080'
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

  public username: String;
  public password: String;
  public accessToken : string;

  constructor(private http: HttpClient, private alertService: AlertService) {}


  createAuthToken(accessToken: String) {
    return 'Bearer ' + accessToken
  }

  isUserLoggedIn() {
    if (!localStorage.getItem('token')) return false
    return true
  }

  getLoggedInUserName() {
    return localStorage.getItem('username');
  }

  authenticate(authenicationCode: AuthenticationCode, user : User): Observable<AuthenticationResponse>{
    
    return this.http.post<AuthenticationResponse>(`${environment.apiUrl}register/authentication`, 
    JSON.stringify({"code":authenicationCode.code, "username": user.username, "password":user.password, "role":user.role}), httpOptions)
            .pipe(map(decision => {

                if(decision.data.invalidAuthenticationCode) {
                  this.alertService.error(decision.message)
                }

                if(decision.data.usernameTaken) {
                  this.alertService.error(decision.message)
                }

                return decision;
            }),
            );
  }

  handleError(error: string): Observable<never> {
    if(error == "404") {
      this.alertService.error("Incorrect Authentication Code")
    }
    return throwError(() =>new Error(`An error occurred: ${error}`));
  } 
}