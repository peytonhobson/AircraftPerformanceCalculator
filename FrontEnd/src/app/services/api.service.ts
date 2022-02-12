import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CalculatorResponse, CustomResponse } from '../models/response';
import { tap, catchError, first, map } from 'rxjs/operators';
import { Profile } from '../models/profile.model'
import { AccountService } from './account.service';
import { AuthenticationService } from './auth.service';
import { Router } from '@angular/router';


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
    private authenticationService: AuthenticationService,
    private router: Router) {}

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
      if(res.status != "200") {
        this.handleError(res.status);
      }
      return res;
    }));
  }

  calculatePost(path: String, body: Object): Observable<CalculatorResponse> {
    console.log(body);
    return this.http.post<CalculatorResponse>(`${environment.apiUrl}${path}`, JSON.stringify(body), httpOptions)
    .pipe(
      tap(console.log),
      catchError(this.handleError)
    );
  }

  get(path: String): Observable<CustomResponse> {
    console.log("executing get method : " + path);
    return this.http.get<CustomResponse>(`${environment.apiUrl}${path}`)
    .pipe(map(res => {
      tap(console.log)
      if(res.status != "200") {
        this.handleError(res.status);
      }
      return res;
    }));
  }

  handleError(error: string): Observable<never> {
    if(error == "403") {
        this.authenticationService.logout();
        this.router.navigate(['/account/login']);
    }
    return throwError(() =>new Error(`An error occurred - Error code: ${error}`));
  } 
}