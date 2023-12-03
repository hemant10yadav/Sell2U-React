import { z, translate } from './commonImports';

const loginFormSchema = z.object({
	emailOrUsername: z.coerce
		.string()
		.trim()
		.nonempty({ message: translate('formErrors.fieldIsEmpty') }),
	password: z.coerce
		.string()
		.trim()
		.nonempty({ message: translate('formErrors.fieldIsEmpty') }),
});

const nameRegex = /^[a-zA-Z\s]*$/;

const signupFormSchema = z
	.object({
		email: z.coerce
			.string()
			.trim()
			.email(translate('formErrors.emailError'))
			.nonempty(translate('formErrors.fieldIsEmpty')),
		password: z.coerce.string().trim().min(6, translate('formErrors.mini4')),
		confirmPassword: z.string().trim(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: translate('formErrors.passwordMismatch'),
		path: ['confirmPassword'],
	});

export { loginFormSchema, signupFormSchema };
