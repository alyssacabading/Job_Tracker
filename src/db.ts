import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const DB_CONN_STRING = process.env.DB_CONN_STRING || '';

export const connectToMongoDB = async () => {
  try {

    await mongoose.connect(DB_CONN_STRING);   // import DB_CONN_STRING from .env file
    console.log('Connected to MongoDB...');

  } catch (error) {
    console.error('Error connecting to MongoDB\n', error);
    process.exit(1); // Exit process with failure
  }
};

