/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SBRouteData } from '@modules/navigation/models';

/* Module */
import { AuthModule } from './auth.module';

/* Containers */
import * as authContainers from './containers';

/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
    },
    {
        path: 'login',
        canActivate: [],
        component: authContainers.LoginComponent,
        data: {
            title: 'Login',
        } as SBRouteData,
    },
    {
        path: 'register',
        canActivate: [],
        component: authContainers.RegisterComponent,
        data: {
            title: 'Register',
        } as SBRouteData,
    },
    {
        path: 'forgot-password',
        canActivate: [],
        component: authContainers.ForgotPasswordComponent,
        data: {
            title: 'Pages Forgot Password - SB Admin Angular',
        } as SBRouteData,
    },
];

@NgModule({
    imports: [AuthModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class AuthRoutingModule {}
