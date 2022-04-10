import { Component, EventEmitter, Output } from '@angular/core';
import { InputComponent } from '../input/input.component';

@Component({
    selector: 'ds-file-input',
    templateUrl: './file-input.component.html'
})
export class FileInputComponent extends InputComponent {
    @Output() selectedFile = new EventEmitter<File>();

    getSelectedFileName($event: any): void {
        const image = $event.target.files[0];
        this.selectedFile.emit(image);
    }
}
