import './Signup.css';
import { React, t, useState } from '../../imports/commonImports';
import {
	AccountCircleIcon,
	Face5Icon,
	Face6Icon,
	FollowTheSignsIcon,
	MailOutlineIcon,
	PasswordIcon,
	VisibilityIcon,
} from '../../imports/imageLogoImports';
import { Input } from '../../imports/componentsImportS';
import Button from '../../components/common/button/Button';

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
		id: 'confirm-password',
		name: 'confirm-password',
		type: 'password',
		autoComplete: 'confirm-password',
		isRequired: true,
		placeholder: t('signup.confirmPassword'),
		icon: PasswordIcon,
	},
];

interface IFieldType {
	[key: string]: string;
}

const fieldsState: IFieldType = {};
const Signup: React.FC = () => {
	const [signupState, setSignupState] = useState<IFieldType>(fieldsState);
	const [errorFields, setErrorFields] = useState<IFieldType>({});
	const handleChange = () => {
		signupFields.forEach((field) => {
			fieldsState[field.id] = '';
		});
	};

	return (
		<div className="absolute width left-1/2 transform -translate-x-1/2">
			<h1 className="text-center mt-8">{t('signup.title')}</h1>
			<form>
				<div>
					{signupFields.map((field) => (
						<Input
							key={field.id}
							handleChange={handleChange}
							value={signupState[field.id]}
							labelText={field.labelText}
							labelFor={field.labelFor}
							id={field.id}
							name={field.name}
							placeholder={field.placeholder}
							icon={field.icon}
							endLineIcon={field.endLineIcon}
							errorMessage={errorFields[field.id]}
							customClass={'bg-transparent'}
						/>
					))}
					<div className="flex justify-center">
						<Button
							type={'submit'}
							labelKey={'signup.title'}
							icon={FollowTheSignsIcon}
							id={'signup-button'}
							outlineBtn={false}
							customClass={'w-1/2 mt-6'}
						/>
					</div>
				</div>
			</form>
		</div>
	);
};

export default Signup;
