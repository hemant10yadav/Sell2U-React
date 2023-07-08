import './Input.css';
import { classNames, React, useState } from '../../../imports/commonImports';
import { IInputProps } from '../../../models/interface';

const Input: React.FC<IInputProps> = ({
	handleChange,
	value,
	labelText,
	labelFor,
	id,
	name,
	type = 'text',
	isRequired = false,
	autoFocus = false,
	placeholder,
	customClass,
	icon: IconComponent,
	endLineIcon: EndIconComponent,
	errorMessage,
}) => {
	const [focus, setFocus] = useState<boolean>(false);
	const [inputType, setInputType] = useState<string>(type);
	const inputCss = classNames(
		'fixed-input focus:text-blue-500',
		customClass,
		IconComponent ? 'p-2 pl-8' : 'p-2',
		EndIconComponent ? 'pe-8' : '',
		errorMessage ? 'border-red-500' : 'border-stone-300'
	);
	const iconCss = classNames(
		'fixed-icon',
		focus ? 'fixed-focus-icon' : 'text-stone-300',
		errorMessage ? 'text-red-500' : ''
	);

	return (
		<div className="mt-5">
			<label htmlFor={labelFor} className="sr-only">
				{labelText}
			</label>
			<div className="relative">
				{IconComponent && (
					<div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
						<IconComponent className={iconCss} />
					</div>
				)}
				<input
					onChange={handleChange}
					value={value}
					id={id}
					name={name}
					type={inputType}
					required={isRequired}
					autoFocus={autoFocus}
					className={inputCss}
					placeholder={placeholder}
					onFocus={() => setFocus(true)}
					onBlur={() => setFocus(false)}
				/>
				{EndIconComponent && (
					<div
						onClick={() => setInputType('text')}
						onMouseLeave={() => setInputType('password')}
						className="absolute inset-y-0 right-0 flex items-center cursor-pointer"
					>
						<EndIconComponent className={iconCss} />
					</div>
				)}
			</div>
			{errorMessage && (
				<p className="text-red-500 text-xs italic">*{errorMessage}</p>
			)}
		</div>
	);
};

export default Input;
