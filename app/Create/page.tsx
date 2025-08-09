"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

type BackendResponse = {
  success: boolean;
  message: string;
};

export default function ContactPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [link, setlink] = useState("");
  const [type, settype] = useState("linkedin");
  const [title, settitle] = useState("");

  // Redirect if unauthenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signIn");
    }
  }, [status, router, session]);

  // Loading state while session is being fetched
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center text-blue-500">
        Loading...
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post<BackendResponse>(
        "/api/create",
        { link, type, title },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data?.success) {
        toast.success("Request Submitted");
        setlink("");
        settype("");
        settitle("");
        router.push("/Profile");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const status = error.response.status;
        if (status === 400) {
          toast.error("Invalid inputs");
          console.log(error);
        } else if (status === 401) {
          toast.error("Please login first");
          console.log(error);
        } else if (status === 409) {
          toast.error(error.response.data?.message || "Conflict");
          console.log(error);
        } else if (status === 500) {
          toast.error("Something went wrong");
          console.log(error);
        }
      } else if (error instanceof Error) {
        toast.error(error.message);
        console.log(error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 flex flex-col">
      {/* Main Form */}
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8">
          <h1 className="text-2xl font-bold text-gray-900 text-center">
            Create New <span className="text-blue-500">Neurons</span> Here
          </h1>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-black">
            {/* Subject */}
            <div>
              <label className="block text-gray-700 mb-1">Link</label>
              <input
                type="text"
                name="link"
                value={link}
                onChange={(e) => setlink(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={title}
                onChange={(e) => settitle(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Type</label>
              <select
                name="Type"
                value={type}
                onChange={(e) => settype(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option onClick={() => settype("Youtube")} value="Youtube">
                  Youtube
                </option>
                <option onClick={() => settype("facebook")} value="facebook">
                  Facebook
                </option>
                <option onClick={() => settype("Instagram")} value="Instagram">
                  Instagram
                </option>
                <option onClick={() => settype("linkedin")} value="linkedin">
                  Linkedin
                </option>
              </select>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Submit
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
