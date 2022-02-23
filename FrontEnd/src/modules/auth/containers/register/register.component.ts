import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AccountService } from '@app/services/account.service';
import { AlertService } from '@app/services/alert.service';
import { User } from '@app/models/user';
import { AuthenticationCode } from '@app/models/authentication.code.model';
import { AuthenticationService } from '@app/services/auth.service';

@Component({
    selector: 'register',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './register.component.html',
    styleUrls: ['register.component.scss'],
})
export class RegisterComponent implements OnInit {
    form: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService,
        private authService: AuthenticationService
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
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

        if(this.f['password'].value !== this.f['confirmPassword'].value) {
            this.alertService.error("Passwords do not match.")
            return;
        }

        var user = new User(this.form.get('username').value, this.form.get('password').value);
        var authenticationCode = new AuthenticationCode(this.form.get('authenticationCode').value);

        var authenticated;

        this.loading = true;
        this.authService.authenticate(authenticationCode, user).subscribe(
            res => {
                if(res.status !== '200') {
                    console.log("here");
                    this.alertService.error(res.message);
                    this.loading = false;
                }
                else {
                    this.alertService.success('Registration successful', { keepAfterRouteChange: true });
                    this.router.navigate(['../login'], { relativeTo: this.route });
                }
            }
        )
    }
}
