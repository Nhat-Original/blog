import { useEffect, useState } from 'react';
import { Button, Label, TextInput, Spinner } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';

import { ErrorToast } from '../../components/toast';
import { useSignupMutation } from '../../redux/api/auth/auth-api';

const SignUp = (): JSX.Element => {
	const [firstName, setFirstName] = useState<string>('');
	const [lastName, setLastName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [errorMessages, setErrorMessages] = useState<string>('');
	const [signup, { data, isLoading, isError, error }] = useSignupMutation();
	const navigate = useNavigate();

	useEffect(() => {
		if (data) {
			setFirstName('');
			setLastName('');
			setEmail('');
			setPassword('');
			setErrorMessages('');
			navigate('/auth/login');
		}
		if (isError) {
			setErrorMessages('something went wrong');
		}
	}, [data, isError]);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			await signup({ firstName, lastName, email, password });
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
						<Label htmlFor='first-name' value='first name' />
					</div>
					<TextInput
						id='first-name'
						required
						shadow
						type='text'
						value={firstName}
						onChange={(e) => {
							setFirstName(e.target.value);
						}}
					/>
				</div>

				<div>
					<div className='mb-2 block'>
						<Label htmlFor='last-name' value='last name' />
					</div>
					<TextInput
						id='last-name'
						required
						shadow
						type='text'
						value={lastName}
						onChange={(e) => {
							setLastName(e.target.value);
						}}
					/>
				</div>

				<div>
					<div className='mb-2 block'>
						<Label htmlFor='email' value='Your email' />
					</div>
					<TextInput
						id='email'
						placeholder='name@flowbite.com'
						required
						shadow
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
						shadow
						type='password'
						value={password}
						onChange={(e) => {
							setPassword(e.target.value);
						}}
					/>
				</div>

				<Button className='w-full' color='light' type='submit'>
					{isLoading ? <Spinner aria-label='Center-aligned spinner' /> : 'sign in'}
				</Button>
			</form>
		</>
	);
};

export default SignUp;
