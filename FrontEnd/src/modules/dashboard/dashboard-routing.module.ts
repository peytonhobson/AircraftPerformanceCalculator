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
import { AppComponent } from '@app/app.component';

/* Routes */
export const ROUTES: Routes = [
    
    {
        path: '',
        canActivate: [],
        component: dashboardContainers.DashboardComponent,
    },
    {
        path: 'calculator',
        canActivate: [],
        component: dashboardContainers.CalculatorComponent,
    },
    {
        path: 'solver',
        canActivate: [],
        component: dashboardContainers.SolverComponent,
    },
 
];

@NgModule({
    imports: [DashboardModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class DashboardRoutingModule {}
