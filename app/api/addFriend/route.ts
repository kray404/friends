import { revalidateFriendData } from "@/components/FriendSection/FriendData";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const res = await request.json();
    const { number, name, imgUrl, twitchLink, notes, seasonId } = res;

    const result = await prisma.friend.create({
      data: {
        number,
        name,
        imgUrl,
        twitchLink,
        notes,
        seasonId,
      },
    });

    // Neccessary because of ISR
    setTimeout(async () => {
      await revalidateFriendData();
    }, 500);

    return NextResponse.json({ result });
  } catch (error) {
    console.error(error);
    return new NextResponse("Error parsing JSON", { status: 400 });
  }
}
