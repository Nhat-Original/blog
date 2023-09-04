import mongoose from 'mongoose';
const { Schema, model } = mongoose;

type author = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	isAdmin: boolean;
};

const authorSchema = new Schema<author>({
	firstName: { type: String, required: true, trim: true, lowercase: true },
	lastName: { type: String, required: true, trim: true, lowercase: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	isAdmin: { type: Boolean, required: true, default: false },
});

authorSchema.virtual('fullName').get(function () {
	return `${this.firstName} ${this.lastName}`;
});

authorSchema.virtual('url').get(function () {
	return `author/${this._id}`;
});

const Author = model<author>('Author', authorSchema);

export default Author;
export { author };
