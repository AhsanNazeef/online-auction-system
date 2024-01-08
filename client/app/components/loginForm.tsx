"use client";

import { ArrowRight } from "lucide-react";
import React, { use, useEffect } from "react";
import { BaseURL } from "../utils/constants";
import { useRouter } from "next/navigation";
import { getUserFromToken, setCookie } from "../utils/auth";

import { store } from "../../store";

const LoginForm = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const router = useRouter();
  const { user, setUser, accessToken, setAccessToken } = store();

  useEffect(() => {
    if (user) {
      router.push("/auctions");
    }
  }, [router, user]);

  useEffect(() => {
    const settingUser = async () => {
      if (accessToken && !user) {
        const user = await getUserFromToken(accessToken);
        setUser(user);
      }
    };
    settingUser();
  }, [router, accessToken, user, setUser]);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    const res = await fetch(`${BaseURL}/auth/jwt/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (res.ok) {
      setCookie("access-token", data.access, 7);
      setCookie("refresh-token", data.refresh, 7);
      const user = await getUserFromToken(data.access);
      setAccessToken(data.access);
      setUser(user);
    } else {
      setError(data.detail);
    }
    setPassword("");
    setUsername("");
    setSubmitting(false);
  };

  return (
    <form className="mt-8" onSubmit={submit}>
      <div className="space-y-5">
        <div>
          <label htmlFor="" className="text-base font-medium text-gray-900">
            {" "}
            Username{" "}
          </label>
          <div className="mt-2">
            <input
              className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="username"
              placeholder="Username"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
            ></input>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="" className="text-base font-medium text-gray-900">
              {" "}
              Password{" "}
            </label>
          </div>
          <div className="mt-2">
            <input
              className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            ></input>
          </div>
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
            Get started <ArrowRight className="ml-2" size={16} />
          </button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
