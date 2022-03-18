import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '@app/services/account.service';
import { AlertService } from '@app/services/alert.service';
import { ApiService } from '@app/services/api.service';

@Component({
    selector: 'solver',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './solver.component.html',
    styleUrls: ['solver.component.scss'],
})
export class SolverComponent implements OnInit {
    constructor(
        private restClassifier: ApiService,
        private accountService: AccountService,
        private formBuilder: FormBuilder,
        private alertService: AlertService
    ) {}

    form: FormGroup;
    formManualModal: FormGroup;
    formAutomaticModal: FormGroup;


    ngOnInit() {

        this.form = this.formBuilder.group({
            airportInput: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(4)]]
        });


        // TODO: More validators needed
        this.formManualModal = this.formBuilder.group({
            temperature: ['', [Validators.required, Validators.maxLength(3), Validators.pattern(/^[0-9]/)]],
            //TODO: add pattern to check for only "double" type numbers
            slope: [''],
            pressureAltitude: ['', [Validators.required, Validators.maxLength(5), Validators.pattern(/^[0-9]/)]],
            headwind: ['', [Validators.required, Validators.maxLength(3), Validators.pattern(/^[0-9]/)]],
            concreteRunway: [''],
            grassRunway: [''],
            precipitationYes: [''],
            precipitationNo: [''],
            runwayLength: ['', [Validators.required, Validators.maxLength(3), Validators.pattern(/^[0-9]/)]]
        });

        this.formAutomaticModal = this.formBuilder.group({
            airportInput: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(4)]]
        });

    }
}