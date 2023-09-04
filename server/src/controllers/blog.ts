import type { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

import Blog from '../models/blog';

const getBlogList = asyncHandler(async (req: Request, res: Response) => {
	const blogs = await Blog.find({}).populate('author').exec();

	res.json(blogs);
});

const addBlog = asyncHandler(async (req: Request, res: Response) => {
	const newBlog = new Blog({
		title: req.body.title,
		content: req.body.content,
		author: res.locals.currentAuthor,
	});

	await newBlog.save();

	res.json(newBlog);
});

const getBlog = asyncHandler(async (req: Request, res: Response) => {
	const blog = await Blog.findById(req.params.id);

	if (!blog) {
		res.status(404).json({ errorMessages: ['blog not found'] });
	}

	res.json(blog);
});

const updateBlog = asyncHandler(async (req: Request, res: Response) => {
	try {
		const updatedBlog = await Blog.findByIdAndUpdate(
			req.params.id,
			{
				title: req.body.title,
				content: req.body.content,
			},
			{ new: true }
		);

		if (!updatedBlog) {
			res.status(404).json({ errorMessages: ['blog not found'] });
			return;
		}

		res.json(updatedBlog);
	} catch (err) {
		res.status(400).json({ errorMessages: err });
	}
});

const deleteBlog = asyncHandler(async (req: Request, res: Response) => {
	try {
		const blogToDelete = await Blog.findByIdAndRemove(req.params.id);

		if (!blogToDelete) {
			res.status(404).json({ errorMessages: ['blog not found'] });
			return;
		}

		res.json({ successMessages: [`deleted blog with id ${req.params.id}`] });
	} catch (err) {
		res.status(400).json({ errorMessages: err });
	}
});

export { getBlogList, addBlog, getBlog, updateBlog, deleteBlog };
