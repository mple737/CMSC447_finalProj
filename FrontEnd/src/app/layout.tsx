// RootLayout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";
import LandingPage from "./landing/landingPage";

import Footer from "./landing/home/footer";

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
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className}`}>
          <div className="flex flex-col min-h-screen">
            <SignedOut>
             
              <LandingPage /> {/* Display landing page if user is not signed in */}
              <Footer />
             
            </SignedOut>

            <SignedIn>
             
              <main className="flex-grow">
                {children} {/* Renders the current route's page content */}
              </main>
             
            </SignedIn>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
