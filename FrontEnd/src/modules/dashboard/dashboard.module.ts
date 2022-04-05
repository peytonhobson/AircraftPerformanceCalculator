/* tslint:disable: ordered-imports*/
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/* Modules */
import { NavigationModule } from '@modules/navigation/navigation.module';

/* Containers */
import * as dashboardContainers from './containers';

/* Guards */
import * as dashboardGuards from './guards';

/* Services */
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        NavigationModule,
        DragDropModule,
    ],
    providers: [...dashboardGuards.guards],
    declarations: [...dashboardContainers.containers],
    exports: [...dashboardContainers.containers],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardModule {}
