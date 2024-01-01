"use client";
import { fetchPeopleBySeasonNew } from "@/lib/dataFetchers";
import FriendSection from "@/components/FriendSection/FriendSection";
import { useEffect, useState } from "react";

interface MyParams {
  seasonId: string;
}

export default function SeasonPage({ params }: { params: MyParams }) {
  const seasonId = params.seasonId;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [friends, setFriends] = useState<any>([]);
  const [enemies, setEnemies] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const friends = await fetchPeopleBySeasonNew({
        seasonId: seasonId,
        type: "friends",
      });
      const enemies = await fetchPeopleBySeasonNew({
        seasonId: seasonId,
        type: "enemies",
      });
      setIsLoading(false);
      setFriends(friends.data);
      setEnemies(enemies.data);
    };

    fetchData();
  }, [seasonId]);

  return (
    <main className="flex min-h-screen flex-col p-12">
      <FriendSection
        seasonId={seasonId}
        friends={friends}
        enemies={enemies}
        isLoading={isLoading}
      />
    </main>
  );
}
