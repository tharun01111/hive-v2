import type { Request, Response } from "express"
import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";


export const registerController = async(req: Request, res: Response) => {
  const { username, email, password } = req.body;

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

  console.log("Request to the registerController: ", user);
  res.status(201).json({ success: true, user });

} catch (err) {
  console.error("Error occured in register controller: ", err);
  res.status(500).json({ error: "Internal Server Error" });
}


}

export const loginController = async(req: Request, res: Response) => {
  const { email, password } = req.body;

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

    return res.status(200).json({
      success: true,
      user: {
        id,
        email,
        username,
        role
      }
    });
    
  } catch(err) {
    console.error("Error in login controller: ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}