"use client";
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
            className="bg-blue-500 text-white px-6 cursor-pointer py-3 rounded-lg hover:bg-blue-600"
          >
            Get Started
          </div>
          <div
            onClick={() => router.push("/About")}
            className="border border-blue-500 text-blue-500 cursor-pointer px-6 py-3 rounded-lg hover:bg-blue-200"
          >
            Learn More
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 px-6 bg-white text-center">
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

      {/* How It Works Section */}
      <section className="py-16 px-6 bg-gradient-to-b from-blue-50 to-white text-center">
        <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
        <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
          MindVault is built to work seamlessly in three simple steps.
        </p>
        <div className="mt-10 grid gap-8 sm:grid-cols-3 max-w-6xl mx-auto">
          <div className="p-6 rounded-lg border border-gray-200">
            <div className="text-blue-500 text-3xl font-bold">1</div>
            <h3 className="mt-4 font-semibold text-lg text-blue-500">Capture</h3>
            <p className="text-gray-600 mt-2">
              Save notes, ideas, and links in seconds from any device.
            </p>
          </div>
          <div className="p-6 rounded-lg border border-gray-200">
            <div className="text-blue-500 text-3xl font-bold">2</div>
            <h3 className="mt-4 font-semibold text-lg text-blue-500">Organize</h3>
            <p className="text-gray-600 mt-2">
              Tag and categorize your content for easy retrieval.
            </p>
          </div>
          <div className="p-6 rounded-lg border border-gray-200">
            <div className="text-blue-500 text-3xl font-bold">3</div>
            <h3 className="mt-4 font-semibold text-lg text-blue-500">Retrieve</h3>
            <p className="text-gray-600 mt-2">
              Access your saved knowledge instantly with our fast search.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 px-6 bg-blue-500 text-white text-center">
        <h2 className="text-3xl font-bold">
          Ready to Unlock Your Second Brain?
        </h2>
        <p className="mt-3 max-w-xl mx-auto">
          Join thousands of productive people who rely on MindVault to remember,
          organize, and retrieve their most valuable ideas.
        </p>
        <div className="mt-6 flex justify-center">
          <div
            onClick={() => router.push("/register")}
            className="bg-white text-blue-500 px-6 py-3 rounded-lg font-semibold cursor-pointer hover:bg-blue-100"
          >
            Get Started Now
          </div>
        </div>
      </section>
    </div>
  );
}
