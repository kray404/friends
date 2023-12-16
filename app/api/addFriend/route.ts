import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const res = await request.json();
    const {
      number,
      name,
      description,
      imgUrl,
      twitchLink,
      otherNotes,
      seasonId,
    } = res;

    const result = await prisma.friend.create({
      data: {
        number,
        name,
        description,
        imgUrl,
        twitchLink,
        otherNotes,
        seasonId,
      },
    });

    return NextResponse.json({ result });
  } catch (error) {
    console.error(error);
    return new NextResponse("Error parsing JSON", { status: 400 });
  }
}
