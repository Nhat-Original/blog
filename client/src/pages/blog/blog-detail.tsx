import { useParams } from 'react-router-dom';

import { useGetBlogQuery } from '../../redux/api/blog/blog-api';

const BlogDetail = (): JSX.Element => {
	const { id } = useParams();
	const { data, isLoading, isError } = useGetBlogQuery(id);

	return (
		<>
			{isError ? (
				<p>cannot find id</p>
			) : isLoading ? (
				<p>Loading...</p>
			) : (
				<div>
					<h1>
						{data.title} ({data._id})
					</h1>
					<article>{data.content}</article>
					<p>
						by {data.author.firstName} {data.author.lastName}
					</p>
				</div>
			)}
		</>
	);
};

export default BlogDetail;
