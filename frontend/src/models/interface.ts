import { ChangeEvent, React } from '../imports/commonImports';

export interface IToken {
	value: string;
	timestamp: Date;
}

export interface IInputProps {
	handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
	value: string;
	labelText: string;
	labelFor: string;
	id: string;
	name: string;
	type?: string;
	isRequired?: boolean;
	autoFocus?: boolean;
	placeholder?: string;
	customClass?: string;
	icon?: React.ComponentType<{ className?: string }>;
	endLineIcon?: React.ComponentType<{ className?: string }>;
	errorMessage?: string;
}

export interface IButton {
	labelKey: string;
	handleClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
	disabled?: boolean;
	customClass?: string;
	icon?: React.ComponentType<{ className?: string }>;
	id?: string;
	type?: 'submit' | 'button' | 'reset';
	rounded?: 'rounded-full' | 'rounded';
	outlineBtn?: boolean;
	color?: 'primary' | 'secondary';
}

export interface IButtonCssMap {
	[key: string]: {
		outlineBtn: string;
		btn: string;
	};
}

export interface IApiError {
	status: number;
	message: string;
	error?: [IError];
}

export interface IError {
	location: string;
	msg: string;
	path: string;
	type: string;
	value: string;
}

export interface IRoot {
	token: string;
	user: IUser;
}

export interface IUser {
	_id: string;
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	createdAt: string;
	updatedAt: string;
}

export interface IFieldType {
	[key: string]: string;
}
