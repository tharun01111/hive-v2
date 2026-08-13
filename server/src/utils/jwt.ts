import jwt from "jsonwebtoken";

export type TokenUser = {
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
