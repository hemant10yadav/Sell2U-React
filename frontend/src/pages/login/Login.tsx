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
import { Button, Input } from '../../imports/componentsImportS';
import { AxiosResponse } from 'axios';
import { IRoot, IUser } from '../../models/interface';
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

const fieldsState: { [key: string]: string } = {};

const loginFormSchema = z.object({
	emailOrUsername: z.coerce
		.string()
		.nonempty({ message: t('formErrors.fieldIsEmpty') }),
	password: z.coerce
		.string()
		.nonempty({ message: t('formErrors.fieldIsEmpty') }),
});

const Login: React.FC = () => {
	const navigate: NavigateFunction = useNavigate();
	const [loginState, setLoginState] = useState(fieldsState);
	const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

	loginFields.forEach((field) => {
		fieldsState[field.id] = '';
	});

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setLoginState({ ...loginState, [e.target.id]: e.target.value });
		delete fieldErrors[e.target.id];
		setFieldErrors(fieldErrors);
	};

	const handleSubmit = (e: React.FormEvent) => {
		void (async () => {
			e.preventDefault();
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
		<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 width p-6 rounded-2xl">
			<h1 className="text-center text-2xl font-semibold">{t('login.title')}</h1>
			<div>
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
								customClass={'bg-transparent'}
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
