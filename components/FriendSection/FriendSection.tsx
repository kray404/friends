"use client";

import Friend from "@/app/interfaces/Friend";
import { useEffect, useState } from "react";
import { sortFriends } from "@/lib/sortFriends";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import SkeletonFriendTable from "./SkeletonFriendTable";
import FriendTable from "./FriendTable";
import { Input } from "../ui/input";

export default function FriendSection({
  seasonId,
  initialPeople,
}: {
  seasonId: string;
  initialPeople?: Friend[];
}) {
  const [people, setPeople] = useState<Friend[]>(initialPeople || []);
  const [viewingFriends, setViewingFriends] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    // Condition to decide whether to fetch data or not
    const shouldFetchData =
      !initialPeople || (initialPeople && !viewingFriends);

    if (shouldFetchData) {
      console.log(
        `Client fetching data for ${seasonId}, ${
          viewingFriends ? "friends" : "enemies"
        }`
      );
      fetchPeople(seasonId, viewingFriends ? "friends" : "enemies");
    } else {
      setIsLoading(false);
    }
  }, [seasonId, viewingFriends]);

  const fetchPeople = async (seasonId: string, type: "friends" | "enemies") => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/${seasonId}/${type}`);
      if (response.ok) {
        const data: Friend[] = await response.json();
        setPeople(sortFriends(data));
      } else {
        throw new Error(`Failed to fetch ${type}`);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

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
          {isLoading ? (
            <SkeletonFriendTable />
          ) : (
            <FriendTable friends={filterUsers(people)} />
          )}
        </CardContent>
      </Card>
    </section>
  );
}
