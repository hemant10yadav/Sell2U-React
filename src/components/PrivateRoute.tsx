import { Navigate, useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Paths, useContext } from '../utilities/commonImports';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
	const { isLoggedIn } = useContext(AppContext);
	const location = useLocation();
	return isLoggedIn ? (
		children
	) : (
		<Navigate to={Paths.LOGIN} state={{ from: location }} replace />
	);
};

export default PrivateRoute;
