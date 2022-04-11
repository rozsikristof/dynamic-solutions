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
        // No need to subscribe to the observable if we don't want to work with it directly, we can just get the observable itself and render the data with the async pipe
        this.user = this.userService.getCurrentuser$;
    }

    navigateToUserInfoPage(): void {
        this.router.navigate(['information']);
    }
}
