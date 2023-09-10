import { useEffect, useState } from 'react';
import { Button, Label, TextInput, Textarea } from 'flowbite-react';
import { ErrorToast } from '../../components/toast';
import { useParams } from 'react-router-dom';

import { useGetBlogQuery, useUdateBlogMutation } from '../../redux/api/blog/blog-api';

const BlogEditor = (): JSX.Element => {
	const [updateBlog, { isError: isUpdateError, isLoading: isUpdateLoading }] =
		useUdateBlogMutation();
	const { id } = useParams();
	const { data, isLoading: isGetBlogLoading, isError: isGetBlogError } = useGetBlogQuery(id);
	const [title, setTitle] = useState<string>('');
	const [content, setContent] = useState<string>('');
	const [errorMessages, setErrorMessages] = useState<string>('');

	const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			await updateBlog({ id, body: { title, content } });
			window.location.href = `/blog/${id}`;
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		if (data) {
			setTitle(data.title);
			setContent(data.content);
		}
	}, [data]);

	useEffect(() => {
		if (isUpdateError) {
			setErrorMessages('something went wrong');
		}
	}, [isUpdateError]);

	return (
		<>
			{isUpdateError && <ErrorToast>{errorMessages}</ErrorToast>}
			{isGetBlogError ? (
				<p>cannot find id</p>
			) : isGetBlogLoading ? (
				<p>Loading...</p>
			) : (
				<form className='flex max-w-md flex-col gap-4' onSubmit={handleUpdate}>
					<div>
						<div className='mb-2 block'>
							<Label htmlFor='title' value='Title' />
						</div>
						<TextInput
							id='title'
							placeholder='blog title'
							required
							type='text'
							value={title}
							onChange={(e) => {
								setTitle(e.target.value);
							}}
						/>
					</div>

					<div>
						<div className='mb-2 block'>
							<Label htmlFor='content' value='Content' />
						</div>
						<Textarea
							id='comment'
							placeholder='blog content'
							required
							rows={4}
							value={content}
							onChange={(e) => {
								setContent(e.target.value);
							}}
						/>
					</div>

					<Button className='w-full' color='light' type='submit'>
						{isUpdateLoading ? 'loading...' : 'Submit'}
					</Button>
				</form>
			)}
		</>
	);
};

export default BlogEditor;
