import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const enemies = await prisma.enemy.findMany();

  return NextResponse.json(enemies);
}
