"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import Image from "next/image";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 p-1 bg-white text-black flex justify-between items-center z-50 shadow-lg">
      {/* Logo Section */}
      <div className="ml-4 cursor-pointer">
        <Image 
          src="/logo/logo.png" 
          alt="Supportlify Logo"
          width={110} 
          height={50}
        />
      </div>

      {/* Navigation Links*/}
      <nav className="flex space-x-12 ml-auto mr-8">
        
        <a href="#home" className="font-semibold uppercase hover:text-gray-600 transition duration-200">Home</a>
        <a href="#about" className="font-semibold uppercase hover:text-gray-600 transition duration-200">About Us</a>
        <a href="#services" className="font-semibold uppercase hover:text-gray-600 transition duration-200">Services</a>
        <a href="#faq" className="font-semibold uppercase hover:text-gray-600 transition duration-200">FAQ</a>
        <a href="#contact" className="font-semibold uppercase hover:text-gray-600 transition duration-200">Contact</a>
      </nav>

      {/* User Authentication Buttons */}
      <div className="flex items-center space-x-4 mr-8">
        <SignedOut>

          <div className="px-4 py-2 bg-gradient-to-r from-purple-700 to-blue-700 text-white rounded-lg hover:from-purple-600 hover:to-blue-800 transition duration-200">
            <SignInButton>Log In</SignInButton>
          </div>

        </SignedOut>
        <SignedIn>

          <div className="px-4 py-2 bg-gradient-to-r from-purple-700 to-blue-700 text-white rounded-lg hover:from-purple-600 hover:to-blue-800 transition duration-200">
            <UserButton showName />

          </div>
        </SignedIn>
      </div>
    </header>
  );
}
