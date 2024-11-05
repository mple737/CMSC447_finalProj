// TicketConversation.js jsut testing
"use client";
import { useOrganization, useUser } from "@clerk/nextjs";
import { clerkClient } from "@clerk/nextjs/server";
import { useState, useEffect } from "react";
import useSWR from "swr";
import Date from './Date'

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

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTickets = async () => {
      await fetch(
        `http://localhost:3500/tickets?organizationId=${organization?.id}`,
        {
          method: "GET",
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
    return null;
  }

  if (!user || !isSignedIn || !isLoaded) {
    return null;
  }

  if (!organization) {
    return null;
  }

  return (
    <ul>
      {tickets.map((ticket: Ticket) => (
        <li key={ticket.id}>
          <div className="flex-1 p-4 space-y-6">
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-bold text-black">{ticket.title}</h2>
              <p className="text-sm text-gray-500">
                <Date dateString={ticket.createdDate}/>
              </p>
              <div className="mt-4 text-gray-500">
                <p>
                  <strong> {ticket.userName} </strong>
                </p>
                <p className="text-gray-700">{ticket.body}</p>
              </div>
              <div className="flex space-x-4 mt-4">
                <button className="px-4 py-1 bg-blue-500 text-white rounded">
                  Reply
                </button>

                <button className="px-4 py-1 bg-red-500 text-white rounded">
                  Close Ticket
                </button>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TicketConversation;
