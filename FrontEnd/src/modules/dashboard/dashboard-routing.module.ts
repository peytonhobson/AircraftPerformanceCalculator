/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Module */
import { DashboardModule } from './dashboard.module';

/* Containers */
import * as dashboardContainers from './containers';

/* Guards */
import { AuthGuard } from '@app/helpers/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { faListUl } from '@fortawesome/free-solid-svg-icons';

/* Routes */
export const ROUTES: Routes = [

    {
        path: '',
        canActivate: [AuthGuard],
        component: dashboardContainers.CalculatorComponent,
    },
    {
        path: 'calculator',
        canActivate: [AuthGuard],
        component: dashboardContainers.CalculatorComponent,
    },
    {
        path: 'solver',
        canActivate: [AuthGuard],
        component: dashboardContainers.SolverComponent,
    },
    {
        path: 'profiles',
        canActivate: [AuthGuard],
        component: dashboardContainers.ProfilesComponent,
    },
    {
        path: 'runway-query',
        canActivate: [AuthGuard],
        component: dashboardContainers.QueryAirportComponent,
    },
    {
        path: 'admin',
        canActivate: [AdminGuard],
        component: dashboardContainers.AdminComponent,
    },
    {
        path: 'instructions',
        canActivate: [AuthGuard],
        component: dashboardContainers.InstructionsComponent,
    },
];

@NgModule({
    imports: [DashboardModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class DashboardRoutingModule {}
