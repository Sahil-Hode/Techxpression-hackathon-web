"use client";

import { useState } from "react";
import { apiRequest } from "@/lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import GoogleAuthButton from "@/components/GoogleAuthButton";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    setLoading(true);
    try {
      const res = await apiRequest("/auth/register", {
        method: "POST",
        body: JSON.stringify({ email, name, password }),
      });

      localStorage.setItem("token", res.token);
      router.push("/dashboard");
    } catch (err: any) {
      alert(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#000] text-zinc-200 flex flex-col items-center justify-center p-6 font-sans">
      <div className="w-full max-w-[360px] space-y-10">

        {/* Header */}
        <div className="space-y-2 text-center">
          <h1 className="text-xl font-medium tracking-tight text-white">
            Join the community.
          </h1>
          <p className="text-zinc-500 text-sm">
            Create your profile to get started.
          </p>
        </div>

        {/* Google Signup */}
        <GoogleAuthButton />

        {/* Divider */}
        <div className="relative flex items-center">
          <div className="flex-grow border-t border-zinc-900"></div>
          <span className="mx-4 text-[10px] text-zinc-700 font-bold uppercase tracking-[0.3em]">
            or
          </span>
          <div className="flex-grow border-t border-zinc-900"></div>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full bg-transparent border-b border-zinc-800 py-3 focus:outline-none focus:border-white"
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email Address"
              className="w-full bg-transparent border-b border-zinc-800 py-3 focus:outline-none focus:border-white"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full bg-transparent border-b border-zinc-800 py-3 focus:outline-none focus:border-white"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full bg-white text-black py-4 rounded-full font-bold hover:bg-zinc-200 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-zinc-600">
          Already a member?{" "}
          <Link
            href="/login"
            className="text-zinc-400 hover:text-white underline"
          >
            Sign back in
          </Link>
        </div>
      </div>
    </div>
  );
}
