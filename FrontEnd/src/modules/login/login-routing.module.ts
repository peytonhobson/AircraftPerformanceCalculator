/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Module */
import { LoginModule } from './blog.module';

/* Containers */
import * as loginContainers from './containers';

/* Guards */
import * as loginGuards from './guards';

/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        component: loginContainers.MainComponent,
    },
];

@NgModule({
    imports: [LoginModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class LoginRoutingModule {}