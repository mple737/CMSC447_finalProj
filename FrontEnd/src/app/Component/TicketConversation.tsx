// TicketConversation.js jsut testing
import React from 'react';

const TicketConversation = () => {
  return (
    <div className="flex-1 p-4 space-y-6">
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold text-black">Wrong Ticket</h2>
        <p className="text-sm text-gray-500">#12 | 30 September 09:30 AM | 00:03</p>
        <div className="mt-4 text-gray-500">
          <p><strong> Emma </strong></p>
          <p className="text-gray-700">
            This is just a random message
          </p>
        </div>
        <div className="flex space-x-4 mt-4">
          <button className="px-4 py-1 bg-blue-500 text-white rounded">Reply</button>

          <button className="px-4 py-1 bg-red-500 text-white rounded">Close Ticket</button>
        </div>
      </div>
    </div>
  );
}

export default TicketConversation;