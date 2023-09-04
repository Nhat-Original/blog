import type { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

const getIndex = asyncHandler(async (req: Request, res: Response) => {
	res.send('Odin blog api');
});

export { getIndex };
