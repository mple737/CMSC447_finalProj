// TicketProperties.js jsut testing
import React from 'react';

const TicketProperties = () => {
  return (
    <div className="w-1/4 p-4 bg-gray-100 h-screen overflow-y-auto">
      <h2 className="text-lg font-bold mb-4">Ticket Properties</h2>
      <div className="space-y-4">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">Contact Info</h3>
          <p>Abby</p>
          <p>Email: abigail.smith@email.com</p>
          <p>Phone: +1 (269) 665-7787</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">Key Information</h3>
          <p>Ticket Owner: AbBy</p>
          <p>Status: Open</p>
          <p>Due Date: 30 Mar 10:00 AM</p>
          <p>Tags: Problem, Accommodation</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">Ticket Information</h3>
          <p>Category: Accommodation</p>
          <p>Issue Type: Problem</p>
          <p>Layout: Default Layout</p>
        </div>
      </div>
    </div>
  );
}
export default TicketProperties;