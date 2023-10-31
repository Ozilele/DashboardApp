import { Request } from 'express';
import { Date, HydratedDocument, Types } from 'mongoose';
import { createClient } from 'redis';

export interface User {
  firstName: string,
  secondName: string,
  email: string,
  password: string,
  imageFile?: string,
  role?: string, // optional property
  refreshToken?: string[],
}

export interface UserToken {
  userId: string,
  email: string
}

export interface Event {
  date: string,
  time: string,
  data: {
    name: string,
    localization: string,
    description: string,
  }
}

export interface Booking {
  hotel: Types.ObjectId,
  user: Types.ObjectId,
  isPaid: boolean,
  paymentMethod?: string,
  duration: {
    from: Date,
    to: Date,
  },
  amount: number,
}

export type UserInfo = {
  profilePicture?: string,
  username: string,
}

export interface Review {
  rating: number,
  content?: string,
  hotel: Types.ObjectId,
  author: Types.ObjectId,
  userInfo?: UserInfo
}

export interface Req extends Request {
  user?: HydratedDocument<User>
}

export type Verification = {
  valid: boolean,
  expired?: boolean,
  decoded: UserToken | null,
}

export type FavoriteHotel = {
  userId: Types.ObjectId,
  hotelId: Types.ObjectId,
}

export type RedisClient = ReturnType<typeof createClient>;

export type HotelData = {
  count: number,
}