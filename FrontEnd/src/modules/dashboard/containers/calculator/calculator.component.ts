import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Profile } from '@app/models/profile.model';
import { AccountService } from '@app/services/account.service';
import { ApiService } from '@app/services/api.service';

@Component({
    selector: 'calculator',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './calculator.component.html',
    styleUrls: ['calculator.component.scss'],
})
export class CalculatorComponent implements OnInit {
    constructor(
        private restClassifier: ApiService,
        private accountService: AccountService,
        private formBuilder: FormBuilder
    ) {}
    title = 'FrontEnd';

    form: FormGroup;

    displaySaveStyle = 'none';

    ngOnInit() {
        // this.form = this.formBuilder.group({
        //         username: ['', Validators.required],
        //         password: ['', Validators.required]
        //     });

        const profileBox = document.getElementById('profiles') as HTMLSelectElement;
        const profiles = new Map<string, Profile>();

        this.restClassifier.returnProfiles(localStorage.getItem('username')).subscribe(res => {
            if (res.data.profiles !== undefined) {
                res.data.profiles.forEach(element => {
                    profiles.set(element.profileName, element);
                    profileBox.add(new Option(element.profileName, element.profileName), undefined);
                });
            }
        });

        profileBox.addEventListener('change', e => {
            let takeoffMass = document.getElementById('tmass') as HTMLInputElement;
            let landingMass = document.getElementById('lmass') as HTMLInputElement;
            let temp = document.getElementById('temp') as HTMLInputElement;
            let drag = document.getElementById('drag') as HTMLInputElement;
            let slope = document.getElementById('slope') as HTMLInputElement;
            let friction = document.getElementById('friction') as HTMLInputElement;
            let runwayType = document.getElementById('runwayType') as HTMLInputElement;
            let psi = document.getElementById('psi') as HTMLInputElement;
            let wind = document.getElementById('wind') as HTMLInputElement;
            let aircraftType = document.getElementById('aircraftType') as HTMLInputElement;

            if (profileBox.value !== 'None') {
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
            } else {
                takeoffMass.value = '';
                landingMass.value = '';
                temp.value = '';
                drag.value = '';
                slope.value = '';
                friction.value = '';
                runwayType.value = '';
                psi.value = '';
                wind.value = '';
                aircraftType.value = '';
            }
        });
    }

    submit() {
        let takeoffMass = document.getElementById('tmass') as HTMLInputElement;
        let landingMass = document.getElementById('lmass') as HTMLInputElement;
        let temp = document.getElementById('temp') as HTMLInputElement;
        let drag = document.getElementById('drag') as HTMLInputElement;
        let slope = document.getElementById('slope') as HTMLInputElement;
        let friction = document.getElementById('friction') as HTMLInputElement;
        let runwayType = document.getElementById('runwayType') as HTMLInputElement;
        let psi = document.getElementById('psi') as HTMLInputElement;
        let wind = document.getElementById('wind') as HTMLInputElement;
        let aircraftType = document.getElementById('aircraftType') as HTMLInputElement;

        let profile = new Profile(
            'userID',
            'ProfileName',
            takeoffMass.value,
            landingMass.value,
            temp.value,
            drag.value,
            slope.value,
            friction.value,
            runwayType.value,
            psi.value,
            wind.value,
            aircraftType.value
        );

        this.restClassifier.calculate(profile).subscribe(res => {
            console.log(res.data.output);
            res.data.output.replace(/\n/g, '<br/>');
            document.getElementById('outputContainer').innerHTML = res.data.output;
        });
    }

    save() {
        let takeoffMass = document.getElementById('tmass') as HTMLInputElement;
        let landingMass = document.getElementById('lmass') as HTMLInputElement;
        let temp = document.getElementById('temp') as HTMLInputElement;
        let drag = document.getElementById('drag') as HTMLInputElement;
        let slope = document.getElementById('slope') as HTMLInputElement;
        let friction = document.getElementById('friction') as HTMLInputElement;
        let runwayType = document.getElementById('runwayType') as HTMLInputElement;
        let psi = document.getElementById('psi') as HTMLInputElement;
        let wind = document.getElementById('wind') as HTMLInputElement;
        let aircraftType = document.getElementById('aircraftType') as HTMLInputElement;
        let profileName = document.getElementById('profileName') as HTMLInputElement;

        let profile = new Profile(
            sessionStorage.getItem('username'),
            profileName.value,
            takeoffMass.value,
            landingMass.value,
            temp.value,
            drag.value,
            slope.value,
            friction.value,
            runwayType.value,
            psi.value,
            wind.value,
            aircraftType.value
        );

        this.restClassifier.saveProfile(profile).subscribe();
    }

    openSaveModal() {
        this.displaySaveStyle = 'block';
    }

    closeSaveModal(save: boolean) {
        this.displaySaveStyle = 'none';

        if (save) {
            this.save();
        }
    }

    queryAirport() {
        let airportID = document.getElementById('airportID') as HTMLInputElement;
        let runwayNumber = document.getElementById('runwayNumber') as HTMLInputElement;

        this.restClassifier
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

        this.restClassifier.get(`airport/runways/${airportID.value}`).subscribe(res => {
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

    logout() {
        this.accountService.logout();
    }
}