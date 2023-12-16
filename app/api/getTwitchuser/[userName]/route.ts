import TwitchUser from "@/app/interfaces/TwitchUser";
import { NextResponse } from "next/server";

interface MyParams {
  userName: string;
}

interface TwitchAPIResponse {
  data: TwitchUser[];
}

export async function GET(request: Request, { params }: { params: MyParams }) {
  try {
    const userName = params.userName;

    // Ensure userName is valid
    if (!userName || typeof userName !== "string") {
      return new NextResponse("Invalid user name", { status: 400 });
    }

    const headers = {
      "Client-ID": process.env.TWITCH_CLIENT_ID as string,
      Authorization: `Bearer ${process.env.TWITCH_ACCESS_TOKEN}`,
    };

    const response = await fetch(
      `https://api.twitch.tv/helix/users?login=${userName}`,
      {
        method: "GET",
        headers: headers,
      }
    );

    const twitchResponse: TwitchAPIResponse = await response.json();

    return NextResponse.json(twitchResponse.data[0]);
  } catch (error) {
    console.error(error);
    return new NextResponse("Error parsing JSON", { status: 400 });
  }
}
