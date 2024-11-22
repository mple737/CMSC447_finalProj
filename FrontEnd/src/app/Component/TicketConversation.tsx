"use client";

import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "@clerk/nextjs"; // Assuming you're using Clerk for user management
import { Ticket, Note } from '@/app/ticket/[id]/page';
import ModalPopup from "@/app/Component/ModalPopUp";

const TicketConversation: React.FC<{ ticket: Ticket, notes: Note[] }> = ({ ticket, notes }) => {
  const { userId, getToken } = useAuth(); // Get the logged-in user data
  const [isReplying, setIsReplying] = useState(false); // rrackiong whether the reply form is displayed
  const [replyMessage, setReplyMessage] = useState(""); // store reply message
  const [conversation, setConversation] = useState<Note[]>(notes); // store conversation thread
  const [showCloseModal, setShowCloseModal] = useState(false)

  const scrollToBottomRef = useRef<HTMLDivElement | null>(null); // Specify the type of ref

  useEffect(() => {
    if (scrollToBottomRef.current) {
      scrollToBottomRef.current.scrollTop = scrollToBottomRef.current.scrollHeight;
    }
  }, [conversation]); // This ensures it scrolls when conversation changes
  
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
  }, [isReplying]);

  

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
    try {
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
  
      // Show confirmation modal to inform the user
      setShowCloseModal(true);
    } catch (error) {
      console.error("Failed to close ticket:", error);
    }
  };

  //This will reload the page when user hit confirmed
  const handleConfirmClose = () => {
    window.location.reload(); 
    setShowCloseModal(false); 
  };


  return (
    <div className="flex-1 w-full dark:bg-gray-900 p-4 space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold dark:text-gray-100 text-gray-800 flex justify-between">
          <span>
            #{ticket.ticketNumber} - {ticket.title}
          </span>
          <span className="text-md font-medium">
            Status:{" "}
            <span
              className={`${
                ticket.status === "Pending"
                  ? "text-yellow-500"
                  : ticket.status === "Open"
                  ? "text-blue-500"
                  : ticket.status === "Closed"
                  ? "text-red-500"
                  : ""
              }`}
            >
              {ticket.status}
            </span>
          </span>
        </h2>


          

        {/* Main Container with Fixed Height */}
        <div className="mt-4 max-h-[70.5vh] flex flex-col justify-between space-y-12">
          <p className="text-lg dark:text-gray-300 text-gray-600">{ticket.body}</p>

          {/* Scrollable Conversation Thread */}
          <div
            ref={scrollToBottomRef}
            className="flex-1 overflow-y-auto hide-scrollbar space-y-3 py-5 px-5 bg-gray-100 dark:bg-gray-700 border border-gray-300 rounded-lg shadow-lg lg:min-h-[250px] " // Add min-height to ensure it's always large enough for different devices
          >
            {conversation.length === 0 ? (
              <p className="text-center text-gray-500 dark:text-gray-300">No messages yet...</p> // Placeholder text
            ) : (
              conversation.map((message, index) => (
                <div
                  key={message.id || `message-${index}`} // Unique key for each message
                  className={`flex ${message.userId === userId ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs p-3 rounded-2xl shadow-sm ${
                      message.userId === userId
                        ? "bg-blue-500 text-white self-end"
                        : "bg-gray-200 dark:bg-gray-300 text-gray-900 dark:text-gray-700 self-start"
                    }`}
                  >
                    {/* Display Name Above Message */}
                    <p
                      className={`text-sm font-extrabold mb-1 ${
                        message.userId === userId ? "text-yellow-400 dark:text-green-200" : "text-blue-600 dark:text-blue-600"
                      }`}
                    >
                      {message.userId === userId ? "You" : message.userName || "Unknown User"}
                    </p>
                    <p className="text-sm">{message.body}</p>
                  </div>
                </div>
              ))
            )}
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
            title="Confirm Close"
            message="Are you sure you want to close this ticket?"
            type="error"
            onClose={() => setShowCloseModal(false)}
            onConfirm={handleConfirmClose} //go to handle confim
          />
        )}

    </div>

  );
};

export default TicketConversation;
