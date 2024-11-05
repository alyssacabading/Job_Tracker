"use client";

import { useState } from "react";
import Link from "next/link";
import { FaBars } from "react-icons/fa";
import { useAuth0 } from "@auth0/auth0-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { logout } = useAuth0(); // Auth0 logout function
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();

  // Toggle the dropdown menu
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Check if a path is active
  const isActive = (path: string) => pathname === path;

  return (
    <nav className="flex justify-between items-center bg-customblue p-4 text-white">
      {/* Logo / Home Link */}
      <div className="text-xl font-bold">
        <Link href="/">Job Tracker</Link>
      </div>

      {/* Navigation Links */}
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

        {/* Profile dropdown */}
        <div className="relative">
        <button onClick={toggleDropdown} className="focus:outline-none">
          <FaBars className="text-2xl" />
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg z-10">
            <button
              className="block w-full px-4 py-2 text-left text-black hover:rounded-lg hover:bg-gray-200"
              onClick={() => {
                logout({
                  logoutParams: {
                    returnTo: `${window.location.origin}/login`,
                  },
                });
              }}
            >
              Logout
            </button>
            
          </div>
          )}
        </div>
      </div>
    </nav>
  );
}

