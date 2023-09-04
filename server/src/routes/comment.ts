import express from 'express';

import {
	getCommentList,
	addComment,
	getComment,
	updateComment,
	deleteComment,
} from '../controllers/comment';

const router = express.Router();

router.get('/', getCommentList);

router.post('/', addComment);

router.get('/:id', getComment);

router.put('/:id', updateComment);

router.delete('/:id', deleteComment);

export default router;
