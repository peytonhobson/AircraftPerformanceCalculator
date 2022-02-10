import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // BASE_PATH: 'http://localhost:8080'
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

  public username: String;
  public password: String;
  public accessToken : String

  constructor(private http: HttpClient) {}
  

  authenticationService(username: String, password: String) {
    return this.http.get(`http://localhost:8080/users/${username}`,
      { headers: { authorization: this.createAuthToken(this.accessToken) } }).pipe(map((res) => {
        this.username = username;
        this.password = password;
        this.registerSuccessfulLogin(username, password);
      }));
  }

  createAuthToken(accessToken: String) {
    return 'Bearer ' + accessToken
  }

  registerSuccessfulLogin(username, password) {
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username)
  }

  logout() {
    this.accessToken = null;
    this.username = null;
    this.password = null;
  }

  isUserLoggedIn() {
    if (this.accessToken === null) return false
    return true
  }

  getLoggedInUserName() {
    return this.username;
  }
}