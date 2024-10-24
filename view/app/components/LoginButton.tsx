"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface LoginButtonProps {
  className?: string; // Optional className prop to accept external styles
}

export default function LoginButton({ className = "" }: LoginButtonProps) {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogin = async () => {
    try {
      await loginWithRedirect();
      router.push("/applications");
    } catch (error) {
      console.error("Error logging in with popup:", error);
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <div>
      {!isAuthenticated ? (
        <button
          onClick={handleLogin}
          className={`${className}`}
        >
          Login
        </button>
      ) : (
        <p>You are already logged in!</p>
      )}
    </div>
  );
}
