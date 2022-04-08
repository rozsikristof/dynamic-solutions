import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { InputValidator } from 'src/app/interfaces/input-validator.interface';

@Component({
    selector: 'ds-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class InputComponent implements OnInit {
    @Input() placeholder: string;
    @Input() title: string;
    @Input() validators: InputValidator[] = [];
    @Input() required: boolean;
    @Input() controlName: string;
    @Input() group: FormGroup;
    @Input() syncControls: boolean;

    formControl: AbstractControl | null;

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
        return this.syncControls && !!this.firstError;
    }
}
