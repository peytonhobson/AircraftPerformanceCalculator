/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


/* Components */
import * as loginComponents from './components';

/* Containers */
import * as blogContainers from './containers';

/* Guards */
import * as blogGuards from './guards';

/* Services */
import * as blogServices from './services';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
    
    ],
    providers: [...loginServices.services],
    declarations: [...blogContainers.containers, ...loginComponents.components],
    exports: [...blogContainers.containers, ...loginComponents.components],
})
export class LoginModule {}