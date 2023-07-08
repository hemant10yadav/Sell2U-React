import './Login.css';
import {
	APIService,
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
	LoginIcon,
	PasswordIcon,
	VisibilityIcon,
} from '../../imports/imageLogoImports';
import { Button, Input } from '../../imports/componentsImports';
import { AxiosResponse } from 'axios';
import { IFieldType, IRoot, IUser } from '../../models/interface';
import LocalStorageService from '../../services/LocalStorageService';
import { useNavigate } from 'react-router-dom';

const loginFields = [
	{
		labelText: t('login.email'),
		labelFor: 'emailOrUsername',
		id: 'emailOrUsername',
		name: 'emailOrUsername',
		type: 'text',
		autoFocus: true,
		isRequired: true,
		placeholder: t('login.emailOrUsername'),
		icon: AccountCircleIcon,
	},
	{
		labelText: t('login.password'),
		labelFor: 'password',
		id: 'password',
		name: 'password',
		type: 'password',
		autoComplete: 'current-password',
		isRequired: true,
		placeholder: t('login.password'),
		icon: PasswordIcon,
		endLineIcon: VisibilityIcon,
	},
];

const saveData = (data: IRoot) => {
	LocalStorageService.getInstance().setToken(data.token);
	LocalStorageService.getInstance().save<IUser>('user', data.user);
};

const fieldsState: IFieldType = {};

const loginFormSchema = z.object({
	emailOrUsername: z.coerce
		.string()
		.trim()
		.nonempty({ message: t('formErrors.fieldIsEmpty') }),
	password: z.coerce
		.string()
		.trim()
		.nonempty({ message: t('formErrors.fieldIsEmpty') }),
});

const Login: React.FC = () => {
	const navigate: NavigateFunction = useNavigate();
	const [loginState, setLoginState] = useState<IFieldType>(fieldsState);
	const [fieldErrors, setFieldErrors] = useState<IFieldType>({});

	loginFields.forEach((field) => {
		fieldsState[field.id] = '';
	});

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setLoginState({ ...loginState, [e.target.id]: e.target.value });
		delete fieldErrors[e.target.id];
		setFieldErrors(fieldErrors);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		void (async () => {
			try {
				loginFormSchema.parse(loginState);
				await APIService.getInstance()
					.post<IRoot>('/auth/login', loginState, true)
					.then((response: AxiosResponse<IRoot>) => {
						toast.success(t('login.loginSuccess'));
						saveData(response.data);
						navigate('/');
					});
			} catch (error: unknown) {
				if (error instanceof ZodError) {
					error.errors.map((err) => {
						const key = err.path[0];
						setFieldErrors((prevErrors) => ({
							...prevErrors,
							[key]: err.message,
						}));
					});
				}
			}
		})();
	};

	return (
		<div className="flex full-height items-center">
			<div className="width shadow-card mx-auto p-8">
				<h1 className="text-center text-2xl font-semibold">
					{t('login.welcome')}
				</h1>
				<form className="mt-8" onSubmit={handleSubmit}>
					<div>
						{loginFields.map((field) => (
							<Input
								key={field.id}
								handleChange={handleChange}
								value={loginState[field.id]}
								labelText={field.labelText}
								labelFor={field.labelFor}
								id={field.id}
								name={field.name}
								type={field.type}
								autoFocus={field.autoFocus}
								placeholder={field.placeholder}
								icon={field.icon}
								errorMessage={fieldErrors[field.id]}
								customClass={'bg-transparent w-full'}
								endLineIcon={field.endLineIcon}
							/>
						))}
					</div>
					<div className="flex justify-center">
						<Button
							labelKey={'login.submit'}
							id={'login-submit'}
							type={'submit'}
							outlineBtn={false}
							rounded={'rounded-full'}
							color={'primary'}
							icon={LoginIcon}
							customClass={'mt-10 w-1/2'}
						/>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
