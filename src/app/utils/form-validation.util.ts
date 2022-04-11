import { AbstractControl, FormGroup } from "@angular/forms";
import { MAX_FILE_SIZE } from "../constants/constants";

export const markAllAsDirty = (formGroup: FormGroup): void => {
    for (const control in formGroup.controls) {
        formGroup.controls[control].markAsDirty();
    }
}

export const maxFileSize = (control: AbstractControl): { [key: string]: boolean } | null => {
    if (control.value && control.value.size > MAX_FILE_SIZE) {
        return { 'size': true };
    }

    return null;
}

export const noSpeicalCharacters = (control: AbstractControl): { [key: string]: boolean } | null => {
    if (control.value) {
        const regex = /^[A-Za-z0-9]+$/;

        if (regex.test(control.value)) {
            return null;
        }

        return { 'specialchar': true };
    }

    return null;
}

export const isDateValid = (control: AbstractControl): { [key: string]: boolean } | null => {
    if (control.value) {
        const regex = /^(\d{4})(\.)([1-9]|0[1-9]|1[0-2])(\.)(0[1-9]|1[0-9]|2[0-9]|3[01])(\.?)$/;
        const date = new Date(control.value).toLocaleDateString('hu', { year: 'numeric', month: 'numeric', day: 'numeric' });

        if (!regex.test(control.value) || date === 'Invalid Date') {
            return { 'dateformat': true }
        }

        return null;
    }

    return null;
}
