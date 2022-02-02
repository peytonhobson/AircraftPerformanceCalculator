import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { CustomResponse, CalculatorResponse } from '../model/response';
import { Loadout } from '../model/loadout.model'

/**
 * Service for response model
 */
@Injectable()
export class ClassifierService {

   constructor(private apiService: ApiService) { }

    calculate(loadout: Loadout): Observable<CalculatorResponse> {
        return this.apiService.calculatePost('calculator', loadout);
    }

    returnLoadouts(): Observable<CustomResponse> {
        console.log(this.apiService.get('loadouts'));
        return this.apiService.get('loadouts');
    }

    save(loadout : Loadout): Observable<CustomResponse> {
            return this.apiService.post('save', loadout);
    }
}