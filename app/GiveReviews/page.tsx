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

export default function ReviewsPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [Message, setMessage] = useState("");

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
        "/api/reviews",
        { content: Message },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data?.success) {
        toast.success("Review Submitted");

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
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 flex flex-col items-center pt-20 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
        Share Your <span className="text-blue-500">MindVault</span> Experience
      </h2>
      <p className="text-gray-600 text-center mt-2 max-w-lg">
        We value your feedback! Tell us what you love, what we can improve, or
        any ideas you have for making MindVault even better.
      </p>

      <div className="mt-10 w-full max-w-lg bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Review */}
          <div>
            <label className="block text-lg font-bold text-gray-700 mb-4">
              Your FeedBack
            </label>
            <textarea
              name="review"
              placeholder="Write your thoughts..."
              rows={4}
              value={Message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            ></textarea>
          </div>
          <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            >
              Submit
            </button>
        </form>
      </div>
    </div>
  );
}
