import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MAX_ABOUT_TEXT, MAX_NAME_TEXT, MIN_NAME_TEXT } from 'src/app/constants/constants';
import { FormValidators } from 'src/app/constants/form-validators';
import { User } from 'src/app/interfaces/user.interface';
import { maxFileSize, markAllAsDirty } from 'src/app/utils/form-validation.util';
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
    userAvatarUrl: string;
    isFileReaderLoading: boolean;

    private userId: number;

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly router: Router,
        private readonly userService: UserService
    ) {
        this.getUserData();
    }

    updateUserInformation(): void {
        if (this.userInformationGroup.valid) {
            this.isLoading = true;

            this.userService.updateUser(this.updatedUserDetails)
                .then(() => {
                    this.router.navigate(['profile'])
                })
                .finally(() => {
                    this.isLoading = false;
                });
        } else {
            markAllAsDirty(this.userInformationGroup);
        }
    }

    previewSelectedAvatar(selecetedImage: File): void {
        const reader = new FileReader();
        reader.readAsDataURL(selecetedImage);

        reader.onloadstart = () => {
            this.isFileReaderLoading = true;
        }

        reader.onloadend = () => {
            this.isFileReaderLoading = false;
        }

        reader.onload = () => {
            this.userAvatarUrl = <string>reader.result;
        }
    }

    private get updatedUserDetails(): FormData {
        const formData = new FormData();
        const avatar: File = this.getControlValue('avatar');
        const userDetails: User = {
            id: this.userId,
            firstName: this.getControlValue('firstName'),
            lastName: this.getControlValue('lastName'),
            email: this.getControlValue('email'),
            phone: this.getControlValue('phone'),
            birthday: this.getControlValue('birthday'),
            about: this.getControlValue('about')
        }

        if (avatar) {
            formData.append('image', avatar, avatar.name);
        }

        formData.append('user', JSON.stringify(userDetails));
        return formData;
    }

    private getControlValue(controlName: string): any {
        return this.userInformationGroup.get(controlName).value;
    }

    private getUserData(): Promise<void> {
        this.isLoading = true;
        this.userId = +sessionStorage.getItem('userId');

        if (!this.userId) {
            this.router.navigate(['profile']);
        }

        return this.userService.getUserById(+this.userId).then(response => this.initilaizeFormGroup(response))
            .finally(() => this.isLoading = false);
    }

    private initilaizeFormGroup(userData: User): void {
        this.userAvatarUrl = userData.image;

        this.userInformationGroup = this.formBuilder.group({
            firstName: new FormControl(userData.firstName, {
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
            birthday: new FormControl(userData?.birthday, {
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
                validators: [
                    maxFileSize
                ],
                updateOn: 'submit'
            })
        });
    }

}
