import {
	useTranslation,
	React,
	useState,
	ChangeEvent,
} from '../../imports/CommonImports';
import Input from '../../components/common/Input';
import './Login.css';
import PasswordIcon from '@mui/icons-material/Password';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import APIService from '../../services/ApiService';

const Login: React.FC = () => {
	const { t } = useTranslation();

	const loginFields = [
		{
			labelText: t('login.email'),
			labelFor: 'email-address',
			id: 'email-address',
			name: 'email',
			type: 'email',
			autoComplete: 'email',
			isRequired: true,
			placeholder: t('login.email'),
			icon: MailOutlineIcon,
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

	const fieldsState: { [key: string]: string } = {};
	loginFields.forEach((field) => {
		fieldsState[field.id] = '';
	});

	const [loginState, setLoginState] = useState(fieldsState);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setLoginState({ ...loginState, [e.target.id]: e.target.value });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		void APIService.getInstance().post(
			'/auth/login',
			{
				emailOrUsername: loginState['email-address'],
				password: loginState.password,
			},
			true
		);
	};

	return (
		<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 width p-6 rounded-2xl">
			<h1 className="text-center text-2xl font-semibold">{t('login.title')}</h1>
			<div>
				<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
					<div className="-space-y-px">
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
								isRequired={field.isRequired}
								placeholder={field.placeholder}
								icon={field.icon}
							/>
						))}
					</div>
					<button type="submit">{t('login.submit')}</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
