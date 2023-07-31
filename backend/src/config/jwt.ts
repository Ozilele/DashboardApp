import jwt from "jsonwebtoken";
import * as fs from 'fs';
import path from "path";
import * as dotenv from 'dotenv';
import { UserToken, Verification } from "../types/types.js";
dotenv.config();

const __dirname : string = path.dirname(new URL(import.meta.url).pathname);
const privateKey : string = fs.readFileSync(`${__dirname}/private_key.pem`, 'utf-8');
const publicKey : string = fs.readFileSync(`${__dirname}/public_key.pem`, 'utf-8');

export const signJWT = (object : UserToken, options: any) => {
  const token : string = jwt.sign(object, privateKey, {
    ...(options && options),
    algorithm: "RS256",
  });
  return token;
}

export const verifyJWT : (token : string) => Verification = (token : string) => {
  try {
    const decoded : UserToken = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch(err) {
    return {
      valid: false,
      decoded: null,
    }
  }
}

