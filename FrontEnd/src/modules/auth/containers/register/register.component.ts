import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AccountService } from '@app/services/account.service';
import { AlertService } from '@services/alert.service';
import { User } from '@app/models/user';
import { AuthenticationCode } from '@app/models/authentication.code.model';
import { AuthenticationService } from '@app/services/auth.service';
import { first, map } from 'rxjs/operators';
import { AlertComponent } from '@app/alerts/alert.component';
import { NONE_TYPE } from '@angular/compiler';

@Component({
    selector: 'register',
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
        private alertService: AlertService,
        private authService: AuthenticationService,
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(8)]],
            confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
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

        // If passwords don't match throw alert
        if(this.f['password'].value !== this.f['confirmPassword'].value) {
            this.alertService.error("Passwords do not match.")
            return;
        }

        var user = new User(this.form.get('username').value, this.form.get('password').value, "ROLE_USER");
        var authenticationCode = new AuthenticationCode(this.form.get('authenticationCode').value);

        this.loading = true;
        this.authService.authenticate(authenticationCode, user).pipe(first())
        .subscribe(
            data => {
                try {
                    if(data.data.authentication !== undefined) {
                        this.alertService.success('Registration successful', { keepAfterRouteChange: true });
                        this.router.navigate(['../login'], { relativeTo: this.route });
                    }
                }
                catch {
                    console.log("Not Authenticated")
                }
                finally {
                    this.loading = false;
                    for(var name in this.form.controls) {
                        (<FormControl>this.form.controls[name]).setValue('');
                        this.form.controls[name].setErrors(null);
                    }
                }
            },
            error => {
                this.loading = false;
            });
        
    }
}
