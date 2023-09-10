import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = import.meta.env.VITE_BASE_URL as string;

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/api` }),
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (body) => ({
				url: '/auth/login',
				method: 'POST',
				body: body,
			}),
		}),
		signup: builder.mutation({
			query: (body) => ({
				url: '/auth/signin',
				method: 'POST',
				body: body,
			}),
		}),
		getSession: builder.query({
			query: () => ({
				url: '/auth/session',
				method: 'GET',
				headers: {
					Authorization: `Bearer ${JSON.parse(localStorage.getItem('authToken') || '{}')}`,
				},
			}),
		}),
	}),
});

export const { useLoginMutation, useSignupMutation, useGetSessionQuery } = authApi;
