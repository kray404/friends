import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const friends = await prisma.friend.findMany();

  return NextResponse.json(friends);
}
