import { ClientAuthWrapper } from "@/app/components/ClientAuthWrapper";
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientAuthWrapper>
        {children}
        </ClientAuthWrapper>
      </body>
    </html>
  );
}