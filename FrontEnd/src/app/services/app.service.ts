import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { CustomResponse, CalculatorResponse } from '../models/response';
import { Profile } from '../models/profile.model'

/**
 * Service for response model
 */
@Injectable()
export class AppService {

   constructor(private apiService: ApiService) { }

    calculate(Profile: Profile): Observable<CalculatorResponse> {
        return this.apiService.calculatePost('profiles/calculator', Profile);
    }

    returnProfiles(): Observable<CustomResponse> {
        return this.apiService.get('profiles/all');
    }

    save(Profile : Profile): Observable<CustomResponse> {
            return this.apiService.post('profiles/save', Profile);
    }
}