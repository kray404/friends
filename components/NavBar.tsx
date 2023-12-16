"use client";

import clsx from "clsx";
import Link from "next/link";
import { LayoutGroup } from "framer-motion";
import { usePathname } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

const navItems = {
  "/seasons/onx_season_1": {
    name: "ONX Season 1",
  },
  "/seasons/nopixel_season_1": {
    name: "Nopixel Season 1",
  },
  "/seasons/nopixel_season_2": {
    name: "Nopixel Season 2",
  },
  "/seasons/nopixel_season_3": {
    name: "Nopixel Season 3",
  },
};

function AuthButton() {
  const { data: session } = useSession();
  console.log("Session: " + session);

  useEffect(() => {
    async function fetchTwitchUserData() {
      if (session?.user?.name) {
        try {
          const url = `/api/getUser/${session?.user?.name}`;
          console.log("Fetching from: " + url);

          const response = await fetch(url);

          if (response.ok) {
            const data = await response.json();
            console.log(data);

            try {
              const moderatorUrl = `/api/getMods/${data.id}`;
              console.log("Fetching from: " + moderatorUrl);

              const moderatorResponse = await fetch(moderatorUrl);
              if (moderatorResponse.ok) {
                const moderatorData = await moderatorResponse.json();
                console.log(moderatorData);
              } else {
                console.error("Failed to fetch moderators");
              }
            } catch (error) {
              console.error("Error fetching Twitch user mod data:", error);
            }
          } else {
            console.error("Failed to fetch user");
          }
        } catch (error) {
          console.error("Error fetching Twitch user data:", error);
        }
      }
    }

    fetchTwitchUserData();
  }, [session]);

  if (session) {
    return (
      <>
        {session?.user?.name} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}

export default function NavBar() {
  let pathname = usePathname() || "/";

  return (
    <header className="fixed top-0 left-0 right-0 z-10 font-bold">
      <nav className="flex justify-center items-center bg-white h-12">
        <AuthButton />
        <LayoutGroup>
          <div className="flex space-x-4">
            {Object.entries(navItems).map(([path, { name }]) => {
              const isActive = path === pathname;
              return (
                <Link
                  key={path}
                  href={path}
                  className={clsx(
                    "transition-all hover:text-neutral-800 dark:hover:text-neutral-200",
                    {
                      "text-neutral-500": !isActive,
                    }
                  )}
                >
                  <span>{name}</span>
                </Link>
              );
            })}
          </div>
        </LayoutGroup>
      </nav>
    </header>
  );
}
