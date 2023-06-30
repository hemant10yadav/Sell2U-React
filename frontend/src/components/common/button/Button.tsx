import { React, useTranslation } from '../../../imports/CommonImports';
import { IButton } from '../../../models/interface';

const fixedBtnClass = '';
const Button: React.FC<IButton> = ({
	labelKey,
	id,
	handleClick,
	type = 'button',
	icon: IconComponent,
	customClass = '',
	disabled = false,
	...rest
}) => {
	const { t } = useTranslation();
	return (
		<button
			id={id}
			type={type}
			onClick={handleClick}
			className={`${customClass}`}
			disabled={disabled}
			{...rest}
		>
			{IconComponent && <IconComponent />}
			{t(labelKey)}
		</button>
	);
};

export default Button;
