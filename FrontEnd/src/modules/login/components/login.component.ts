import { Component, OnInit} from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    HTMLInputElement // added class in the providers
  ]
})
export class LoginComponent{
  title = 'FrontEnd';


}
