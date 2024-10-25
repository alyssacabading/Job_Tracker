import { ProtectedContent } from "@/app/components/ProtectedContent";
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ProtectedContent>{children}</ProtectedContent>
      </body>
    </html>
  );
}
