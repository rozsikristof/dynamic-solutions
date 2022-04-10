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
