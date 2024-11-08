"use client";

import { Ticket } from "@/app/ticket/[id]/page";
import Date from "./Date";

export const TicketPage = (ticket: any) => {
  return (
    <div className="flex-1 w-full p-4 space-y-6">
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold text-black">
          #{ticket.props.ticketNumber} - {ticket.props.title}
        </h2>
        <p className="text-sm text-gray-500">
          <Date dateString={ticket.props.createdDate} />
        </p>
        <div className="mt-4 text-gray-500">
          <p>
            <strong> {ticket.props.userName} </strong>
          </p>
          <p className="text-gray-700">{ticket.props.body}</p>
        </div>
        <div className="flex space-x-4 mt-4">
          <button className="px-4 py-1 bg-blue-500 text-white rounded">
            Reply
          </button>

          <button className="px-4 py-1 bg-red-500 text-white rounded">
            Close Ticket
          </button>
        </div>
      </div>
    </div>
  );
};
