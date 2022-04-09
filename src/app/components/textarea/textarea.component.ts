import { Component, ElementRef, ViewChild } from '@angular/core';
import { InputComponent } from '../input/input.component';

@Component({
    selector: 'ds-textarea',
    templateUrl: './textarea.component.html',
    styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent extends InputComponent {
    @ViewChild('textArea') textArea: ElementRef<HTMLInputElement>;

    inputValueLength: number = 0;

    textAreaInput(): void {
        this.inputValueLength = this.textArea.nativeElement.value.length;
    }
}
