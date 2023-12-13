"use client";

import clsx from "clsx";
import { LayoutGroup, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

export default function NavBar() {
  let pathname = usePathname() || "/";

  return (
    <header className="fixed top-0 left-0 right-0 z-10 font-bold">
      <nav className="flex justify-center items-center bg-white h-12">
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
