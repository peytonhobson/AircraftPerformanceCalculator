/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SBRouteData } from '@modules/navigation/models';

/* Module */
import { DashboardModule } from './dashboard.module';

/* Containers */
import * as dashboardContainers from './containers/dashboard/dashboard.component';

/* Guards */
import * as dashboardGuards from './guards';

/* Routes */
export const ROUTES: Routes = [
    {
        path: 'dashboard',
        data: {
            title: 'L-39ZA Calculator',
        } as SBRouteData,
        canActivate: [],
        component: dashboardContainers.DashboardComponent,
    },
    {
        path: 'solver',
        data: {
            title: 'L-39ZA Solver',
        } as SBRouteData,
        canActivate: [],
        component: dashboardContainers.DashboardComponent,
    }
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
