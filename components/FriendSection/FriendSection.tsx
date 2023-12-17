"use client";

import Friend from "@/app/interfaces/Friend";
import FriendTable from "./FriendTable";
import { useEffect, useState } from "react";
import { sortFriends } from "@/lib/sortFriends";
import { Card, CardContent, CardHeader } from "../ui/card";

export default function FriendSection({ seasonId }: { seasonId: string }) {
  const [friends, setFriends] = useState<Friend[]>([]);

  useEffect(() => {
    fetchFriends(seasonId);
  }, []);

  const fetchFriends = async (fetchSeasonId: string) => {
    try {
      const response = await fetch(`/api/${fetchSeasonId}/friends`);
      if (response.ok) {
        const data: Friend[] = await response.json();
        setFriends(sortFriends(data));
      } else {
        throw new Error("Failed to fetch friends");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section>
      <Card>
        <CardHeader>Four Tee's Friends for {seasonId}:</CardHeader>
        <CardContent>
          <FriendTable friends={friends} />
        </CardContent>
      </Card>
    </section>
  );
}
