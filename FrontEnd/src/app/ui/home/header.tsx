"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import Link from 'next/link';
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false); // State to manage mobile menu visibility

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen); // Toggle the mobile menu state
  };

  return (
    <header className="fixed top-0 left-0 right-0 p-2 bg-white bg-opacity-90 flex justify-between items-center z-50">
      
      <div className="ml-4 cursor-pointer">
        <Image 
          
          src="/logo/logo.png" 
          alt="Supportlify Logo"
          width={110} 
          height={50}
        
        />
      </div>

      {/* Navigation Links */}
      <nav className={`hidden md:flex space-x-12 ml-auto mr-8 ${isMobileMenuOpen ? "block" : "hidden"} md:block`}>
       
        <Link href="/homepage" className="font-semibold uppercase text-black hover:text-gray-600 transition duration-200"> Home </Link>
        
        <Link href="/about" className="font-semibold uppercase text-black hover:text-gray-600 transition duration-200"> About Us </Link>
        
        <Link href="/services" className="font-semibold uppercase text-black hover:text-gray-600 transition duration-200"> Services </Link>
        
        <Link href="/FAQ" className="font-semibold uppercase text-black hover:text-gray-600 transition duration-200"> FAQ </Link>
        
        <Link href="/contactForm" className="font-semibold uppercase text-black hover:text-gray-600 transition duration-200"> Contact </Link>
      </nav>

     
      <div className="flex items-center space-x-4 mr-4">
        <SignedOut>
         
          <div className="px-4 py-2 bg-gradient-to-r from-purple-700 to-blue-700 text-white rounded-lg hover:from-purple-600 hover:to-blue-800 transition duration-200">
          
            <SignInButton mode="modal">Log In</SignInButton>
          
          </div>
        </SignedOut>
        
        <SignedIn>
          
          <div className="px-4 py-2 bg-gradient-to-r from-purple-700 to-blue-700 text-white rounded-lg hover:from-purple-600 hover:to-blue-800 transition duration-200">
            <UserButton showName />
         
          </div>
        </SignedIn>

        {/* Mobile Menu Option */}
        <button 
          className="md:hidden p-2 rounded-md text-black hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" 
         
          onClick={toggleMobileMenu}
        >
          {/*menu icon */}
          ☰
        </button>
      </div>

      {/* Links */}
      {isMobileMenuOpen && (
        
        <div className="absolute top-20 right-4 bg-white shadow-lg rounded-lg md:hidden">
         
          <nav className="flex flex-col space-y-2 p-4">
           
            <Link href="/homePage" className="font-semibold uppercase text-black hover:text-gray-600 transition duration-200"> Home </Link>
           
            <Link href="/about" className="font-semibold uppercase text-black hover:text-gray-600 transition duration-200"> About Us </Link>
           
            <Link href="/services" className="font-semibold uppercase text-black hover:text-gray-600 transition duration-200"> Services </Link>
           
            <Link href="/faq" className="font-semibold uppercase text-black hover:text-gray-600 transition duration-200"> FAQ </Link>
           
            <Link href="/contact" className="font-semibold uppercase text-black hover:text-gray-600 transition duration-200"> Contact </Link>
         
          </nav>
        </div>
      )}
    </header>
  );
}
