"use server";

import Friend from "@/app/interfaces/Friend";
import Season from "@/app/interfaces/Season";
import { revalidateTag } from "next/cache";

interface CacheKeys {
  seasons: string;
  friends: string;
  enemies: string;
}

interface FriendDataProps {
  seasonId: string;
  type: "friends" | "enemies";
}

const cacheKeys: CacheKeys = {
  seasons: "seasonsData",
  friends: "friendsData",
  enemies: "enemiesData",
};

export async function fetchPeopleBySeason({
  seasonId,
  type,
}: FriendDataProps): Promise<Friend[]> {
  const cacheKey = type === "friends" ? cacheKeys.friends : cacheKeys.enemies;

  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/${seasonId}/${type}`,
    {
      cache: "force-cache",
      next: { tags: [cacheKey] },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch ${type}`);
  }

  return response.json();
}

export async function fetchSeasons(): Promise<Season[]> {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/seasons`, {
    cache: "force-cache",
    next: { tags: [cacheKeys.seasons] },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch seasons");
  }

  return response.json();
}

export async function fetchAllFriends(): Promise<Friend[]> {
  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/getAllFriends`,
    {
      cache: "force-cache",
      next: { tags: [cacheKeys.friends] },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch friends");
  }

  return response.json();
}

export async function fetchAllEnemies(): Promise<Friend[]> {
  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/getAllEnemies`,
    {
      cache: "force-cache",
      next: { tags: [cacheKeys.enemies] },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch enemies");
  }

  return response.json();
}

// Functions to trigger revalidation for each data type
export async function revalidateSeasons() {
  await revalidateTag(cacheKeys.seasons);
  console.log(`revalidated ${cacheKeys.seasons}`);
}

export async function revalidateFriends() {
  await revalidateTag(cacheKeys.friends);
  console.log(`revalidated ${cacheKeys.friends}`);
}

export async function revalidateEnemies() {
  await revalidateTag(cacheKeys.enemies);
  console.log(`revalidated ${cacheKeys.enemies}`);
}

export async function revalidateAllData() {
  const allCacheKeys = Object.values(cacheKeys);

  for (const key of allCacheKeys) {
    await revalidateTag(key);
    console.log(`revalidated ${key}`);
  }
}
