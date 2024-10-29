// Header.js jsut testng
import React from 'react';

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
      <img src="profile-pic-url" alt="User Profile" className="w-8 h-8 rounded-full" />
    </div>
  );
}
