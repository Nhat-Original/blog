import path from 'node:path';

import dotenv from 'dotenv';
import express from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import databaseConnect from './config/database-connect';

import routes from './routes/routes';

dotenv.config();

databaseConnect();

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
	cors({
		origin: ((): string => {
			if (process.env.NODE_ENV === 'production') {
				return process.env.CLIENT_ORIGIN as string;
			} else {
				return process.env.CLIENT_DEV_ORIGIN as string;
			}
		})(),
	})
);

app.use('/api', routes);

let port: number | string;
if (process.env.NODE_ENV === 'debug') {
	port = 4000;
} else port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`app is listening on http://localhost:${port}`);
});
