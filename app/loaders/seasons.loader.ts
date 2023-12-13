import prisma from "@/lib/prisma";
import { Season } from "@prisma/client";

export async function getSeasons(): Promise<Season[]> {
  const seasons = await prisma.season.findMany({});
  return seasons;
}
