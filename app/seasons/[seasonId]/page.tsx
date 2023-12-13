"use client";

import { useEffect, useState } from "react";
import FriendTable from "../../../components/FriendTable";
import Friend from "../../interfaces/Friend";
import { sortFriends } from "@/app/tools/sortFriends";

interface MyParams {
  seasonId: string;
}

export default function SeasonPage({ params }: { params: MyParams }) {
  const [friends, setFriends] = useState<Friend[]>([]);
  const seasonId = params.seasonId;

  // Loading
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchFriends() {
      const url = `/api/${seasonId}/friends`;
      console.log("Fetching from: " + url);

      const response = await fetch(url);

      if (response.ok) {
        const data: Friend[] = await response.json();
        setFriends(sortFriends(data));
      } else {
        console.error("Failed to fetch friends");
      }
      setIsLoading(false);
    }

    fetchFriends();
  }, []);

  return (
    <div className="flex min-h-screen flex-col p-24">
      <section className="prose">
        <h1>Four Tee has {friends.length} friends</h1>
      </section>
      <FriendTable friends={friends} isLoading={isLoading} />
    </div>
  );
}
