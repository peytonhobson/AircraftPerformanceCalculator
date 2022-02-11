import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CalculatorResponse, CustomResponse } from '../models/response';
import { tap, catchError } from 'rxjs/operators';
import { Profile } from '../models/profile.model'


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};

/**
 * Class used for api service from client to server
 */
@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}

  authenticated = false;

  /**
   * Method for making post request to back end 
   * and returning observable response.
   * @param path 
   * @param body 
   * @returns 
   */
  post(path: String, body: Object): Observable<CustomResponse> {
    console.log(body);
    return this.http.post<CustomResponse>(`${environment.apiUrl}${path}`, JSON.stringify(body), httpOptions)
    .pipe(
      tap(console.log),
      catchError(this.handleError)
    );
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
    .pipe(
      tap(console.log),
      catchError(this.handleError)
    );
  }

  // authenticate(credentials, callback) {

  //   const headers = new HttpHeaders(credentials ? {
  //       authorization : 'Basic' + btoa(credentials.username + ':' + credentials.password)} : {});


        
    
  //     this.http.get(`${environment.apiUrl}users/current`, {headers: headers} ).subscribe(response => {
  //         if (response['name']) {
  //             this.authenticated = true;
  //         } else {
  //             this.authenticated = true;
  //         }
  //         return callback && callback();
  //     });
  // } 

  handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error)
    return throwError(`An error occurred - Error code: ${error.status}` );
  } 
}