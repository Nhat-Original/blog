import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Author = {
	_id: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	isAdmin: boolean;
};

type AuthorState = Author | {};

const initialState: AuthorState = {};

const authorSlice = createSlice({
	initialState,
	name: 'authorSlice',
	reducers: {
		clearAuthor: () => initialState,
		setAuthor: (state, action: PayloadAction<AuthorState>) => {
			return action.payload;
		},
	},
});

export type { Author };
export default authorSlice.reducer;
export const { clearAuthor, setAuthor } = authorSlice.actions;
