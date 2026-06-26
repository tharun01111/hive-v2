import { prisma } from "../lib/prisma"

export const findByEmail = async(email: string) => {
  const User = await prisma.user.findUnique({
    where: {
      email
    }
  });
  return User;
};

export const createUser = async(username: string, email: string, password: string) => {
  const User = await prisma.user.create({
    data: {
      username,
      email,
      password
    },
    select: {
      id: true,
      role: true,
      email: true,
      username: true,
      createdAt: true
   },
  });
  return User;
}