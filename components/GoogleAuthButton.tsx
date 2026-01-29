"use client";

import { GoogleLogin } from "@react-oauth/google";
import { apiRequest } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function GoogleAuthButton() {
  const router = useRouter();

  return (
    <div className="flex justify-center">
      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          try {
            const data = await apiRequest("/auth/google-login", {
              method: "POST",
              body: JSON.stringify({
                googleToken: credentialResponse.credential,
              }),
            });

            // store JWT
            localStorage.setItem("token", data.token);

            router.push("/dashboard");
          } catch (err) {
            console.error("Google login failed", err);
          }
        }}
        onError={() => {
          console.log("Google Login Failed");
        }}
      />
    </div>
  );
}
