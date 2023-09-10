import { configureStore } from '@reduxjs/toolkit';

import { authApi } from './api/auth/auth-api';
import { blogApi } from './api/blog/blog-api';

import authorReducer from './features/author/author-slice';

export const store = configureStore({
	reducer: {
		[authApi.reducerPath]: authApi.reducer,
		[blogApi.reducerPath]: blogApi.reducer,
		author: authorReducer,
	},
	devTools: import.meta.env.VITE_ENV === 'development',
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({}).concat([authApi.middleware, blogApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
