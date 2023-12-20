"use client";

import Friend from "@/app/interfaces/Friend";
import Season from "@/app/interfaces/Season";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import FriendTable from "../FriendSection/FriendTable";
import { sortFriends } from "@/lib/sortFriends";
import { useState } from "react";
import { Input } from "../ui/input";

interface DashboardFriendTabProps {
  seasons: Season[];
  friends: Friend[];
}

export default function DashboardFriendTab({
  seasons,
  friends,
}: DashboardFriendTabProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const formatSeasonId = (id: string): string => {
    const parts = id.split("_");
    return `${parts[0].toUpperCase()} Season ${parts[2]}`;
  };

  const getFriendsBySeason = (seasonId: string): Friend[] => {
    return friends.filter((friend) => friend.seasonId === seasonId);
  };

  // Function to compare seasons by their name and number
  const compareSeasons = (a: Season, b: Season): number => {
    const partsA = a.id.split("_");
    const partsB = b.id.split("_");

    const nameA = partsA[0].toUpperCase();
    const nameB = partsB[0].toUpperCase();

    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;

    const numberA = parseInt(partsA[2]);
    const numberB = parseInt(partsB[2]);

    return numberA - numberB;
  };

  // Sort seasons
  const sortedSeasons = [...seasons].sort(compareSeasons);

  const filterUsers = (users: Friend[]): Friend[] => {
    if (!searchTerm) return users;
    return users.filter(
      (user) =>
        (user.name &&
          user.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (user.number !== null && user.number.toString().includes(searchTerm))
    );
  };

  return (
    <Tabs defaultValue={sortedSeasons[0]?.id}>
      <TabsList
        className={`grid w-full grid-cols-${sortedSeasons.length} min-w-max`}
      >
        {sortedSeasons.map((season) => (
          <TabsTrigger key={season.id} value={season.id}>
            {formatSeasonId(season.id)}
          </TabsTrigger>
        ))}
      </TabsList>
      {sortedSeasons.map((season) => (
        <TabsContent key={season.id} value={season.id}>
          <Input
            type="text"
            placeholder={`Search ${formatSeasonId(season.id)} friends here`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
          <FriendTable
            friends={filterUsers(sortFriends(getFriendsBySeason(season.id)))}
          />
        </TabsContent>
      ))}
    </Tabs>
  );
}
