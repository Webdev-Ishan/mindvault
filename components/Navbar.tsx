"use client";
import { Menu, X, BrainIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <div>
      {/* Navbar */}
      <nav className="bg-white  border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div
              onClick={() => router.push("/")}
              className="flex items-center cursor-pointer"
            >
              <BrainIcon className="text-blue-500 font-bold h-32  mr-2" />
              <span className="text-blue-500 font-bold text-2xl">
                MindVault
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => router.push("/Profile")}
                className="text-gray-700 cursor-pointer hover:text-blue-500"
              >
                Profile
              </button>
              <button
                onClick={() => router.push("/Reviews")}
                className="text-gray-700 cursor-pointer hover:text-blue-500"
              >
                Reviews
              </button>
              <button
                onClick={() => router.push("/About")}
                className="text-gray-700 cursor-pointer hover:text-blue-500"
              >
                About
              </button>
              <button
                onClick={() => router.push("/Contact")}
                className="text-gray-700 cursor-pointer hover:text-blue-500"
              >
                Contact
              </button>
              <button
                onClick={() => router.push("/register")}
                className="bg-blue-500 text-white px-3 py-2 rounded-lg cursor-pointer hover:bg-blue-600"
              >
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-gray-700 hover:text-blue-500 cursor-pointer"
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 px-4 pb-4">
            <button
              onClick={() => router.push("/Profile")}
              className="block py-2 text-gray-700 hover:text-blue-500"
            >
              Profile
            </button>
            <button
              onClick={() => router.push("/About")}
              className="block py-2 text-gray-700 hover:text-blue-500"
            >
              About
            </button>
            <button
              onClick={() => router.push("/Reviews")}
              className="block py-2 text-gray-700 hover:text-blue-500"
            >
              Reviews
            </button>
            <button
              onClick={() => router.push("/Contact")}
              className="block py-2 text-gray-700 hover:text-blue-500"
            >
              Contact
            </button>
            <button
              onClick={() => router.push("/register")}
              className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600"
            >
              Get Started
            </button>
          </div>
        )}
      </nav>
    </div>
  );
};
