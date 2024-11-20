import { useState, useEffect } from "react";
import Sidebar from "../../Component/SideBar";
import Header from "../../Component/header";
import { useAuth } from "@clerk/nextjs";
import { Ticket, Note } from "@/app/ticket/[id]/page";
import Link from "next/link";
import { FaCog } from "react-icons/fa";
import "@fortawesome/fontawesome-svg-core/styles.css";

const History = () => {
  const { getToken, orgId, userId } = useAuth();
  const [query, setQuery] = useState<string>("");

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [resolvedTickets, setResolvedTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
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
      setLoading(false);
    }

    fetchTickets();
  }, []);
  // Filter to get only resolved tickets (including search)

  useEffect(() => {
    if (query != "") {
      setResolvedTickets(
        tickets.filter(
          (item) => item.status == "Closed" && item.title.includes(query)
        )
      );
    } else {
      setResolvedTickets(tickets.filter((item) => item.status == "Closed"));
    }
  }, [loading, query]);

  if (loading) {
    return (
      <div className="flex h-screen dark:bg-gray-900 bg-gray-100">
        <Sidebar />
        
        <div className="flex-1 flex flex-col">
          <Header onQuery={setQuery} />
         
          <div className="flex flex-1 p-8 space-x-8">
            <div className="flex-1 dark:bg-gray-800 bg-white p-6 rounded-lg shadow-lg">
              <h1 className="text-3xl font-bold mb-6 dark:text-gray-100 text-gray-800">
               
                History
              
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
    <div className="flex h-screen dark:bg-gray-900 bg-gray-100">
     
      <Sidebar />
     
      <div className="flex-1 flex flex-col">
       
        <Header onQuery={setQuery} />
        
        <div className="flex flex-1 flex-col md:flex-row md:space-x-8 p-4 md:p-8">
            <div className="flex-1 dark:bg-gray-800 bg-white p-6 rounded-lg shadow-lg">
              <h1 className="text-2xl md:text-3xl font-bold dark:text-gray-100 mb-4 text-gray-800">
              History
            </h1>

            {/* Scrollable container for the history list with hidden scrollbar */}
            <div className="max-h-[68vh] overflow-y-auto hide-scrollbar">
              <ul className="space-y-4">
               
                {resolvedTickets.map((item) => (
                  <li
                    key={item.id}
                    className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    <Link href={`/ticket/${item.id}`}>
                      <div className="font-semibold text-lg dark:text-gray-300 text-gray-700">
                        Ticket #{item.ticketNumber}
                      </div>
                     
                      <div className="text-gray-600 dark:text-gray-300">
                        Issue: {item.title}
                      </div>
                     
                      <div className="text-sm font-medium text-green-500">
                        Status: {item.status}
                      </div>
                      
                      <div className="text-xs text-gray-500 dark:text-gray-300">
                        Resolved by: {item.assignedToName != null ? item.assignedToName : "N/A"}
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
  );
};

export default History;
