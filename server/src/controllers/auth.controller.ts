import type { Request, Response } from "express"
import { prisma } from "../lib/prisma";
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";

export const createToken =  (user: Request) => {
  const token =  jwt.sign({
    id: user.id,
    role: user.role
  }, process.env.JWT_SECRET_KEY!, {
    expiresIn: "7d"
  });
  return token;
}

export const registerController = async(req: Request, res: Response) => {

  const { username, email, password } = req.body;

  console.log(`[REGISTER_ATTEMPT] Email: ${email}`);

  try{
  const matching = await prisma.user.findUnique({
    where: {
      email
    }
  });

  if(matching) 
  {
    return res.status(409).
    json({ 
      message: "User already exists" 
    }); 
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      username,
      password: hashed
    }, 
    select: {
      id: true,
      email: true,
      username: true,
      role: true,
      createdAt: true
    }
  });

  const token = createToken(user);

  console.log(`[REGISTER_SUCCESS] Email: ${email}`);
  res.status(201).json({ success: true, user, token });

} catch (err) {
  const { email } = req.body;
  console.log(`[REGISTER_FAILED] Email: ${email}`);
  console.error("Error occured in register controller: ", err);
  res.status(500).json({ error: "Internal Server Error" });
}


}

export const loginController = async(req: Request, res: Response) => {
  const { email, password } = req.body;

  console.log(`[LOGIN_ATTEMPT] Email: ${email}`);


  try {

    const user = await prisma.user.findUnique({
      where:  {
        email
      }
    });

    if(!user) {
      return res.status(401)
      .json({
        message: "Invalid Credentials"
      });
    }

    const matching = await bcrypt.compare(password, user.password);

    if(!matching) {
      return res.status(401)
      .json({
        message: "Invalid Credentials"
      });
    }

    const { id, username, role } = user;

    const token = createToken(user);

    console.log(`[LOGIN_SUCCESS] Email: ${email}`);
    return res.status(200).json({
      success: true,
      user: {
        id,
        email,
        username,
        role
      },
      token
    });
    
  } catch(err) {
    const { email } = req.body;
    console.log(`[LOGIN_FAILED] Email: ${email}`);
    console.error("Error in login controller: ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}