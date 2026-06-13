import api from "./axios"

export type RegisterUser = {
  username: string,
  email: string,
  password: string
}

export type LoginUser = {
  email: string,
  password: string
}

export const registerUser = async (
  user: RegisterUser
) => {
  const response = await api.post("/auth/register", user);
  return response;
};

export const loginUser = async (
  user: LoginUser
) => {
  const response = await api.post("/auth/login", user);
  return response;
};