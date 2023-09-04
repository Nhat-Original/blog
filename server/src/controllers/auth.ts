import type { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import Author from '../models/author';
import type { author } from '../models/author';

const signUp = asyncHandler(async (req: Request, res: Response) => {
	const { firstName, lastName, email, password } = req.body as author;
	const validateErrors: string[] = [];

	if (validator.isEmpty(firstName)) validateErrors.push('first name must not be empty');
	if (validator.isEmpty(lastName)) validateErrors.push('last name must not be empty');
	if (validator.isEmpty(email)) validateErrors.push('email must not be empty');
	if (validator.isEmpty(password)) validateErrors.push('password must not be empty');
	if (!validator.isEmail(email)) validateErrors.push('email must be valid');
	if (!validator.isLength(password, { min: 6 }))
		validateErrors.push('password must be at least 6 chatacters');

	if (validateErrors.length > 0) {
		res.status(400).json({ errorMessages: validateErrors });
		return;
	}

	const salt = bcrypt.genSaltSync(10);
	const hash = bcrypt.hashSync(password, salt);

	const newAuthor = new Author({
		firstName,
		lastName,
		email,
		password: hash,
	});

	await newAuthor.save();

	res.json(newAuthor);
});

const logIn = asyncHandler(async (req: Request, res: Response) => {
	const { email, password } = req.body as author;
	const currentAuthor = await Author.findOne({ email: email });

	if (!currentAuthor) {
		res.status(400).json({ errorMessages: ['cannot find email'] });
		return;
	}

	if (!bcrypt.compareSync(password, currentAuthor.password)) {
		res.status(400).json({ errorMessages: ['password is incorrect'] });
		return;
	}

	jwt.sign(
		{ currentAuthor: currentAuthor },
		String(process.env.JWT_SECRET),
		{ expiresIn: '1d' },
		(err, token) => {
			if (err) {
				res.status(500).json({ errorMessages: ['cannot return auth token'] });
				return;
			}

			res.json({ authToken: token });
		}
	);
});

const getSession = (req: Request, res: Response) => {
	res.json(res.locals.currentAuthor);
};

export { signUp, logIn, getSession };
