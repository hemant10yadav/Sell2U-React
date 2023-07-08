import './Signup.css';
import {
	APIService,
	AxiosError,
	AxiosResponse,
	ChangeEvent,
	NavigateFunction,
	React,
	t,
	toast,
	useState,
	z,
	ZodError,
} from '../../imports/commonImports';
import {
	AccountCircleIcon,
	Face5Icon,
	Face6Icon,
	FollowTheSignsIcon,
	MailOutlineIcon,
	PasswordIcon,
	VisibilityIcon,
} from '../../imports/imageLogoImports';
import { Input } from '../../imports/componentsImports';
import Button from '../../components/common/button/Button';
import { IApiError, IError, IFieldType, IUser } from '../../models/interface';
import { useNavigate } from 'react-router-dom';

const signupFields = [
	{
		labelText: t('signup.firstName'),
		labelFor: 'firstName',
		id: 'firstName',
		name: 'firstName',
		type: 'text',
		autoFocus: true,
		isRequired: true,
		placeholder: t('signup.firstName'),
		icon: Face5Icon,
	},
	{
		labelText: t('signup.lastName'),
		labelFor: 'lastName',
		id: 'lastName',
		name: 'lastName',
		type: 'text',
		autoFocus: true,
		isRequired: true,
		placeholder: t('signup.lastName'),
		icon: Face6Icon,
	},
	{
		labelText: t('signup.username'),
		labelFor: 'username',
		id: 'username',
		name: 'username',
		type: 'text',
		autoFocus: true,
		isRequired: true,
		placeholder: t('signup.username'),
		icon: AccountCircleIcon,
	},
	{
		labelText: t('signup.email'),
		labelFor: 'email',
		id: 'email',
		name: 'email',
		type: 'email',
		autoFocus: true,
		isRequired: true,
		placeholder: t('signup.email'),
		icon: MailOutlineIcon,
	},
	{
		labelText: t('signup.password'),
		labelFor: 'password',
		id: 'password',
		name: 'password',
		type: 'password',
		autoComplete: 'current-password',
		isRequired: true,
		placeholder: t('signup.password'),
		icon: PasswordIcon,
		endLineIcon: VisibilityIcon,
	},
	{
		labelText: t('signup.confirmPassword'),
		labelFor: 'confirm-password',
		id: 'confirmPassword',
		name: 'confirmPassword',
		type: 'password',
		autoComplete: 'confirmPassword',
		isRequired: true,
		placeholder: t('signup.confirmPassword'),
		icon: PasswordIcon,
	},
];

const fieldsState: IFieldType = {};
const nameRegex = /^[a-zA-Z\s]*$/;
const signupFormSchema = z
	.object({
		firstName: z.coerce
			.string()
			.trim()
			.min(5, t('formErrors.mini4'))
			.max(15, t('formErrors.max15'))
			.regex(nameRegex, {
				message: t('formErrors.specialCharNotAllowed'),
			}),
		lastName: z.coerce
			.string()
			.trim()
			.min(5, t('formErrors.mini4'))
			.max(15, t('formErrors.max15'))
			.regex(nameRegex, {
				message: t('formErrors.specialCharNotAllowed'),
			}),
		username: z.coerce.string().trim().min(5, t('formErrors.mini4')),
		email: z.coerce
			.string()
			.trim()
			.email(t('formErrors.emailError'))
			.nonempty(t('formErrors.fieldIsEmpty')),
		password: z.coerce.string().trim().min(6, t('formErrors.mini4')),
		confirmPassword: z.string().trim(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: t('formErrors.passwordMismatch'),
		path: ['confirmPassword'],
	});

const Signup: React.FC = () => {
	const navigate: NavigateFunction = useNavigate();
	const [signupState, setSignupState] = useState<IFieldType>(fieldsState);
	const [errorFields, setErrorFields] = useState<IFieldType>({});
	signupFields.forEach((field) => {
		fieldsState[field.id] = '';
	});
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSignupState({
			...signupState,
			[e.target.id]: e.target.value?.trim(),
		});
		delete errorFields[e.target.id];
		setErrorFields({ ...errorFields });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		try {
			signupFormSchema.parse(signupState);
			void (async () => {
				await APIService.getInstance()
					.post<IUser>('/auth/signup', signupState, true)
					.then(
						(data: AxiosResponse<IUser>) => {
							navigate('/');
							toast.success(t('signup.success'));
						},
						(error: AxiosError<IApiError>) => {
							if (error?.response?.data?.error) {
								const errorArray = error?.response?.data?.error;
								errorArray.forEach((err: IError) => {
									setErrorFields((prevErrors) => ({
										...prevErrors,
										[err.path]: err.msg,
									}));
								});
							}
						}
					);
			})();
		} catch (error: unknown) {
			if (error instanceof ZodError) {
				error.errors.map((err) => {
					const key = err.path[0];
					setErrorFields((prevErrors) => ({
						...prevErrors,
						[key]: err.message,
					}));
				});
			}
		}
	};

	return (
		<div className="full-height flex items-center justify-center">
			<form className="width shadow-card p-8" onSubmit={handleSubmit}>
				<h1 className="text-center text-2xl font-semibold">
					{t('signup.title')}
				</h1>
				<div className="flex gap-2">
					{signupFields.map((field) => {
						if (field.id === 'firstName' || field.id === 'lastName') {
							return (
								<Input
									key={field.id}
									handleChange={handleChange}
									value={signupState[field.id]}
									labelText={field.labelText}
									labelFor={field.labelFor}
									id={field.id}
									type={field.type}
									name={field.name}
									placeholder={field.placeholder}
									icon={field.icon}
									endLineIcon={field.endLineIcon}
									errorMessage={errorFields[field.id]}
									customClass="bg-transparent"
								/>
							);
						}
						return null;
					})}
				</div>
				<div>
					{signupFields.map((field) => {
						if (field.id !== 'firstName' && field.id !== 'lastName') {
							return (
								<Input
									key={field.id}
									handleChange={handleChange}
									value={signupState[field.id]}
									labelText={field.labelText}
									labelFor={field.labelFor}
									id={field.id}
									type={field.type}
									name={field.name}
									placeholder={field.placeholder}
									icon={field.icon}
									endLineIcon={field.endLineIcon}
									errorMessage={errorFields[field.id]}
									customClass="bg-transparent w-full"
								/>
							);
						}
						return null;
					})}
				</div>
				<div className="flex justify-center">
					<Button
						type="submit"
						labelKey="signup.title"
						icon={FollowTheSignsIcon}
						id="signup-button"
						outlineBtn={false}
						customClass="w-1/2 mt-6"
					/>
				</div>
			</form>
		</div>
	);
};

export default Signup;
