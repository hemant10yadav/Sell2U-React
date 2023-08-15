/*
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import LocalStorageService from '../services/LocalStorageService';
import { Route } from 'react-router-dom';
import { IRouteProp } from '../utilities/interface';

const AuthGaurd: React.FC<IRouteProp> = (props: IRouteProp) => {
	const { isLoggedIn, login } = useContext(AppContext);

	if (!isLoggedIn) {
		const token = LocalStorageService.getInstance().getToken();
		if (token) {
			login(null);
			return <Route path={props.path} element={props.component} />;
		}
	}
};

export default AuthGaurd;
*/

export {};
