import { React, ChangeEvent } from '../../imports/CommonImports';
import './Input.css';

interface InputProps {
	handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
	value: string;
	labelText: string;
	labelFor: string;
	id: string;
	name: string;
	type?: string;
	isRequired?: boolean;
	placeholder?: string;
	customClass?: string;
	icon?: React.ComponentType<{ className?: string }>;
	errorMessage?: string;
}

const fixedInputClass = `bg-gray-50 border border-gray-300 text-gray-900 text-sm 
rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full
p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`;

const Input: React.FC<InputProps> = ({
	handleChange,
	value,
	labelText,
	labelFor,
	id,
	name,
	type,
	isRequired = false,
	placeholder,
	customClass,
	icon: IconComponent,
}) => {
	return (
		<div className="my-5">
			<label htmlFor={labelFor} className="sr-only">
				{labelText}
			</label>
			<div className="relative mb-6">
				{IconComponent && (
					<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
						<IconComponent className="w-5 h-5 text-gray-500 dark:text-gray-400" />
					</div>
				)}
				<input
					onChange={handleChange}
					value={value}
					id={id}
					name={name}
					type={type ? type : 'text'}
					required={isRequired}
					className={`${fixedInputClass} ${customClass || ''} ${
						IconComponent ? 'pl-10' : ''
					}`}
					placeholder={placeholder}
				/>
			</div>
		</div>
	);
};

export default Input;
