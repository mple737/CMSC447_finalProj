'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { FaTicketAlt, FaChartPie, FaBook, FaCog, FaPlus } from 'react-icons/fa'; 
import { Protect } from '@clerk/nextjs';

const Sidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false); 
  const [isButtonVisible, setButtonVisible] = useState(true);

  //This is the function to toggle the sidebar open/close state and hide the button
  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev); 
    setButtonVisible(false); 
  };

  //Close sidebar when backdrop is clicked and show the button
  const closeSidebar = () => {
    setSidebarOpen(false); 
    setButtonVisible(true); 
  };

  return (
    <div>
      
      {/* This will disappear when clicked*/}
      {isButtonVisible && (
        <button 
          className="md:hidden px-2 py-1 bg-gray-800 dark:bg-gray-100 text-white font-semibold dark:text-gray-800 dark:font-semibold rounded-full fixed top-16 left-4 z-50 transition-transform duration-300 transform hover:scale-110 focus:outline-none"
          onClick={toggleSidebar}
        >
          ☰
        </button>
      )}


      {/* Sidebar content */}
      <div 
        className={`bg-gray-800 text-white w-60 h-screen p-6 flex flex-col space-y-6 transition-all duration-300 ease-in-out fixed top-0 left-0 z-40 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0 md:block`}
      >
        {/* Sidebar Header */}
        <h1 className="text-3xl font-bold text-center mb-10 sm:mt-12 md:mt-0">
          Supportlify
        </h1>
        
        {/* Sidebar Navigation Links */}
        <nav className="space-y-6 ">

          <Link href="/dashboard" className="flex items-center space-x-3 hover:bg-gray-700 p-3 rounded-md transition-all duration-300">
            <FaTicketAlt /> <span>Tickets</span>
          </Link>

          <Link href="/createTicket" className="flex items-center space-x-3 hover:bg-gray-700 p-3 rounded-md transition-all duration-300">
            <FaPlus /> <span>Create Ticket</span>
          </Link>

          {/* Protected link for admin role */}
          <Protect role="org:admin">
            <Link href="/queue" className="flex items-center space-x-3 hover:bg-gray-700 p-3 rounded-md transition-all duration-300">
              <FaChartPie /> <span>Queue</span>
            </Link>
          </Protect>

          <Link href="/history" className="flex items-center space-x-3 hover:bg-gray-700 p-3 rounded-md transition-all duration-300">
            <FaBook /> <span>History</span>
          </Link>

          <Link href="/setting" className="flex items-center space-x-3 hover:bg-gray-700 p-3 rounded-md transition-all duration-300">
            <FaCog /> <span>Settings</span>
          </Link>
        </nav>
      </div>

      {/* Backdrop when sidebar is open on mobile */}
      {isSidebarOpen && (
        <div 
          onClick={closeSidebar} 
          className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50 z-30 md:hidden"
        />
      )}
    </div>
  );
};

export default Sidebar;
