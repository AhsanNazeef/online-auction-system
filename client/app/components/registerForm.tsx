"use client";
import React, { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { store } from "@/store";
import { useRouter } from "next/navigation";
import { BaseURL } from "../utils/constants";
import { setCookie } from "../utils/auth";

const RegisterForm = () => {
  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [userType, setUserType] = React.useState("seller");
  const [error, setError] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const router = useRouter();
  const { user, setUser } = store();

  useEffect(() => {
    if (user) {
      router.push("/auctions");
    }
  }, [router, user]);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    const res = await fetch(`${BaseURL}/auth/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        email,
        first_name: firstName,
        last_name: lastName,
        user_type: userType,
      }),
    });
    const data = await res.json();
    if (res.ok) {
      setCookie("access-token", data.access, 7);
      setCookie("refresh-token", data.refresh, 7);
      setUser(user);
      router.push("/auctions");
    } else {
      if (data.username) setError(data.username[0]);
      else if (data.email) setError(data.email[0]);
      else if (data.password) setError(data.password[0]);
      else setError("Something went wrong");
    }
    setSubmitting(false);
  };
  return (
    <form onSubmit={submit} className="mt-8">
      <div className="space-y-5">
        <div>
          <label
            htmlFor="email"
            className="text-base font-medium text-gray-900"
          >
            {" "}
            Email address{" "}
          </label>
          <div className="mt-2">
            <input
              className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="email"
              placeholder="Email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
        </div>
        <div>
          <label htmlFor="name" className="text-base font-medium text-gray-900">
            {" "}
            Username{" "}
          </label>
          <div className="mt-2">
            <input
              className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="text"
              placeholder="Username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            ></input>
          </div>
        </div>
        <div>
          <label htmlFor="name" className="text-base font-medium text-gray-900">
            {" "}
            First Name{" "}
          </label>
          <div className="mt-2">
            <input
              className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="text"
              placeholder="First Name"
              id="first_name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            ></input>
          </div>
        </div>
        <div>
          <label htmlFor="name" className="text-base font-medium text-gray-900">
            {" "}
            Last Name{" "}
          </label>
          <div className="mt-2">
            <input
              className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="text"
              placeholder="Last Name"
              id="last_name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            ></input>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="text-base font-medium text-gray-900"
            >
              {" "}
              Password{" "}
            </label>
          </div>
          <div className="mt-2">
            <input
              className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="password"
              placeholder="Password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="seller"> Seller</option>
            <option value="buyer">Buyer</option>
          </select>
        </div>
        {error && (
          <div className="w-full text-nowrap">
            <label htmlFor="" className="text-red-500">
              {error}
            </label>
          </div>
        )}
        <div>
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80 disabled:bg-slate-500"
            disabled={submitting}
          >
            Create Account <ArrowRight className="ml-2" size={16} />
          </button>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
