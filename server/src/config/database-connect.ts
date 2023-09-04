import mongoose from 'mongoose';

async function databaseConnect() {
	try {
		await mongoose.connect(process.env.MONGO_URL as string);
		console.log('connected to mongoDB');
	} catch (err) {
		console.error(`error connecting to mongoDB: ${err}`);
	}
}

export default databaseConnect;
