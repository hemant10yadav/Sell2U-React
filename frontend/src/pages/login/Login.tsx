import './Login.css';
import {
	APIService,
	ChangeEvent,
	React,
	toast,
	useState,
	useTranslation,
	z,
	ZodError,
} from '../../imports/commonImports';
import {
	AccountCircleIcon,
	LoginIcon,
	PasswordIcon,
} from '../../imports/imageLogoImports';
import { Button, Input } from '../../imports/componentsImportS';

const Login: React.FC = () => {
	const { t } = useTranslation();

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
		},
	];

	const loginFormSchema = z.object({
		emailOrUsername: z.coerce
			.string()
			.nonempty({ message: t('formErrors.fieldIsEmpty') }),
		password: z.coerce
			.string()
			.nonempty({ message: t('formErrors.fieldIsEmpty') }),
	});

	const fieldsState: { [key: string]: string } = {};
	loginFields.forEach((field) => {
		fieldsState[field.id] = '';
	});

	const [loginState, setLoginState] = useState(fieldsState);
	const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

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

				const myProm = APIService.getInstance().post(
					'/auth/login',
					{
						emailOrUsername: loginState['email-address'],
						password: loginState.password,
					},
					true
				);

				await toast
					.promise(myProm, {
						loading: 'Loading',
						success: 'Got the data',
						error: 'Error when fetching',
					})
					.then((data) => {});
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
							/>
						))}
					</div>
					<Button
						labelKey={'login.submit'}
						id={'login-submit'}
						type={'submit'}
						width={'w-full'}
						outlineBtn={false}
						rounded={'rounded-full'}
						color={'primary'}
						icon={LoginIcon}
						customClass={'mt-10'}
					/>
				</form>
			</div>
		</div>
	);
};

export default Login;
