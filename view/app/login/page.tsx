"use client";

import LoginButton from "../components/LoginButton";
import React from "react";
import Image from "next/image";
import { useAuth0 } from "@auth0/auth0-react";

export default function Login() {
  const { loginWithRedirect } = useAuth0();

  const handleGoogleLogin = async () => {
    await loginWithRedirect({
      authorizationParams: {
        connection: 'google-oauth2',
      },
    });
  }

  return (
      <div className="grid grid-cols-2 h-screen">
        {/* Left Sidebar */}
        <div className="bg-customblue text-white font-alata flex flex-col justify-center p-10">
          <div className="space-y-4 text-center">
            <h1 className="text-[96px] font-bold mb-8">Job Tracker</h1>
            <p className="text-[40px]">Track Applications</p>
            <p className="text-[40px]">Skill Matching</p>
            <p className="text-[40px]">Manage Contacts</p>
            <p className="text-[40px]">Data Insights</p>
          </div>
        </div>

        {/* Right Side (Login Button) */}
        <div className="flex flex-col items-center justify-center p-8 space-y-4 w-full">
          <LoginButton className="w-96 px-8 py-2 text-lg rounded-lg transition-all bg-black text-white hover:bg-customblue hover:border-customblue border-2 border-black" />
          <button
            onClick={handleGoogleLogin}
            className="flex justify-center items-center w-96 px-8 py-2 text-lg rounded-lg transition-all bg-white text-black hover:bg-customlightestgrey hover:text-black hover:border-customlightestgrey border-2 border-customlightestgrey"
          >
            <div className="mr-2">
              <Image src="/google-icon.webp" alt="Sign In with Google" width={24} height={24} />
            </div>
            Sign In with Google
          </button>
        </div>
      </div>
  );
}
