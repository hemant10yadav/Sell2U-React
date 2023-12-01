import './Login.css';
import {
	ChangeEvent,
	NavigateFunction,
	Paths,
	React,
	translate,
	useState,
	z,
	ZodError,
} from '../../utilities/commonImports';
import { IFieldType } from '../../utilities/interface';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { AppLogoBlack } from '../../utilities/imageLogoImports';

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

const Login: React.FC = () => {
	const { login } = useContext(AppContext);
	const navigate: NavigateFunction = useNavigate();

	const fieldsState: IFieldType = {
		password: '',
		emailOrUsername: '',
	};

	const [loginState, setLoginState] = useState<IFieldType>(fieldsState);
	const [fieldErrors, setFieldErrors] = useState<IFieldType>({});

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
				<form className="space-y-6" onSubmit={handleSubmit}>
					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium leading-6 text-gray-900"
						>
							{translate('login.emailOrUsername')}
						</label>
						<div className="mt-2">
							<input
								onChange={handleChange}
								autoFocus
								id="emailOrUsername"
								name="emailOrUsername"
								required
								className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>

					<div>
						<div className="flex items-center justify-between">
							<label
								htmlFor="password"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								{translate('login.password')}
							</label>
							<div className="text-sm">
								<a
									href="#"
									className="font-semibold text-indigo-600 hover:text-indigo-500"
								>
									{translate('login.forgotPassword')}
								</a>
							</div>
						</div>
						<div className="mt-2">
							<input
								onChange={handleChange}
								id="password"
								name="password"
								type="password"
								autoComplete="current-password"
								required
								className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>

					<div>
						<button
							type="submit"
							className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>
							{translate('login.title')}
						</button>
					</div>
				</form>

				<p className="mt-10 text-center text-sm text-gray-500">
					Not a member?{' '}
					<button
						onClick={() => navigate(Paths.SIGN_UP)}
						className="cursor-pointer font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
					>
						{translate('sign_up.title')}
					</button>
				</p>
			</div>
		</div>
	);
};

export default Login;
