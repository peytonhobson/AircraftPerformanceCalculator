import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Input } from '../model/input.model';

/**
 * Service for response model
 */
@Injectable()
export class ClassifierService {

   constructor(private apiService: ApiService) { }

   classify(takeoffMass: string, landingMass: string, temp: string, drag: string, slope: string, friction: string, runwayType: string, 
    psi: string, wind: string, aircraftType: string): Observable<Input> {

        return this.apiService.post('inputData', { "takeoffMass": takeoffMass, "landingMass": landingMass, "temp" : temp, "drag": drag, "slope": slope, 
        "friction": friction, "runwayType": runwayType, "psi": psi, "wind": wind, "aircraftType": aircraftType, "output": ""});

    }
}