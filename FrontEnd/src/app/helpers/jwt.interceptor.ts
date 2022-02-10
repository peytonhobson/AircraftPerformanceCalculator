import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { AccountService } from 'src/app/services/account.service';
import { AuthenticationService } from '../services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private accountService: AccountService, private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
        const user = this.accountService.user;
        const isLoggedIn = user && this.authenticationService.accessToken
        const isApiUrl = request.url.startsWith(environment.apiUrl);
        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: {
                    
                    Authorization: `${this.authenticationService.createAuthToken(this.authenticationService.accessToken)}`
                }
            });
        }

        console.log(request.headers)

        return next.handle(request);
    }
}