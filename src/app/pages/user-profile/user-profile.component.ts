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
    user: User;
    isLoading: boolean;

    private userId: number;

    constructor(
        private readonly router: Router,
        private readonly userService: UserService
    ) {
        // Imagine we had a successful login and we fetch the userId
        this.userId = 1;
        sessionStorage.setItem('userId', `${this.userId}`);

        this.isLoading = true;
        this.userService.getUserById(this.userId)
            .then(response => {
                this.user = response;
                console.log(this.user);
            })
            .finally(() => {
                this.isLoading = false;
            });
    }

    navigateToUserInfoPage(): void {
        this.router.navigate(['information']);
    }
}
