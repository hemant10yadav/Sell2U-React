import './App.css';
import AppRoute from './AppRoute';
import NavBar from './components/navBar/NavBar';

function App() {
	return (
		<div className="App">
			<div>
				<NavBar />
			</div>
			<AppRoute />
		</div>
	);
}

export default App;
