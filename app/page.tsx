"use client";

import React, { useEffect, useState } from "react";
import FriendTable from "../components/FriendTable";
import Friend from "./interfaces/Friend";
import { sortFriends } from "./tools/sortFriends";

export default function Home() {
  const [friends, setFriends] = useState<Friend[]>([]);
  const homePageSeason = "nopixel_season_2";

  return (
    <main className="prose flex min-h-screen flex-col p-24">
      <h1>Got any spare friends?</h1>
    </main>
  );
}
