"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type ReviewType = {
  id: string;
  name: string;
  content: string;
};
type backendResponse = {
  success: boolean;
  reviews: ReviewType[];
};

export default function Reviews() {
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [loading, setLoading] = useState(true);
 const router = useRouter();
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get<backendResponse>(`/api/reviews`);
        if (res.data.success) {
          setReviews(res.data.reviews);
        }
      } catch (err) {
        console.error("Error fetching reviews:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 py-16 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
        What People Say About <span className="text-blue-500">MindVault</span>
      </h2>
      <p className="text-gray-600 text-center mt-2 max-w-2xl mx-auto">
        Here’s what our community thinks about their experience with MindVault.
      </p>

      {loading ? (
        <div className="flex justify-center mt-10">
          <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        </div>
      ) : reviews.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          No reviews yet. Be the first to share your experience!
        </p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white shadow-md rounded-xl p-6 border border-gray-200 hover:shadow-lg hover:shadow-blue-500 transition"
            >
              <h3 className="font-semibold text-xl text-blue-500">
                {rev.name}
              </h3>
              <p className="text-gray-600 mt-2">{rev.content}</p>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-center mt-10">
<Button
          onClick={() => router.push("/GiveReviews")}
          className="bg-blue-500 text-white hover:bg-blue-600 shadow-md"
          size={"sm"}
        >
          Give Review
        </Button>
      </div>
    </div>
  );
}
