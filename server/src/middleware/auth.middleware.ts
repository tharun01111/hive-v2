import type { Request, Response, NextFunction } from "express";
import { extractAuthHeader } from "../utils/auth-header";

export interface AuthRequest extends Request {
  user?: {
    id: number;
    role: string;
  };
}

export const protect = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authUser = extractAuthHeader(req.headers.authorization);

    req.user = {
      id: authUser.id,
      role: authUser.role
    };

    next();
  } catch (err) {
    next(err);
  }
};