import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const users = await prisma.acceptedUser.findMany();

  return NextResponse.json(users);
}
