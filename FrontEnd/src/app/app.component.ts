import { Component, OnInit} from '@angular/core';
import { ClassifierService } from './service/classifier.service';
import { templateSourceUrl } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'FrontEnd';


  /**
   * Classifier service used for calling classify method
   * upon start button click
   */
  constructor(private restClassifier: ClassifierService) {}

  ngOnInit() {
    this.restClassifier.returnLoadouts().subscribe(
      res => {
        var loadoutBox = document.getElementById('loadouts') as HTMLSelectElement
        console.log(res.data.loadout);
        if(res.data.loadouts !== undefined) {
          res.data.loadouts.forEach(element => {
            loadoutBox.add(new Option(element.loadoutName), undefined)
          });
        }
        else {
          loadoutBox.add(new Option(res.data.loadout[0].loadoutName,res.data.loadout.loadoutName), undefined)
        }
      });
  }

  /**
   * Activated upon clicking one of the datset buttons.
   * Sets current button to active and removes active from
   * all other buttons. Also changes file to be embedded in
   * the file preview box.
   * @param id 
   */
   submit() {

    var takeoffMass = document.getElementById('tmass') as HTMLInputElement
    var landingMass = document.getElementById('lmass') as HTMLInputElement
    var temp = document.getElementById('temp') as HTMLInputElement
    var drag = document.getElementById('drag') as HTMLInputElement
    var slope = document.getElementById('slope') as HTMLInputElement
    var friction = document.getElementById('friction') as HTMLInputElement
    var runwayType = document.getElementById('runwayType') as HTMLInputElement
    var psi = document.getElementById('psi') as HTMLInputElement
    var wind= document.getElementById('wind') as HTMLInputElement
    var aircraftType = document.getElementById('aircraftType') as HTMLInputElement

    this.restClassifier.calculate(takeoffMass.value, landingMass.value, temp.value, drag.value, slope.value, friction.value, 
      runwayType.value, psi.value, wind.value, aircraftType.value).subscribe(
      res => {
        res.data.loadout?.output.replace(/\n/g, "<br/>");
        document.getElementById('outputContainer').innerHTML = res.data.loadout?.output;
      });
  }


}
