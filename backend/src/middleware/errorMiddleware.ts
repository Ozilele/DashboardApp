import { NextFunction, Request, Response } from "express";

export const errorHandler : (error: Error, req: Request, res: Response, next: NextFunction) => Response = (error : Error, req : Request, res : Response, next : NextFunction) => {
  const statusCode : number = res.statusCode ? res.statusCode : 500;
  return res.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? null : error.stack,
  });
}