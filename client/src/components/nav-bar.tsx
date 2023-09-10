import { Navbar } from 'flowbite-react';

const NavBar = (): JSX.Element => {
	const handleLogOut = () => {
		localStorage.removeItem('authToken');
		window.location.href = '/';
	};

	return (
		<Navbar fluid rounded>
			<Navbar.Brand href='/'>
				<img alt='Flowbite React Logo' className='mr-3 h-6 sm:h-9' src='/favicon.svg' />
				<span className='self-center whitespace-nowrap text-xl font-semibold dark:text-white'>
					Blog Api
				</span>
			</Navbar.Brand>
			<div className='flex md:order-2'>
				<Navbar.Toggle />
			</div>
			<Navbar.Collapse>
				<Navbar.Link href='/auth/login'>Log in</Navbar.Link>
				<Navbar.Link href='/auth/signup'>Sign up</Navbar.Link>
				<Navbar.Link className='hover:cursor-pointer' onClick={handleLogOut}>
					Log out
				</Navbar.Link>
				<Navbar.Link href='/blog'>Blog</Navbar.Link>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default NavBar;
