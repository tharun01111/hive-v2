import type { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if(err instanceof AppError)
  return res.status(err.statusCode).json({ success: false, message: err.message });

  res.status(500).json({ 
    success: false, 
    message: "Internal Server Error" 
  });
}