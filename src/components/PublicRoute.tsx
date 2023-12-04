import { Navigate, redirect } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { useContext } from '../utilities/commonImports';

const PublicRoute = ({ children }: { children: JSX.Element }) => {
	const { isLoggedIn } = useContext(AppContext);
	return !isLoggedIn ? children : <Navigate to="/" />;
};

export default PublicRoute;
