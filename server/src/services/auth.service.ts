import * as userRepository from "../repository/auth.repository";
import { createToken } from "../utils/jwt";
import { comparePassword, hashPassword } from "../utils/auth";
import { AppError } from "../errors/AppError";
import type { LoginUserDTO, RegisterUserDTO } from "../types/user-auth.types";

export const login = async({email, password}: LoginUserDTO) => {

  const user = await userRepository.findByEmail(email);
  if(!user) {
    throw new AppError("Invalid Credentials", 401);
  }

  const matching = await comparePassword(password, user.password);

  if(!matching) throw new AppError("Invalid Credentials", 401);

  const token = createToken(user);

  return {
    user: {
      id: user.id,
      role: user.role,
      email: user.email,
      username: user.username
    }, 
    token
  };
};

export const register = async({username, email, password}: RegisterUserDTO) => {

  const existing = await userRepository.findByEmail(email);

  if(existing) throw new AppError("User already exists", 409);

  const hashed = await hashPassword(password);

  const user = await userRepository.createUser(username, email, hashed);

  const token = createToken(user);

  return {
    user: {
      id: user.id,
      username: user.username,
      role: user.role,
      email: user.email,
      createdAt: user.createdAt
    },
    token
  };
};