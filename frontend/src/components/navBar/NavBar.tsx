import { Link } from 'react-router-dom';
import { React, t } from '../../imports/commonImports';
import appLogo from '../../assets/logo&Images/sell2u-logo.png';
import './NavBar.css';

const NavBar: React.FC = () => {
	return (
		<section className="app-bg-color p-3">
			<div>
				<img
					className="inline fit-logo cursor-pointer"
					alt={t('app.logo')}
					src={appLogo as string}
				/>
				<span className="float-right flex gap-2">
					<Link to="/login">{t('login.title')}</Link>
					<Link to="/signup">{t('signup.title')}</Link>
				</span>
			</div>
		</section>
	);
};

export default NavBar;
