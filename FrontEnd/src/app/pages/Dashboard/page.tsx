// Dashboard.js jsut testing no funtionality yet

import Sidebar from "../../Component/SideBar";
import Header from "../../Component/header";
import TicketConversation from "../../Component/TicketConversation";

export default function Dashboard() {


  return (
    <div className="flex h-auto bg-gray-200">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />

        <div className="flex flex-1">
          <TicketConversation />
        </div>
      </div>
    </div>
  );
}
