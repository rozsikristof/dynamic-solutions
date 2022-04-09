import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
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
    image: any;

    private userId: number;

    constructor(
        private readonly router: Router,
        private readonly userService: UserService,
        private readonly sanitize: DomSanitizer
    ) {
        // Imagine we had a successful login and we fetch the userId
        this.userId = 1;
        sessionStorage.setItem('userId', `${this.userId}`);

        this.isLoading = true;
        this.userService.getUserById(this.userId).then(response => this.user = response)
            .finally(() => {
                this.isLoading = false
            });

        this.userService.getUserAvatarById(this.userId).then(result => {
            const reader = new FileReader();
            reader.readAsDataURL(result);
            reader.onloadend = (e) => {
                this.image = this.sanitize.bypassSecurityTrustUrl(<string>reader.result);
            }
        })
    }

    navigateToUserInfoPage(): void {
        this.router.navigate(['information']);
    }
}
