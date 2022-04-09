import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AxiosResponse } from 'axios';
import { MAX_ABOUT_TEXT, MAX_NAME_TEXT, MIN_NAME_TEXT } from 'src/app/constants/constants';
import { FormValidators } from 'src/app/constants/form-validators';
import { User } from 'src/app/interfaces/user.interface';
import { markAllAsDirty } from 'src/app/utils/form-validation.util';
import { UserService } from 'src/services/user.service';

@Component({
    selector: 'ds-user-information',
    templateUrl: './user-information.component.html',
    styleUrls: ['./user-information.component.scss']
})
export class UserInformationComponent {
    userInformationGroup: FormGroup;
    formValidators = FormValidators;
    isLoading: boolean;

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly router: Router,
        private readonly userService: UserService
    ) {
        this.getUserData();
    }

    updateUserInformation(): void {
        if (this.userInformationGroup.valid) {
            this.router.navigate(['profile']);
        } else {
            markAllAsDirty(this.userInformationGroup);
        }
        console.log(this.userInformationGroup.get('firstName'));
    }

    private getUserData(): Promise<void> {
        this.isLoading = true;
        return this.userService.getUserById(1).then(response => this.initilaizeFormGroup(response))
            .finally(() => this.isLoading = false);
    }

    private initilaizeFormGroup(userData: User): void {
        this.userInformationGroup = this.formBuilder.group({
            firstName: new FormControl(userData?.firstName, {
                validators: [
                    Validators.required,
                    Validators.minLength(MIN_NAME_TEXT),
                    Validators.maxLength(MAX_NAME_TEXT)
                ],
                updateOn: 'submit'
            }),
            lastName: new FormControl(userData?.lastName, {
                validators: [
                    Validators.required,
                    Validators.min(MIN_NAME_TEXT),
                    Validators.max(MAX_NAME_TEXT)
                ],
                updateOn: 'submit'
            }),
            email: new FormControl(userData?.email, {
                validators: [
                    Validators.required,
                    Validators.email
                ],
                updateOn: 'submit'
            }),
            phone: new FormControl(userData?.phone, {
                validators: [
                    Validators.required
                ],
                updateOn: 'submit'
            }),
            dateOfBirth: new FormControl(userData?.birthday, {
                validators: [
                    Validators.required,
                ],
                updateOn: 'submit'
            }),
            about: new FormControl(userData?.about, {
                validators: [
                    Validators.required,
                    Validators.maxLength(MAX_ABOUT_TEXT)
                ],
                updateOn: 'submit'
            }),
            avatar: new FormControl('', {
                updateOn: 'submit'
            })
        });
    }

}
