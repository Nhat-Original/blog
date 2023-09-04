import express from 'express';

import verifyToken from '../middlewares/verify-token';

import { signUp, logIn, getSession } from '../controllers/auth';

const router = express.Router();

router.post('/signup', signUp);

router.post('/login', logIn);

router.get('/session', verifyToken, getSession);

export default router;
