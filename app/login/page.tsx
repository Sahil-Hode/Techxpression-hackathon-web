"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { apiRequest } from "@/lib/api";
import GoogleAuthButton from "@/components/GoogleAuthButton";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Email and password required");
      return;
    }

    try {
      setLoading(true);

      const res = await apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      localStorage.setItem("token", res.token);
      router.push("/dashboard");
    } catch (err: any) {
      alert(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#000] text-zinc-200 flex flex-col items-center justify-center p-6 font-sans">
      <div className="w-full max-w-[360px] space-y-10">

        {/* Brand */}
        <div className="flex flex-col items-center space-y-4">
          <div className="h-10 w-10 bg-gradient-to-tr from-zinc-700 to-zinc-200 rounded-full animate-pulse" />
          <h1 className="text-xl font-medium text-white">
            Enter the space.
          </h1>
        </div>

        {/* Inputs */}
        <div className="space-y-6">
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border-b border-zinc-800 py-3 focus:outline-none focus:border-white"
            />

            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-b border-zinc-800 py-3 focus:outline-none focus:border-white"
              />

              <div className="flex justify-end mt-2">
                <Link
                  href="/forgot-password"
                  className="text-[11px] uppercase tracking-widest text-zinc-500 hover:text-white"
                >
                  Forgot?
                </Link>
              </div>
            </div>
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-white text-black py-4 rounded-full font-bold hover:bg-zinc-200 disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Continue"}
          </button>
        </div>

        {/* Divider */}
        <div className="relative flex items-center">
          <div className="flex-grow border-t border-zinc-900"></div>
          <span className="mx-4 text-[10px] text-zinc-700 font-bold uppercase tracking-[0.3em]">
            or
          </span>
          <div className="flex-grow border-t border-zinc-900"></div>
        </div>

        {/* Google Login */}
        <GoogleAuthButton />

        {/* Footer */}
        <div className="pt-4 text-center text-xs text-zinc-600">
          New here?{" "}
          <Link
            href="/register"
            className="text-zinc-400 hover:text-white underline"
          >
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
}
