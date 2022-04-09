import { Directive } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
    selector: '[dsFileDirective]',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: FileDirectiveDirective,
        multi: true
    }]
})
export class FileDirectiveDirective {

    constructor() { }

}
