// Dashboard.js jsut testing no funtionality yet
'use client'
import Sidebar from "../../Component/SideBar";
import Header from "../../Component/header";
import TicketPage from "../../Component/TicketPages";
import { useState } from "react";
export default function Dashboard() {

  const [query, setQuery] = useState<string>("");

  return (
    <div className="flex h-auto dark:bg-gray-900 bg-gray-200">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header onQuery={setQuery}/>

        <div className="flex flex-1">
          <TicketPage query={query}/>
        </div>
      </div>
    </div>
  );
}
