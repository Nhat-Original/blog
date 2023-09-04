import type { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

import Blog from '../models/blog';
import Comment from '../models/comment';

const getCommentList = asyncHandler(async (req: Request, res: Response) => {
	const commentList = await Comment.find().exec();

	res.json(commentList);
});

const addComment = asyncHandler(async (req: Request, res: Response) => {
	const { blogId, content } = req.body;

	const blog = await Blog.findById(blogId);

	if (!blog) {
		res.status(404).json({ errorMessages: ['blog not found'] });
		return;
	}

	const newComment = new Comment({
		blog: blog,
		author: res.locals.currentAuthor,
		content: content,
	});

	await newComment.save();
	res.json(newComment);
});

const getComment = asyncHandler(async (req: Request, res: Response) => {
	const comment = await Comment.findById(req.params.id).exec();

	if (!comment) {
		res.status(404).json({ errorMessages: ['message not found'] });
		return;
	}

	res.json(comment);
});

const updateComment = asyncHandler(async (req: Request, res: Response) => {
	try {
		const updatedComment = await Comment.findByIdAndUpdate(
			req.params.id,
			{
				content: req.body.content,
			},
			{ new: true }
		);

		if (!updatedComment) {
			res.status(404).json({ errorMessages: ['comment not found'] });
			return;
		}

		res.json(updatedComment);
	} catch (err) {
		res.status(400).json({ errorMessages: err });
	}
});

const deleteComment = asyncHandler(async (req: Request, res: Response) => {
	try {
		const commentToDelete = await Comment.findByIdAndRemove(req.params.id);

		if (!commentToDelete) {
			res.status(404).json({ errorMessages: ['comment not found'] });
			return;
		}

		res.json({ successMessages: [`deleted comment with id ${req.params.id}`] });
	} catch (err) {
		res.status(400).json({ errorMessages: err });
	}
});

export { getCommentList, addComment, getComment, updateComment, deleteComment };
