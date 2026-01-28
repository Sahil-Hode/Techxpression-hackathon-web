"use client";

import { useState } from "react";
import { apiRequest } from "@/lib/api";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const router = useRouter();

  const sendOtp = async () => {
    if (!email) {
      setMessage("Email is required.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      await apiRequest("/auth/send-otp", {
        method: "POST",
        body: JSON.stringify({ email }),
      });

      setMessage("Code sent. Redirecting…");

      // ⏳ Small delay for UX
      setTimeout(() => {
        router.push(`/reset-password?email=${encodeURIComponent(email)}`);
      }, 1200);

    } catch (err: any) {
      setMessage(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#000] text-zinc-200 flex flex-col items-center justify-center p-6 font-sans">
      <div className="w-full max-w-[360px] space-y-10">
        
        {/* Back */}
        <Link
          href="/login"
          className="group flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-zinc-500 hover:text-white"
        >
          <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
          Back to Login
        </Link>

        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-xl font-medium text-white">Reset access.</h1>
          <p className="text-zinc-500 text-sm">
            Enter your email to get a code.
          </p>
        </div>

        {/* Form */}
        <div className="space-y-8">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent border-b border-zinc-800 py-3 focus:outline-none focus:border-white placeholder:text-zinc-700 text-sm"
          />

          <div className="space-y-4">
            <button
              onClick={sendOtp}
              disabled={loading}
              className="w-full bg-white text-black py-4 rounded-full font-bold hover:bg-zinc-200 disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Code"}
            </button>

            {message && (
              <p className="text-center text-[11px] text-zinc-400">
                {message}
              </p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
