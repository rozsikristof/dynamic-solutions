import { Directive, HostListener } from '@angular/core';

// Directive to allow only numbers added to an input field

@Directive({
    selector: '[dsNumbersOnly]'
})
export class NumbersOnlyDirective {
    lastValidInput = '';

    // Listens for any input event
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

    // Set the init value when the user clicks into the field
    @HostListener('focusin', ['$event.target'])
    getInitialValue($eventTarget: any): void {
        this.lastValidInput = $eventTarget.value;
    }


}
