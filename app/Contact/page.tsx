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

  const [Subject, setSubject] = useState("");
  const [Message, setMessage] = useState("");

  // Redirect if unauthenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signIn");
    }
  }, [status, router]);

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
        "/api/contact",
        { Subject, Message },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data?.success) {
        toast.success("Request Submitted");
        setSubject("");
        setMessage("");
        router.push("/Profile");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const status = error.response.status;
        if (status === 400) {
          toast.error("Invalid inputs");
        } else if (status === 401) {
          toast.error("Please login first");
        } else if (status === 409) {
          toast.error(error.response.data?.message || "Conflict");
        } else if (status === 500) {
          toast.error("Something went wrong");
        }
      } else if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 flex flex-col">
      {/* Main Form */}
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8">
          <h1 className="text-2xl font-bold text-gray-900 text-center">
            Ask Your <span className="text-blue-500">MindVault</span> Related Doubts
          </h1>
          <p className="mt-2 text-gray-600 text-center">
            Fill out the form for enquiries or feedback.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-black">
            {/* Subject */}
            <div>
              <label className="block text-gray-700 mb-1">Subject</label>
              <input
                type="text"
                name="Subject"
                value={Subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-gray-700 mb-1">Message</label>
              <textarea
                name="Message"
                value={Message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={4}
                maxLength={200}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              />
              <p className="text-xs text-gray-500 mt-1">
                Minimum 10 characters, maximum 200 characters.
              </p>
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

