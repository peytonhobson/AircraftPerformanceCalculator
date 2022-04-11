import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '@environments/environment';


@Component({
    selector: 'instructions',
    templateUrl: './instructions.component.html',
})
export class InstructionsComponent implements OnInit {

  constructor(private http: HttpClient, 
    private route: ActivatedRoute,
    private router: Router,) {}


  ngOnInit() {


    setTimeout(() => this.router.navigate(['/']), 4000);
  }
}