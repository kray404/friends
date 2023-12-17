// Navbar modified from: https://github.com/vercel/nextjs-postgres-nextauth-tailwindcss-template/blob/main/app/navbar.tsx

"use client";

import { usePathname } from "next/navigation";
import { Disclosure } from "@headlessui/react";

const navigation = [
  { name: "ONX Season 1", href: "/seasons/onx_season_1" },
  { name: "Nopixel Season 1", href: "/seasons/nopixel_season_1" },
  { name: "Nopixel Season 2", href: "/seasons/nopixel_season_2" },
  { name: "Nopixel Season 3", href: "/seasons/nopixel_season_3" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const pathname = usePathname();

  return (
    <Disclosure as="nav" className="bg-white shadow-sm">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-center">
              {" "}
              <div className="flex">
                <div className="flex space-x-8">
                  {" "}
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        pathname === item.href
                          ? "border-slate-500 text-gray-900"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                        "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                      )}
                      aria-current={pathname === item.href ? "page" : undefined}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    pathname === item.href
                      ? "bg-slate-50 border-slate-500 text-slate-700"
                      : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800",
                    "block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                  )}
                  aria-current={pathname === item.href ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
