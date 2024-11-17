// RootLayout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";
import LandingPage from "./landing/landingPage";

import { ThemeProvider } from "next-themes";

import Footer from "./landing/home/footer";
import Providers from "@/app/Component/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Supportlify",
  description: "AI helpdesk system assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClerkProvider dynamic>
            <div className="flex flex-col min-h-screen">
              <SignedOut>
                <LandingPage />{" "}
                {/* Display landing page if user is not signed in */}
                <Footer />
              </SignedOut>

              <SignedIn>
                <main className="flex-grow">
                  {children} {/* Renders the current route's page content */}
                </main>
              </SignedIn>
            </div>
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
