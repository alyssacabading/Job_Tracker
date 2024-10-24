"use client"
import { ClientAuthWrapper } from "./components/ClientAuthWrapper";
import "./globals.css";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased bg-customsoftwhite`}
      >
        <ClientAuthWrapper>
          {children}
        </ClientAuthWrapper>
      </body>
    </html>
  );
}

