import { useState, useEffect } from "react";
import Sidebar from "../../Component/SideBar";
import Header from "../../Component/header";
import { useAuth } from "@clerk/nextjs";
import { Ticket, Note } from "@/app/ticket/[id]/page";
import Link from "next/link";
import { FaSpinner } from "react-icons/fa";
import "@fortawesome/fontawesome-svg-core/styles.css";

const History = () => {
  const { getToken, orgId, userId } = useAuth();
  const [query, setQuery] = useState<string>("");

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [resolvedTickets, setResolvedTickets] = useState<Ticket[]>([]);
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
      setTickets(ticket)
      setLoading(false);
    }

    fetchTickets();
    
  }, []);
  // Filter to get only resolved tickets (including search)

  useEffect(() => {
    if(query != "") {
      setResolvedTickets(tickets.filter((item) => item.status == "Closed" && item.title.includes(query)))
    } else {
      setResolvedTickets(tickets.filter((item) => item.status == "Closed"))
    }
  }, [loading, query])
  

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <div className="flex flex-1 p-8 space-x-8">
            <div className="flex-1 bg-white p-6 rounded-lg shadow-lg overflow-y-auto">
              <h1 className="text-3xl font-bold mb-6 text-gray-800">History</h1>
              <div className="h-fit flex items-center justify-center text-2xl md:text-3xl">
                <FaSpinner className="fa-spin font-bold text-gray-800" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header onQuery={setQuery} />
        <div className="flex flex-1 p-8 space-x-8">
          <div className="flex-1 bg-white p-6 rounded-lg shadow-lg overflow-y-auto">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">History</h1>
            <ul className="space-y-4">
              {resolvedTickets.map((item) => (
                <li
                  key={item.id}
                  className="p-4 bg-gray-50 rounded-lg shadow-md hover:bg-gray-100"
                >
                  <Link href={"/ticket/" + item.id}>
                    <div className="font-semibold text-lg text-gray-700">
                      Ticket #{item.ticketNumber}
                    </div>
                    <div className="text-gray-600">Issue: {item.title}</div>
                    <div className="text-sm font-medium text-green-500">
                      Status: {item.status}
                    </div>
                    <div className="text-xs text-gray-500">
                      Resolved by: {item.assignedToName}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
