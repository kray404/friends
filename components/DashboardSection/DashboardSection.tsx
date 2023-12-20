"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AcceptedUser from "@/app/interfaces/AcceptedUser";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import DashboardUsersTable from "./DashboardUsersTable";
import { signIn, signOut } from "next-auth/react";
import DashboardAddFriendDialog from "./DashboardAddFriendDialog";
import { Session } from "next-auth";
import { isAuthenticated } from "@/lib/isAuthenticated";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import FriendSection from "../FriendSection/FriendSection";
import Season from "@/app/interfaces/Season";
import Friend from "@/app/interfaces/Friend";
import {
  fetchAllEnemies,
  fetchAllFriends,
  fetchSeasons,
  revalidateAllData,
} from "@/lib/dataFetchers";

interface DashboardProps {
  session: Session | null;
}

export default function DashboardSection({ session }: DashboardProps) {
  const [acceptedUsers, setAcceptedUsers] = useState<AcceptedUser[]>([]);
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [enemies, setEnemies] = useState<Friend[]>([]);

  const username = session?.user?.name ?? "";
  const router = useRouter();

  useEffect(() => {
    async function fetchAcceptedUsers() {
      try {
        if (await isAuthenticated(session)) {
          const response = await fetch("/api/getAcceptedUsers");
          if (response.ok) {
            const users: AcceptedUser[] = await response.json();
            setAcceptedUsers(users);
          } else {
            throw new Error("Failed to fetch accepted users");
          }
        } else {
          router.push("/unauthorized");
        }
      } catch (error) {
        console.error(error);
      }
    }

    async function fetchData() {
      try {
        const seasonsData = await fetchSeasons();
        const friendsData = await fetchAllFriends();
        const enemiesData = await fetchAllEnemies();

        setSeasons(seasonsData);
        setFriends(friendsData);
        setEnemies(enemiesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    if (username) {
      fetchAcceptedUsers();
    }

    fetchData();
  }, []);

  const handleRevalidate = async () => {
    try {
      await revalidateAllData();
      // Optionally, you can add logic to handle the success of revalidation
    } catch (error) {
      console.error("Error during revalidation:", error);
    }
  };

  if (!username) {
    return <Button onClick={() => signIn()}>Sign in</Button>;
  }

  return (
    <section className="flex min-h-screen flex-col p-12">
      <Button onClick={() => signOut()}>Sign Out</Button>
      <Card>
        <CardHeader className="prose w-full">
          <h3>Website MODS</h3>
          <CardDescription>
            Twitch Users that can add / modify Four Tee's friends & enemies
          </CardDescription>
        </CardHeader>
        <CardContent>
          {acceptedUsers.length === 0 ? (
            <p>Loading...</p>
          ) : (
            <Tabs defaultValue="friends">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="friends">Friends</TabsTrigger>
                <TabsTrigger value="enemies">Enemies</TabsTrigger>
                <TabsTrigger value="moderators">Site Admins</TabsTrigger>
              </TabsList>
              <TabsContent value="friends">
                <DashboardAddFriendDialog seasons={seasons} />
              </TabsContent>
              <TabsContent value="enemies">
                <p>Enemies</p>
              </TabsContent>
              <TabsContent value="moderators">
                <DashboardUsersTable
                  users={acceptedUsers}
                  username={username}
                />
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>
      <Button onClick={handleRevalidate}>Revalidate Friend Data</Button>
    </section>
  );
}
