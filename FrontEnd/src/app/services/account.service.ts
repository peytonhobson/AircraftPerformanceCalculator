import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '../models/user';
import { AuthenticationService } from './auth.service';
import { Token } from '../models/token';
import { AuthenticationCode } from '../models/authentication.code.model';
import { CustomResponse } from '@app/models/response';

/**
 * Service used for login and logout of users, as well as editing for admin.
 */
@Injectable({ providedIn: 'root' })
export class AccountService {
    
    constructor(
        private router: Router,
        private http: HttpClient,
        private authenticationService: AuthenticationService,

    ) {}

    // Logs used in and sets retreived token to local storage
    login(username: string, password: string): Observable<Token> {
        let params = new HttpParams()
            .set('username', username)
            .set('password', password)
        return this.http.post<Token>(`${environment.apiUrl}users/login`, params)
            .pipe(map(token => {
                this.authenticationService.accessToken = token.access_token;
                localStorage.setItem('token', this.authenticationService.accessToken)
                localStorage.setItem('username', username)
                return token;
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('username');
        localStorage.removeItem('token');
    }

    register(user: User, authenicationCode: AuthenticationCode){
        // Registers user
        return this.authenticationService.authenticate(authenicationCode, user);
    }

    // TODO: May need to make this more secure
    // getAll() {
    //     return this.http.get<User[]>(`${environment.apiUrl}/users/all`);
    // }

    // // TODO: May need to make this more secure
    // getById(id: string) {
    //     return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
    // }

    // delete(username: string) {
    //     return this.http.delete(`${environment.apiUrl}/users/${username}`)
    //         .pipe(map(x => {
    //             // auto logout if the logged in user deleted their own record
    //             if (username == this.userValue.username) {
    //                 this.logout();
    //             }
    //             return x;
    //         }));
    // }
}