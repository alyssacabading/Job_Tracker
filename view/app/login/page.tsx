"use client";

import LoginButton from "../components/LoginButton";

export default function Login() {
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
        <div className="flex justify-center items-center">
          <LoginButton className="px-16 py-4 text-2xl rounded-lg transition-all bg-black text-white hover:bg-white hover:text-black border-2 border-black" />
        </div>
      </div>
  );
}
