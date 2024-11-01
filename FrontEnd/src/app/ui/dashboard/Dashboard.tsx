// Dashboard.js jsut testing no funtionality yet
import React from 'react';
import Sidebar from './SideBar';
import Header from './header';
import TicketProperties from './ticketProperties';
import TicketConversation from './TicketConversation';
import { SignedIn } from "@clerk/nextjs";

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
