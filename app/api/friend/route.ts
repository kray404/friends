import { revalidateFriends } from "@/lib/dataFetchers";
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

    await revalidateFriends();

    return NextResponse.json({ result });
  } catch (error) {
    console.error(error);
    return new NextResponse("Error parsing JSON", { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    const deletedFriend = await prisma.friend.delete({
      where: { id },
    });

    await revalidateFriends();

    return NextResponse.json({ deletedFriend });
  } catch (error) {
    console.error(error);
    return new NextResponse("Error deleting friend", { status: 400 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, number, name, imgUrl, twitchLink, notes, seasonId } =
      await request.json();

    const updatedFriend = await prisma.friend.update({
      where: { id },
      data: {
        number,
        name,
        imgUrl,
        twitchLink,
        notes,
        seasonId,
      },
    });

    await revalidateFriends();

    return NextResponse.json({ updatedFriend });
  } catch (error) {
    console.error(error);
    return new NextResponse("Error updating friend", { status: 400 });
  }
}
