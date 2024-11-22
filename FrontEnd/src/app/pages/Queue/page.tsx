// pages/queue.tsx
import Sidebar from "../../Component/SideBar";
import Header from "../../Component/header";

import { useState, useEffect } from "react";
import { useAuth, Protect } from "@clerk/nextjs";

import { Ticket } from "@/app/ticket/[id]/page";

import Link from "next/link";

import { FaCog } from "react-icons/fa";
import "@fortawesome/fontawesome-svg-core/styles.css";

const Queue = () => {
  const { getToken, orgId, userId, orgRole } = useAuth();
  const [query, setQuery] = useState<string>("");
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const [activeTickets, setActiveTickets] = useState<Ticket[]>([]);
  const [completedTickets, setCompletedTickets] = useState<Ticket[]>([]);

  const [loadingTickets, setLoadingTickets] = useState<boolean>(true);
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
  
  useEffect(() => {
    if (orgRole == "org:admin") {
      if (query != "") {
        setActiveTickets(
          tickets.filter(
            (ticket) =>
              (ticket.status == "Open" || ticket.status == "Pending") && ticket.assignedToId == userId &&
              ticket.title.includes(query)
          )
        );

        setCompletedTickets(
          tickets.filter(
            (ticket) =>
              ticket.status == "Closed" &&
              ticket.assignedToId == userId &&
              ticket.title.includes(query)
          )
        );
      } else {
        setActiveTickets(
          tickets.filter(
            (ticket) => (ticket.status == "Open" || ticket.status == "Pending") && ticket.assignedToId == userId
          )
        );
        setCompletedTickets(
          tickets.filter(
            (ticket) =>
              ticket.status == "Closed" && ticket.assignedToId == userId
          )
        );
      }
    } else {
      setActiveTickets([]);
      setCompletedTickets([]);
    }
  }, [loadingTickets, query]);

  if (loadingTickets) {
    return (
      <div className="flex flex-col md:flex-row h-screen dark:bg-gray-900 bg-gray-100">
        {/* Sidebar */}
        <div className="h-screen overflow-y-auto hide-scrollbar">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <Header onQuery={setQuery} />

          {/* Main Content Area */}
          <div className="flex flex-1 flex-col md:flex-row md:space-x-8 p-4 md:p-8 overflow-y-auto hide-scrollbar">
            <div className="flex-1 dark:bg-gray-800 bg-white p-6 rounded-lg shadow-lg overflow-y-auto hide-scrollbar">
              <h1 className="text-2xl md:text-3xl font-bold dark:text-gray-100 mb-4 text-gray-800">
                Queue
              </h1>
              <div className="h-fit flex items-center justify-center text-2xl md:text-3xl">
                <FaCog className="fa-spin font-bold dark:text-gray-100 text-gray-800" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Protect
      role="org:admin"
      fallback={
        <div className="flex flex-col md:flex-row h-screen dark:bg-gray-900 bg-gray-100">
        {/* Sidebar */}
        <div className="h-screen overflow-y-auto hide-scrollbar">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <Header onQuery={setQuery} />

            {/* Main Content Area */}
            <div className="flex flex-1 flex-col md:flex-row md:space-x-8 p-4 md:p-8 ">
            <div className="flex-1 dark:bg-gray-800 bg-white p-6 rounded-lg shadow-lg">
              <h1 className="text-2xl md:text-3xl font-bold dark:text-gray-100 mb-4 text-gray-800">
                Queue
              </h1>
                <div className="h-fit flex items-center dark:text-gray-100 text-gray-800 justify-center text-2xl md:text-3xl">
                  Only admins can view this page!
                
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    >
  <div className="flex h-screen dark:bg-gray-900 bg-gray-100">
     
     <Sidebar />
    
     <div className="flex-1 flex flex-col">
      
       <Header onQuery={setQuery} />
       
       <div className="flex flex-1 flex-col md:flex-row md:space-x-8 p-4 md:p-8">
           <div className="flex-1 dark:bg-gray-800 bg-white p-6 rounded-lg shadow-lg">
             <h1 className="text-2xl md:text-3xl font-bold dark:text-gray-100 mb-4 text-gray-800">
             Queue
           </h1>
             
              <div className="max-h-[68vh] overflow-y-auto hide-scrollbar">
                <h2 className="text-lg md:text-xl dark:text-gray-300 font-semibold mb-4 text-gray-600">
                  Active Tickets
                </h2>
               
              
                <ul className="space-y-4">
                  {activeTickets.map((item) => (
                    <li
                      key={item.id}
                      className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md dark:hover:bg-gray-600 hover:bg-gray-100"
                    >
                      <Link href={"/ticket/" + item.id}>
                        <div className="font-semibold text-lg dark:text-gray-300 text-gray-700">
                          Ticket #{item.ticketNumber}
                        </div>
                        <div className="text-gray-600 dark:text-gray-300">Issue: {item.title}</div>
                          <div
                            className={`text-sm font-medium ${
                              item.status === "Pending"
                                ? "text-yellow-500"
                                : item.status === "Open"
                                ? "text-blue-500"
                                : ""
                            }`}
                          >
                          Status: {item.status}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>

                <h2 className="text-lg md:text-xl dark:text-gray-300 font-semibold mt-8 mb-4 text-gray-600">
                  Completed Tickets
                </h2>
                <ul className="space-y-4">
                  {completedTickets.map((item) => (
                    <li
                      key={item.id}
                      className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md dark:hover:bg-gray-600 hover:bg-gray-100"
                    >
                      <Link href={"/ticket/" + item.id}>
                        <div className="font-semibold dark:text-gray-300 text-lg text-gray-700">
                          Ticket #{item.ticketNumber}
                        </div>
                        <div className="text-gray-600 dark:text-gray-300">Issue: {item.title}</div>
                        <div className="text-sm font-medium text-green-500">
                          Status: {item.status}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              
              </div>
            </div>
          </div>
        </div>
      </div>
    
    </Protect>
  );
};

export default Queue;
