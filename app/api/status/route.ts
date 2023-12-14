import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // Attempt to query the database
    await prisma.$queryRaw`SELECT 1`;

    // If the query is successful, return a response indicating the database is online
    return new NextResponse("Database is online", { status: 200 });
  } catch (error) {
    // Handle any errors that occur during the database query
    console.error("Error connecting to the database:", error);

    // Return a response indicating the database is offline or an error occurred
    return new NextResponse("Database is offline or an error occurred", {
      status: 500,
    });
  }
}
