import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

interface MyParams {
  seasonId: string;
}

export async function GET(request: Request, { params }: { params: MyParams }) {
  const seasonId = params.seasonId;

  const friends = await prisma.friend.findMany({
    where: { seasonId: seasonId },
  });

  return NextResponse.json(friends);
}
