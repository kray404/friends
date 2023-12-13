import prisma from "@/lib/prisma";
import type { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(request: NextApiRequest) {
  const seasons = await prisma.season.findMany();

  return NextResponse.json(seasons);
}
