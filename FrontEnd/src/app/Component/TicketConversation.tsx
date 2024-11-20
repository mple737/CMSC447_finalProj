"use client";

import React, { useState, useEffect } from "react";
import { useAuth, useUser } from "@clerk/nextjs"; // Assuming you're using Clerk for user management
import { Ticket, Note } from '@/app/ticket/[id]/page'
import ModalPopup from "@/app/Component/ModalPopUp";


const TicketConversation: React.FC<{ ticket: Ticket, notes: Note[] }> = ({ ticket, notes }) => {
  const { userId, getToken, orgRole } = useAuth(); // Get the logged-in user data
  const [isReplying, setIsReplying] = useState(false); // rrackiong whether the reply form is displayed
  const [replyMessage, setReplyMessage] = useState(""); // store reply message
  const [conversation, setConversation] = useState<Note[]>(notes); // store conversation thread
  const [showCloseModal, setShowCloseModal] = useState(false)

  // Fetch request ticket notes
  useEffect(() => {
    async function fetchNotes() {
      const notes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tickets/${ticket.organizationId}/${ticket.id}/notes`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${await getToken()}`,
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
      setConversation(notes);
    }

    fetchNotes();
  }, [, isReplying]);

  const handleSendReply = async () => {
    // Post note with gathered data
    if (replyMessage.trim()) {

      const notes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tickets/${ticket.organizationId}/${ticket.id}/notes`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${await getToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "userId": userId,
          "body": replyMessage.trim()
        })
      }).then((res) => res.json());
      setReplyMessage("");
      setIsReplying(false);
    }

  }


  const handleCloseTicket = async () => {
    // Patch ticket with "closed" status
    const tickets = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tickets/${ticket.organizationId}/`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${await getToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "id": ticket.id,
        "status": "Closed"
      })
    }).then((res) => res.json());

    setShowCloseModal(true)
    setTimeout(() => window.location.reload(), 2000); // Reload window to see results

  };


  return (

    <div className="flex-1 w-full dark:bg-gray-900 p-4 space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold dark:text-gray-100 text-gray-800">
          #{ticket.ticketNumber} - {ticket.title}
        </h2>

        {/* Main Container with Fixed Height */}
        <div className="mt-4 max-h-[70.5vh] flex flex-col justify-between space-y-12">
          <p className="text-lg dark:text-gray-300 text-gray-600">{ticket.body}</p>

          {/* Scrollable Conversation Thread */}
          <div className="flex-1 overflow-y-auto hide-scrollbar space-y-4">
            {conversation.map((message) => (
              <div
                key={message.id}
                className={`p-4 rounded-lg shadow-sm ${message.userName === "user"
                  ? "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
                  : "bg-blue-100 dark:bg-blue-700 text-blue-800 dark:text-blue-300"
                  }`}
              >
                <p className="font-semibold text-gray-800 dark:text-gray-300">
                  {message.userName}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">

                </p>
                <br />
                <p>{message.body}</p>
              </div>
            ))}
          </div>

          {/* Reply Section */}
          {!isReplying ? (
            <div className="flex space-x-4 mt-6">
              <button
                className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition duration-200"
                onClick={() => setIsReplying(true)} // Show reply form
              >
                Reply
              </button>
              <button
                className="px-4 py-2 bg-red-700 hover:bg-red-800 text-white rounded-lg transition duration-200"
                onClick={handleCloseTicket}
              >
                Close Ticket
              </button>
            </div>

          ) : (
            <div className="mt-6">
              <textarea
                className="w-full h-18 p-2 text-gray-800 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-gray-300"
                placeholder="Type your reply here..."
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
              />
              <div className="flex space-x-4 mt-4">
                <button
                  className="px-4 py-2 bg-gray-500 hover:bg-gray-700 dark:bg-gray-600 text-gray-100 rounded-lg transition duration-200"
                  onClick={() => setIsReplying(false)} // Cancel reply
                >
                  Cancel
                </button>


                <button
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-800 text-white rounded-lg transition duration-200"
                  onClick={handleSendReply} // Simulating the reply submission
                >
                  Send Reply
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
      {showCloseModal && (
          <ModalPopup
           
            open={showCloseModal}
            title="Success"
            message={"Ticket closed!"}
            type="success"
           
            onOkay={() => setShowCloseModal(false)}
          />
        )}

    </div>

  );
};

export default TicketConversation;
