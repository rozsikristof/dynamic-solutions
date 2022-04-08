import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'ds-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {

    constructor(private readonly router: Router) {}

    navigateToUserInfoPage(): void {
        this.router.navigate(['information']);
    }
}
