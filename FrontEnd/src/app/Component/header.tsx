'use client'
import React from 'react';
import { SignedIn, UserButton, OrganizationSwitcher } from "@clerk/nextjs";
import { useTheme } from 'next-themes';
import { dark } from '@clerk/themes'

export default function Header({onQuery}: any) {

  const onQueryChangeHandler = (e: any) => {
    onQuery(e.target.value)
  }

  const { resolvedTheme } = useTheme()

  return (
    <div className="flex justify-between items-center p-6 bg-white dark:bg-gray-800 shadow-lg">
      {/* Left Section: Dropdown and Search */}
      <div className="flex space-x-4 items-center w-full sm:w-auto">
        {/* Department Dropdown (commented out) */}
        {/*<select className="p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:border-gray-400">
          <option>All Departments</option>
          <option>Support</option>
          <option>Sales</option>
        </select>*/}
        
        <div className="flex flex-col items-center text-gray-700 gap-2 sm:flex-row sm:gap-4">
          <OrganizationSwitcher hidePersonal={true} appearance={{ baseTheme: resolvedTheme == "dark" ? dark : undefined }} />
        </div>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search tickets..."
          className="w-full sm:w-52 p-1 border dark:bg-gray-700 border-gray-300 dark:text-white rounded-lg bg-gray-50 placeholder-gray-500 text-gray-700 focus:outline-none focus:border-gray-400"
          onChange={onQueryChangeHandler}
        />
      </div>

      {/* Right Section: User Profile */}
      <SignedIn>
        <div className="flex items-center space-x-4">
          <UserButton showName appearance={{ baseTheme: resolvedTheme == "dark" ? dark : undefined }} />
        </div>
      </SignedIn>
    </div>
  );
}

Header.defaultProps = {
  onQuery: ""
}
