import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

interface MyParams {
  seasonId: string;
  friendNumber: string;
}

export async function GET(request: Request, { params }: { params: MyParams }) {
  const { friendNumber, seasonId } = params;

  // Retrieve the friend from the database using Prisma
  const friend = await prisma.friend.findFirst({
    where: {
      number: friendNumber,
      seasonId: seasonId,
    },
  });

  // Check if the friend exists
  if (friend) {
    // Format the response with the friend's details
    const responseMessage = `Friend Number ${friend.number} is ${friend.name} (${friend.description}). Go follow them! ${friend.twitchLink}`;

    // Return the formatted message
    return new Response(responseMessage, {
      status: 200,
      statusText: "OK",
    });
  } else {
    // Return an appropriate response if the friend does not exist
    return new Response("Friend not found", {
      status: 404,
      statusText: "Not Found",
    });
  }
}
