"use client";
import FriendSection from "@/components/FriendSection/FriendSection";
import { fetchPeopleBySeasonNew } from "@/lib/dataFetchers";
import { useEffect, useState } from "react";

export default function Home() {
  const seasonId = "nopixel_season_2";
  const [friends, setFriends] = useState<any>([]);
  const [enemies, setEnemies] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // New state for loading

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Start loading
      try {
        const friendsData = await fetchPeopleBySeasonNew({
          seasonId: seasonId,
          type: "friends",
        });
        const enemiesData = await fetchPeopleBySeasonNew({
          seasonId: seasonId,
          type: "enemies",
        });
        setFriends(friendsData.data);
        setEnemies(enemiesData.data);
      } finally {
        setIsLoading(false); // Stop loading after fetching data
      }
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
