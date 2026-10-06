import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

export const schoolDB = mongoose.connection.useDb('schoolDB');

export const myApp = mongoose.connection.useDb('myApp');


export default connectDB;