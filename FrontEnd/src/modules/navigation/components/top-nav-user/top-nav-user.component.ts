import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { User } from '@app/models/user';
import { AccountService } from '@app/services/account.service';
import { ApiService } from '@app/services/api.service';
import { UserService } from '@modules/auth/services';

@Component({
    selector: 'sb-top-nav-user',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './top-nav-user.component.html',
    styleUrls: ['top-nav-user.component.scss'],
})
export class TopNavUserComponent implements OnInit {
    constructor(private accountService: AccountService, private apiService: ApiService, private userService: UserService) {}

    displayAdmin = 'none';
    user: string;

    ngOnInit() {
        this.apiService.get(`users/${localStorage.getItem('username')}`).subscribe(res => {
 
            if(res.data.user.role === "ROLE_ADMIN") {
                this.displayAdmin = 'block';
            }
        });

        this.user = localStorage.getItem('username')
    }

    logout() {
        this.accountService.logout();
    }
}
