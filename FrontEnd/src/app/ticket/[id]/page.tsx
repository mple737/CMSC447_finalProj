import { auth } from "@clerk/nextjs/server";
import type { NextApiRequest, NextApiResponse } from "next";
import TicketConversation from "@/app/Component/TicketConversation";  // Import TicketConversation
import TicketProperties from "@/app/Component/ticketProperties";
import Sidebar from "../../Component/SideBar";
import Header from "../../Component/header";
import React from "react";

export const dynamicParams = true;

export type Ticket = {
  id: string;
  createdDate: string;
  organizationId: string;
  title: string;
  body: string;
  userId: string;
  userName: string;
  type: string;
  category: string;
  status: string;
  assignedToId: string;
  assignedToName: string;
  ticketNumber: number;
  notes: Note[];
};

export type Note = {
  id: string;
  userId: string;
  userName: string;
  body: string;
  ticket: Ticket;
  ticketId: string;
};

export default async function Page({ params }: { params: Ticket }) {
  const { getToken, orgId } = await auth();

  const ticketId = (await params).id;

  const ticket = await fetch(`http://localhost:3500/tickets/${orgId}/${ticketId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${await getToken()}`,
      "Content-Type": "application/json",
    },
    cache: 'no-cache'
  }).then((res) => res.json());

  const user = await fetch(`http://localhost:3500/users/${ticket.userId}/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${await getToken()}`,
      "Content-Type": "application/json",
    },
    cache: 'no-cache'
  }).then((res) => res.json());

  const admins = await fetch(`http://localhost:3500/users/${ticket.userId}/${orgId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${await getToken()}`,
      "Content-Type": "application/json",
    },
    cache: 'no-cache'
  }).then(async (res) => await res.json());

  const allAdmins = admins.data.filter((e: any) => e.role.includes("org:admin"));

  return (
    <div>
      <div className="flex h-screen bg-gray-200">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />

          <div className="flex flex-1">
            {/* Replace TicketPages with TicketConversation */}
            <TicketProperties ticket={ticket} user={user} admin={allAdmins} />
            <TicketConversation props={ticket} /> 
          </div>
        </div>
      </div>
    </div>
  );
}
