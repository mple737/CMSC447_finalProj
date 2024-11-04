import React from 'react';

const TicketProperties = () => {
  return (
    <div className="w-full sm:w-1/4 md:w-1/5 min-w-[250px] max-h-screen p-4 bg-gray-50 overflow-y-auto shadow-lg">
      <h2 className="text-2xl sm:text-xl font-semibold mb-4 text-gray-800">Ticket Properties</h2>
      <div className="grid grid-cols-1 gap-4">
        {/* Contact Info Card */}
        <div className="bg-white p-4 shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out">
          <h3 className="font-semibold text-lg sm:text-md text-gray-700 mb-1">Contact Info</h3>
          <p className="text-gray-600 text-sm">Emma</p>
          <p className="text-gray-600 text-sm">Email: Em.smith@gmail.com</p>
          <p className="text-gray-600 text-sm">Phone: +1 (269) 665-7787</p>
        </div>

        {/* Key Information Card */}
        <div className="bg-white p-4 shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out">
          <h3 className="font-semibold text-lg sm:text-md text-gray-700 mb-1">Key Information</h3>
          <p className="text-gray-600 text-sm">Ticket Owner: Emma</p>
          <p className="text-gray-600 text-sm">Status: Open</p>
          <p className="text-gray-600 text-sm">Due Date: 30 Oct 10:00 AM</p>
          <p className="text-gray-600 text-sm">Tags: Problem, Accommodation</p>
        </div>

        {/* Ticket Information Card */}
        <div className="bg-white p-4 shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out">
          <h3 className="font-semibold text-lg sm:text-md text-gray-700 mb-1">Ticket Information</h3>
          <p className="text-gray-600 text-sm">Category: Accommodation</p>
          <p className="text-gray-600 text-sm">Issue Type: Problem</p>
        
        </div>
      </div>
    </div>
  );
};

export default TicketProperties;
