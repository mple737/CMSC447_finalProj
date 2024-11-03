// Dashboard.js jsut testing no funtionality yet
"use client";
import React from 'react';
import Sidebar from '../../Component/SideBar';
import Header from '../../Component/header';
import TicketProperties from '../../Component/ticketProperties';
import TicketConversation from '../../Component/TicketConversation';


export default function Dashboard() {
  return (

    
    <div className="flex h-screen bg-gray-200">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />

        <div className="flex flex-1">
          <TicketProperties />
          <TicketConversation />
        </div>
      </div>
    </div>
    
  );
}
