import './App.css';
import AppRoute from './AppRoute';
import { DefaultToastOptions, Toaster } from 'react-hot-toast';
import { AppContextProvider } from './context/AppContext';

const toasterOptions: DefaultToastOptions = {
	duration: 500,
	loading: {
		style: {
			background: 'white',
			color: 'yellow',
		},
		duration: 1200,
		iconTheme: {
			primary: 'yellow',
			secondary: 'white',
		},
	},
	success: {
		style: {
			background: 'white',
			color: 'green',
		},
		duration: 1200,
		iconTheme: {
			primary: 'green',
			secondary: 'white',
		},
	},
	error: {
		style: {
			background: 'white',
			color: 'red',
		},
		duration: 2000,
		iconTheme: {
			primary: 'red',
			secondary: 'white',
		},
	},
};

function App() {
	return (
		<div className="App app-bg-gradient min-h-screen font-sans">
			<AppContextProvider>
				<AppRoute />
				<Toaster
					position="top-right"
					gutter={8}
					toastOptions={toasterOptions}
				/>
			</AppContextProvider>
		</div>
	);
}

export default App;
