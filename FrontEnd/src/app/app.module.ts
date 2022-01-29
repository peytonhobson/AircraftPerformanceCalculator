import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClassifierService } from './service/classifier.service';
import { ApiService } from './service/api.service';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ClassifierService, ApiService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
