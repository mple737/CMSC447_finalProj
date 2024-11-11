// Sidebar.js
'use client'
import React from 'react';
import Link from 'next/link';
import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { FaTicketAlt, FaChartPie, FaBook, FaCog, FaPlus } from 'react-icons/fa'; // Import FaPlus for Create Ticket

const Sidebar = () => {
  const { getToken, orgId, userId } = useAuth();
  const [role, setRole] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchRole() {
      const role = await fetch(
        `http://localhost:3500/users/${userId}/${orgId}/role`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${await getToken()}`,
            "Content-Type": "application/json",
          },
        }
      ).then((res) => res.json());
      setRole(role);
      setLoading(false);
    }
    fetchRole();
  }, []);

  if(role != "org:admin") {
    <div className="bg-gray-800 text-white w-60 h-auto min-h-screen p-4 flex flex-col space-y-4">
      <h1 className="text-2xl font-bold mb-8">Supportlify</h1>
      <nav className="space-y-4">

       <Link href="/createTicket" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded"> 
          <FaPlus /> <span>Create Ticket</span>
        </Link>

        <Link href="/dashboard" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
          <FaTicketAlt /> <span>Tickets</span>
        </Link>
        
        <Link href="/history" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
          <FaBook /> <span>History</span>
        </Link>
        <Link href="/setting" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
          <FaCog /> <span>Settings</span>
        </Link>
      </nav>
    </div>
  }

  return (
    <div className="bg-gray-800 text-white w-60 h-auto min-h-screen p-4 flex flex-col space-y-4">
      <h1 className="text-2xl font-bold mb-8">Supportlify</h1>
      <nav className="space-y-4">

       <Link href="/createTicket" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded"> 
          <FaPlus /> <span>Create Ticket</span>
        </Link>

        <Link href="/dashboard" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
          <FaTicketAlt /> <span>Tickets</span>
        </Link>

        <Link href="/queue" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
          <FaChartPie /> <span>Queue</span>
        </Link>
        <Link href="/history" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
          <FaBook /> <span>History</span>
        </Link>
        <Link href="/setting" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
          <FaCog /> <span>Settings</span>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
