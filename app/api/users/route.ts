import { prisma } from "@/prisma/client";
import bcrypt from "bcryptjs";
import Joi from "joi";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const { email } = await request.json();
  const users = await prisma.user.findMany({
    where: {
      NOT: {
        email,
      },
    },
  });

  return NextResponse.json(users);
};

export const POST = async (request: NextRequest) => {
  const body = await request.json();

  const { error } = validateUser(body);
  if (error)
    return NextResponse.json(error.details[0].message, { status: 400 });
  const { name, email, password } = body;

  const checkDuplicate = await prisma.user.findUnique({ where: { email } });

  if (checkDuplicate)
    return NextResponse.json("User already exist", { status: 400 });

  const salt = await bcrypt.genSalt(10);
  const hashedPassowrd = await bcrypt.hash(password, salt);

  const newUser = await prisma.user.create({
    data: { name, email, password: hashedPassowrd },
  });

  return NextResponse.json(newUser, { status: 201 });
};

interface UserInterface {
  name: string;
  email: string;
  password: string;
}

const validateUser = (user: UserInterface) => {
  const userSchema = Joi.object({
    name: Joi.string().min(1).max(255).required().label("Name"),
    email: Joi.string()
      .min(1)
      .max(255)
      .email({ tlds: { allow: false } })
      .required()
      .label("Email"),
    password: Joi.string().min(8).max(10000).required().label("Password"),
  });

  return userSchema.validate(user);
};
