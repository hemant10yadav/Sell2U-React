import { Link } from 'react-router-dom';
import { useTranslation } from '../../imports/commonimports';
const NavBar: React.FC = () => {
	const { t } = useTranslation();
	return (
		<section>
			<Link to="/login">{t('login.title')}</Link>
			<Link to="/signup">{t('signup.title')}</Link>
		</section>
	);
};

export default NavBar;
