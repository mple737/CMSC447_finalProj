// pages/queue.js
import React, { useState } from 'react';
import Sidebar from '../../Component/SideBar';
import Header from '../../Component/header';

const Queue = () => {
  const [queue, setQueue] = useState([
    { id: 1, issue: 'Login Issue', status: 'Waiting' },
    { id: 2, issue: 'Payment Error', status: 'In Progress' },
    { id: 3, issue: 'Unable to reset password', status: 'Waiting' },
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
          <div className="flex-1 bg-white p-6 rounded-lg shadow-lg overflow-y-auto">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Queue</h1>
            <ul className="space-y-4">
              {queue.map((item) => (
                <li key={item.id} className="p-4 bg-gray-50 rounded-lg shadow-md hover:bg-gray-100">
                  <div className="font-semibold text-lg text-gray-700">Ticket #{item.id}</div>
                  <div className="text-gray-600">Issue: {item.issue}</div>
                  <div className={`text-sm font-medium ${item.status === 'Waiting' ? 'text-yellow-500' : 'text-blue-500'}`}>
                    Status: {item.status}
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

export default Queue;
