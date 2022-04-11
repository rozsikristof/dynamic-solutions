import { Component, ElementRef, ViewChild } from '@angular/core';
import { InputComponent } from '../input/input.component';

@Component({
    selector: 'ds-textarea',
    templateUrl: './textarea.component.html',
    styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent extends InputComponent {
    // Reference of the <textarea> selector in the HTML template
    @ViewChild('textArea') textArea: ElementRef<HTMLInputElement>;

    inputValueLength: number = 0;

    // This is where we count the number of characters entered into the textarea field
    textAreaInput(): void {
        this.inputValueLength = this.textArea.nativeElement.value.length;
    }
}
