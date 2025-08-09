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

  // ✅ Redirect if not logged in
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router,session]);

  const fetchData = async () => {
    try {
      const response = await axios.get<BackendResponse>(
        `${url}/api/auth/profile`
      );

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
      const response = await axios.post<BackendResponse2>(
        `${url}/api/user/search`,
        { query }
      );

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

  // ✅ Fetch only after authenticated
  useEffect(() => {
    if (status === "authenticated") {
      fetchData();
    }
  }, [status,session]);

  if (status === "loading") {
    return <div className="text-white text-center py-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-500 to-blue-500 text-white flex flex-col relative">
      {/* Top Right Update Profile Button */}
      <div className="absolute top-20 right-4">
        <Button
          onClick={() => router.push("/update")}
          className="bg-blue-400 text-white border border-black"
          size={"sm"}
        >
          Update Profile
        </Button>
      </div>

      <main className="flex flex-col items-center justify-center flex-grow px-6 text-center py-20">
        <h2
          className="text-3xl md:text-5xl font-extrabold text-white mt-4 mb-10 drop-shadow-lg tracking-wide flex"
          style={{
            WebkitTextStrokeWidth: "1px",
            WebkitTextStrokeColor: "#000",
          }}
        >
          Welcome,&nbsp;
          <span className="text-blue-500 uppercase font-bold">{username}</span>
        </h2>

        <p className="text-base md:text-lg text-white/90 max-w-2xl mb-6 leading-relaxed">
          <span className="font-semibold text-black underline underline-offset-4">
            You are now in your second brain —
          </span>{" "}
          a creative digital space where your thoughts, links, and knowledge
          come together seamlessly.
        </p>

        <div className="bg-white text-purple-800 px-6 py-4 rounded-xl shadow-md mt-4 mb-10">
          <p className="text-sm md:text-base font-medium">
            Your working email:&nbsp;
            <span className="text-blue-600 font-bold">{email}</span>
          </p>
        </div>

        <Button
          onClick={() => router.push("/content")}
          className="bg-blue-400 text-white border border-black"
          size={"default"}
        >
          Add Link +
        </Button>
      </main>

      <section className="w-full bg-black min-h-[50vh]">
        <h2
          className="text-4xl mr-2 ml-2 mt-16 text-center md:text-4xl font-extrabold text-blue-500 mb-2 tracking-wide"
          style={{
            WebkitTextStrokeWidth: "1px",
            WebkitTextStrokeColor: "white",
          }}
        >
          YOUR SAVED LINKS ARE HERE
        </h2>

        <div className="p-8 text-center w-full flex justify-center items-center gap-4">
          <form onSubmit={onSearch} className="w-full">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full max-w-2xl ml-5 px-5 rounded-lg border border-blue-500 bg-white text-gray-800 placeholder-gray-400 shadow-md focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-300"
              placeholder="🔍 Search by Keywords"
            />
          </form>
          <Button
            onClick={fetchData}
            className="bg-blue-400 text-white border ml-2 mr-2 border-black"
            size={"default"}
          >
            Back
          </Button>
        </div>

        <div className="w-full min-h-[60vh] py-16 px-4 flex justify-center items-center flex-wrap gap-6 md:gap-10 bg-black rounded-xl">
          {arr.length > 0 ? (
            arr.map((item) => (
              <div
                key={item._id}
                className="card bg-white rounded-2xl w-64 pr-2 h-auto shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <figure className="px-5 pt-5">
                  <div className="w-full h-60 rounded-lg border border-gray-200 p-3 bg-gray-50">
                    <Card
                      link={item.link}
                      title={item.title}
                      type={item.type}
                      id={item._id}
                    />
                  </div>
                </figure>
                <div className="card-body px-5 py-4">
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    {item.title}
                  </h2>
                  <div className="flex justify-end">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block"
                    >
                      <button className="px-4 py-2 text-sm font-medium rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-indigo-600 hover:to-blue-500 transition-colors duration-300 shadow-md hover:shadow-lg">
                        Visit Link
                      </button>
                    </a>

                    <Link
                      href={`/content/${item._id}`}
                      className="inline-block"
                    >
                      <button className="px-4 py-2 ml-2 text-sm font-medium rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-indigo-600 hover:to-blue-500 transition-colors duration-300 shadow-md hover:shadow-lg">
                        Edit
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-white">No content added yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}
