"use client";

import Friend from "@/app/interfaces/Friend";
import { useState } from "react";
import { sortFriends } from "@/lib/sortFriends";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import FriendTable from "./FriendTable";
import { Input } from "../ui/input";

interface FriendSectionProps {
  seasonId: string;
  friends: Friend[];
  enemies: Friend[];
}

export default function FriendSection({
  seasonId,
  friends,
  enemies,
}: FriendSectionProps) {
  const [viewingFriends, setViewingFriends] = useState(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const displayedPeople = viewingFriends ? friends : enemies;

  const toggleView = () => {
    setViewingFriends(!viewingFriends);
  };

  const formatSeasonId = (id: string): string => {
    const parts = id.split("_");
    return `${parts[0].toUpperCase()} Season ${parts[2]}`;
  };

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
    <section key={seasonId}>
      <Card>
        <CardHeader className="w-full flex justify-between">
          <div className="prose">
            <h2>
              Four Tee's {viewingFriends ? "Friends" : "Enemies"} for{" "}
              {formatSeasonId(seasonId)}:
            </h2>
          </div>
          <div className="flex justify-between items-center">
            <CardDescription
              onClick={toggleView}
              className="cursor-pointer w-full hover:underline hover:text-blue-600 font-medium"
            >
              View Four Tee's {viewingFriends ? "enemies" : "friends"}
            </CardDescription>
            <Input
              type="text"
              placeholder={`Search ${viewingFriends ? "friends" : "enemies"}`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="ml-4 w-fit"
            />
          </div>
        </CardHeader>
        <CardContent>
          <FriendTable friends={filterUsers(sortFriends(displayedPeople))} />
        </CardContent>
      </Card>
    </section>
  );
}
