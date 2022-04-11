import { Component, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MAX_ABOUT_TEXT, MAX_NAME_TEXT, MIN_NAME_TEXT } from 'src/app/constants/constants';
import { FormValidators } from 'src/app/constants/form-validators';
import { User } from 'src/app/interfaces/user.interface';
import { maxFileSize, markAllAsDirty, noSpeicalCharacters, isDateValid } from 'src/app/utils/form-validation.util';
import { UserService } from 'src/app/services/user.service';


@Component({
    selector: 'ds-user-information',
    templateUrl: './user-information.component.html',
    styleUrls: ['./user-information.component.scss']
})
export class UserInformationComponent implements OnDestroy {
    userInformationGroup: FormGroup;
    formValidators = FormValidators;
    isLoading: boolean;
    userAvatarUrl: string;
    isFileReaderLoading: boolean;
    avatarBorderState: boolean;

    private userId: number;
    private userSubscription: Subscription;

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly router: Router,
        private readonly userService: UserService
    ) {
        this.userSubscription = this.userService.getCurrentuser$.subscribe(user => {
            if (user) {
                this.initilaizeFormGroup(user);
            }
        });
    }

    ngOnDestroy(): void {
        if (this.userSubscription) {
            this.userSubscription.unsubscribe();
        }
    }

    updateUserInformation(): void {
        if (this.userInformationGroup.valid) {
            this.isLoading = true;

            this.userService.updateUser(this.updatedUserDetails)
                .then(() => {
                    this.router.navigate(['profile']);
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
            const avatarControl = this.userInformationGroup.get('avatar');

            avatarControl.setErrors({});
            avatarControl.markAsPristine();
        }

        reader.onload = () => {
            this.userAvatarUrl = <string>reader.result;
        }
    }

    changeAvatarBorder(): void {
        this.avatarBorderState = !this.avatarBorderState;
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

    private initilaizeFormGroup(user = {} as User): void {
        this.userId = user.id;
        this.userAvatarUrl = user.image;

        this.userInformationGroup = this.formBuilder.group({
            firstName: new FormControl(user.firstName, {
                validators: [
                    Validators.required,
                    Validators.minLength(MIN_NAME_TEXT),
                    Validators.maxLength(MAX_NAME_TEXT),
                    noSpeicalCharacters
                ],
                updateOn: 'submit'
            }),
            lastName: new FormControl(user.lastName, {
                validators: [
                    Validators.required,
                    Validators.min(MIN_NAME_TEXT),
                    Validators.max(MAX_NAME_TEXT),
                    noSpeicalCharacters
                ],
                updateOn: 'submit'
            }),
            email: new FormControl(user.email, {
                validators: [
                    Validators.required,
                    Validators.email
                ],
                updateOn: 'submit'
            }),
            phone: new FormControl(user.phone, {
                validators: [
                    Validators.required
                ],
                updateOn: 'submit'
            }),
            birthday: new FormControl(user.birthday, {
                validators: [
                    Validators.required,
                    isDateValid
                ],
                updateOn: 'submit'
            }),
            about: new FormControl(user.about, {
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
