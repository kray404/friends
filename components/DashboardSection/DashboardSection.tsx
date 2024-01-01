"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AcceptedUser from "@/app/interfaces/AcceptedUser";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import DashboardUsersTable from "./DashboardUsersTable";
import { signIn, signOut } from "next-auth/react";
import { Session } from "next-auth";
import { isAuthenticated } from "@/lib/isAuthenticated";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import Season from "@/app/interfaces/Season";
import Friend from "@/app/interfaces/Friend";
import {
  fetchAllEnemies,
  fetchAllFriends,
  fetchSeasons,
  revalidateAllData,
} from "@/lib/dataFetchers";
import DashboardFriendTab from "./DashboardFriendTab";
import FriendDialog from "../FriendDialog";
import { handleSubmitFriendData } from "@/lib/submitFriendData";

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

    fetchData();

    if (username) {
      fetchAcceptedUsers();
    }

    fetchData();
  }, []);

  async function fetchData() {
    try {
      const seasonsData = await fetchSeasons();
      const friendsData = await fetchAllFriends();
      const enemiesData = await fetchAllEnemies();

      setSeasons(seasonsData);
      setFriends(friendsData);
      setEnemies(enemiesData);

      console.log(friendsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const handleRevalidate = async () => {
    try {
      await revalidateAllData();
    } catch (error) {
      console.error("Error during revalidation:", error);
    }
  };

  if (!username) {
    return <Button onClick={() => signIn()}>Sign in</Button>;
  }

  return (
    <section className="flex min-h-screen flex-col p-12 min-w-min">
      <Button onClick={() => signOut()}>Sign Out</Button>
      <Card>
        <CardHeader className="prose w-full">
          <h1>Secret Admin Page</h1>
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
                <FriendDialog
                  seasons={seasons}
                  operation="Add"
                  onSubmit={handleSubmitFriendData}
                />
                <DashboardFriendTab seasons={seasons} friends={friends} />
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
