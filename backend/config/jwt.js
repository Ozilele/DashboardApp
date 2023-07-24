import jwt from "jsonwebtoken";
import * as fs from 'fs';
import path from "path";
import * as dotenv from 'dotenv';
dotenv.config();

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const privateKey = fs.readFileSync(`${__dirname}/private_key.pem`, 'utf-8');
const publicKey = fs.readFileSync(`${__dirname}/public_key.pem`, 'utf-8');

export const signJWT = (object, options) => {
  const token = jwt.sign(object, privateKey, {
    ...(options && options),
    algorithm: "RS256",
  });
  return token;
}

export const verifyJWT = (token) => {
  try {
    const decoded = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
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

