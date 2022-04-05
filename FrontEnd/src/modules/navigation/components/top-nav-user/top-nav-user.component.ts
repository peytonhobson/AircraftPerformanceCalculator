import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { User } from '@app/models/user';
import { AccountService } from '@app/services/account.service';
import { ApiService } from '@app/services/api.service';

@Component({
    selector: 'sb-top-nav-user',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './top-nav-user.component.html',
    styleUrls: ['top-nav-user.component.scss'],
})
export class TopNavUserComponent implements OnInit {
    constructor(private accountService: AccountService, private apiService: ApiService) {}

    displayAdmin = 'none';
    user: string;

    ngOnInit() {
        this.apiService.get(`users/${localStorage.getItem('username')}`).subscribe(
            res => {
            if(res.data.user.role === 'ROLE_ADMIN') {
                this.displayAdmin = 'block';
            }
        },
        error => {
            console.log('User is not Admin')
        });

        this.user = localStorage.getItem('username')
    }

    logout() {
        this.accountService.logout();
    }
}
