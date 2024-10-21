import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center bg-gray-800 p-4 text-white">
      <div className="text-xl font-bold">
        <Link href="/">Job Tracker</Link>
      </div>

      <div className="flex space-x-4 items-center">
        <Link href="/applications">
          <button className="px-3 py-2 bg-blue-600 rounded hover:bg-blue-500">
            Applications
          </button>
        </Link>
        <Link href="/skills">
          <button className="px-3 py-2 bg-blue-600 rounded hover:bg-blue-500">
            Skills
          </button>
        </Link>
        <Link href="/contacts">
          <button className="px-3 py-2 bg-blue-600 rounded hover:bg-blue-500">
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
