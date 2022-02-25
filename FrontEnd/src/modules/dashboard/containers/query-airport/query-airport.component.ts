import { Component, OnInit } from "@angular/core";
import { ApiService } from "@app/services/api.service";


@Component({
    selector: 'query-airport',
    templateUrl: './query-airport.component.html',
    styleUrls: ['query-airport.component.scss'],
})
export class QueryAirportComponent implements OnInit {
    
    constructor(private apiService: ApiService) {}

    ngOnInit() {

    }

    queryAirport() {
        let airportID = document.getElementById('airportID') as HTMLInputElement;
        let runwayNumber = document.getElementById('runwayNumber') as HTMLInputElement;

        this.apiService
            .get(`airport/runway/${airportID.value}/${runwayNumber.value}`)
            .subscribe(res => {
                console.log(res.data.airportWeather);
                res.data.airportWeather.replace(/\n/g, '<br/>');
                document.getElementById('weatherOutputContainer').innerHTML = JSON.stringify(
                    res.data.airportWeather
                );
            });
    }

    findRunways() {
        let airportID = document.getElementById('airportID') as HTMLInputElement;
        let runwaySelect = document.getElementById('RunwaySelect') as HTMLSelectElement;
        let runwaySideSelect = document.getElementById('RunwaySideSelect') as HTMLSelectElement;

        this.apiService.get(`airport/runways/${airportID.value}`).subscribe(res => {
            runwaySelect.options.length = 1;
            runwaySideSelect.options.length = 1;
            res.data.airportRunways.forEach(x => {
                runwaySelect.add(new Option(x.replace('_', '/'), x.replace('_', '/')), undefined);
                let runwaySide = x.split('_');
                runwaySide.forEach(y => {
                    runwaySideSelect.add(new Option(y, y), undefined);
                });
            });
        });
    }
}
