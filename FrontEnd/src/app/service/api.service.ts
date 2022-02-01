import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CustomResponse } from '../model/response';
import { tap, catchError } from 'rxjs/operators';


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
  constructor(private http: HttpClient) { console.log("here");}

  /**
   * Method for making post request to back end 
   * and returning observable response.
   * @param path 
   * @param body 
   * @returns 
   */
  post(path: String, body: Object = {}): Observable<CustomResponse> {
    return this.http.post<CustomResponse>(`${environment.apiUrl}${path}`, JSON.stringify(body), httpOptions);
  }

  get(path: String): Observable<CustomResponse> {
    console.log("executing get method : " + path);
    return this.http.get<CustomResponse>(`${environment.apiUrl}${path}`)
    .pipe(
      tap(console.log),
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error)
    return throwError(`An error occurred - Error code: ${error.status}` );
  } 
}