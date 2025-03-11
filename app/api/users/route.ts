import { prisma } from "@/prisma/client";
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
