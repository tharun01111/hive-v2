import type { Request, Response, NextFunction } from "express";
import type { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: {
    id: number;
    role: string;
  };
}

export const protect = (req: AuthRequest, res: Response, next: NextFunction) => {  
  const authHeader = req.headers.authorization;

  if(!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "No token provided"
    });
  }

  try {
    const token = authHeader.split(" ")[1];
    const secret = process.env.JWT_SECRET_KEY;

    if(!token || !secret) {
      return res.status(401).json({
        success: false,
        message: "Invalid token"
      });
    }

    const decoded = jwt.verify(token, secret) as JwtPayload;

    if(typeof decoded.id !== "number" || typeof decoded.role !== "string") {
      return res.status(401).json({
        success: false,
        message: "Invalid token"
      });
    }

    req.user = {
      id: decoded.id,
      role: decoded.role
    };

    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token"
    });
  }
}
