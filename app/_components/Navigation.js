"use client";

import Link from "next/link";
import { useState } from "react";

// Client component for mobile menu
function MobileMenu({ navLinks, isOpen, setIsOpen }) {
  return (
    <>
      {/* Burger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1"
        aria-label="Toggle navigation menu"
      >
        <span
          className={`block w-6 h-0.5 bg-current transition-all duration-300 ${
            isOpen ? "rotate-45 translate-y-1.5" : ""
          }`}
        ></span>
        <span
          className={`block w-6 h-0.5 bg-current transition-all duration-300 ${
            isOpen ? "opacity-0" : ""
          }`}
        ></span>
        <span
          className={`block w-6 h-0.5 bg-current transition-all duration-300 ${
            isOpen ? "-rotate-45 -translate-y-1.5" : ""
          }`}
        ></span>
      </button>

      {/* Mobile navigation */}
      <nav
        className={`border-l border-primary-900 bg-primary-950 fixed top-0 right-0 h-full w-64 max-w-[80vw] z-[9999] transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full"} md:hidden`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsOpen(false)}
            className="text-accent-400 hover:text-accent-300"
            aria-label="Close menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <ul className="flex flex-col gap-2 h-full text-lg px-4">
          {navLinks.map((link, i) => (
            <li key={i + link.href}>
              <Link
                href={link.href}
                className="block py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Overlay for mobile when navigation is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 backdrop-blur-2xl z-[9998] md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

// Main Navigation component
export default function Navigation({ session }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    {
      name: "Cabins",
      href: "/cabins",
    },
    {
      name: "About",
      href: "/about",
    },
    {
      name: session?.user ? (
        <div className="flex items-center gap-4">
          <img
            src={session.user.image}
            alt={session.user.name}
            className="w-6 h-6 rounded-full object-cover"
          />
          <span>Guest Area</span>
        </div>
      ) : (
        "Guest area"
      ),
      href: "/account",
    },
  ];

  return (
    <nav className="z-10 text-xl">
      {/* Desktop navigation */}
      <ul className="hidden md:flex gap-16 items-center">
        {navLinks.map((link, i) => (
          <li
            key={i + link.href}
            className="hover:text-accent-400 transition-colors"
          >
            <Link href={link.href}>{link.name}</Link>
          </li>
        ))}
      </ul>

      {/* Mobile menu */}
      <MobileMenu
        navLinks={navLinks}
        isOpen={isMobileMenuOpen}
        setIsOpen={setIsMobileMenuOpen}
      />
    </nav>
  );
}
