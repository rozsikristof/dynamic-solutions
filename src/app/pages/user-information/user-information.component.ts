import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAX_TEXT, MIN_TEXT } from 'src/app/constants/constants';

@Component({
    selector: 'ds-user-information',
    templateUrl: './user-information.component.html',
    styleUrls: ['./user-information.component.scss']
})
export class UserInformationComponent {
    userInformationGroup: FormGroup;
    formSubmitted: boolean;

    constructor(private readonly formBuilder: FormBuilder) {
        this.initilaizeFormGroup();
    }

    updateUserInformation(): void {
        this.formSubmitted = true;
    }

    private initilaizeFormGroup(): void {
        this.userInformationGroup = this.formBuilder.group({
            firstName: new FormControl('', {
                validators: [
                    Validators.required,
                    Validators.min(MIN_TEXT),
                    Validators.max(MAX_TEXT)
                ],
                updateOn: 'submit'
            }),
            lastName: new FormControl('', {
                validators: [
                    Validators.required,
                    Validators.min(MIN_TEXT),
                    Validators.max(MAX_TEXT)
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
                    Validators.required
                ],
                updateOn: 'submit'
            })
        });
    }

}
