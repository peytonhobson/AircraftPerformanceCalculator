import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { User } from '@app/models/user';


import { AccountService } from '@services/account.service';
import { ApiService } from '@services/api.service';
import { AuthenticationService } from '@services/auth.service';
import jwtDecode from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
    constructor(
        private router: Router,
        private accountService: AccountService,
        private authenticationService: AuthenticationService,
        private http: HttpClient,
        private apiService: ApiService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        const decode = jwtDecode(localStorage.getItem('token'))
        if (decode['roles'][0] === "ROLE_ADMIN") {
            return true;
        }

        this.router.navigate(['/dashboard'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
