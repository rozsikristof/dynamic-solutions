import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'ds-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
    user: Observable<User>;

    constructor(
        private readonly router: Router,
        private readonly userService: UserService
    ) {
        this.user = this.userService.getCurrentuser$;
    }

    navigateToUserInfoPage(): void {
        this.router.navigate(['information']);
    }
}
