import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { FormValidator } from 'src/app/interfaces/form-validator.interface';

@Component({
    selector: 'ds-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class InputComponent implements OnInit {
    @Input() placeholder: string;
    @Input() title: string;
    @Input() validators: FormValidator[] = [];
    @Input() required: boolean;
    @Input() controlName: string;
    @Input() group: FormGroup;
    @Input() syncControls: boolean;

    formControl: AbstractControl;

    ngOnInit(): void {
        this.formControl = this.group.get(this.controlName);
    }

    get firstError(): string {
        if (this.formControl.invalid) {
            const firstError = Object.keys(this.formControl.errors)[0];
            return this.validators.find(validator => validator.validator === firstError).message;
        }

        return null;
    }

    get showError(): boolean {
        return this.formControl.dirty && !!this.firstError;
    }
}
