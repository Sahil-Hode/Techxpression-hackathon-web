"use client";

import { useGoogleLogin } from "@react-oauth/google";
import { apiRequest } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function GoogleAuthButton() {
  const router = useRouter();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const data = await apiRequest("/auth/google-login", {
          method: "POST",
          body: JSON.stringify({
            googleToken: tokenResponse.access_token,
          }),
        });

        localStorage.setItem("token", data.token);
        router.push("/dashboard");
      } catch (err) {
        console.error("Google login failed", err);
      }
    },
    onError: () => {
      console.log("Google Login Failed");
    },
  });

  return (
    <button
      onClick={() => login()}
      className="
        w-full flex items-center justify-center gap-3
        border border-zinc-800
        py-4 rounded-full
        text-sm font-medium
        text-zinc-300
        hover:border-white hover:text-white
        transition-all
      "
    >
      {/* Google Icon */}
      <svg width="18" height="18" viewBox="0 0 48 48">
        <path
          fill="#FFC107"
          d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.6-.4-3.9z"
        />
        <path
          fill="#FF3D00"
          d="M6.3 14.7l6.6 4.8C14.5 16.1 18.9 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
        />
        <path
          fill="#4CAF50"
          d="M24 44c5.1 0 9.8-2 13.3-5.3l-6.1-5.2C29.3 35.5 26.8 36 24 36c-5.2 0-9.7-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"
        />
        <path
          fill="#1976D2"
          d="M43.6 20.1H42V20H24v8h11.3c-1.1 3-3.3 5.5-6.1 7.3l.1.1 6.1 5.2C34.9 42.2 44 36 44 24c0-1.3-.1-2.6-.4-3.9z"
        />
      </svg>

      <span>Continue with Google</span>
    </button>
  );
}
