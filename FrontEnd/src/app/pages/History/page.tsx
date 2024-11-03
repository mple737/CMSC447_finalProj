// pages/history.js
import React, { useState } from 'react';
import Sidebar from '../../Component/SideBar';
import Header from '../../Component/header';
import TicketConversation from '../../Component/TicketConversation';

const History = () => {
  const [history, setHistory] = useState([
    { id: 1, issue: 'Account locked', resolved: true },
    { id: 2, issue: 'Billing Inquiry', resolved: true },
  ]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        {/* Main Content Area */}
        <div className="flex flex-1 p-8 space-x-8">
          {/* History List */}
          <div className="flex-1 bg-white p-6 rounded-lg shadow-lg overflow-y-auto">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">History</h1>
            <ul className="space-y-4">
              {history.map((item) => (
                <li key={item.id} className="p-4 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100">
                  <div className="font-semibold text-lg text-gray-700">Ticket #{item.id}</div>
                  <div className="text-gray-600">Issue: {item.issue}</div>
                  <div className={`text-sm font-medium ${item.resolved ? 'text-green-500' : 'text-red-500'}`}>
                    Status: {item.resolved ? 'Resolved' : 'Pending'}
                  </div>
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
