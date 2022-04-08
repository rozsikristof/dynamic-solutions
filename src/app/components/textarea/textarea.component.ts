import { Component, Input } from '@angular/core';
import { InputComponent } from '../input/input.component';

@Component({
    selector: 'ds-textarea',
    templateUrl: './textarea.component.html',
    styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent extends InputComponent {
    @Input() isResizeable: boolean;
}
