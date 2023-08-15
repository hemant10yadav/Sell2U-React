import { Link } from 'react-router-dom';
import {
	Paths,
	React,
	translate,
	useContext,
} from '../../utilities/commonImports';
import appLogo from '../../assets/logo&Images/sell2u-logo.png';
import './NavBar.css';
import { AppContext } from '../../context/AppContext';

const NavBar: React.FC = () => {
	const { isLoggedIn, logout } = useContext(AppContext);

	const handleLogout = () => {
		logout();
	};

	const logoutElements = (
		<>
			<Link to={Paths.LOGIN}>{translate('login.title')}</Link>
			<Link to={Paths.SIGNUP}>{translate('signup.title')}</Link>
		</>
	);

	const loggedInElements = (
		<>
			<button onClick={handleLogout}>Logout</button>
		</>
	);

	return (
		<section className="app-bg-color p-3">
			<div>
				<img
					className="inline fit-logo cursor-pointer"
					alt={translate('app.logo')}
					src={appLogo as string}
				/>
				<span className="float-right flex gap-2 text-white">
					{isLoggedIn ? loggedInElements : logoutElements}
				</span>
			</div>
		</section>
	);
};

export default NavBar;
