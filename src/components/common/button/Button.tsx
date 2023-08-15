import './button.css';
import { classNames, React, translate } from '../../../imports/commonImports';
import { IButton, IButtonCssMap } from '../../../types/interface';

const buttonCssMap: IButtonCssMap = {
	primary: {
		outlineBtn:
			'bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white outline-blue-500',
		btn: `bg-blue-500 hover:bg-transparent hover:text-blue-500 text-white outline-blue-500`,
	},
	secondary: {
		outlineBtn:
			'bg-transparent hover:bg-purple-500 text-blue-500' +
			' hover:text-white outline-purple-500',
		btn: `bg-purple-500 hover:bg-transparent hover:text-purple-500 text-white outline-purple-500`,
	},
};

const Button: React.FC<IButton> = ({
	labelKey,
	id,
	handleClick,
	rounded = 'rounded',
	outlineBtn = true,
	color = 'primary',
	type = 'button',
	icon: IconComponent,
	customClass = '',
	disabled = false,
	...rest
}) => {
	const btnCss: string = classNames(
		'fixed-btn',
		rounded,
		disabled ? 'cursor-not-allowed opacity-75' : '',
		outlineBtn ? buttonCssMap[color].outlineBtn : buttonCssMap[color].btn,
		customClass
	);
	return (
		<button
			id={id}
			type={type}
			onClick={handleClick}
			className={btnCss}
			disabled={disabled}
			{...rest}
		>
			{IconComponent && <IconComponent className="me-2 align-middle" />}
			<span className="align-middle">{translate(labelKey)}</span>
		</button>
	);
};

export default Button;
