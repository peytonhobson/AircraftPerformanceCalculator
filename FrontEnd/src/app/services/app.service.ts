import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, map } from 'rxjs';
import { CustomResponse, CalculatorResponse } from '../models/response';
import { Profile } from '../models/profile.model'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { throwError } from 'rxjs';
import { AuthenticationService } from './auth.service';
import { Router } from '@angular/router';




const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

/**
 * Service for response model
 */
@Injectable()
export class AppService {

   constructor(private apiService: ApiService, private http: HttpClient, private authenticationService: AuthenticationService,
    private router: Router) { }

    calculate(Profile: Profile): Observable<CalculatorResponse> {
        return this.apiService.calculatePost('profiles/calculator', Profile);
    }

    returnProfiles(username: string): Observable<CustomResponse> {
        return this.http.post<CustomResponse>(`${environment.apiUrl}profiles/${username}/all`, username, httpOptions)
            .pipe(map(res => {
            if(res.status != "200") {
                this.handleError(res.status);
            }
            return res;
            }));
    }

    save(Profile : Profile): Observable<CustomResponse> {
        return this.apiService.post('profiles/save', Profile);
    }

    handleError(error: string): Observable<never> {
        if(error == "403") {
            this.authenticationService.logout();
            this.router.navigate(['/account/login']);
        }
        return throwError(() =>new Error(`An error occurred - Error code: ${error}`));
      } 
}