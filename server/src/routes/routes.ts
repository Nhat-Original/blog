import express from 'express';

import verifyToken from '../middlewares/verify-token';

import indexRouter from './index';
import blogRouter from './blog';
import authRouter from './auth';
import commentRouter from './comment';

const router = express.Router();

router.use('/', indexRouter);
router.use('/auth', authRouter);
router.use('/blog', blogRouter);
router.use('/comment', verifyToken, commentRouter);

export default router;
