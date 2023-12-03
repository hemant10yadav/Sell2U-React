import './Input.css';
import {
	classNames,
	React,
	translate,
	useState,
} from '../../../utilities/commonImports';
import { IInputProps } from '../../../utilities/interface';

const Input: React.FC<IInputProps> = ({
	handleChange,
	value,
	labelKey,
	id,
	type = 'text',
	required = true,
	autoFocus = false,
	placeholder,
	customClass,
	errorMessageKey,
}) => {
	const [focus, setFocus] = useState<boolean>(false);
	const [inputType, setInputType] = useState<string>(type);
	const inputCss = classNames(
		customClass,
		errorMessageKey ? 'border-2 border-red-500' : 'border-stone-300'
	);

	return (
		<div>
			<label
				htmlFor={id}
				className="block text-sm font-medium leading-6 text-gray-900"
			>
				{translate(labelKey)}
			</label>

			<div className="mt-2">
				<input
					className={inputCss}
					onChange={handleChange}
					value={value}
					id={id}
					name={id}
					type={inputType}
					required={required}
					autoFocus={autoFocus}
					placeholder={placeholder}
					onFocus={() => setFocus(true)}
					onBlur={() => setFocus(false)}
				/>
			</div>
			{errorMessageKey && (
				<p className="text-red-500 text-xs italic">
					*{translate(errorMessageKey)}
				</p>
			)}
		</div>
	);
};

export default Input;
