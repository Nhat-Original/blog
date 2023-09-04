import type { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
	const bearerHeader = req.headers.authorization as string;

	if (!bearerHeader) {
		res.status(403).json({ errorMessages: ['cannot find auth token'] });
		return;
	}

	const token = bearerHeader.split(' ')[1];

	jwt.verify(token, String(process.env.JWT_SECRET), (err, decoded) => {
		if (err) {
			res.status(403).json({ errorMessages: ['auth token is not valid'] });
			return;
		}

		res.locals.currentAuthor = (decoded as JwtPayload).currentAuthor;

		if (!res.locals.currentAuthor.isAdmin) {
			res.status(403).json({ errorMessages: ['cannot access'] });
			return;
		}

		next();
	});
};

export default verifyAdmin;
