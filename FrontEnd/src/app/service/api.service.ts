import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Loadout } from '../model/loadout.model';


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
  post(path: String, body: Object = {}): Observable<Loadout> {
    return this.http.post<Loadout>(`${environment.apiUrl}${path}`, JSON.stringify(body), httpOptions);
  }

  get(path: String, value: string): Observable<Loadout> {
    console.log("executing get method : " + path + " val : " + value);
    return this.http.get<Loadout>(`${environment.apiUrl}${path}/${value}`, httpOptions);
  }
}