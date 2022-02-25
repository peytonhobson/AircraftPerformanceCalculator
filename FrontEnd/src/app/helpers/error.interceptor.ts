import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AccountService } from '../services/account.service';
import { AlertService } from '@app/services/alert.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private accountService: AccountService,
        private alertService: AlertService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if(err.url == "http://localhost:8080/register/authentication" && err.status == 404) {
                this.alertService.error("Bad Authentication Code")
                return throwError(() => new Error("Bad Authentication Code"));
            }
            const error = err.message || err.statusText;

            return throwError(() => new Error());
        }))
    }
}