// Connecting to database
import mongoose from 'mongoose';

export let con : mongoose.Connection

export const connectToDB : () => Promise<void> = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_CONFIG);
    con = connection.connection;
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch(error) {
    console.log(error);
    process.exit(1);
  }
}