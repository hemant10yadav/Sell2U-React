import { React, t } from '../../imports/commonImports';

const Home: React.FC = () => {
	return (
		<div className="text-3xl font-bold underline">
			<h1>{t('home.title')}</h1>
		</div>
	);
};

export default Home;
