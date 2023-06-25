import { useTranslation, React } from '../../imports/CommonImports';
import Input from '../../components/common/Input';

const Login: React.FC = () => {
	const { t } = useTranslation();
	return (
		<div>
			<h1>Login</h1>
			<Input
				handleChange={() => console.log('dsjhd')}
				value={'ksdj'}
				labelText={'hello'}
				labelFor={'hello'}
				id={'dsd'}
				name={'my first name'}
				type={'string'}
			/>
		</div>
	);
};

export default Login;
