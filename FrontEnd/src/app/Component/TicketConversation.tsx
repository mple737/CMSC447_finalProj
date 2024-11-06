// TicketConversation.js jsut testing
"use client";
import { useOrganization, useUser, useAuth } from "@clerk/nextjs";
import { clerkClient } from "@clerk/nextjs/server";
import { useState, useEffect } from "react";
import useSWR from "swr";
import Date from "./Date";
import internal from "stream";
import Link from 'next/link'

type Ticket = {
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

type Note = {
  id: string;
  userId: string;
  userName: string;
  body: string;
  ticket: Ticket;
  ticketId: string;
};

const TicketConversation = () => {
  const { user, isSignedIn, isLoaded } = useUser();
  const { organization } = useOrganization();
  const { getToken } = useAuth()

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTickets = async () => {
      await fetch(
        `http://localhost:3500/tickets?organizationId=${organization?.id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${await getToken()}`,
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setTickets(data);
          setLoading(false);
        });
    };
    fetchTickets();
  }, []);

  if (loading || error) {
    // Add loading spinner possibly
    <div className="flex flex-1 flex-col md:flex-row md:space-x-8 p-4 md:p-8 overflow-y-auto hide-scrollbar">
          <div className="flex-1 bg-white p-6 rounded-lg shadow-lg overflow-y-auto hide-scrollbar">
            <h1 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">Tickets</h1></div></div>
  }

  if (!user || !isSignedIn || !isLoaded) {
    <div className="flex flex-1 flex-col md:flex-row md:space-x-8 p-4 md:p-8 overflow-y-auto hide-scrollbar">
          <div className="flex-1 bg-white p-6 rounded-lg shadow-lg overflow-y-auto hide-scrollbar">
            <h1 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">Tickets</h1></div></div>
  }

  if (!organization) {
    <div className="flex flex-1 flex-col md:flex-row md:space-x-8 p-4 md:p-8 overflow-y-auto hide-scrollbar">
          <div className="flex-1 bg-white p-6 rounded-lg shadow-lg overflow-y-auto hide-scrollbar">
            <h1 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">Tickets</h1></div></div>
  }

  return (

    <div className="flex flex-1 flex-col md:flex-row md:space-x-8 p-4 md:p-8 overflow-y-auto hide-scrollbar">
          <div className="flex-1 bg-white p-6 rounded-lg shadow-lg overflow-y-auto hide-scrollbar">
            <h1 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">Tickets</h1>

      <ul>
      {tickets.map((ticket: Ticket) => (
        <li key={ticket.id}>
          
          <div className="flex-1 p-4 space-y-6">
          <Link href={"/ticket/"+ticket.id}>
            <div className="p-4 bg-gray-50 rounded-lg shadow-md hover:bg-gray-100">
              <h2 className="text-xl font-bold text-black">#{ticket.ticketNumber} - {ticket.title}</h2>
              <p className="text-sm text-gray-500">
                <Date dateString={ticket.createdDate} />
              </p>
              <div className="mt-4 text-gray-500">
                <p>
                  <strong> {ticket.userName} </strong>
                </p>
                <p className="text-gray-700">{ticket.body}</p>
              </div>
              <div className="flex space-x-4 mt-4">

              </div>
            </div>
            </Link>
          </div>
        
        </li>
      ))}
    </ul>

    </div></div>
  );
};

export default TicketConversation;
