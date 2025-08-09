"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { signIn, useSession } from "next-auth/react";

export default function SignIn() {
  const router = useRouter();

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const [emailToggle, setemailToggle] = useState(true);
  const [passwordToggle, setpasswordToggle] = useState(true);

  const validateEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 36) {
      setemail(e.target.value.slice(0, 36));
      setemailToggle(false);
    } else {
      setemail(e.target.value);
      setemailToggle(true);
    }
  };

  const validatePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 20 || e.target.value.length <= 8) {
      setpassword(e.target.value.slice(0, 20));
      setpasswordToggle(false);
    } else {
      setpassword(e.target.value);
      setpasswordToggle(true);
    }
  };

  const { data: session, status } = useSession();
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/Profile");
    }
  }, [session, status, router]);

  const submithandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });

    if (response?.ok) {
      toast.success("Logged in successfully.");
      router.push("/Profile");
      setemail("");
      setpassword("");
    } else {
      toast.error("Something went wrong.");
      console.log(response);
      setemail("");
      setpassword("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 flex flex-col">
      {/* Login Form */}
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8">
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <svg
              fill="none"
              viewBox="0 0 24 24"
              className="w-12 h-12 text-blue-500"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-center text-gray-900">
            Login to Your Account
          </h2>
          <p className="text-center text-sm mt-1 text-gray-600">
            or{" "}
            <button
              onClick={() => router.push("/register")}
              className="text-blue-500 hover:underline"
            >
              create your account
            </button>
          </p>

          <form onSubmit={submithandler} className="mt-6 space-y-4 text-black">
            <div>
              <label className="block text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={validateEmail}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              {!emailToggle && (
                <p className="text-red-600 text-sm mt-1">
                  Email should be less than 36 characters
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={validatePassword}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              {!passwordToggle && (
                <p className="text-red-600 text-sm mt-1">
                  Password should be more than 7 and less than 21 characters
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            >
              Sign In
            </button>
          </form>
          <span className="w-full flex justify-center items-center text-center mt-2 mb-1 text-gray-400">
            or
          </span>
          <button
            className="group/btn py-1 mt-2 relative transition duration-300 hover:shadow-blue-500 block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
            onClick={() => signIn("google", { callbackUrl: "/Profile" })}
          >
            <div className="w-full  flex justify-center items-center gap-4">
              Login with Google
            </div>
          </button>
        </div>
      </main>
    </div>
  );
}
