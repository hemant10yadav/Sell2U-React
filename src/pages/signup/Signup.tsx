import './Signup.css';
import {
	APIService,
	AxiosError,
	AxiosResponse,
	ChangeEvent,
	NavigateFunction,
	Paths,
	React,
	translate,
	useState,
	ZodError,
} from '../../utilities/commonImports';
import { AppLogoBlack } from '../../utilities/imageLogoImports';
import {
	IApiError,
	IError,
	IFieldType,
	IUser,
} from '../../utilities/interface';
import { useNavigate } from 'react-router-dom';
import { signupFormSchema } from '../../utilities/formValidators';
import { Input, Modal } from '../../components/common/componentsImports';

const SIGNUP_FIELDS = [
	{ id: 'email', labelKey: 'signUp.email', type: 'email', focus: true },
	{
		id: 'password',
		labelKey: 'signUp.password',
		type: 'password',
		focus: false,
	},
	{
		id: 'confirmPassword',
		labelKey: 'signUp.confirmPassword',
		type: 'password',
		focus: false,
	},
];
const Signup: React.FC = () => {
	const navigate: NavigateFunction = useNavigate();

	const fieldsState: IFieldType = {
		email: '',
		password: '',
		confirmPassword: '',
	};

	const [signupState, setSignupState] = useState<IFieldType>(fieldsState);
	const [errorFields, setErrorFields] = useState<IFieldType>({});
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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
					.post<IUser>(Paths.SIGNUP, signupState, true)
					.then(
						(data: AxiosResponse<IUser>) => {
							setIsModalOpen(true);
						},
						(error: AxiosError<IApiError>) => {
							if (error?.response?.data?.error) {
								const errorArray = error.response.data.error;
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
				error.errors.forEach((err) => {
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
		<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<img
					className="mx-auto h-10 w-auto"
					src={AppLogoBlack as string}
					alt="BuyMarque"
				/>
				<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
					{translate('signUp.title')}
				</h2>
			</div>

			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
				<form onSubmit={handleSubmit} className="space-y-4">
					{SIGNUP_FIELDS.map((field) => {
						return (
							<Input
								key={field.id}
								value={signupState[field.id]}
								handleChange={handleChange}
								autoFocus={field.focus}
								type={field.type}
								labelKey={field.labelKey}
								id={field.id}
								errorMessageKey={errorFields[field.id]}
							/>
						);
					})}
					<div className="my-2">
						<button
							type="submit"
							className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm 
							font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline 
							focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>
							{translate('signUp.title')}
						</button>
					</div>
				</form>
				<button onClick={() => setIsModalOpen(true)}>hell</button>
				<p className="mt-10 text-center text-sm text-gray-500">
					{translate('signUp.alreadyMember') + ' '}
					<button
						onClick={() => navigate(Paths.LOGIN)}
						className="cursor-pointer font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
					>
						{translate('login.title')}
					</button>
				</p>
			</div>
			<Modal
				openModal={isModalOpen}
				headerKey="Congratulations"
				bodyKey="signUp.success"
				size="sm"
				onConfirm={() => navigate('/')}
			/>
		</div>
	);
};

export default Signup;
