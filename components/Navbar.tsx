"use client";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <div>
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <span className="text-blue-500 font-bold text-xl">MindVault</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="#features"
                className="text-gray-700 hover:text-blue-500"
              >
                Features
              </Link>
              <Link href="#about" className="text-gray-700 hover:text-blue-500">
                About
              </Link>
              <Link
                href="#contact"
                className="text-gray-700 hover:text-blue-500"
              >
                Contact
              </Link>
              <button
                onClick={() => router.push("/register")}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
              >
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-gray-700 hover:text-blue-500"
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 px-4 pb-4">
            <Link
              href="#features"
              className="block py-2 text-gray-700 hover:text-blue-500"
            >
              Features
            </Link>
            <Link
              href="#about"
              className="block py-2 text-gray-700 hover:text-blue-500"
            >
              About
            </Link>
            <Link
              href="#contact"
              className="block py-2 text-gray-700 hover:text-blue-500"
            >
              Contact
            </Link>
            <button
              onClick={() => router.push("/register")}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
            >
              Get Started
            </button>
          </div>
        )}
      </nav>
    </div>
  );
};
