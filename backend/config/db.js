// Connecting to database
import mongoose from 'mongoose';

export let con;

export const connectToDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_CONFIG);
    con = connection.connection;
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch(error) {
    console.log(error);
    process.exit(1);
  }
}