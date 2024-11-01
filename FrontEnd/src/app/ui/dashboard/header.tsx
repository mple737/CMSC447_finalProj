// Header.js
import React from 'react';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  SignOutButton,
} from "@clerk/nextjs";

export default function Header() {
  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-md">
      <div className="flex space-x-4 items-center">
        <select className="p-2 border border-gray-300 rounded">
          <option>All Departments</option>
          <option>Support</option>
          <option>Sales</option>
        </select>
        <input
          type="text"
          placeholder="Search tickets..."
          className="w-1/3 p-2 border border-gray-300 rounded"
        />
      </div>

        <SignedIn>
          <div className="flex items-center space-x-2">
            <UserButton showName />
          </div>
        </SignedIn>
    
    </div>
  );
}
