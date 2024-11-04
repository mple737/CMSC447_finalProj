// Header.js
import React from 'react';
import { SignedIn, UserButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <div className="flex justify-between items-center p-6 bg-white shadow-lg ">
      {/* Left Section: Dropdown and Search */}
      <div className="flex space-x-4 items-center">
        {/* Department Dropdown */}
        <select className="p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:border-gray-400">
          <option>All Departments</option>
          <option>Support</option>
          <option>Sales</option>
        </select>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search tickets..."
          className="w-72 p-3 border border-gray-300 rounded-lg bg-gray-50 placeholder-gray-500 text-gray-700 focus:outline-none focus:border-gray-400"
        />
      </div>

      {/* Right Section: User Profile */}
      <SignedIn>
        <div className="flex items-center space-x-4">
          <UserButton showName />
        </div>
      </SignedIn>
    </div>
  );
}
