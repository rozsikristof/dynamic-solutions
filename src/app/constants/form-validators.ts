export const FormValidators = {
    required: { validator: 'required', message: 'Required field' },
    minlength: { validator: 'minlength', message: 'Minimum 3 characters allowed' },
    maxlength: { validator: 'maxlength', message: 'Maximum 20 characters allowed' },
    textarea_maxlength: { validator: 'maxlength', message: 'Maximum 200 characters allowed' },
    email: { validator: 'email', message: 'Invalid email format' },
    size: { validator: 'size', message: 'File too large! (Maxiumum 64kB)' },
    specialchar: { validator: 'specialchar', message: 'No special characters allowed' }
}