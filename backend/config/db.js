// Connecting to database
import mongoose from 'mongoose';

export const connectToDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_CONFIG);
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch(error) {
    console.log(error);
    process.exit(1);
  }
}
