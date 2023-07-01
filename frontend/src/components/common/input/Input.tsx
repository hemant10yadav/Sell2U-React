import './Input.css';
import { React, useState } from '../../../imports/CommonImports';
import { IInputProps } from '../../../models/interface';

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
							className={`fixed-icon ${
								focus ? 'fixed-focus-icon' : 'text-stone-300'
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
					className={`fixed-input ${customClass || ''} ${
						IconComponent ? 'p-2 pl-8' : 'p-2'
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
