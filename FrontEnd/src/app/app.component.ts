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

  ngOnInit() {
    
  }

  /**
   * Classifier service used for calling classify method
   * upon start button click
   */
  constructor(private restClassifier: ClassifierService) {}

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

    this.restClassifier.classify(takeoffMass.value, landingMass.value, temp.value, drag.value, slope.value, friction.value, 
      runwayType.value, psi.value, wind.value, aircraftType.value).subscribe(
      res => {
        var out = res.output.replace(/\n/g, "<br/>");
        document.getElementById('outputContainer').innerHTML = res.output;
      });
  }
}
