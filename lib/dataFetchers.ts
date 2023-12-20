"use server";

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
}: FriendDataProps): Promise<any[]> {
  const cacheKey = type === "friends" ? cacheKeys.friends : cacheKeys.enemies;

  const data = await fetch(
    `https://fourteefriends.vercel.app/api/${seasonId}/${type}`,
    {
      cache: "force-cache",
      next: { tags: [cacheKey] },
    }
  );

  if (!data.ok) {
    throw new Error(`Failed to fetch ${type}`);
  }

  return data.json();
}

export async function fetchSeasons(): Promise<any[]> {
  const response = await fetch(
    "https://fourteefriends.vercel.app/api/seasons",
    {
      cache: "force-cache",
      next: { tags: [cacheKeys.seasons] },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch seasons");
  }

  return response.json();
}

export async function fetchAllFriends(): Promise<any[]> {
  const response = await fetch(
    "https://fourteefriends.vercel.app/api/getAllFriends",
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

export async function fetchAllEnemies(): Promise<any[]> {
  const response = await fetch(
    "https://fourteefriends.vercel.app/api/getAllEnemies",
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
}

export async function revalidateFriends() {
  await revalidateTag(cacheKeys.friends);
}

export async function revalidateEnemies() {
  await revalidateTag(cacheKeys.enemies);
}

export async function revalidateAllData() {
  const allCacheKeys = Object.values(cacheKeys);

  for (const key of allCacheKeys) {
    await revalidateTag(key);
  }
}
