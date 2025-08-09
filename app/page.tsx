"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Hero Section */}
      <header className="flex flex-col items-center justify-center text-center py-20 px-4 bg-gradient-to-b from-white to-blue-50 flex-1">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
          Organize Your Mind with{" "}
          <span className="text-blue-500">MindVault</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl">
          Your second brain for capturing, organizing, and retrieving
          information instantly. Stay productive and never lose an idea again.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <div
            onClick={() => router.push("/register")}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
          >
            Get Started
          </div>
          <Link
            href="#learn-more"
            className="border border-blue-500 text-blue-500 px-6 py-3 rounded-lg hover:bg-blue-50"
          >
            Learn More
          </Link>
        </div>
      </header>
    </div>
  );
}
