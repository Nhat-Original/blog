import { useAppSelector } from '../../redux/hooks';
import type { Author } from '../../redux/features/author/author-slice';

const Home = () => {
	const author = useAppSelector((state) => state.author as Author);

	return (
		<div>
			{Object.keys(author).length !== 0 ? `hello ${author.firstName} ${author.lastName}` : ''}
		</div>
	);
};

export default Home;
