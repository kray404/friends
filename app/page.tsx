"use client";
import FriendSection from "@/components/FriendSection/FriendSection";
import { fetchPeopleBySeasonNew } from "@/lib/dataFetchers";
import { useEffect, useState } from "react";

export default async function Home() {
  const seasonId = "nopixel_season_2";
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
