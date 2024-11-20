import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";
import LandingPage from "./landing/landingPage";
import Footer from "./landing/home/footer";
import Providers from "@/app/Component/Providers";
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Supportlify",
  description: "AI helpdesk system assistant",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className}`}>
        <ClerkProvider dynamic>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="flex flex-col min-h-screen">
              <SignedOut>
                <LandingPage />
                <Footer />
              </SignedOut>

              <SignedIn>
                <main className="flex-grow">
                  {children}
                </main>
              </SignedIn>
            </div>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
