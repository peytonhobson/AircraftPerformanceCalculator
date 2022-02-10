import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user';
import { AuthenticationService } from './auth.service';
import { Token } from '../models/token';

@Injectable({ providedIn: 'root' })
export class AccountService {
    private userSubject: BehaviorSubject<User>;
    public user: User;

    constructor(
        private router: Router,
        private http: HttpClient,
        private authenticationService: AuthenticationService
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    login(username: string, password: string): Observable<Token> {
        let params = new HttpParams()
            .set('username', username)
            .set('password', password)
        return this.http.post<Token>(`${environment.apiUrl}users/login`, params)
            .pipe(map(token => {
                this.user = new User(username, password);
                this.authenticationService.accessToken = token.access_token;
                return token;
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/account/login']);
    }

    register(user: User) {
        return this.http.post(`${environment.apiUrl}/users/register`, user);
    }

    // TODO: May need to make this more secure
    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users/all`);
    }

    // TODO: May need to make this more secure
    getById(id: string) {
        return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
    }

    update(username, params) {
        return this.http.put(`${environment.apiUrl}/users/${username}`, params)
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                if (username == this.userValue.username) {
                    // update local storage
                    const user = { ...this.userValue, ...params };
                    localStorage.setItem('user', JSON.stringify(user));

                    // publish updated user to subscribers
                    this.userSubject.next(user);
                }
                return x;
            }));
    }

    delete(username: string) {
        return this.http.delete(`${environment.apiUrl}/users/${username}`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                if (username == this.userValue.username) {
                    this.logout();
                }
                return x;
            }));
    }
}