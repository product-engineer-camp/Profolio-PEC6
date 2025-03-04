import { GeistSans } from "geist/font/sans";
import AuthButton from "@/features/auth/ui/AuthButton";
import "@/application/globals.css";
import { Logo } from "@/shared/ui/Logo";
import Link from "next/link";
import { QueryProvider } from "./_providers/QueryProvider";
import { Toaster } from "@/shared/ui/sonner";
import { KakaoScript } from "./config/_script/KakaoScript";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Product Engineer Community",
  description: "코드를 넘어, 가치를 만드는 엔지니어들의 성장 공간",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <QueryProvider>
          <main className="flex min-h-screen flex-col items-center">
            <nav className="flex h-16 w-full justify-center border-b border-b-foreground/10">
              <div className="flex w-full max-w-5xl items-center justify-between px-4 text-sm">
                <Link href="/">
                  <Logo />
                </Link>
                <AuthButton />
              </div>
            </nav>

            {children}
          </main>
        </QueryProvider>
        <Toaster />
        <KakaoScript />
      </body>
    </html>
  );
}
