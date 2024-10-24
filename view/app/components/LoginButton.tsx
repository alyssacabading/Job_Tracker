"use client"; // Ensure this component is client-side rendered

import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginButton() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Ensures this code only runs on the client
    setIsClient(true);
  }, []);

  const handleLogin = async () => {
    try {
        await loginWithRedirect();
        router.push("/applications"); // After successful login, redirect
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
        <button onClick={handleLogin}>Login</button>
      ) : (
        <p>You are already logged in!</p>
      )}
    </div>
  );
}