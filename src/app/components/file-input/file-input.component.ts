import { Component } from '@angular/core';
import { InputComponent } from '../input/input.component';

@Component({
    selector: 'ds-file-input',
    templateUrl: './file-input.component.html',
    styleUrls: ['./file-input.component.scss']
})
export class FileInputComponent extends InputComponent {

    handleFileInput($event: any): void {
        this.formControl.value;
    }

}
