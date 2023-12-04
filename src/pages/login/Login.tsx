import './Login.css';
import {
	ChangeEvent,
	NavigateFunction,
	Paths,
	React,
	translate,
	useState,
	ZodError,
} from '../../utilities/commonImports';
import { IFieldType } from '../../utilities/interface';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { AppLogoBlack } from '../../utilities/imageLogoImports';
import { loginFormSchema } from '../../utilities/formValidators';
import { Input } from '../../components/common/componentsImports';

const LOGIN_FIELDS = [
	{
		id: 'emailOrUsername',
		labelKey: 'login.emailOrUsername',
		type: 'text',
		focus: true,
	},
	{
		id: 'password',
		labelKey: 'login.password',
		type: 'password',
		focus: false,
	},
];

const Login: React.FC = () => {
	const navigate: NavigateFunction = useNavigate();
	const location = useLocation();
	console.log(location);
	const { login } = useContext(AppContext);
	const fieldsState: IFieldType = {
		password: '',
		emailOrUsername: '',
	};

	const [loginState, setLoginState] = useState<IFieldType>(fieldsState);
	const [fieldErrors, setFieldErrors] = useState<IFieldType>({});

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		setLoginState({ ...loginState, [e.target.id]: e.target.value });
		delete fieldErrors[e.target.id];
		setFieldErrors(fieldErrors);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		void (async () => {
			try {
				loginFormSchema.parse(loginState);
				await login(loginState);
				navigate('/');
			} catch (error: unknown) {
				if (error instanceof ZodError) {
					error.errors.forEach((err) => {
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
		<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<img
					className="mx-auto h-10 w-auto"
					src={AppLogoBlack as string}
					alt="Your Company"
				/>
				<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
					{translate('login.message')}
				</h2>
			</div>

			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
				<form className="space-y-4" onSubmit={handleSubmit}>
					{LOGIN_FIELDS.map((field) => {
						return (
							<Input
								key={field.id}
								value={loginState[field.id]}
								handleChange={handleChange}
								autoFocus={field.focus}
								type={field.type}
								labelKey={field.labelKey}
								id={field.id}
								errorMessageKey={fieldErrors[field.id]}
							/>
						);
					})}
					<div className="text-right my-2">
						<Link
							to={Paths.SIGNUP}
							className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
						>
							{translate('login.forgotPassword')}
						</Link>
					</div>
					<div>
						<button
							type="submit"
							className="flex w-full justify-center rounded-md
							 bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6
							  text-white shadow-sm hover:bg-indigo-500 focus-visible:outline 
							  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>
							{translate('login.title')}
						</button>
					</div>
				</form>

				<p className="mt-10 text-center text-sm text-gray-500">
					{translate('login.notAMember') + ' '}
					<Link
						to={Paths.SIGNUP}
						state={location.state as unknown}
						replace
						className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
					>
						{translate('signUp.title')}
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Login;
