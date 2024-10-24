import { ClientAuthWrapper } from "@/app/components/ClientAuthWrapper";
import { ProtectedContent } from "@/app/components/ProtectedContent";
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientAuthWrapper>
            <ProtectedContent>
            {children}
            </ProtectedContent>
        </ClientAuthWrapper>
      </body>
    </html>
  );
}