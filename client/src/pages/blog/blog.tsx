import { useNavigate } from 'react-router-dom';
import { Card } from 'flowbite-react';

import { useGetBlogListQuery } from '../../redux/api/blog/blog-api';

const Blog = (): JSX.Element => {
	const navigate = useNavigate();
	const { data, isLoading } = useGetBlogListQuery(null);

	return (
		<ul>
			{isLoading ? (
				<p>Loading...</p>
			) : (
				data?.map((blog: any) => (
					<li
						key={blog._id}
						className='hover:cursor-pointer'
						onClick={() => navigate(`/blog/${blog._id}`)}
					>
						<Card>
							<h2>{blog.title}</h2>
							<p>by {`${blog.author.firstName} ${blog.author.lastName}`}</p>
						</Card>
					</li>
				))
			)}
		</ul>
	);
};

export default Blog;
