import { Directive, HostListener } from '@angular/core';

@Directive({
    selector: '[dsNumbersOnly]'
})
export class NumbersOnlyDirective {
    lastValidInput = '';

    @HostListener('input', ['$event.target'])
    checkInputForNumbers($eventTarget: any): void {
        const onlyNumbers = /^[0-9]*$/;
        const isInputValid = onlyNumbers.test($eventTarget.value);

        if (isInputValid) {
            this.lastValidInput = $eventTarget.value;
        } else {
            $eventTarget.value = this.lastValidInput;
        }
    }

    @HostListener('focusin', ['$event.target'])
    getInitialValue($eventTarget: any): void {
        this.lastValidInput = $eventTarget.value;
    }


}
