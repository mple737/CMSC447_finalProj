// Sidebar.js
import React from 'react';
import Link from 'next/link';
import { FaTicketAlt, FaChartPie, FaBook, FaCog } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white w-60 h-screen p-4 flex flex-col space-y-4">
      <h1 className="text-2xl font-bold mb-8">Supportlify</h1>
      <nav className="space-y-4">
        <Link href="/dashboard" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
          <FaTicketAlt /> <span>Tickets</span>
        </Link>
        <Link href="/queue" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
          <FaChartPie /> <span>Queue</span>
        </Link>
        <Link href="/history" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
          <FaBook /> <span>History</span>
        </Link>
        <Link href="/settings" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
          <FaCog /> <span>Settings</span>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
