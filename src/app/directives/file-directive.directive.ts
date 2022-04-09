import { Directive, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
    selector: 'input[type=file]',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: FileDirectiveDirective,
        multi: true
    }]
})
export class FileDirectiveDirective implements ControlValueAccessor  {
    @HostListener('change', ['$event.target.files'])
    detectChanges($event: FileList): void {
        this.onChange($event[0]);
    }

    value: File;

    onChange: (value: File) => void;

    writeValue(value: File): void {
        this.value = value;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void { }
}
