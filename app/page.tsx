"use client";

import React, { useEffect, useRef, useState } from "react";
import FriendTable from "./components/FriendTable";
import Friend from "./interfaces/Friend";
import Season from "./interfaces/Season";

export default function Home() {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [selectedSeasonId, setSelectedSeasonId] = useState<string>("");
  const initialSeasonsLoad = useRef(true);

  useEffect(() => {
    async function fetchSeasons() {
      const response = await fetch("/api/seasons");

      if (response.ok) {
        const data: Season[] = await response.json();
        setSeasons(data);
        setSelectedSeasonId(data[0]?.id);
        initialSeasonsLoad.current = false; // Mark that seasons have been loaded
      } else {
        console.error("Failed to fetch seasons");
      }
    }

    fetchSeasons();
  }, []);

  useEffect(() => {
    async function fetchFriends() {
      if (selectedSeasonId && !initialSeasonsLoad.current) {
        const response = await fetch(`/api/${selectedSeasonId}/friends`);

        if (response.ok) {
          const data: Friend[] = await response.json();
          setFriends(sortFriends(data));
        } else {
          console.error("Failed to fetch friends");
        }
      }
    }

    fetchFriends();
  }, [selectedSeasonId]);

  function handleSeasonChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedSeasonId(event.target.value);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Four Tees Friends</h1>
      <div>
        <label htmlFor="season-select">Choose a season:</label>
        <select
          id="season-select"
          onChange={handleSeasonChange}
          value={selectedSeasonId}
        >
          {seasons.map((season) => (
            <option key={season.id} value={season.id}>
              {season.name}
            </option>
          ))}
        </select>
      </div>
      <FriendTable friends={friends} />
    </main>
  );
}

function sortFriends(friends: Friend[]): Friend[] {
  return friends.sort((a: Friend, b: Friend) => {
    const numA = a.number ?? "";
    const numB = b.number ?? "";

    if (isNaN(Number(numA)) === isNaN(Number(numB))) {
      return numA.localeCompare(numB, undefined, { numeric: true });
    }
    return isNaN(Number(numA)) ? 1 : -1;
  });
}
