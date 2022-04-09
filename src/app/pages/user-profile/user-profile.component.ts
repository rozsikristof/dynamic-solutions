import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/services/user.service';

@Component({
    selector: 'ds-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
    user = {} as User;
    isLoading: boolean;

    constructor(
        private readonly router: Router,
        private readonly userService: UserService
    ) {
        this.isLoading = true;
        this.userService.getUserById(1).then(response => this.user = response)
            .finally(() => {
                this.isLoading = false
            });
    }

    navigateToUserInfoPage(): void {
        this.router.navigate(['information']);
    }
}
