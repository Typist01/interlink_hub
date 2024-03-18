import { faker } from "@faker-js/faker";

import { SignUpSchema, signUpUsers } from "./signupSeeder";
import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
import hypothesisData from "./seeders/hypothesis.json";

// sign up user
const signUp = async (email: string, password: string) => {
  await fetch("/api/auth/signup/", {
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
};

const prisma = new PrismaClient();

// sign in user

async function main() {
  // gnerate users
  const USERS_AMOUNT = 100;
  const ADMIN_USER = {
    email: "a@b.com",
    password: "asdf",
    id: randomUUID(),
    name: "Moon",
  };
  const users: SignUpSchema[] = [ADMIN_USER];

  for (let i = 0; i < USERS_AMOUNT; i++) {
    const email = faker.internet.email();
    const password = faker.internet.password();
    const name = faker.person.firstName();
    const id = randomUUID();
    users.push({
      email,
      password,
      id,
      name: name,
    });
  }
  signUpUsers(users);

  // generate posts

  for (const hypothesis of hypothesisData) {
    await prisma.hypothesis.create({
      data: {
        title: hypothesis.title,
        description: hypothesis.description,
        userId: "d430f8c4-4a1c-401c-9f6f-b127b0d0616c",
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
