"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Card } from "@/components/Card";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type ContentItem = {
  link: string;
  type: string;
  title: string;
  _id: string;
  sharable: string;
};

type BackendResponse = {
  success: boolean;
  message: string;
  user: {
    username: string;
    email: string;
    _id: string;
    contents: ContentItem[];
  };
};

type BackendResponse2 = {
  success: boolean;
  message: string;
  searchresult: ContentItem[];
};

export default function Profile() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [arr, setArr] = useState<ContentItem[]>([]);
  const [query, setQuery] = useState("");

  const url = process.env.NEXT_PUBLIC_API_URL;

  // Redirect if not logged in
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router, session]);

  const fetchData = async () => {
    try {
      const response = await axios.get<BackendResponse>(`${url}/api/auth/profile`);
      if (response.data?.success) {
        setEmail(response.data.user.email);
        setUsername(response.data.user.username);
        setArr(response.data.user.contents);
      } else {
        toast.error("Oops! Try Again");
        setEmail("");
        setUsername("");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        setEmail("");
        setUsername("");
      }
    }
  };

  const onSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post<BackendResponse2>(`${url}/api/user/search`, { query });
      if (response.data?.success) {
        setArr(response.data.searchresult);
        setQuery("");
      } else {
        toast.error("Oops! Try Searching Again");
        setQuery("");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        toast.error(error.message);
        setQuery("");
      }
    }
  };

  // Fetch only after authenticated
  useEffect(() => {
    if (status === "authenticated") {
      fetchData();
    }
  }, [status, session]);

  if (status === "loading") {
    return <div className="text-blue-500 text-center py-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col relative">
      {/* Update Profile Button */}
      <div className="absolute top-20 right-4">
        <Button
          onClick={() => router.push("/update")}
          className="bg-blue-500 text-white hover:bg-blue-600 shadow-md"
          size={"sm"}
        >
          Update Profile
        </Button>
      </div>

      <main className="flex flex-col items-center justify-center flex-grow px-6 text-center py-20">
        <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-wide">
          Welcome,&nbsp;
          <span className="text-blue-500 uppercase font-bold">{username}</span>
        </h2>

        <p className="text-base md:text-lg text-gray-600 max-w-2xl mb-6 leading-relaxed">
          <span className="font-semibold text-blue-500 underline underline-offset-4">
            You are now in your second brain —
          </span>{" "}
          a creative space where your thoughts, links, and knowledge come together seamlessly.
        </p>

        <div className="bg-blue-50 text-gray-800 px-6 py-4 rounded-xl shadow-sm mb-8">
          <p className="text-sm md:text-base font-medium">
            Your working email:&nbsp;
            <span className="text-blue-600 font-bold">{email}</span>
          </p>
        </div>

        <Button
          onClick={() => router.push("/content")}
          className="bg-blue-500 text-white hover:bg-blue-600 shadow-md"
        >
          Add Link +
        </Button>
      </main>

      <section className="w-full min-h-[50vh] bg-gray-50 py-12 px-4">
        <h2 className="text-2xl md:text-4xl font-extrabold text-center text-blue-500 mb-8">
          Your Saved Links
        </h2>

        {/* Search Bar */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-10">
          <form onSubmit={onSearch} className="w-full max-w-xl">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-5 py-3 rounded-lg border border-blue-500 bg-white text-gray-800 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              placeholder="🔍 Search by Keywords"
            />
          </form>
          <Button
            onClick={fetchData}
            className="bg-blue-500 text-white hover:bg-blue-600 shadow-sm"
          >
            Back
          </Button>
        </div>

        {/* Cards */}
        <div className="flex flex-wrap justify-center gap-6">
          {arr.length > 0 ? (
            arr.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl shadow-md w-72 overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-4">
                  <div className="h-48 border border-gray-200 rounded-lg mb-4 bg-gray-50 flex items-center justify-center">
                    <Card
                      link={item.link}
                      title={item.title}
                      type={item.type}
                      id={item._id}
                    />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-3">
                    {item.title}
                  </h2>
                  <div className="flex justify-end gap-2">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button className="px-4 py-2 text-sm font-medium rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition">
                        Visit
                      </button>
                    </a>
                    <Link href={`/content/${item._id}`}>
                      <button className="px-4 py-2 text-sm font-medium rounded-lg bg-gray-200 hover:bg-gray-300 transition">
                        Edit
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No content added yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}
