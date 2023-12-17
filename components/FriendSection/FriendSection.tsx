"use client";

import Friend from "@/app/interfaces/Friend";
import { Suspense, useEffect, useState } from "react";
import { sortFriends } from "@/lib/sortFriends";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import SkeletonFriendTable from "./SkeletonFriendTable";
import FriendTable from "./FriendTable";

export default function FriendSection({ seasonId }: { seasonId: string }) {
  const [people, setPeople] = useState<Friend[]>([]);
  const [viewingFriends, setViewingFriends] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPeople(seasonId, viewingFriends ? "friends" : "enemies");
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

  return (
    <section key={seasonId}>
      <Card>
        <CardHeader className="prose w-full">
          <h3>
            Four Tee's {viewingFriends ? "Friends" : "Enemies"} for{" "}
            {formatSeasonId(seasonId)}:
          </h3>
          <CardDescription
            onClick={toggleView}
            className="cursor-pointer hover:underline text-blue-600 hover:text-blue-800"
          >
            View Four Tee's {viewingFriends ? "enemies" : "friends"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <SkeletonFriendTable />
          ) : (
            <FriendTable friends={people} />
          )}
        </CardContent>
      </Card>
    </section>
  );
}
