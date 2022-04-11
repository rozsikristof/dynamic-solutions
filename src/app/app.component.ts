import { Component } from '@angular/core';

@Component({
    selector: 'ds-app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    onSubPageLoaded(component: any) {
        component.user = 'someValue';
    } 
}
