import { useTranslation, React } from '../../imports/CommonImports';

const Home: React.FC = () => {
	const { t } = useTranslation();
	return (
		<div className="text-3xl font-bold underline">
			<h1>{t('home.title')}</h1>
		</div>
	);
};

export default Home;
