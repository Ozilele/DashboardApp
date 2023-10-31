// Connecting to database
import mongoose from 'mongoose';
import { createClient } from 'redis';
import { RedisClient } from '../types/types.js';

export let con: mongoose.Connection
export let redisClient: RedisClient;

export const connectToDB: () => Promise<void> = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_CONFIG);
    con = connection.connection;
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch(error) {
    console.log(error);
    process.exit(1);
  }
}

export const createRedisClient = async () => {
  redisClient = await createClient()
  .on('error', err => console.log('Redis Client Error', err))
  .connect();
}