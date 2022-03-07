import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RunwayConditions } from "@app/models/runway-conditions";
import { ApiService } from "@app/services/api.service";
import { Button } from "protractor";


@Component({
    selector: 'query-airport',
    templateUrl: './query-airport.component.html',
    styleUrls: ['query-airport.component.scss'],
})
export class QueryAirportComponent implements OnInit {
    
    constructor(private apiService: ApiService, private formBuilder: FormBuilder,) {}

    runway: string;
    runwayNumber: number;
    runwayButtonNumber: number;
    airportID: string;
    form: FormGroup;
    submitted = false;

    ngOnInit() {

        this.form = this.formBuilder.group({
            airportInput: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(4)]]
        });

        this.runwayButtonNumber = 0;
        const sideButton1 = document.getElementById('RunwaySideButton1') as HTMLButtonElement;
        sideButton1.addEventListener('click', (e) => {
            this.runwaySideClick(sideButton1.getAttribute('id'));
        })
        sideButton1.disabled = true;

        const sideButton2 = document.getElementById('RunwaySideButton2') as HTMLButtonElement;
        sideButton2.addEventListener('click', (e) => {
            this.runwaySideClick(sideButton2.getAttribute('id'));
        })
        sideButton2.disabled = true;

        const queryButton = document.getElementById('QueryButton') as HTMLButtonElement;
        queryButton.disabled = true;

        const idInput = document.getElementById('airportID') as HTMLInputElement;
        idInput.addEventListener('change', (e) => {
            this.submitted = false;
        })
    }

    queryAirport() {
        let runwayNumbers = document.getElementsByClassName('runway-button');
        let sideNumbers = document.getElementsByClassName('side-button');
        var runwayNumber, runwaySideNumber;

        document.getElementById('AirportIDLabel').innerHTML = "Airport ID: "

        for(var i = 0; i < runwayNumbers.length; i++) {
            if(runwayNumbers[i].getAttribute('class').includes('btn-dark')) {
                runwayNumber = runwayNumbers[i];
            }
        }

        for(var i = 0; i < sideNumbers.length; i++) {
            if(sideNumbers[i].getAttribute('class').includes('btn-dark')) {
                runwaySideNumber = sideNumbers[i];
            }
        }

        const runwayReplace = runwayNumber.innerHTML.replace("/", "_")
        this.apiService
            .get(`airport/runway/${this.airportID}/${runwayReplace}/${runwaySideNumber.innerHTML}`)
            .subscribe(res => {
                let runwayConditions = res.data.runwayCondition

                document.getElementById('AirportIDLabel').innerHTML += runwayConditions.airportID.toUpperCase();
                document.getElementById('temp-output').innerHTML = (Math.round(runwayConditions.temp * 100) / 100).toFixed(1).toString() + " &degC";
                document.getElementById('pressure-altitude-output').innerHTML = (Math.round(runwayConditions.pressureAltitude * 100) / 100).toFixed(3).toString() + " m"
                document.getElementById('precipitation-output').innerHTML = (Math.round(runwayConditions.precipitation * 100) / 100).toFixed(3).toString() + " inches"
                document.getElementById('headwind-output').innerHTML = (Math.round(runwayConditions.headWind * 100) / 100).toFixed(3).toString() + " m/s"
                document.getElementById('runway-length-output').innerHTML = (Math.round(runwayConditions.runwayLength * 100) / 100).toFixed(1).toString() + " ft"

                if(runwayConditions.runwayType.toUpperCase() === "CONC" || runwayConditions.runwayType.toUpperCase() === "ASPH") {
                    document.getElementById('runway-type-output').innerHTML = "Concrete"
                }
                else if(runwayConditions.runwayType.toUpperCase() === "BRICK") {
                    document.getElementById('runway-type-output').innerHTML = "Brick"
                }
                else if(runwayConditions.runwayType.toUpperCase() === "WOOD") {
                    document.getElementById('runway-type-output').innerHTML = "Wood"
                }
                else {
                    document.getElementById('runway-type-output').innerHTML = "Grass"
                }
            
                document.getElementById('slope-output').innerHTML = (Math.round(runwayConditions.slope * 100) / 100).toFixed(3).toString() + "&deg"
            });
    }

    get f() { return this.form.controls; }

    findRunways() {

        this.submitted = true;

        if (this.form.invalid) {
            return;
        }

        const airportID = document.getElementById('airportID') as HTMLInputElement;
        this.airportID = airportID.value;
        const runwayButtonGroup = document.getElementById('runway-button-group');

        while (runwayButtonGroup.firstChild) {
            runwayButtonGroup.removeChild(runwayButtonGroup.lastChild);
        }

        this.apiService.get(`airport/runways/${this.f['airportInput'].value}`).subscribe(res => {

            if(res.data.airportRunways) {
                res.data.airportRunways.forEach(x => {
                    const newButton = document.createElement('button');
                    newButton.setAttribute('class','btn-sm btn-outline-dark runway-button');
                    newButton.setAttribute('id', 'runwayButton' + this.runwayButtonNumber)
                    newButton.addEventListener('click', (e) => {
                        this.runwayClick(newButton.getAttribute('id'))
                    });
                    newButton.innerHTML = x.replace('_', '/'), x.replace('_', '/');
                    this.runwayButtonNumber++;
                    runwayButtonGroup.appendChild(newButton);
                });
            }
        });
    }

    runwayClick(id: string) {
        const button = document.getElementById(id);
        const buttons = document.getElementsByClassName('runway-button')

        for(var i = 0; i < buttons.length; i++) {
            buttons[i].className = buttons[i].className.replace('active', '');
            buttons[i].className = buttons[i].className.replace('btn-dark', 'btn-outline-dark');
        }

        button.className = button.className.replace('btn-outline-dark', 'btn-dark')
        button.className += ' active'

        const sideButton1 = document.getElementById('RunwaySideButton1') as HTMLButtonElement;
        sideButton1.disabled = false;

        const sideButton2 = document.getElementById('RunwaySideButton2') as HTMLButtonElement;
        sideButton2.disabled = false;

        const sides = button.innerHTML.split("/");
        sideButton1.innerHTML=sides[0];
        sideButton2.innerHTML=sides[1];
    }

    runwaySideClick(id: string) {
        const button = document.getElementById(id);
        const buttons = document.getElementsByClassName('side-button')

        for(var i = 0; i < buttons.length; i++) {
            buttons[i].className = buttons[i].className.replace('active', '');
            buttons[i].className = buttons[i].className.replace('btn-dark', 'btn-outline-dark');
        }

        button.className = button.className.replace('btn-outline-dark', 'btn-dark')
        button.className += ' active'

        const queryButton = document.getElementById('QueryButton') as HTMLButtonElement;
        queryButton.disabled = false;
    }
}
