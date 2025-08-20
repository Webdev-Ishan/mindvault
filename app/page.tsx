"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="bg-white min-h-screen flex flex-col bg-gradient-to-b from-white to-blue-50">
      {/* Hero Section */}
      <header className="flex flex-col items-center justify-center text-center py-20 px-4  flex-1">
        <h1 className="text-4xl md:text-6xl font-bold  text-gray-900">
          Organize Your Mind with{" "}
          <span className="text-blue-500">MindVault</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-black font-sans font-medium max-w-2xl">
          Your second brain for capturing, organizing, and retrieving
          information instantly. Stay productive and never lose an idea again.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <div
            onClick={() => router.push("/register")}
            className="bg-blue-500 text-white px-6 cursor-pointer py-3 rounded-3xl hover:bg-blue-600"
          >
            Get Started
          </div>
          <div
            onClick={() => router.push("/About")}
            className="border border-blue-500 text-blue-500 cursor-pointer transition duration-200 px-6 py-3 rounded-3xl hover:text-black hover:bg-blue-200"
          >
            Learn More
          </div>
        </div>
      </header>

      <section className="py-16 px-6 md:px-16  flex flex-col-reverse md:flex-row items-center gap-8">
        {/* Left Content */}
        <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-sans text-blue-500">
            Organize Your Ideas Effortlessly
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed max-w-lg mx-auto md:mx-0">
            Your thoughts deserve more than scattered notes and endless tabs.
            With{" "}
            <span className="font-semibold text-blue-600">Second Brain</span>,
            every idea, task, and resource finds its perfect place — neatly
            organized, searchable, and always accessible.
          </p>
          <div className="flex justify-center md:justify-start">
            <button
              onClick={() => router.push("/register")}
              className="px-6 py-3 rounded-3xl bg-blue-500 text-white font-semibold hover:bg-blue-700 transition shadow-lg"
            >
              Get Started
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <Image
            src="/landing.jpg"
            width={800}
            height={800}
            alt="Second Brain Illustration"
            className="w-full max-w-sm sm:max-w-md lg:max-w-lg rounded-2xl border border-gray-200 shadow-xl"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-900">
          Why Choose <span className="text-blue-500">MindVault</span>?
        </h2>
        <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
          We make it effortless to store, organize, and recall your ideas with
          powerful yet easy-to-use tools.
        </p>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          <div className="p-6 bg-blue-50 rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-blue-500">Fast Search</h3>
            <p className="text-gray-600 mt-2">
              Find exactly what you need instantly with advanced search and
              smart filters.
            </p>
          </div>
          <div className="p-6 bg-blue-50 rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-blue-500">
              Organized Notes
            </h3>
            <p className="text-gray-600 mt-2">
              Keep your thoughts neatly categorized so nothing gets lost.
            </p>
          </div>
          <div className="p-6 bg-blue-50 rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-blue-500">
              Secure Storage
            </h3>
            <p className="text-gray-600 mt-2">
              Your data is encrypted and safe, so you can focus on thinking big.
            </p>
          </div>
        </div>
      </section>

      {/* Hero Section with Background */}
      <section
        className="relative w-full py-32 px-6 md:px-16 flex h-auto items-center justify-center text-center bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: "url('/landing2.jpg')" }}
      >
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content */}
        <div className="relative z-10 max-w-3xl text-white space-y-6">
          <h2 className="text-3xl sm:text-4xl font-sans uppercase mb-10 md:text-5xl font-semibold">
            How It Works
          </h2>
          <p className="text-lg sm:text-xl mt-18 leading-relaxed">
            With <span className="text-blue-400 font-semibold">MindVault</span>,
            your ideas flow seamlessly from thought to action. Capture notes,
            links, and inspirations in seconds. Organize them with tags and
            categories for clarity. Retrieve everything instantly with our
            blazing-fast search. One system — endless possibilities.
          </p>
        </div>
      </section>
    </div>
  );
}
