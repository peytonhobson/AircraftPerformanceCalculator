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
