import React, { useState } from 'react';
import Sidebar from '../../Component/SideBar';
import Header from '../../Component/header';

const History = () => {
  const [queue, setQueue] = useState([
    { id: 1, issue: 'Login Issue', status: 'Resolved', resolvedAt: '2024-11-01' },
    { id: 2, issue: 'Payment Error', status: 'Resolved', resolvedAt: '2024-11-02' },
    { id: 3, issue: 'Unable to reset password', status: 'In Progress' }, 
  ]);

  // Filter to get only resolved tickets
  const resolvedTickets = queue.filter(item => item.status === 'Resolved');

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="flex flex-1 p-8 space-x-8">
          <div className="flex-1 bg-white p-6 rounded-lg shadow-lg overflow-y-auto">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">History</h1>
            <ul className="space-y-4">
              {resolvedTickets.map((item) => (
                <li key={item.id} className="p-4 bg-gray-50 rounded-lg shadow-md hover:bg-gray-100">
                  <div className="font-semibold text-lg text-gray-700">Ticket #{item.id}</div>
                  <div className="text-gray-600">Issue: {item.issue}</div>
                  <div className="text-sm font-medium text-green-500">Status: {item.status}</div>
                  <div className="text-xs text-gray-500">Resolved on: {item.resolvedAt}</div>
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
