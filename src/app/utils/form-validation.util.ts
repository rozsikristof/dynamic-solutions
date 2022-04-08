import { FormGroup } from "@angular/forms";

export const markAllAsDirty = (formGroup: FormGroup): void => {
    for (const control in formGroup.controls) {
        formGroup.controls[control].markAsDirty();
    }
}
