"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export default function Navbar() {
  const router = useRouter();
  
  const [buttonProp, setButtonProp] = useState("Get Started");
  const [neuron, setNeuron] = useState("");



  const url = process.env.NEXT_PUBLIC_API_URL;

  const buttonHandler = async () => {
    if (loginStatus) {
      try {
        const response = await axios.post(
          `${url}/api/auth/logout`,
          {},
          { withCredentials: true }
        );

        if (response.data?.success) {
          localStorage.removeItem("token");
         
          setButtonProp("Get Started");
          toast.success("Logout Successful");
        } else {
          toast.error("Unable to logout");
        }
      } catch (error: any) {
        toast.error(error.message);
      }
    } else {
      router.push("/SignIn");
    }
  };

  const fetchBrain = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/braincontent/${neuron}`);
    setNeuron("");
  };

  useEffect(() => {
    setButtonProp(loginStatus ? "Logout" : "Get Started");
  }, [loginStatus]);

  return (
    <nav className="bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-200 shadow-sm hover:shadow-purple-500 duration-300">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-8 text-purple-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
            />
          </svg>
          <span className="self-center text-2xl font-bold text-blue-600">
            BrainStorm
          </span>
        </Link>

        {/* Auth Button */}
        <Button
          onClick={buttonHandler}
          className={loginStatus ? "bg-red-500 text-white" : "bg-purple-500 text-white"}
          size="sm"
        >
          {buttonProp}
        </Button>

        {/* Links */}
        <div className="hidden md:flex gap-6">
          <Link href="/" className="text-purple-500 hover:text-blue-600">Home</Link>
          <Link href="/About" className="text-purple-500 hover:text-blue-600">About</Link>
          <Link href="/Profile" className="text-purple-500 hover:text-blue-600">Profile</Link>
          <Link href="/Contact" className="text-purple-500 hover:text-blue-600">Contact</Link>
        </div>
