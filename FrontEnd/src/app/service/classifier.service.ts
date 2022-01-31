import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Loadout } from '../model/loadout.model';

/**
 * Service for response model
 */
@Injectable()
export class ClassifierService {

   constructor(private apiService: ApiService) { }

    calculate(takeoffMass: string, landingMass: string, temp: string, drag: string, slope: string, friction: string, runwayType: string, 
    psi: string, wind: string, aircraftType: string): Observable<Loadout> {

        return this.apiService.post('calculator', { "takeoffMass": takeoffMass, "landingMass": landingMass, "temp" : temp, "drag": drag, "slope": slope, 
        "friction": friction, "runwayType": runwayType, "psi": psi, "wind": wind, "aircraftType": aircraftType, "output": ""});

    }

    returnLoadouts(): Observable<Loadout> {
        return this.apiService.get('loadouts', '');
    }
}