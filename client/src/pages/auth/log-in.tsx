import { useEffect, useState } from 'react';
import { Button, Label, TextInput, Spinner } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';

import { ErrorToast } from '../../components/toast';
import { useLoginMutation } from '../../redux/api/auth/auth-api';

const LogIn = (): JSX.Element => {
	const navigate = useNavigate();
	const [login, { data, isLoading, isError }] = useLoginMutation();
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [errorMessages, setErrorMessages] = useState<string>('');

	useEffect(() => {
		if (data?.authToken) {
			localStorage.setItem('authToken', JSON.stringify(data.authToken));
			setEmail('');
			setPassword('');
			setErrorMessages('');
			navigate('/');
		}
		if (isError) {
			setErrorMessages('something went wrong');
		}
	}, [data, isError]);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			await login({ email, password });
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			{isError && <ErrorToast>{errorMessages}</ErrorToast>}
			<form className='flex max-w-md flex-col gap-4' onSubmit={handleSubmit}>
				<div>
					<div className='mb-2 block'>
						<Label htmlFor='email' value='Your email' />
					</div>
					<TextInput
						id='email'
						placeholder='something@something.com'
						required
						type='email'
						value={email}
						onChange={(e) => {
							setEmail(e.target.value);
						}}
					/>
				</div>

				<div>
					<div className='mb-2 block'>
						<Label htmlFor='password' value='Your password' />
					</div>
					<TextInput
						id='password'
						required
						type='password'
						value={password}
						onChange={(e) => {
							setPassword(e.target.value);
						}}
					/>
				</div>

				<Button className='w-full' color='light' type='submit'>
					{isLoading ? <Spinner aria-label='Center-aligned spinner' /> : 'log in'}
				</Button>
			</form>
		</>
	);
};

export default LogIn;
