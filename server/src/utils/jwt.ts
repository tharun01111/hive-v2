import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma";

type TokenUser = {
  id: number;
  role: string;
};

type JwtUserPayload = {
  id: number;
  role: string;
};

export const createToken =  (user: TokenUser) => {  
  console.log("[TOKEN_CREATE_ATTEMPT] User ID: " + user.id);

  const token =  jwt.sign({
    id: user.id,
    role: user.role
  }, process.env.JWT_SECRET_KEY!, {
    expiresIn: "7d"
  });

  console.log(`[TOKEN_CREATED] User ID: ${user.id}`);
  return token;
}

export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY!);
};