"use client";

import React, { useState } from "react";
import Date from "@/app/Component/Date";

import { useUser, useOrganization, useAuth } from "@clerk/nextjs";
import { getEnabledCategories } from "trace_events";
import { Catamaran } from "next/font/google";
import internal from "stream";

const TicketProperties: React.FC<{ ticket: any; user: any; admin: any }> = ({
  ticket,
  user,
  admin,
}) => {
  const [type, setType] = useState<string>(ticket.type);
  const [status, setStatus] = useState(ticket.status);
  const [category, setCategory] = useState(ticket.category);
  const [categories, setCategories] = useState([
    { id: 0, category: "" },
    { id: 1, category: "Email" },
    { id: 2, category: "Password" },
    { id: 3, category: "Software" },
    { id: 4, category: "Hardware" },
  ]);
  const [issues, setIssues] = useState([
    { id: 0, issue: "" },
    { id: 1, issue: "Question" },
    { id: 2, issue: "Problem" },
    { id: 3, issue: "Notification" },
  ]);
  const [statuses, setStatuses] = useState([
    { id: 0, status: "Open" },
    { id: 1, status: "Closed" },
    { id: 2, status: "Pending" },
  ]);

  const [assignedToName, setAssignment] = useState<string | null>(
    ticket.assignedToName
  );
  const [assignedToId, setAssignmentId] = useState<string | null>(
    ticket.assignedToId
  );
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const { organization } = useOrganization();
  const { getToken } = useAuth();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    const ticketData = {
      id: ticket.id,
      organizationId: ticket.organizationId,
      type,
      category,
      status,
      assignedToId,
      assignedToName
    };

    console.log(assignedToId)

    await fetch(`http://localhost:3500/tickets/${organization?.id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${await getToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ticketData),
    });

    console.log("Ticket Updated!:", JSON.stringify(ticketData));
    setSuccessMessage("Ticket updated successfully!");
    setErrorMessage("");
    setType(ticket.type);
    setStatus(ticket.status);
    setCategory(ticket.category);
    setAssignment(ticket.assignedToName);
    setAssignmentId(ticket.assignedToId);

    // Set a timeout to clear the success message after 5 seconds
    setTimeout(() => {
      setSuccessMessage("");
    }, 2000);
  };
  return (
    <div className="w-full sm:w-1/4 md:w-1/5 min-w-[250px] max-h-screen p-4 bg-gray-50 overflow-y-auto shadow-lg">
      <h2 className="text-2xl sm:text-xl font-semibold mb-4 text-gray-800">
        Ticket Properties
      </h2>

      <div className="grid grid-cols-1 gap-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Contact Info Card */}
          <div className="bg-white p-4 shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out">
            <h3 className="font-semibold text-lg sm:text-md text-gray-700 mb-1">
              Contact Info
            </h3>
            <p className="text-gray-600 text-sm">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-gray-600 text-sm">
              {user.emailAddresses[0].emailAddress}
            </p>
            <p className="text-gray-600 text-sm">
              {user.phoneNumbers[0].phoneNumber}
            </p>
          </div>

          {/* Key Information Card */}
          <div className="bg-white p-4 shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out">
            <h3 className="font-semibold text-lg sm:text-md text-gray-700 mb-1">
              Key Information
            </h3>
            <p className="text-gray-600 text-sm">Assigned To</p>
            <p className="text-black">
              <select
                defaultValue={ticket.assignedToName}
                onChange={(e) => {
                  setAssignmentId(e.target.options[e.target.selectedIndex].getAttribute('data-userid'));
                  setAssignment(e.target.value);
                }}
              >
                <option value=""></option>
                {admin.map((ad: any) => (
                  <option
                    key={ad.publicUserData.userId}
                    data-userid={ad.publicUserData.userId}
                  >
                    {ad.publicUserData.firstName} {ad.publicUserData.lastName}
                  </option>
                ))}
              </select>
            </p>
            <p className="text-gray-600 text-sm">Status</p>
            <p className="text-black">
              <select
                defaultValue={ticket.status == null ? "" : ticket.status}
                onChange={(e) => setStatus(e.target.value)}
              >
                {statuses.map((stat) => (
                  <option key={stat.id}>{stat.status}</option>
                ))}
              </select>
            </p>
            <p className="flex flex-col text-gray-600 text-sm">
              Created Date
              <Date dateString={ticket.createdDate} />
            </p>
          </div>

          {/* Ticket Information Card */}
          <div className="bg-white p-4 shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out">
            <h3 className="font-semibold text-lg sm:text-md text-gray-700 mb-1">
              Ticket Information
            </h3>
            <p className="text-gray-600 text-sm">Category</p>
            <p className="text-black">
              <select
                defaultValue={ticket.category == null ? "" : ticket.category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat.id}>{cat.category}</option>
                ))}
              </select>
            </p>
            <p className="text-gray-600 text-sm">Issue Type</p>
            <p className="text-black">
              <select
                defaultValue={ticket.type == null ? "" : ticket.type}
                onChange={(e) => setType(e.target.value)}
              >
                {issues.map((type) => (
                  <option key={type.id}>{type.issue}</option>
                ))}
              </select>
            </p>
          </div>
          {/* Update Information Button */}
          <button
            type="submit"
            className="px-4 py-1 bg-blue-500 text-white rounded w-full"
          >
            Update Information
          </button>
          {successMessage && (
            <div className="mb-4 text-green-600 p-2 border border-green-600 bg-green-100 rounded">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="mb-4 text-red-600 p-2 border border-red-600 bg-red-100 rounded">
              {errorMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default TicketProperties;
