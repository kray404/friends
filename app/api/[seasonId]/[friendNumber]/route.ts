import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

interface MyParams {
  seasonId: string;
  friendNumber: string;
}

// Function to format the seasonId into a readable format
function formatSeasonId(seasonId: string): string {
  // Split the seasonId into parts
  const parts = seasonId.split("_");
  // Capitalize the first letter of each part and join them back with a space
  return parts
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
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
    // Format the seasonId
    const formattedSeasonId = formatSeasonId(seasonId);

    // Format the response with the friend's details
    const responseMessage = `Friend Number ${friend.number} for ${formattedSeasonId} is ${friend.name}. Go follow them! ${friend.twitchLink}`;

    // Return the formatted message
    return new NextResponse(responseMessage, {
      status: 200,
      statusText: "OK",
    });
  } else {
    // Return an appropriate response if the friend does not exist
    return new NextResponse("Friend not found", {
      status: 404,
      statusText: "Not Found",
    });
  }
}
