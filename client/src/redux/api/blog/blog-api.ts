import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = import.meta.env.VITE_BASE_URL as string;

export const blogApi = createApi({
	reducerPath: 'blogApi',
	baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/api` }),
	endpoints: (builder) => ({
		getBlogList: builder.query({
			query: () => ({
				url: '/blog',
				method: 'GET',
			}),
		}),
		getBlog: builder.query({
			query: (id) => ({
				url: `/blog/${id}`,
				method: 'GET',
			}),
		}),
		udateBlog: builder.mutation({
			query: ({ id, body }) => ({
				url: `/blog/${id}`,
				method: 'PUT',
				body: body,
				headers: {
					Authorization: `Bearer ${JSON.parse(localStorage.getItem('authToken') || '{}')}`,
				},
			}),
		}),
	}),
});

export const { useGetBlogListQuery, useGetBlogQuery, useUdateBlogMutation } = blogApi;
