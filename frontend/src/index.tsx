import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import i18n from './assets/i18n/i18nConfig';
import { I18nextProvider } from 'react-i18next';

// eslint-disable-next-line import/no-named-as-default-member
const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<I18nextProvider i18n={i18n}>
				<App />
			</I18nextProvider>
		</BrowserRouter>
	</React.StrictMode>
);
