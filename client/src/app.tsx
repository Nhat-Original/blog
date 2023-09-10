import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { setAuthor } from './redux/features/author/author-slice';

import { useGetSessionQuery } from './redux/api/auth/auth-api';

import VerifyAdmin from './utils/verify-admin';

import NavBar from './components/nav-bar';
import Home from './pages/home/home';
import LogIn from './pages/auth/log-in';
import SignUp from './pages/auth/sign-up';

import Blog from './pages/blog/blog';
import BlogDetail from './pages/blog/blog-detail';
import BlogEditor from './pages/blog/blog-editor';

const App = () => {
	const { data } = useGetSessionQuery(null);
	const dispatch = useDispatch();

	useEffect(() => {
		if (data) {
			dispatch(setAuthor(data));
		}
	}, [data]);

	return (
		<>
			<NavBar />
			<Routes>
				<Route path='/' element={<Home />}></Route>
				<Route path='/auth/login' element={<LogIn />}></Route>
				<Route path='/auth/signup' element={<SignUp />}></Route>
				<Route path='/blog' element={<Blog />}></Route>
				<Route path='/blog/:id' element={<BlogDetail />}></Route>
				<Route element={<VerifyAdmin />}>
					<Route path='/blog/:id/edit' element={<BlogEditor />}></Route>
				</Route>
			</Routes>
		</>
	);
};

export default App;
