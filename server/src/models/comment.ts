import mongoose from 'mongoose';
const { Schema, model } = mongoose;

type comment = {
	content: string;
	author: mongoose.Schema.Types.ObjectId;
	blog: mongoose.Schema.Types.ObjectId;
	publish: Date;
};

const commentSchema = new Schema<comment>({
	content: { type: String, required: true, trim: true },
	author: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Author' },
	blog: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Blog' },
	publish: { type: Date, required: true, default: Date.now() },
});

commentSchema.virtual('url').get(function () {
	return `comment/${this._id}`;
});

const Comment = model<comment>('Comment', commentSchema);

export default Comment;
