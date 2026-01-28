"use client";

import { useState } from "react";
import { apiRequest } from "@/lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const resetPassword = async () => {
    setLoading(true);
    try {
      await apiRequest("/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({ email, otp, newPassword }),
      });
      // Skip the alert for a cleaner redirect flow
      router.push("/login?reset=success");
    } catch (err: any) {
      alert(err.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#000] text-zinc-200 flex flex-col items-center justify-center p-6 font-sans">
      <div className="w-full max-w-[360px] space-y-10">
        
        {/* Security Icon */}
        <div className="flex flex-col items-center space-y-4">
          <div className="h-12 w-12 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <div className="text-center">
            <h1 className="text-xl font-medium tracking-tight text-white">Secure your account</h1>
            <p className="text-zinc-500 text-sm mt-1">Enter the code sent to your email.</p>
          </div>
        </div>

        {/* Input Fields */}
        <div className="space-y-6">
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full bg-transparent border-b border-zinc-800 py-3 focus:outline-none focus:border-white transition-colors placeholder:text-zinc-700 text-sm"
              onChange={(e) => setEmail(e.target.value)}
            />
            
            <input
              type="text"
              placeholder="6-Digit Code"
              className="w-full bg-transparent border-b border-zinc-800 py-3 focus:outline-none focus:border-white transition-colors placeholder:text-zinc-700 text-sm tracking-[0.5em] font-mono"
              onChange={(e) => setOtp(e.target.value)}
            />

            <input
              type="password"
              placeholder="New Password"
              className="w-full bg-transparent border-b border-zinc-800 py-3 focus:outline-none focus:border-white transition-colors placeholder:text-zinc-700 text-sm"
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <button 
            onClick={resetPassword}
            disabled={loading}
            className="w-full bg-white text-black text-sm font-bold py-4 rounded-full hover:bg-zinc-200 transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </div>

        {/* Cancel/Back */}
        <div className="text-center">
          <Link 
            href="/login" 
            className="text-[10px] uppercase tracking-widest text-zinc-600 hover:text-white transition-colors"
          >
            Cancel and Return
          </Link>
        </div>
      </div>
    </div>
  );
}