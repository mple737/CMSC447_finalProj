// Sidebar.js jsut testing 
import React from 'react';
import { FaTicketAlt, FaChartPie, FaBook, FaUsers, FaCog } from 'react-icons/fa';

export default function Sidebar() {
  return (
    <div className="bg-gray-800 text-white w-60 h-screen p-4 flex flex-col space-y-4">
      <h1 className="text-2xl font-bold mb-8">Support</h1>
      <nav className="space-y-4">
        <a href="#" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
          <FaTicketAlt /> <span>Tickets</span>
        </a>
        <a href="#" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
          <FaChartPie /> <span>Analytics</span>
        </a>
        <a href="#" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
          <FaBook /> <span>Knowledge Base</span>
        </a>
        <a href="#" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
          <FaUsers /> <span>Social</span>
        </a>
        <a href="#" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
          <FaCog /> <span>Settings</span>
        </a>
      </nav>
    </div>
  );
}
