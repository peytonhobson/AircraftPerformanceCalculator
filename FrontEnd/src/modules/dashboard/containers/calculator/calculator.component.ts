import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Profile } from '@app/models/profile.model';
import { AccountService } from '@app/services/account.service';
import { ApiService } from '@app/services/api.service';

@Component({
    selector: 'calculator',
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
    formManualModal: FormGroup;

    displaySaveStyleAutomatic = 'none';
    displaySaveStyleManual = 'none';

    submittedManualModal = false;

    ngOnInit() {

        this.form = this.formBuilder.group({
            airportInput: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(4)]]
        });

        this.formManualModal = this.formBuilder.group({
            temperature: ['', [Validators.required, Validators.maxLength(3), Validators.pattern(/^[0-9]/)]],
            //TODO: add pattern to check for only "double" type numbers
            slope: [''],
            psi: ['', [Validators.required, Validators.maxLength(5), Validators.pattern(/^[0-9]/)]],
            headwind: ['', [Validators.required, Validators.maxLength(3), Validators.pattern(/^[0-9]/)]],
            concreteRunway: [''],
            grassRunway: [''],
            precipitationYes: [''],
            precipitationNo: ['']
        });

        this.restClassifier.get(`profiles/${localStorage.getItem('username')}/all`).subscribe(res => {
            
        });

    }

    submit() {


        

        // this.restClassifier.calculate(profile).subscribe(res => {
        //     console.log(res.data.output);
        //     res.data.output.replace(/\n/g, '<br/>');
        //     document.getElementById('outputContainer').innerHTML = res.data.output;
        // });
    }

    saveManualModal() {
        this.submittedManualModal = true;

        if(!this.fManual['temperature'].errors) {
            this.displaySaveStyleManual = 'none';
            document.getElementById('main-container').style.opacity = '100%';

            for(var name in this.formManualModal.controls) {
                (<FormControl>this.formManualModal.controls[name]).setValue('');
                this.formManualModal.controls[name].setErrors(null);
            }

            this.submittedManualModal=false;
        }
    }

    saveAutomaticModal() {
        

    
    }

    get fManual() { return this.formManualModal.controls; }

    openAutomaticModal() {
        this.displaySaveStyleAutomatic = 'block';
        document.getElementById('main-container').style.opacity = '40%';
    }

    closeAutomaticModal(save: boolean) {
        this.displaySaveStyleAutomatic = 'none';
        document.getElementById('main-container').style.opacity = '100%';

        // if (save) {
        //     this.save();
        // }
    }

    openManualModal() {
        this.displaySaveStyleManual = 'block';
        document.getElementById('main-container').style.opacity = '40%';
    }

    closeManualModal(save: boolean) {

        if (save) {
            this.saveManualModal();
        }
        else {
            this.displaySaveStyleManual = 'none';
            document.getElementById('main-container').style.opacity = '100%';

            for(var name in this.formManualModal.controls) {
                (<FormControl>this.formManualModal.controls[name]).setValue('');
                this.formManualModal.controls[name].setErrors(null);
            }

            this.submittedManualModal=false;
        }
    }

    logout() {
        this.accountService.logout();
    }
}
