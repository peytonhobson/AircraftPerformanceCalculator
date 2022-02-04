import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../modules/login/components/login.component';
import { HomeComponent } from '../modules/home/components/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home'},
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent,}
      ];
@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    FormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
