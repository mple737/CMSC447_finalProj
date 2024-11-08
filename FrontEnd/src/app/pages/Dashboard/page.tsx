// Dashboard.js jsut testing no funtionality yet
'use server'
import React from "react";
import Sidebar from "../../Component/SideBar";
import Header from "../../Component/header";
import TicketProperties from "../../Component/ticketProperties";
import TicketConversation from "../../Component/TicketConversation";

import {Ticket, Note} from '@/app/ticket/[id]/page'
import { auth } from '@clerk/nextjs/server'

export default async function Dashboard() {
  const { getToken, orgId } = await auth();

  const ticket = await fetch(`http://localhost:3500/tickets/${orgId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${await getToken()}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

  console.log(ticket.userId);

  return (
    <div className="flex h-screen bg-gray-200">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />

        <div className="flex flex-1">
          <TicketConversation props={ticket} />
        </div>
      </div>
    </div>
  );
}
