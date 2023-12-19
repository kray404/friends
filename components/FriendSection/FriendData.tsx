"use server"; // Indicate this is a server component

import { revalidateTag } from "next/cache";

interface FriendDataProps {
  seasonId: string;
  type: "friends" | "enemies";
}

export async function FriendData({ seasonId, type }: FriendDataProps) {
  const data = await fetch(
    `https://fourteefriends.vercel.app/api/${seasonId}/${type}`,
    {
      cache: "force-cache", // Use Next.js's caching
      next: { tags: ["friendData"] }, // Tag for revalidation
    }
  );

  if (!data.ok) {
    throw new Error(`Failed to fetch ${type}`);
  }

  return data.json();
}

// Function to trigger revalidation
export async function revalidateFriendData() {
  await revalidateTag("friendData");
}
