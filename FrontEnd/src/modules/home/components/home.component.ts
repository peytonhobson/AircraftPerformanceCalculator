import { Component, OnInit} from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { AppService } from 'src/app/service/app.service';
import { templateSourceUrl } from '@angular/compiler';
import { CustomResponse, CalculatorResponse } from 'src/app/model/response';
import { Loadout } from 'src/app/model/loadout.model';
import { Injectable } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [
    HTMLInputElement // added class in the providers
  ]
})
export class HomeComponent implements OnInit {
  title = 'FrontEnd';

  constructor(private restClassifier: AppService, private api : ApiService) {}

  authenticated() { return this.api.authenticated; }

  ngOnInit() {
    var loadoutBox = document.getElementById('loadouts') as HTMLSelectElement

    var loadouts  = new Map<string, Loadout>();

    this.restClassifier.returnLoadouts().subscribe(
      res => {
        console.log(res.data.loadouts)
        if(res.data.loadouts !== undefined) {
          console.log("here1");
          res.data.loadouts.forEach(element => {
            loadouts.set(element.loadoutName,element)
            loadoutBox.add(new Option(element.loadoutName,element.loadoutName), undefined)
          });
        }
        // else if(res.data.loadout !== undefined){
        //   console.log(res.data.loadout[0]);
        //   for(var i = 0; i < res.data.loadout.length; i++)
        //     loadouts.set(element.loadoutName,element)
        //     loadoutBox.add(new Option(element.loadoutName,element.loadoutName), undefined)
        //   });
        // }
      });

      loadoutBox.addEventListener('change', e => {
        
        var takeoffMass = document.getElementById('tmass') as HTMLInputElement
        var landingMass = document.getElementById('lmass') as HTMLInputElement
        var temp = document.getElementById('temp') as HTMLInputElement
        var drag = document.getElementById('drag') as HTMLInputElement
        var slope = document.getElementById('slope') as HTMLInputElement
        var friction = document.getElementById('friction') as HTMLInputElement
        var runwayType = document.getElementById('runwayType') as HTMLInputElement
        var psi = document.getElementById('psi') as HTMLInputElement
        var wind = document.getElementById('wind') as HTMLInputElement
        var aircraftType = document.getElementById('aircraftType') as HTMLInputElement

        if(loadoutBox.value !== 'None') {
          takeoffMass.value = loadouts.get(loadoutBox.value).takeoffMass;
          landingMass.value = loadouts.get(loadoutBox.value).landingMass;
          temp.value = loadouts.get(loadoutBox.value).temp;
          drag.value = loadouts.get(loadoutBox.value).drag;
          slope.value = loadouts.get(loadoutBox.value).slope;
          friction.value = loadouts.get(loadoutBox.value).friction;
          runwayType.value = loadouts.get(loadoutBox.value).runwayType;
          psi.value = loadouts.get(loadoutBox.value).psi;
          wind.value = loadouts.get(loadoutBox.value).wind;
          aircraftType.value = loadouts.get(loadoutBox.value).aircraftType;
        }
        else {
          takeoffMass.value = "";
          landingMass.value = "";
          temp.value = "";
          drag.value = "";
          slope.value = "";
          friction.value = "";
          runwayType.value = "";
          psi.value = "";
          wind.value = "";
          aircraftType.value = "";
        }
      });
  }

   submit() {

    var takeoffMass = document.getElementById('tmass') as HTMLInputElement
    var landingMass = document.getElementById('lmass') as HTMLInputElement
    var temp = document.getElementById('temp') as HTMLInputElement
    var drag = document.getElementById('drag') as HTMLInputElement
    var slope = document.getElementById('slope') as HTMLInputElement
    var friction = document.getElementById('friction') as HTMLInputElement
    var runwayType = document.getElementById('runwayType') as HTMLInputElement
    var psi = document.getElementById('psi') as HTMLInputElement
    var wind = document.getElementById('wind') as HTMLInputElement
    var aircraftType = document.getElementById('aircraftType') as HTMLInputElement

    var loadout = new Loadout('userID', 'loadoutName', takeoffMass.value, landingMass.value, temp.value, drag.value, slope.value, friction.value, 
    runwayType.value, psi.value, wind.value, aircraftType.value);

    this.restClassifier.calculate(loadout).subscribe(
      res => {
        console.log(res.data.output);
        res.data.output.replace(/\n/g, "<br/>");
        document.getElementById('outputContainer').innerHTML = res.data.output;
      });
  }

  save() {

    var takeoffMass = document.getElementById('tmass') as HTMLInputElement
    var landingMass = document.getElementById('lmass') as HTMLInputElement
    var temp = document.getElementById('temp') as HTMLInputElement
    var drag = document.getElementById('drag') as HTMLInputElement
    var slope = document.getElementById('slope') as HTMLInputElement
    var friction = document.getElementById('friction') as HTMLInputElement
    var runwayType = document.getElementById('runwayType') as HTMLInputElement
    var psi = document.getElementById('psi') as HTMLInputElement
    var wind = document.getElementById('wind') as HTMLInputElement
    var aircraftType = document.getElementById('aircraftType') as HTMLInputElement

    var loadout = new Loadout('userID', 'loadoutName', takeoffMass.value, landingMass.value, temp.value, drag.value, slope.value, friction.value, 
    runwayType.value, psi.value, wind.value, aircraftType.value);

    this.restClassifier.save(loadout).subscribe();
  }
}

