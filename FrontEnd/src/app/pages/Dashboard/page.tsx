// Dashboard.js jsut testing no funtionality yet
'use client'
import Sidebar from "../../Component/SideBar";
import Header from "../../Component/header";
import TicketConversation from "../../Component/TicketConversation";
import { useState } from "react";
export default function Dashboard() {

  const [query, setQuery] = useState<string>("");

  return (
    <div className="flex h-auto bg-gray-200">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header onQuery={setQuery}/>

        <div className="flex flex-1">
          <TicketConversation query={query}/>
        </div>
      </div>
    </div>
  );
}
