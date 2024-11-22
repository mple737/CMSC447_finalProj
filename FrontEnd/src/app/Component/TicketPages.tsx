"use client";
import { useAuth } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import Date from "./Date";
import Link from "next/link";

import { FaCog } from "react-icons/fa";

import { Ticket, Note } from "@/app/ticket/[id]/page";
import "@fortawesome/fontawesome-svg-core/styles.css";


const TicketPage = ({ query }: any) => {
  const { getToken, orgId, userId, orgRole } = useAuth();

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [activeTickets, setActiveTickets] = useState<Ticket[]>([]);
  const [loadingTickets, setLoadingTickets] = useState<boolean>(true);
  const [loadingRoles, setLoadingRoles] = useState<boolean>(true);

  // Fetch request tickets
  useEffect(() => {
    async function fetchTickets() {
      const ticket = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tickets/${orgId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${await getToken()}`,
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
      setTickets(ticket);
      setLoadingTickets(false);
    }

    fetchTickets();
  }, []);

  // Org role checks
  useEffect(() => {
    if (orgRole == "org:admin") {
      if (query != "") {
        setActiveTickets(
          tickets.filter(
            (ticket) =>
              (ticket.status == "Open" || ticket.status == "Pending") &&
              ticket.title.includes(query)
          )
        );
      } else {
        setActiveTickets(
          tickets.filter(
            (ticket) => ticket.status == "Open" || ticket.status == "Pending"
          )
        );
      }
    } else {
      if (query != "") {
        setActiveTickets(
          tickets.filter(
            (ticket) =>
              (ticket.status == "Open" || ticket.status == "Pending") &&
              ticket.userId == userId &&
              ticket.title.includes(query)
          )
        );
      } else {
        setActiveTickets(
          tickets.filter(
            (ticket) =>
              (ticket.status == "Open" || ticket.status == "Pending") &&
              ticket.userId == userId
          )
        );
      }
      
    }
  }, [loadingTickets, loadingRoles, query]);

  if (loadingTickets && loadingRoles) {
    return (
      <div className="flex flex-1 flex-col md:flex-row md:space-x-8 p-4 md:p-8 ">
        <div className="flex-1 dark:bg-gray-800 bg-white p-6 rounded-lg shadow-lg">
          
          <h1 className="text-2xl md:text-3xl font-bold mb-4 dark:text-gray-100 text-gray-800">
            Tickets
          </h1>

          <div className="max-h-[68vh] overflow-y-auto hide-scrollbar">
            <div className="h-fit flex items-center justify-center text-2xl md:text-3xl">
              <FaCog className="fa-spin font-bold dark:text-gray-100 text-gray-800" />
            </div>
          </div>
        </div>
      </div>
    );
    
  }
  
  return (
    <div className="flex flex-1 flex-col md:flex-row md:space-x-8 p-4 md:p-8">
      <div className="flex-1 dark:bg-gray-800 bg-white p-6 rounded-lg shadow-lg">
        
        <h1 className="text-2xl md:text-3xl font-bold dark:text-gray-100 mb-4 text-gray-800">
        
          Tickets
        </h1>
  
         {/* Main Container with Fixed Height */}
        <div className="max-h-[68vh] overflow-y-auto hide-scrollbar">
          <ul className="space-y-4">
           
            {activeTickets.map((tic) => (
             
             <li key={tic.id}>
               
                <div className="flex-1 p-4 space-y-6">
                 
                  <Link href={`/ticket/${tic.id}`}>
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md dark:hover:bg-gray-600 hover:bg-gray-100">
                     
                      <h2 className="text-xl dark:text-gray-300 font-bold text-gray-700">
                        #{tic.ticketNumber} - {tic.title}
                      </h2>
                     
                      <p className="text-sm dark:text-gray-400 text-gray-500">
                        <Date dateString={tic.createdDate} />
                      </p>

                      <div
                          className={`text-sm font-medium py-1 ${
                            tic.status === "Pending"
                              ? "text-yellow-500"
                              : tic.status === "Open"
                              ? "text-blue-500"
                              : ""
                          }`}
                        >
                          Status: {tic.status}
                        </div>
                     
                      <div className="mt-4 dark:text-gray-400 text-gray-500">
                        <p><strong>{tic.userName}</strong></p>
                        <p className="dark:text-gray-300 text-gray-700">{tic.body}</p>
                      </div>
                    </div>
                  
                  </Link>
               
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
  
  
};

export default TicketPage;
