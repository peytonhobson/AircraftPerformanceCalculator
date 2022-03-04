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

    ngOnInit() {
        this.runwayButtonNumber = 0;
    }

    queryAirport() {

        document.getElementById('AirportOutputContainer').innerHTML = ' ';
        let airportID = document.getElementById('airportID') as HTMLInputElement;
        let runwayNumber = document.getElementById('RunwaySelect') as HTMLInputElement;
        let runwaySideNumber = document.getElementById('RunwaySideSelect') as HTMLInputElement;

        const runwayReplace = runwayNumber.value.replace("/", "_")
        this.apiService
            .get(`airport/runway/${airportID.value}/${runwayReplace}/${runwaySideNumber.value}`)
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
        const runwayButtongroup = document.getElementById('runway-button-group');

        // this.apiService.get(`airport/runways/${airportID.value}`).subscribe(res => {
        //     res.data.airportRunways.forEach(x => {
        //         const newButton = document.createElement('button');
        //         newButton.setAttribute('class','btn btn-outline-dark');
        //         newButton.setAttribute('(click)', 'runwayClick(runwayButton' + this.runwayButtonNumber + ')')
        //         newButton.setAttribute('id', 'runwayButton' + this.runwayButtonNumber)
        //         newButton.innerHTML = x.replace('_', '/'), x.replace('_', '/');
        //         this.runwayButtonNumber++;
        //         runwayButtongroup.appendChild(newButton);
        //     });
        // });

        const newButton = document.createElement('button');
        newButton.setAttribute('class','btn btn-outline-dark runway-button');
        newButton.setAttribute('id', 'runwayButton' + this.runwayButtonNumber)
        newButton.addEventListener('click', (e) => {
            this.runwayClick(newButton.getAttribute('id'))
        });
        newButton.innerHTML = "asdfasd";
        this.runwayButtonNumber++;
        runwayButtongroup.appendChild(newButton);

        const newButton1 = document.createElement('button');
        newButton1.setAttribute('class','btn btn-outline-dark runway-button');
        newButton1.setAttribute('id', 'runwayButton' + this.runwayButtonNumber)
        newButton1.addEventListener('click', (e) => {
            this.runwayClick(newButton1.getAttribute('id'))
        });
        newButton1.innerHTML = "asdfasd";
        this.runwayButtonNumber++;
        runwayButtongroup.appendChild(newButton1);
    }



    runwayClick(id: string) {
        console.log(id)
        const button = document.getElementById(id);
        const buttons = document.getElementsByClassName('runway-button')

        for(var i = 0; i < buttons.length; i++) {
            buttons[i].className = buttons[i].className.replace("active", "");
            buttons[i].className = buttons[i].className.replace("btn-dark", "btn-outline-dark");
        }

        button.className = button.className.replace("btn-outline-dark", "btn-dark")
        button.className += "active"
    }
}
