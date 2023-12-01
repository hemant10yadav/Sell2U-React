import { useNavigate, useSearchParams } from 'react-router-dom';
import APIService from '../../services/ApiService';
import Paths from '../../utilities/Paths';
import { AppContext } from '../../context/AppContext';
import { useContext } from 'react';

const Verification: React.FC = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	//const { isLoggedIn } = useContext(AppContext);
	const navigate = useNavigate();
	const token = searchParams.get('token') as string;
	if (!token) {
		navigate(Paths.LOGIN);
	}
	APIService.getInstance()
		.post(`${Paths.USERS}${Paths.EMAIL}${Paths.VERIFY}?token=${token}`, {})
		.then((res) => {})
		.catch((err) => {
			console.log(err);
		});
	return <div></div>;
};

export default Verification;
