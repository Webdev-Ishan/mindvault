"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

type backendresponse = {
  success: boolean;
  message: string;
};

export default function RegisterPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signIn");
    }
  }, [session, status, router]);
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.put<backendresponse>(
        "/api/auth/updateProfile",
        {
          username,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data && response.data.success) {
        toast.success("Updation Successfull");
        router.push("/Profile");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const status = error.response.status;
        if (status === 400) {
          toast.error("Invalid Inputs");
          console.log(error);
        } else if (status === 409) {
          toast.error("User already exists");
          router.push("/signIn");
          console.log(error);
        } else if (status === 500) {
          toast.error("Something went wrong");
          console.log(error);
        }
      } else {
        if (error instanceof Error) {
          toast.error(error.message);
          console.log(error);
        }
      }
    } finally {
      setemail("");
      setpassword("");
      setusername("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 flex flex-col">
      {/* Signup Form */}
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8">
          <h1 className="text-2xl font-bold text-gray-900 text-center">
            Update Your <span className="text-blue-500">MindVault</span> Account
          </h1>
          

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-black mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={username}
                onChange={(e) => setusername(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
