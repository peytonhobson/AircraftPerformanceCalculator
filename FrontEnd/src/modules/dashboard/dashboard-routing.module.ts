/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Module */
import { DashboardModule } from './dashboard.module';

/* Containers */
import * as dashboardContainers from './containers';

/* Guards */
import { AuthGuard } from '@app/helpers/auth.guard';

/* Routes */
export const ROUTES: Routes = [
    
    {
        path: '',
        canActivate: [AuthGuard],
        component: dashboardContainers.DashboardComponent,
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
        path: 'add-profiles',
        canActivate: [AuthGuard],
        component: dashboardContainers.AddProfilesComponent,
    },
    {
        path: 'airports',
        canActivate: [AuthGuard],
        component: dashboardContainers.QueryAirportComponent,
    },
 
];

@NgModule({
    imports: [DashboardModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class DashboardRoutingModule {}
