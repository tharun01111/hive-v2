import type { JwtPayload } from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { verifyToken } from "./jwt";

export type AuthTokenPayload = {
  id: number;
  role: string;
};

export const extractAuthHeader = (authHeader: string | undefined): AuthTokenPayload => {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log(`[TOKEN_VERIFY_FAILED]`);
    throw new AppError("No token provided", 401);
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    console.log(`[TOKEN_VERIFY_FAILED]`);
    throw new AppError("Invalid Token", 401);
  }

  let decoded: string | JwtPayload;

  try {
    decoded = verifyToken(token) as string | JwtPayload;
  } catch {
    console.log(`[TOKEN_VERIFY_FAILED]`);
    throw new AppError("Invalid Token", 401);
  }

  if (typeof decoded === "string" || typeof decoded.id !== "number" || typeof decoded.role !== "string") {
    console.log(`[TOKEN_VERIFY_FAILED]`);
    throw new AppError("Invalid Token", 401);
  }

  return {
    id: decoded.id,
    role: decoded.role
  };
};