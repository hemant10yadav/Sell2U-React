import { React, translate } from '../../imports/commonImports';

const Home: React.FC = () => {
	return (
		<div className="text-3xl font-bold underline">
			<h1>{translate('home.title')}</h1>
		</div>
	);
};

export default Home;
