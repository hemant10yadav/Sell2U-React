import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Home from './pages/home/Home';
import {
	Paths,
	useContext,
	useEffect,
	useState,
} from './utilities/commonImports';
import { AppContext } from './context/AppContext';
import NavBar from './components/navBar/NavBar';
import AddProduct from './pages/addProduct/AddProduct';
import Verification from './pages/verification/Verification';

const AppRoute = () => {
	const [state, setState] = useState(false);
	const { isLoggedIn, login } = useContext(AppContext);
	useEffect(() => {
		const hem = async () => {
			if (!isLoggedIn) {
				try {
					await login(null);
				} catch (err) {
					console.log('Not logged in');
				}
			}
		};
		hem().finally(() => {
			setState(true);
		});
	}, []);
	return (
		<>
			{state ? (
				<>
					<NavBar />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path={Paths.LOGIN} element={<Login />} />
						<Route path={Paths.SIGN_UP} element={<Signup />} />
						<Route path="/add-product" element={<AddProduct />} />
						<Route
							path={`${Paths.USERS}${Paths.EMAIL}${Paths.VERIFY}`}
							element={<Verification />}
						/>
					</Routes>
				</>
			) : (
				<div className="absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
					{/*<ColorRing*/}
					{/*	visible={true}*/}
					{/*	height="80"*/}
					{/*	width="80"*/}
					{/*	ariaLabel="blocks-loading"*/}
					{/*	wrapperStyle={{}}*/}
					{/*	wrapperClass="blocks-wrapper"*/}
					{/*	colors={['#3490dc', '#38a169', '#d69e2e', '#6b46c1', '#f56565']}*/}
					{/*/>*/}
				</div>
			)}
		</>
	);
};

export default AppRoute;
