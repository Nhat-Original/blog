import { Outlet } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';
import type { Author } from '../redux/features/author/author-slice';

const VerifyAdmin = (): JSX.Element => {
	const author = useAppSelector((state) => state.author as Author);

	return <>{!author.isAdmin ? <h1>Not Authorized</h1> : <Outlet />}</>;
};

export default VerifyAdmin;
