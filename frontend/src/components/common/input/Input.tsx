import './Input.css';
import { React, useState } from '../../../imports/CommonImports';
import { IInputProps } from '../../../models/interface';

const fixedInputClass =
	'w-full p-2 focus:outline-0 border-b-2' +
	' focus:border-blue-500 border-stone-300';
const iconClass = 'w-5 h-5 transition ease-in';
const focusIconClass = 'text-blue-500 scale-110 animate-bounce';

const Input: React.FC<IInputProps> = ({
	handleChange,
	value,
	labelText,
	labelFor,
	id,
	name,
	type,
	isRequired = false,
	autoFocus = false,
	placeholder,
	customClass,
	icon: IconComponent,
}) => {
	const [focus, setFocus] = useState<boolean>(false);

	return (
		<div className="my-5">
			<label htmlFor={labelFor} className="sr-only">
				{labelText}
			</label>
			<div className="relative mb-6">
				{IconComponent && (
					<div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
						<IconComponent
							className={`${iconClass} ${
								focus ? focusIconClass : 'text-stone-300'
							}`}
						/>
					</div>
				)}
				<input
					onChange={handleChange}
					value={value}
					id={id}
					name={name}
					type={type ? type : 'text'}
					required={isRequired}
					autoFocus={autoFocus}
					className={`${fixedInputClass} ${customClass || ''} ${
						IconComponent ? 'pl-8' : ''
					}`}
					placeholder={placeholder}
					onFocus={() => setFocus(true)}
					onBlur={() => setFocus(false)}
				/>
			</div>
		</div>
	);
};

export default Input;
