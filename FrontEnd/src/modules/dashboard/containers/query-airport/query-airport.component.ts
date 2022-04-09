import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RunwayConditions } from '@app/models/runway-conditions';
import { AlertService } from '@app/services/alert.service';
import { ApiService } from '@app/services/api.service';
import { Button } from 'protractor';


@Component({
    selector: 'query-airport',
    templateUrl: './query-airport.component.html',
    styleUrls: ['query-airport.component.scss'],
})
export class QueryAirportComponent implements OnInit {

    constructor(private apiService: ApiService, private formBuilder: FormBuilder, private alertService: AlertService) {}

    runway: string;
    runwayNumber: number;
    runwayButtonNumber: number;
    airportID: string;
    form: FormGroup;
    submitted = false;
    runwaysLoading = false;

    // Initialized for injection
    runwayConditions = {
        airportID: '',
        temp: null,
        pressureAltitude: null,
        precipitation: null,
        headWind: null,
        runwayLength: null,
        runwayType: null,
        slope: null,
    };

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

        // Make query button disabled until runways have been queried
        const queryButton = document.getElementById('QueryButton') as HTMLButtonElement;
        queryButton.disabled = true;

        // Event listener that removes errors when id input is clicked on
        const idInput = document.getElementById('airportID') as HTMLInputElement;
        idInput.addEventListener('click', (e) => {
            this.submitted = false;
        })
    }

    // Form controls for ease of access
    get f() { return this.form.controls; }

    // Queries airport info from backend
    queryAirport() {
        const runwayNumbers = document.getElementsByClassName('runway-button');
        const sideNumbers = document.getElementsByClassName('side-button');
        let runwayNumber, runwaySideNumber;

        for(let i = 0; i < runwayNumbers.length; i++) {
            if(runwayNumbers[i].getAttribute('class').includes('btn-dark')) {
                runwayNumber = runwayNumbers[i];
            }
        }

        for(let i = 0; i < sideNumbers.length; i++) {
            if(sideNumbers[i].getAttribute('class').includes('btn-dark')) {
                runwaySideNumber = sideNumbers[i];
            }
        }

        const runwayReplace = runwayNumber.innerHTML.replace('/', '_')

        // Call to backend for runway conditions
        this.apiService
            .get(`airport/runway/${this.airportID}/${runwayReplace}/${runwaySideNumber.innerHTML}`)
            .subscribe(res => {

                if(res.data.runwayError) {
                    this.alertService.error(res.data.runwayError)
                    return;
                }

                this.runwayConditions = res.data.runwayCondition
            },
            error => {
                this.alertService.error('Airport conditions could not be queried.')
              });
    }

    // Find runways from FAA
    findRunways() {

        // Causes runways button to show loading symbol
        this.runwaysLoading = true;

        // Triggers visual errors if form is invalid
        this.submitted = true;

        // If form is invalid, function stops
        if (this.form.invalid) {
            this.runwaysLoading = false;
            return;
        }

        const airportID = document.getElementById('airportID') as HTMLInputElement;
        this.airportID = airportID.value;
        const runwayButtonGroup = document.getElementById('runway-button-group');

        while (runwayButtonGroup.firstChild) {
            runwayButtonGroup.removeChild(runwayButtonGroup.lastChild);
        }

        // Backend call to find runways at airport listed by faa
        this.apiService.get(`airport/runways/${this.f.airportInput.value}`).subscribe(res => {

            if(res.data.runwayError) {
                this.alertService.error(res.data.runwayError)
                return;
            }

            // Adds buttons to group for each runway
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

            this.runwaysLoading = false;
        },
        error => {
            this.alertService.error('Runways could not be found.')
          });
    }

    // Visually changes buttons when clicked
    runwayClick(id: string) {
        const button = document.getElementById(id);
        const buttons = document.getElementsByClassName('runway-button')

        for(let i = 0; i < buttons.length; i++) {
            buttons[i].className = buttons[i].className.replace('active', '');
            buttons[i].className = buttons[i].className.replace('btn-dark', 'btn-outline-dark');
        }

        button.className = button.className.replace('btn-outline-dark', 'btn-dark')
        button.className += ' active'

        const sideButton1 = document.getElementById('RunwaySideButton1') as HTMLButtonElement;
        sideButton1.disabled = false;
        sideButton1.className = sideButton1.className.replace('btn-outline-dark', 'btn-dark');

        const sideButton2 = document.getElementById('RunwaySideButton2') as HTMLButtonElement;
        sideButton2.disabled = false;

        const sides = button.innerHTML.split('/');
        sideButton1.innerHTML=sides[0];
        sideButton2.innerHTML=sides[1];

        const queryButton = document.getElementById('QueryButton') as HTMLButtonElement;
        queryButton.disabled = false;
    }

    // Visually changes runway side buttons when clicked.
    runwaySideClick(id: string) {
        const button = document.getElementById(id);
        const buttons = document.getElementsByClassName('side-button')

        for(let i = 0; i < buttons.length; i++) {
            buttons[i].className = buttons[i].className.replace('active', '');
            buttons[i].className = buttons[i].className.replace('btn-dark', 'btn-outline-dark');
        }

        button.className = button.className.replace('btn-outline-dark', 'btn-dark')
        button.className += ' active'
    }
}
