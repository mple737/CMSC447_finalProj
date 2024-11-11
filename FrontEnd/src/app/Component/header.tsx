// Header.js
'use client'
import React from 'react';
import { SignedIn, UserButton, OrganizationSwitcher } from "@clerk/nextjs";

export default function Header({onQuery}:any) {

  const onQueryChangeHandler = (e:any) => {
    onQuery(e.target.value)
  }

  return (
    <div className="flex justify-between items-center p-6 bg-white shadow-lg ">
      {/* Left Section: Dropdown and Search */}
      <div className="flex space-x-4 items-center">
        {/* Department Dropdown */}
        {/*<select className="p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:border-gray-400">
          <option>All Departments</option>
          <option>Support</option>
          <option>Sales</option>
        </select>*/}
        <div className="flex flex-col items-center text-gray-700 gap-2">
        <OrganizationSwitcher hidePersonal={true}/>
        </div>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search tickets..."
          className="w-72 p-3 border border-gray-300 rounded-lg bg-gray-50 placeholder-gray-500 text-gray-700 focus:outline-none focus:border-gray-400"
          onChange={onQueryChangeHandler}
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

Header.defaultProps = {
  onQuery: ""
}
