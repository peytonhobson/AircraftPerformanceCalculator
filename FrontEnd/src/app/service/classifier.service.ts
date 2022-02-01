import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { CustomResponse } from '../model/response';

/**
 * Service for response model
 */
@Injectable()
export class ClassifierService {

   constructor(private apiService: ApiService) { }

    calculate(takeoffMass: string, landingMass: string, temp: string, drag: string, slope: string, friction: string, runwayType: string, 
    psi: string, wind: string, aircraftType: string): Observable<CustomResponse> {

        return this.apiService.post('calculator', { "takeoffMass": takeoffMass, "landingMass": landingMass, "temp" : temp, "drag": drag, "slope": slope, 
        "friction": friction, "runwayType": runwayType, "psi": psi, "wind": wind, "aircraftType": aircraftType, "output": ""});

    }

    returnLoadouts(): Observable<CustomResponse> {
        console.log(this.apiService.get('loadouts'));
        return this.apiService.get('loadouts');
    }
}