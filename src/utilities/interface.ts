import { ChangeEvent, React } from '../utilities/commonImports';
import { ProductCategory, ProductSubCategory, Role } from './enum';
import type { size } from '@material-tailwind/react/types/components/dialog';

export interface IToken {
	value: string;
	timestamp: Date;
}

export interface IInputProps {
	handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
	labelKey: string;
	id: string;
	value?: string;
	type?: string;
	required?: boolean;
	autoFocus?: boolean;
	placeholder?: string;
	customClass?: string;
	errorMessageKey?: string;
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
	userId: number;
	firstName: string;
	_id: string;
	lastName: string;
	username: string;
	email: string;
	password: string;
	role: Role;
	cart: string[];
	orders: string[];
	address: IAddress[];
	wishlist: string[];
	createdAt: Date;
	updatedAt: Date;
	verified: boolean;
	emailVerificationToken: string;
}

export interface IAddress {
	street: string;
	city: string;
	country: string;
}

export interface IFieldType {
	[key: string]: string;
}

export interface IAppContext {
	user: IUser;
}

export interface IProduct {
	_id: string;
	productId: string;
	name: string;
	description: string;
	price: number;
	discount?: number;
	brand?: string;
	category: ProductCategory;
	subcategory: ProductSubCategory;
	quantity: number;
	images?: string[];
	user: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface IRouteProp {
	path: string;
	component: React.ReactNode;
}

export interface IModalProps {
	openModal: boolean;
	headerKey: string;
	bodyKey: string;
	size: size;
	onConfirm?: () => void;
	onCancel?: () => void;
}
