import { Request } from 'express';

export interface User {
  firstName: string,
  secondName: string,
  email: string,
  password: string,
  imageFile?: string,
  role?: string, // optional property
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

interface Feature {
  _id: string,
  closeToSee: boolean,
  closeToMountains: boolean,
  hasParking: boolean,
}

export interface Req extends Request {
  user?: User
}

export type Verification = {
  valid: boolean,
  expired?: boolean,
  decoded: UserToken | null,
}
