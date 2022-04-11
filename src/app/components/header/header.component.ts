import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'ds-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

    constructor(private readonly router: Router) { }

    redirectToProfilePage(): void {
        this.router.navigate(['profile']);
    }
}
