/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/* Modules */
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';

/* Components */
import * as authComponents from './components';

/* Containers */
import * as authContainers from './containers';

/* Guards */
import * as authGuards from './guards';

/* Services */
import * as authServices from './services';
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
        AppCommonModule,
        NavigationModule
    ],
    providers: [...authServices.services, ...authGuards.guards,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
            { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    
            ApiService,
            AuthenticationService],
    declarations: [...authContainers.containers, ...authComponents.components],
    exports: [...authContainers.containers, ...authComponents.components],
})
export class AuthModule {}
