import bcrypt from "bcryptjs";

export const comparePassword = (password: string, userPassword: string) => {
  const response = bcrypt.compare(password, userPassword);

  return response;
}

export const hashPassword = async(password: string) => {
  const response = await bcrypt.hash(password, 10);
  return response;
}
