"use client"

import { ClientAuthWrapper } from "../components/ClientAuthWrapper";
import LoginButton from "../components/LoginButton";

export default function Login() {
  return (
    <ClientAuthWrapper>
    <div className="flex h-screen justify-center items-center">
      <LoginButton />
    </div>
    </ClientAuthWrapper>
  );
}
