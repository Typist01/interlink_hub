import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

export type SignUpSchema = {
  email: string;
  password: string;
  id: string;
  name: string;
};

/**
 * Sign up user
 * @param email
 * @param password
 */
// function call apporaoch
// const signUp = async (email: string, password: string) => {
//   await fetch("/api/auth/signup/", {
//     method: "POST",
//     body: JSON.stringify({
//       email: email,
//       password: passowrd,
//     }),
//   });
// };

const prisma = new PrismaClient();
// db approach

const signUpDB = async (user: SignUpSchema) => {
  const hashedPass = await hash(user.password, 12);
  await prisma.user.upsert({
    where: { email: user.email },
    update: {},
    create: {
      email: user.email,
      password: hashedPass,
      id: user.id,
      verified: true,
      name: user.name,
    },
  });
};

export const signUpUsers = async (users: SignUpSchema[]) => {
  for (const user of users) {
    await signUpDB(user);
  }
};
