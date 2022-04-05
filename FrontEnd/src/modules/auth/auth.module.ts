/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/* Modules */
import { NavigationModule } from '@modules/navigation/navigation.module';

/* Containers */
import * as authContainers from './containers';

/* Services */
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from '@app/helpers/error.interceptor';
import { JwtInterceptor } from '@app/helpers/jwt.interceptor';
import { ApiService } from '@app/services/api.service';
import { AuthenticationService } from '@app/services/auth.service';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        NavigationModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
            { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    
            ApiService,
            AuthenticationService],
    declarations: [...authContainers.containers],
    exports: [...authContainers.containers],
})
export class AuthModule {}
