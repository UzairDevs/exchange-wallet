"use server";

import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export async function createOnRampTransaction(provider: string, amount: number) {
  const session = await getServerSession(authOptions);
  console.log("Session user:", session?.user);

  // ✅ Make sure the user is authenticated and the ID is a valid number
  const userId = parseInt(session?.user?.id as string);

  if (!session?.user || isNaN(userId)) {
    return {
      message: "Unauthenticated or invalid user"
    };
  }

  // ✅ Optional: Check that this user actually exists in DB
  const user = await prisma.user.findUnique({
    where: {
      id: userId
    }
  });

  if (!user) {
    return {
      message: "User not found"
    };
  }

  const token = Math.random().toString();

  await prisma.onRampTransaction.create({
    data: {
      provider,
      status: "Processing",
      startTime: new Date(),
      token,
      userId,
      amount
    }
  });

  return {
    message: "Done"
  };
}
