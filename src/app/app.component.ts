import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'ds-app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    private userId = 1;

    constructor(private readonly userService: UserService) {
        this.userService.getUserById(this.userId);
    } 
}
