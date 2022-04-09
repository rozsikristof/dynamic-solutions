export const FormValidators = {
    required: { validator: 'required', message: 'Required field' },
    minlength: { validator: 'minlength', message: 'Minimum 3 characters required' },
    maxlength: { validator: 'maxlength', message: 'Maximum 20 characters required' },
    textarea_maxlength: { validator: 'maxlength', message: 'Maximum 200 characters required' },
    email: { validator: 'email', message: 'Invalid email format' }
}