import { React, translate } from '../../utilities/commonImports';

const Home: React.FC = () => {
	return (
		<div className="text-3xl font-bold underline">
			<h1>{translate('home.title')}</h1>
		</div>
	);
};

export default Home;
