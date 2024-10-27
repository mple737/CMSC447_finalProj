import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs"; // Ensure SignedIn is imported as well
import LandingPage from "./page";
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
              <SignedIn>
                {children}  {/* This will render when users are signed in */}
              </SignedIn>


              <SignedOut>
                <LandingPage /> {/* This will display the Home component for users who are not signed in */}
              </SignedOut>

            </main>
            <Footer />
          </div>
        </body>
      </html>
      
    </ClerkProvider>
  );
}