import { Component, OnInit} from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AccountService } from '../services/account.service';
import { Profile } from 'src/app/models/profile.model';
import { User } from '../models/user';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  title = 'FrontEnd';


  constructor(private restClassifier : ApiService, private accountService: AccountService) {}

  ngOnInit() {

    var profileBox = document.getElementById('profiles') as HTMLSelectElement

    var profiles  = new Map<string, Profile>();

    this.restClassifier.returnProfiles(localStorage.getItem('username')).subscribe(
      res => {
        if(res.data.profiles !== undefined) {
          res.data.profiles.forEach(element => {
            profiles.set(element.profileName,element)
            profileBox.add(new Option(element.profileName,element.profileName), undefined)
          });
        }
        // else if(res.data.Profile !== undefined){
        //   console.log(res.data.Profile[0]);
        //   for(var i = 0; i < res.data.Profile.length; i++)
        //     Profiles.set(element.ProfileName,element)
        //     ProfileBox.add(new Option(element.ProfileName,element.ProfileName), undefined)
        //   });
        // }
      });

      profileBox.addEventListener('change', e => {
        
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

        if(profileBox.value !== 'None') {
          takeoffMass.value = profiles.get(profileBox.value).takeoffMass;
          landingMass.value = profiles.get(profileBox.value).landingMass;
          temp.value = profiles.get(profileBox.value).temp;
          drag.value = profiles.get(profileBox.value).drag;
          slope.value = profiles.get(profileBox.value).slope;
          friction.value = profiles.get(profileBox.value).friction;
          runwayType.value = profiles.get(profileBox.value).runwayType;
          psi.value = profiles.get(profileBox.value).psi;
          wind.value = profiles.get(profileBox.value).wind;
          aircraftType.value = profiles.get(profileBox.value).aircraftType;
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

    var Profile = new Profile('userID', 'ProfileName', takeoffMass.value, landingMass.value, temp.value, drag.value, slope.value, friction.value, 
    runwayType.value, psi.value, wind.value, aircraftType.value);

    this.restClassifier.calculate(Profile).subscribe(
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
    var profileName = document.getElementById('profileName') as HTMLInputElement

    var profile = new Profile(sessionStorage.getItem('username'), profileName.value, takeoffMass.value, landingMass.value, temp.value, drag.value, slope.value, friction.value, 
    runwayType.value, psi.value, wind.value, aircraftType.value);

    this.restClassifier.saveProfile(profile).subscribe();
  }

  displaySaveStyle = "none";
  
  openSaveModal() {
    this.displaySaveStyle = "block";
  }

  closeSaveModal(save: boolean) {
    this.displaySaveStyle = "none";

    if(save) {
      this.save();
    }
  }

  queryWeather() {
    var airportID = document.getElementById('airportID') as HTMLInputElement;
    this.restClassifier.getWeather(`weather/${airportID.value}`, airportID.value).subscribe(
      res => {
        console.log(res.data.airportWeather);
        // res.data.airportWeather.replace(/\n/g, "<br/>");
        document.getElementById('weatherOutputContainer').innerHTML = JSON.stringify(res.data.airportWeather);
      });
  }

  logout() {
    this.accountService.logout();
  }
}

