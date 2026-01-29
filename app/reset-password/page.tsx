"use client";

import { useState, useEffect, Suspense } from "react";
import { apiRequest } from "@/lib/api";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

// We wrap in Suspense because useSearchParams() requires it in Next.js 13/14/15
function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Grabs the email from the URL automatically
  const email = searchParams.get("email") || ""; 

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const getStrength = (pass: string) => {
    if (!pass) return 0;
    let s = 0;
    if (pass.length > 7) s++;
    if (/[A-Z]/.test(pass)) s++;
    if (/[0-9]/.test(pass)) s++;
    if (/[^A-Za-z0-9]/.test(pass)) s++;
    return s;
  };

  const strength = getStrength(newPassword);
  const strengthColors = ["bg-zinc-800", "bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-emerald-500"];

  const handleReset = async () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      // NOW SENDING EMAIL, OTP, AND PASSWORD TO KEEP YOUR API HAPPY
      await apiRequest("/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({ 
          email: email, // Hidden email from URL
          otp, 
          newPassword 
        }),
      });
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
        
        <div className="flex flex-col items-center space-y-4">
          <div className="h-12 w-12 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <div className="text-center">
            <h1 className="text-xl font-medium tracking-tight text-white">Update Password</h1>
            <p className="text-zinc-500 text-sm mt-1 leading-relaxed">
              {email ? `Code sent to ${email}` : "Enter the code sent to your email."}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-5">
            <div>
              <input
                type="text"
                placeholder="000000"
                maxLength={6}
                className="w-full bg-transparent border-b border-zinc-800 py-3 focus:outline-none focus:border-white transition-colors text-center text-xl tracking-[0.75em] font-mono text-white"
                onChange={(e) => setOtp(e.target.value)}
              />
              <div className="flex justify-between mt-3 px-1">
                <span className="text-[10px] text-zinc-600 uppercase tracking-widest font-bold">OTP Code</span>
                <button 
                  disabled={timer > 0}
                  className="text-[10px] uppercase tracking-widest font-bold text-white disabled:text-zinc-700 transition-colors"
                  onClick={() => setTimer(30)}
                >
                  {timer > 0 ? `Resend in ${timer}s` : "Resend"}
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <input
                type="password"
                placeholder="New Password"
                className="w-full bg-transparent border-b border-zinc-800 py-3 focus:outline-none focus:border-white transition-colors placeholder:text-zinc-700 text-sm"
                onChange={(e) => setNewPassword(e.target.value)}
              />
              
              <div className="flex gap-1 h-[2px] w-full">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className={`flex-1 transition-all duration-500 ${i <= strength ? strengthColors[strength] : "bg-zinc-900"}`} />
                ))}
              </div>

              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full bg-transparent border-b border-zinc-800 py-3 focus:outline-none focus:border-white transition-colors placeholder:text-zinc-700 text-sm"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <button 
            onClick={handleReset}
            disabled={loading || !otp || strength < 2}
            className="w-full bg-white text-black text-sm font-bold py-4 rounded-full hover:bg-zinc-200 transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </div>

        <div className="text-center">
          <Link href="/login" className="text-[10px] uppercase tracking-widest text-zinc-600 hover:text-white transition-colors">
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

// Final Export
export default function ResetPassword() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <ResetPasswordContent />
    </Suspense>
  );
}