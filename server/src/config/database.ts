import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();


const MONGO_URI = process.env.MONGO_URI
const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI!, {});
        console.log(`MongoDB Connected: ${MONGO_URI}`);
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit process if connection fails
    }
};

export default connectDB;