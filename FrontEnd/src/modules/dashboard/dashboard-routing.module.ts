/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SBRouteData } from '@modules/navigation/models';

/* Module */
import { DashboardModule } from './dashboard.module';

/* Containers */
import * as dashboardContainers from './containers';

/* Guards */
import * as dashboardGuards from './guards';

/* Routes */
export const ROUTES: Routes = [
    {
        path: 'dashboard',
        pathMatch: 'full',
        redirectTo: '/calculator',
    },
    {
        path: 'calculator',
        data: {
            title: 'L-39ZA Calculator',
        } as SBRouteData,
        canActivate: [],
        component: dashboardContainers.CalculatorComponent,
    },
    {
        path: 'solver',
        data: {
            title: 'L-39ZA Calculator',
        } as SBRouteData,
        canActivate: [],
        component: dashboardContainers.SolverComponent,
    },

    // {
    //     path: 'static',
    //     data: {
    //         title: 'Dashboard Static - SB Admin Angular',
    //         breadcrumbs: [
    //             {
    //                 text: 'Dashboard',
    //                 link: '/dashboard',
    //             },
    //             {
    //                 text: 'Static',
    //                 active: true,
    //             },
    //         ],
    //     } as SBRouteData,
    //     canActivate: [],
    //     component: dashboardContainers.StaticComponent,
    // },
    // {
    //     path: 'light',
    //     data: {
    //         title: 'Dashboard Light - SB Admin Angular',
    //         breadcrumbs: [
    //             {
    //                 text: 'Dashboard',
    //                 link: '/dashboard',
    //             },
    //             {
    //                 text: 'Light',
    //                 active: true,
    //             },
    //         ],
    //     } as SBRouteData,
    //     canActivate: [],
    //     component: dashboardContainers.LightComponent,
    // },
];

@NgModule({
    imports: [DashboardModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class DashboardRoutingModule {}
