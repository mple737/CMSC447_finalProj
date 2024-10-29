// RootLayout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";
import LandingPage from "./landingPage";
import Header from "./ui/home/header";
import Footer from "./ui/home/footer";

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
            <Header />
            
            <main className="flex-grow">
              {/* Show different content based on whether the user is signed in */}
              <SignedIn>
                {children} {/* Renders the current route's page content */}
              </SignedIn>

              <SignedOut>
                <LandingPage /> {/* Display landing page if user is not signed in */}
              </SignedOut>
            </main>

            <Footer />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
