// TicketConversation.js jsut testing
"use client";
import { useOrganization, useUser, useAuth } from "@clerk/nextjs";
import { clerkClient } from "@clerk/nextjs/server";
import { useState, useEffect } from "react";
import useSWR from "swr";
import Date from "./Date";
import internal from "stream";
import Link from "next/link";

import { FaSpinner } from "react-icons/fa";

import { Ticket, Note } from "@/app/ticket/[id]/page";
import '@fortawesome/fontawesome-svg-core/styles.css'

const TicketConversation = (ticket: any) => {
  const { getToken, orgId, userId } = useAuth();

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    async function fetchTickets() {
      const ticket = await fetch(`http://localhost:3500/tickets/${orgId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${await getToken()}`,
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
      setTickets(ticket);
      setLoading(false);
    }
    fetchTickets();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-1 flex-col md:flex-row md:space-x-8 p-4 md:p-8 overflow-y-auto hide-scrollbar">
        <div className="flex-1 bg-white p-6 rounded-lg shadow-lg overflow-y-auto hide-scrollbar">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800 ">
          Tickets
          
        </h1>
        <div className="h-fit flex items-center justify-center text-2xl md:text-3xl">
        <FaSpinner className="fa-spin font-bold text-gray-800"/>
        </div>


        </div>

      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col md:flex-row md:space-x-8 p-4 md:p-8 overflow-y-auto hide-scrollbar">
      <div className="flex-1 bg-white p-6 rounded-lg shadow-lg overflow-y-auto hide-scrollbar">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">
          Tickets
        </h1>

        <ul>
          {tickets.map((tic: any) => (
            <li key={tic.id}>
              <div className="flex-1 p-4 space-y-6">
                <Link href={"/ticket/" + tic.id}>
                  <div className="p-4 bg-gray-50 rounded-lg shadow-md hover:bg-gray-100">
                    <h2 className="text-xl font-bold text-black">
                      #{tic.ticketNumber} - {tic.title}
                    </h2>
                    <p className="text-sm text-gray-500">
                      <Date dateString={tic.createdDate} />
                    </p>
                    <div className="mt-4 text-gray-500">
                      <p>
                        <strong> {tic.userName} </strong>
                      </p>
                      <p className="text-gray-700">{tic.body}</p>
                    </div>
                    <div className="flex space-x-4 mt-4"></div>
                  </div>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TicketConversation;
