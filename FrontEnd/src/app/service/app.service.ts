import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { CustomResponse, CalculatorResponse } from '../model/response';
import { Loadout } from '../model/loadout.model'

/**
 * Service for response model
 */
@Injectable()
export class AppService {

   constructor(private apiService: ApiService) { }

    calculate(loadout: Loadout): Observable<CalculatorResponse> {
        return this.apiService.calculatePost('calculator', loadout);
    }

    returnLoadouts(): Observable<CustomResponse> {
        return this.apiService.get('all');
    }

    save(loadout : Loadout): Observable<CustomResponse> {
            return this.apiService.post('save', loadout);
    }
}