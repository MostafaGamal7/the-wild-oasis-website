"use client";

import {
  CalendarDaysIcon,
  HomeIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import SignOutButton from "@/app/_components/SignOutButton";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  {
    name: "Home",
    href: "/account",
    icon: <HomeIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Reservations",
    href: "/account/reservations",
    icon: <CalendarDaysIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Guest profile",
    href: "/account/profile",
    icon: <UserIcon className="h-5 w-5 text-primary-600" />,
  },
];

function SideNavigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger button for mobile */}
      <button
        className={`md:hidden fixed  ${
          open ? "top-4 !left-3" : "top-28"
        } left-12 z-30 bg-primary-900 p-2 rounded shadow-lg`}
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close navigation" : "Open navigation"}
      >
        {open ? (
          <XMarkIcon className="h-7 w-7 text-primary-100" />
        ) : (
          <Bars3Icon className="h-7 w-7 text-primary-100" />
        )}
      </button>

      {/* Sidebar navigation */}
      <nav
        className={`border-r border-primary-900 bg-primary-950 fixed md:static top-0 left-0 h-full w-64 max-w-[80vw] z-20 transform transition-transform duration-300 ease-in-out
          ${
            open ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:w-64 md:h-auto md:bg-transparent md:block`}
        onClick={() => setOpen(false)}
      >
        <ul className="flex flex-col gap-2 h-full text-lg pt-16 md:pt-0">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                className={`py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200 ${
                  pathname === link.href ? "bg-primary-900" : ""
                }`}
                href={link.href}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            </li>
          ))}

          <li className="mt-auto">
            <SignOutButton />
          </li>
        </ul>
      </nav>
      {/* Overlay for mobile when sidebar is open */}
      {open && (
        <div
          className="fixed inset-0 bg-black opacity-40 backdrop-blur-2xl z-10 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}

export default SideNavigation;
