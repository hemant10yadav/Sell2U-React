import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Home from './pages/home/Home';
import { Paths } from './utilities/commonImports';

const AppRoute = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path={Paths.LOGIN} element={<Login />} />
			<Route path={Paths.SIGNUP} element={<Signup />} />
		</Routes>
	);
};

export default AppRoute;
