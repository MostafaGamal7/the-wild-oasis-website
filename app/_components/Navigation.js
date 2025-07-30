import Link from "next/link";
import { auth } from "@/app/_lib/auth";

export default async function Navigation() {
  const session = await auth();
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
      <ul className="flex gap-16 items-center">
        {navLinks.map((link, i) => (
          <li
            key={i + link.href}
            className="hover:text-accent-400 transition-colors"
          >
            <Link href={link.href}>{link.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
