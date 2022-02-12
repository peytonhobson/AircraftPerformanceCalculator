import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService } from 'src/app/services/account.service';
import { AlertService } from '../services/alert.service';
import { User } from '../models/user';
import { AuthenticationCode } from '../models/authentication.code.model';

@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
    form: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]],
            authenticationCode: ['', Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();


        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }


        var user = new User(this.form.get('username').value, this.form.get('password').value);
        var authenticationCode = new AuthenticationCode(this.form.get('authenticationCode').value);

        var authenticated;

        this.loading = true;
        authenticated = this.accountService.register(user, authenticationCode)

        if(authenticated) {
            this.alertService.success('Registration successful', { keepAfterRouteChange: true });
            this.router.navigate(['../login'], { relativeTo: this.route });
        }
        else {
            this.alertService.error(authenticated);
            this.loading = false;
        }
    }
}