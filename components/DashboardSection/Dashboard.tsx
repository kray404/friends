"use client";

import DashboardSection from "@/components/DashboardSection/DashboardSection";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AcceptedUser from "@/app/interfaces/AcceptedUser";
import { revalidateFriendData } from "@/lib/friendData";
import { Button } from "../ui/button";

interface DashboardProps {
  username: string;
}

export default function Dashboard({ username }: DashboardProps) {
  const [acceptedUsers, setAcceptedUsers] = useState<AcceptedUser[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchAcceptedUsers() {
      try {
        const response = await fetch("/api/getAcceptedUsers");
        if (response.ok) {
          const users: AcceptedUser[] = await response.json();
          setAcceptedUsers(users);
          if (!users.some((user) => user.username === username)) {
            router.push("/");
          }
        } else {
          throw new Error("Failed to fetch accepted users");
        }
      } catch (error) {
        console.error(error);
      }
    }

    if (username) {
      fetchAcceptedUsers();
    }
  }, [username, router]);

  const handleRevalidate = async () => {
    try {
      await revalidateFriendData();
      // Optionally, you can add logic to handle the success of revalidation
    } catch (error) {
      console.error("Error during revalidation:", error);
    }
  };

  if (!username || !acceptedUsers.length) {
    return <div>Loading...</div>; // Or some loading indicator
  }

  return (
    <section className="flex min-h-screen flex-col p-12">
      <DashboardSection
        username={username || ""}
        acceptedUsers={acceptedUsers}
      />
      <Button onClick={handleRevalidate}>Revalidate Friend Data</Button>
    </section>
  );
}
