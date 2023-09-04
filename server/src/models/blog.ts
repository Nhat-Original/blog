import mongoose from 'mongoose';
const { Schema, model } = mongoose;

type blog = {
	title: string;
	content: string;
	author: mongoose.Schema.Types.ObjectId;
	publish: Date;
};

const blogSchema = new Schema<blog>({
	title: { type: String, required: true, trim: true },
	content: { type: String, required: true, trim: true },
	author: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Author' },
	publish: { type: Date, required: true, default: Date.now() },
});

blogSchema.virtual('url').get(function () {
	return `blog/${this._id}`;
});

const Blog = model<blog>('Blog', blogSchema);

export default Blog;
