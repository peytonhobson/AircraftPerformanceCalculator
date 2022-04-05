/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/* Components */
import * as navigationComponents from './components';

/* Containers */
import * as navigationContainers from './containers';

/* Layouts */
import * as appCommonLayouts from './layouts';

/* Guards */
import * as navigationGuards from './guards';

/* Services */
import * as navigationServices from './services';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from '@app/helpers/jwt.interceptor';
import { ErrorInterceptor } from '@app/helpers/error.interceptor';

/* Modules */
import { AlertModule } from '@app/alerts/alert.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IconsModule } from '@modules/icons/icons.module';

const thirdParty = [IconsModule, NgbModule];

@NgModule({
    imports: [CommonModule, RouterModule, AlertModule, ...thirdParty],
    providers: [ { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        ...navigationServices.services, ...navigationGuards.guards],
    declarations: [
        ...navigationContainers.containers,
        ...navigationComponents.components,
        ...appCommonLayouts.layouts
    ],
    exports: [
        ...navigationContainers.containers,
        ...navigationComponents.components,
        ...thirdParty,
        ...appCommonLayouts.layouts
    ],
})
export class NavigationModule {}