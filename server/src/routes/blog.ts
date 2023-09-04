import express from 'express';

import verifyAdmin from '../middlewares/verify-admin';

import { getBlogList, addBlog, getBlog, updateBlog, deleteBlog } from '../controllers/blog';

const router = express.Router();

router.get('/', getBlogList);

router.post('/', verifyAdmin, addBlog);

router.get('/:id', getBlog);

router.put('/:id', verifyAdmin, updateBlog);

router.delete('/:id', verifyAdmin, deleteBlog);

export default router;
