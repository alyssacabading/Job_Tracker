"use client";

import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import { usePathname } from "next/navigation";


export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="flex justify-between items-center bg-customblue p-4 text-white">
      <div className="text-xl font-bold">
        <Link href="/">Job Tracker</Link>
      </div>

      <div className="flex space-x-4 items-center">
      <Link href="/applications">
          <button
            className={`px-3 py-2 rounded ${
              isActive("/applications")
                ? "bg-white text-customblue"
                : "bg-customblue text-white hover:bg-white hover:text-customblue"
            }`}
          >
            Applications
          </button>
        </Link>

        <Link href="/skills">
          <button
            className={`px-3 py-2 rounded ${
              isActive("/skills")
                ? "bg-white text-customblue"
                : "bg-customblue text-white hover:bg-white hover:text-customblue"
            }`}
          >
            Skills
          </button>
        </Link>

        <Link href="/contacts">
          <button
            className={`px-3 py-2 rounded ${
              isActive("/contacts")
                ? "bg-white text-customblue"
                : "bg-customblue text-white hover:bg-white hover:text-customblue"
            }`}
          >
            Contacts
          </button>
        </Link>
        <Link href="/account">
          <FaUserCircle className="text-2xl" />
        </Link>
      </div>
    </nav>
  );
}
