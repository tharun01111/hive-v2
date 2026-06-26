import type { NextFunction, Request, Response } from "express"
import * as authService from "../services/auth.service";

export const registerController = async(req: Request, res: Response, next: NextFunction) => {

  const { email } = req.body;
  console.log(`[REGISTER_ATTEMPT] Email: ${email}`);

  try{
  const result = await authService.register(req.body);

  console.log(`[REGISTER_SUCCESS] Email: ${email}`);

  res.status(201).json({ success: true, ...result });

} catch (err) {
  console.log(`[REGISTER_FAILED] Email: ${email}`);
  console.error("Error occured in register controller: ", err);
  next(err)
}


}

export const loginController = async(req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;

  console.log(`[LOGIN_ATTEMPT] Email: ${email}`);


  try {
    const result = await authService.login(req.body);

    console.log(`[LOGIN_SUCCESS] Email: ${email}`);
    return res.status(200).json({
      success: true,
      ...result
    });
    
  } catch(err) {

    console.log(`[LOGIN_FAILED] Email: ${email}`);
    console.error("Error in login controller: ", err);
    next(err);
  }
}
