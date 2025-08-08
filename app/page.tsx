"use client";

import { Button } from "@/components/ui/button";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { TypewriterEffectSmooth } from "../components/ui/typewriter-effect";
import { Spotlight } from "../components/ui/Spotlight";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

type ContentItem = {
  name: string;
  content: string;
};

type BackendResponse = {
  success: boolean;
  message: string;
  reviews: ContentItem[];
};

export const HomePage = () => {
  const navigate = useRouter();
  const [reviews, setReviews] = useState<ContentItem[]>([]);

  const { data: session, status } = useSession();

  const words = [
    {
      text: "Clarity.",
      className: "text-blue-600 text-5xl text-center ",
    },
  ];

  const fetchReviews = async () => {
    try {
      const response = await axios.get<BackendResponse>(`/api/review`, {
        withCredentials: true,
      });

      if (response.data && response.data.success) {
        setReviews(response.data.reviews);
      } else {
        toast.error("Oops! Try Again");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-500 to-blue-500 text-white flex flex-col ">
      <Spotlight className="-top-40 left-0 md:-top-20 " fill="cyan" />
      <main className="flex flex-col items-center justify-center flex-grow px-6 text-center py-16">
        <h2
          className="text-4xl md:text-5xl font-bold text-white mt-8 text-center drop-shadow-lg mb-6"
          style={{
            WebkitTextStrokeWidth: "1px",
            WebkitTextStrokeColor: "black",
          }}
        >
          Organize your thoughts with <br />
          <div className="flex justify-center">
            <TypewriterEffectSmooth words={words} />
          </div>
        </h2>
        <p className="text-md md:text-lg text-white/90 max-w-2xl mb-8">
          BrainStorm is your second brain — a digital space to capture, link,
          and retrieve your best ideas with ease.
        </p>

        {!session ? (
          <Button
            onClick={() => signIn()} // opens NextAuth login
            className="bg-purple-500 text-white border border-black mt-6"
          >
            Get Started
          </Button>
        ) : (
          <Button
            onClick={() => signOut()} // logs out user
            className="bg-red-500 text-white border border-black mt-6"
          >
            Logout
          </Button>
        )}
      </main>

      {/* WHY BRAINSTORM section */}
      <section className="bg-white text-purple-800 py-12 px-6 text-center">
        <h3 className="text-3xl font-bold  mb-8">WHY BRAINSTORM?</h3>
        <p className="max-w-3xl mx-auto text-blue-600 text-md mb-8">
          Whether it's ideas, links, notes, or resources—everything is stored in
          one place. Access your thoughts anytime, anywhere with structured
          clarity.
        </p>
        {/* ... feature cards unchanged ... */}
      </section>

      {/* BUILT FOR EVERY MIND section */}
      <section className="bg-purple-600 text-white py-16 px-6 text-center">
        {/* ... unchanged ... */}
      </section>

      {/* Call to Action */}
      <section className="bg-pink-100 text-center text-purple-800 py-16 px-4">
        <h3 className="text-2xl font-bold mb-8">
          START BUILDING YOUR SECOND BRAIN TODAY
        </h3>
        <p className="max-w-xl text-blue-600 mx-auto text-md mb-16">
          Sign up for BrainStorm and never lose track of your thoughts again.
        </p>
        <div className="flex min-h-auto flex-col items-center justify-center">
          {!session ? (
            <Button
              onClick={() => signIn()}
              className="bg-purple-500 text-white border border-black"
            >
              Sign In
            </Button>
          ) : (
            <Button
              onClick={() => navigate.push("/dashboard")}
              className="bg-green-500 text-white border border-black"
            >
              Go to Dashboard
            </Button>
          )}
        </div>
      </section>

      {/* Reviews */}
      <section className="text-center text-black p-8">
        <h3 className="text-3xl font-bold mb-8 text-white mt-8">
          WHAT OUR USERS SAY ABOUT US?
        </h3>

        <div className="relative w-full flex justify-center px-4 md:px-24">
          <Carousel className="w-full max-w-5xl">
            <CarouselContent>
              {reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <CarouselItem
                    key={index}
                    className="basis-full flex justify-center"
                  >
                    <div className="w-96 h-58 border border-black rounded-xl bg-pink-100 text-black p-6 shadow-md hover:border-blue-600 duration-200 hover:shadow-blue-600">
                      <h4 className="text-xl font-semibold mb-4 text-blue-600">
                        {review.name}
                      </h4>
                      <p>{review.content}</p>
                    </div>
                  </CarouselItem>
                ))
              ) : (
                <CarouselItem className="basis-full flex justify-center">
                  <div className="w-96 h-58 border border-black rounded-xl bg-pink-100 text-black p-6 shadow-md hover:border-blue-600 duration-200 hover:shadow-blue-600">
                    Loading .....
                  </div>
                </CarouselItem>
              )}
            </CarouselContent>

            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        <div className="mt-8 flex justify-center md:justify-end px-4 md:px-24">
          <Button
            onClick={() => navigate.push("/Review")}
            className="bg-white text-blue-500 border border-black"
            size="default"
          >
            REVIEW US
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
