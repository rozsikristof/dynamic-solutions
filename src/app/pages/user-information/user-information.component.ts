import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAX_ABOUT_TEXT, MAX_NAME_TEXT, MIN_NAME_TEXT } from 'src/app/constants/constants';
import { FormValidators } from 'src/app/constants/form-validators';
import { markAllAsDirty } from 'src/app/utils/form-validation.util';

@Component({
    selector: 'ds-user-information',
    templateUrl: './user-information.component.html',
    styleUrls: ['./user-information.component.scss']
})
export class UserInformationComponent {
    userInformationGroup: FormGroup;
    formValidators = FormValidators;

    constructor(private readonly formBuilder: FormBuilder) {
        this.initilaizeFormGroup();
    }

    updateUserInformation(): void {
        markAllAsDirty(this.userInformationGroup);
    }

    private initilaizeFormGroup(): void {
        this.userInformationGroup = this.formBuilder.group({
            firstName: new FormControl('', {
                validators: [
                    Validators.required,
                    Validators.minLength(MIN_NAME_TEXT),
                    Validators.maxLength(MAX_NAME_TEXT)
                ],
                updateOn: 'submit'
            }),
            lastName: new FormControl('', {
                validators: [
                    Validators.required,
                    Validators.min(MIN_NAME_TEXT),
                    Validators.max(MAX_NAME_TEXT)
                ],
                updateOn: 'submit'
            }),
            email: new FormControl('', {
                validators: [
                    Validators.required,
                    Validators.email
                ],
                updateOn: 'submit'
            }),
            phone: new FormControl('', {
                validators: [
                    Validators.required
                ],
                updateOn: 'submit'
            }),
            dateOfBirth: new FormControl('', {
                validators: [
                    Validators.required,
                ],
                updateOn: 'submit'
            }),
            about: new FormControl('', {
                validators: [
                    Validators.required,
                    Validators.max(MAX_ABOUT_TEXT)
                ],
                updateOn: 'submit'
            })
        });
    }

}
