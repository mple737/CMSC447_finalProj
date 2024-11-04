// pages/queue.tsx
import React, { useState } from 'react';
import Sidebar from '../../Component/SideBar';
import Header from '../../Component/header';

const Queue = () => {
  const [queue, setQueue] = useState([
    { id: 1, issue: 'Login Issue', status: 'Done' },
    { id: 2, issue: 'Payment Error', status: 'Done' },
    { id: 3, issue: 'Unable to reset password', status: 'In Progress' },
    { id: 4, issue: 'Account Locked', status: 'Waiting' },
  ]);

  const activeTickets = queue.filter(item => item.status !== 'Done');
  const completedTickets = queue.filter(item => item.status === 'Done');

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="h-screen overflow-y-auto hide-scrollbar">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        {/* Main Content Area */}
        <div className="flex flex-1 flex-col md:flex-row md:space-x-8 p-4 md:p-8 overflow-y-auto hide-scrollbar">
          <div className="flex-1 bg-white p-6 rounded-lg shadow-lg overflow-y-auto hide-scrollbar">
            <h1 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">Queue</h1>

            <section>
              <h2 className="text-lg md:text-xl font-semibold mb-4 text-gray-600">Active Tickets</h2>
              <ul className="space-y-4">
                {activeTickets.map((item) => (
                  <li key={item.id} className="p-4 bg-gray-50 rounded-lg shadow-md hover:bg-gray-100">
                    <div className="font-semibold text-lg text-gray-700">Ticket #{item.id}</div>
                    <div className="text-gray-600">Issue: {item.issue}</div>
                    <div className={`text-sm font-medium ${item.status === 'Waiting' ? 'text-yellow-500' : item.status === 'In Progress' ? 'text-blue-500' : ''}`}>
                      Status: {item.status}
                    </div>
                  </li>
                ))}
              </ul>

              <h2 className="text-lg md:text-xl font-semibold mt-8 mb-4 text-gray-600">Completed Tickets</h2>
              <ul className="space-y-4">
                {completedTickets.map((item) => (
                  <li key={item.id} className="p-4 bg-gray-50 rounded-lg shadow-md hover:bg-gray-100">
                    <div className="font-semibold text-lg text-gray-700">Ticket #{item.id}</div>
                    <div className="text-gray-600">Issue: {item.issue}</div>
                    <div className="text-sm font-medium text-green-500">Status: {item.status}</div>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Queue;
