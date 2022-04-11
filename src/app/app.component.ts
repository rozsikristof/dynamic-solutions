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
         // Getting the user data from the PHP server, makes sense to call this here, in the parent component and store it in the service,
         // since both pages will use the same data
        this.userService.getUserById(this.userId);
    } 
}
