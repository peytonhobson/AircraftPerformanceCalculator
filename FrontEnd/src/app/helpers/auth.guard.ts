import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { JwtDecodeOptions } from 'jwt-decode';


import { AccountService } from '../services/account.service';
import { ApiService } from '../services/api.service';
import { AuthenticationService } from '../services/auth.service';
import jwtDecode from 'jwt-decode';

// Guard to protect info from non-users/admin
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private accountService: AccountService,
        private authenticationService: AuthenticationService,
        private http: HttpClient,
        private apiService: ApiService
    ) {}

    // TODO: Maybe do verify request where function doesnt do anything but automatically checks token,
    // or check with database on part of token that verifies password
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        // Checks to see if user has correct role
        const decode = jwtDecode(localStorage.getItem('token'))
        if (decode['roles'][0] === "ROLE_USER" || decode['roles'][0] === "ROLE_ADMIN") {
            return true;
        }

        // Routes back to login if not user
        this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
