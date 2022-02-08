import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { CustomResponse, CalculatorResponse } from '../models/response';
import { Loadout } from '../models/loadout.model'

/**
 * Service for response model
 */
@Injectable()
export class AppService {

   constructor(private apiService: ApiService) { }

    calculate(loadout: Loadout): Observable<CalculatorResponse> {
        return this.apiService.calculatePost('profiles/calculator', loadout);
    }

    returnLoadouts(): Observable<CustomResponse> {
        return this.apiService.get('profiles/all');
    }

    save(loadout : Loadout): Observable<CustomResponse> {
            return this.apiService.post('profiles/save', loadout);
    }
}