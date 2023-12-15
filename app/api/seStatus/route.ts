import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // Convert headers to a regular object and log it
  const headersObj = Object.fromEntries(request.headers.entries());
  console.log(headersObj);

  return new NextResponse("Nice");
}
