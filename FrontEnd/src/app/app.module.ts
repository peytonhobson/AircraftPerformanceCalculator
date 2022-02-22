import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountService } from './services/account.service';
import { ApiService } from './services/api.service';
import { AuthenticationService } from './services/auth.service';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AppRoutingModule, HttpClientModule],
    providers: [ApiService, AccountService, AuthenticationService],
    bootstrap: [AppComponent],
})
export class AppModule {}
