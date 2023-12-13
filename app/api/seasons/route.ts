import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const seasons = await prisma.season.findMany();

  return NextResponse.json(seasons);
}
