import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Profile } from '@app/models/profile.model';
import { AccountService } from '@app/services/account.service';
import { ApiService } from '@app/services/api.service';

@Component({
    selector: 'solver',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './solver.component.html',
    styleUrls: ['solver.component.scss'],
})
export class SolverComponent implements OnInit {
    constructor() {}
    title = 'FrontEnd';


    ngOnInit() {
    }
}