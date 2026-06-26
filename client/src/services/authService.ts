import api from "@/api/axios";

export type RegisterUser = {
  username: string,
  email: string,
  password: string
}

export type LoginUser = {
  email: string,
  password: string
}

export type UserToken = {
  id: number;
  email: string;
  username: string;
  role: string;
};

export const registerUser = async (
  user: RegisterUser
) => {
    const response = await api.post("/auth/register", user);
    return response.data;
};

export const loginUser = async (
  user: LoginUser
) => {
  const response = await api.post("/auth/login", user);
  return response.data;
};

export const verifyToken = async (token: string) => {
  const response = await api.post("/auth/verify", {}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
}
