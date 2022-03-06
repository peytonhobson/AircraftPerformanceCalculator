import { Component, OnInit } from "@angular/core";
import { ApiService } from "@app/services/api.service";
import { Button } from "protractor";


@Component({
    selector: 'query-airport',
    templateUrl: './query-airport.component.html',
    styleUrls: ['query-airport.component.scss'],
})
export class QueryAirportComponent implements OnInit {
    
    constructor(private apiService: ApiService) {}
    runway: string;
    runwayNumber: number;
    runwayButtonNumber: number;
    airportID: string;

    ngOnInit() {
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
    }

    queryAirport() {

        document.getElementById('AirportOutputContainer').innerHTML = ' ';
        let runwayNumbers = document.getElementsByClassName('runway-button');
        let sideNumbers = document.getElementsByClassName('side-button');
        var runwayNumber, runwaySideNumber;

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
        console.log(`airport/runway/${this.airportID}/${runwayReplace}/${runwaySideNumber.innerHTML}`)
        this.apiService
            .get(`airport/runway/${this.airportID}/${runwayReplace}/${runwaySideNumber.innerHTML}`)
            .subscribe(res => {
                console.log(res.data.airportWeather);
                res.data.airportWeather.replace(/\n/g, '<br/>');
                document.getElementById('AirportOutputContainer').innerHTML = JSON.stringify(
                    res.data.airportWeather
                );
            });
    }

    findRunways() {
        document.getElementById('AirportOutputContainer').innerHTML = ' ';
        const airportID = document.getElementById('airportID') as HTMLInputElement;
        this.airportID = airportID.value;
        const runwayButtonGroup = document.getElementById('runway-button-group');

        while (runwayButtonGroup.firstChild) {
            runwayButtonGroup.removeChild(runwayButtonGroup.lastChild);
          }

        this.apiService.get(`airport/runways/${airportID.value}`).subscribe(res => {
            res.data.airportRunways.forEach(x => {
                const newButton = document.createElement('button');
                newButton.setAttribute('class','btn btn-outline-dark runway-button');
                newButton.setAttribute('id', 'runwayButton' + this.runwayButtonNumber)
                newButton.addEventListener('click', (e) => {
                    this.runwayClick(newButton.getAttribute('id'))
                });
                newButton.innerHTML = x.replace('_', '/'), x.replace('_', '/');
                this.runwayButtonNumber++;
                runwayButtonGroup.appendChild(newButton);
            });
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
