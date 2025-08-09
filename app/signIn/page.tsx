"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { signIn, useSession } from "next-auth/react";

export default function SignIn() {
  const navigate = useRouter();

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const [emailToggle, setemailToggle] = useState(true);
  const [passwordToggle, setpasswordToggle] = useState(true);

  const validateEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 36) {
      setemail(e.target.value.slice(0, 36));
      setemailToggle(!emailToggle);
    } else {
      setemail(e.target.value);
    }
  };

  const validatePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 20 || e.target.value.length <= 8) {
      setpassword(e.target.value.slice(0, 20));
      setpasswordToggle(!passwordToggle);
    } else {
      setpassword(e.target.value);
    }
  };
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status === "authenticated") {
      navigate.push("/");
    }
  }, [session, status, navigate]);

  const submithandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await signIn("credentials", {
      email: email,
      password: password,
      redirect:false
    });

    if (response?.ok) {
      toast.success("LoggedIn successfull.");
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
    <div>
      <div className="text-center mt-24 mb-16  ">
        <div className="flex items-center justify-center">
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
        <h2 className="text-4xl tracking-tight font-bold">
          LOGIN TO YOUR ACCOUNT
        </h2>
        <span className="text-sm">
          or{" "}
          <Link
            href={""}
            onClick={() => navigate.push("/register")}
            className="text-blue-500"
          >
            create your account
          </Link>
        </span>
      </div>
      <div className="flex justify-center my-2 mx-4 md:mx-0 mb-24 ">
        <form
          onSubmit={submithandler}
          className="w-full max-w-xl bg-blue-200 border  rounded-lg shadow-md p-6 duration-300 hover:shadow-md hover:shadow-purple-500"
        >
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-full px-3 mb-6">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Email address
              </label>
              <input
                className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                type="email"
                value={email}
                onChange={validateEmail}
                required
              />
              {emailToggle ? (
                ""
              ) : (
                <p className="text-red-600">
                  Email should be less then 36 letter
                </p>
              )}
            </div>
            <div className="w-full md:w-full px-3 mb-6">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Password
              </label>
              <input
                className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                type="password"
                value={password}
                onChange={validatePassword}
                required
              />
              {passwordToggle ? (
                ""
              ) : (
                <p className="text-red-600">
                  Password should be more then 7 and less then 21
                </p>
              )}
            </div>
            <div className="w-full flex items-center justify-between px-3 mb-3 "></div>
            <div className="w-full md:w-full px-3 mb-6">
              <button className="appearance-none block w-full from-purple-600 via-purple-500 bg-gradient-to-br 0 to-blue-500 text-white  hover:border-blue-600 duration-300 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-blue-500 focus:outline-none focus:bg-white focus:border-gray-500">
                SIGN IN
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
