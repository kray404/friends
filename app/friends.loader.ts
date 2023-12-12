import prisma from "@/lib/prisma";
import { Friend } from "@prisma/client";

export async function getFriends(seasonId: string): Promise<Friend[]> {
  const friends = await prisma.friend.findMany({
    where: { seasonId: seasonId },
  });
  return friends;
}
