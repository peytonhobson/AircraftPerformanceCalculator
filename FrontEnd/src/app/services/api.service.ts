import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { environment } from '@environments/environment';
import { CustomResponse } from '../models/response';
import { tap, catchError, map } from 'rxjs/operators';
import { Profile } from '../models/profile.model'
import { AccountService } from './account.service';
import { AuthenticationService } from './auth.service';
import { Router } from '@angular/router';
import { AlertService } from './alert.service';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

/**
 * Class used for api service from client to server
 */
@Injectable()
export class ApiService {
  constructor(private http: HttpClient,
    private accountService: AccountService,
    private router: Router,
    private alertService: AlertService) {}

  /**
   * Method for making post request to back end 
   * and returning observable response.
   * @param path 
   * @param body 
   * @returns 
   */
  post(path: String, body: Object): Observable<CustomResponse> {
    console.log("executing post method : " + path);
    return this.http.post<CustomResponse>(`${environment.apiUrl}${path}`, JSON.stringify(body), httpOptions)
    .pipe(map(res => {
      tap(console.log)
      if(res.status != "200") {
        if(res.status == "404") {
          this.alertService.error(res.message);
        }
        this.handleError(res.status);
      }
      return res;
    }));
  }

  get(path: String): Observable<CustomResponse> {
    console.log("executing get method : " + path);
    return this.http.get<CustomResponse>(`${environment.apiUrl}${path}`, httpOptions)
    .pipe(map(res => {
      tap(console.log)
      if(res.data.runwayError) {
        this.alertService.error(res.data.runwayError);
      }
      if(res.status != "200") {
        this.handleError(res.status);
      }

      return res;
    }));
  }

  /**
   * Handles errors caught in get and post requests
   * @param error 
   * @returns 
   */
  handleError(error: string): Observable<never> {
    if(error == "403") {
        this.accountService.logout();
        this.router.navigate(['/account/login']);
    }
    if(error == "404") {
      this.alertService.error(error);
    }
    return throwError(() =>new Error(`An error occurred - Error code: ${error}`));
  } 
}