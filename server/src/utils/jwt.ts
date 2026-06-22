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

export const verifyToken = async (req: Request, res: Response) => {
  console.log(`[TOKEN_VERIFY_ATTEMPT]`);
  const authHeader = req.headers.authorization;
  
  if(!authHeader) {
    console.log(`[TOKEN_VERIFY_FAILED]`);
    return res.status(401).json({ success: false, message: "No token provided" });
  }
  
  const token = authHeader?.split(" ")[1]; 

  if(!token) {
    console.log(`[TOKEN_VERIFY_FAILED]`);
    return res.status(401).json({ success: false, message: "No token provided" });
  }


  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as JwtUserPayload;

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id
      }
    });

    if(!user){
      console.log(`[TOKEN_VERIFY_FAILED]`);
      return res.status(401).json({ success: false, message: "Invalid token" });
    } 

    console.log(`[TOKEN_VERIFIED] User ID: ${decoded.id}`);
    return res.status(200).json({ success: true, user: {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role
    } });

  } catch (err) {
    console.log(`[TOKEN_VERIFY_FAILED]`);
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
}