import { verifyToken } from "@/lib/jwtVerification";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");

  if (!token || !(await verifyToken(token))) {
    return new Response("Unauthorized", { status: 401 });
  }

  // Check if the JWT token is valid
  const isTokenValid = await verifyToken(request);

  // Return the appropriate response based on the token validity
  if (isTokenValid) {
    return new NextResponse("Connected to StreamElements", { status: 200 });
  } else {
    return new NextResponse("Invalid JWT token", { status: 401 });
  }
}
