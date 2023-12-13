"use client";
import { Friend, Season } from "@prisma/client";
import React, { useState, useEffect } from "react";
import { getSeasons } from "./loaders/seasons.loader";
import { getFriends } from "./loaders/friends.loader";

export default function Home() {
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [selectedSeason, setSelectedSeason] = useState<string>("");
  const [friends, setFriends] = useState<Friend[]>([]);

  useEffect(() => {
    async function loadSeasons() {
      const seasonsData = await getSeasons();
      setSeasons(seasonsData);
      if (seasonsData.length > 0) {
        setSelectedSeason(seasonsData[0].id);
      }
    }

    loadSeasons();
  }, []);

  useEffect(() => {
    async function loadFriends() {
      if (selectedSeason) {
        const friendsData = await getFriends(selectedSeason);
        setFriends(friendsData);
      }
    }

    loadFriends();
  }, [selectedSeason]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Feed</h1>

      <select
        value={selectedSeason}
        onChange={(e) => setSelectedSeason(e.target.value)}
      >
        {seasons.map((season: Season) => (
          <option key={season.id} value={season.id}>
            {season.name}
          </option>
        ))}
      </select>

      <div>
        {friends.map((friend: Friend) => (
          <div key={friend.id}>
            <h2>{friend.name}</h2>
            <p>{friend.description}</p>
            <img src={friend.imgUrl} alt={friend.name} />
            <a
              href={friend.twitchLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitch
            </a>
            <p>Other Notes: {friend.otherNotes}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
