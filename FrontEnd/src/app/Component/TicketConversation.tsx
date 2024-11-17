"use client";

import React, { useState } from "react";
import { useUser } from "@clerk/nextjs"; // Assuming you're using Clerk for user management

interface TicketPageProps {
  props: {
    ticketNumber: number;
    title: string;
    body: string;
  };
}

interface Message {
  author: "user" | "admin";
  text: string;
  timestamp: string; // Adsd timestamp to each message
}

const TicketConversation: React.FC<TicketPageProps> = ({ props }) => {
  const { ticketNumber, title, body } = props;
  const { user } = useUser(); // Get the logged-in user data

  const [isReplying, setIsReplying] = useState(false); // rrackiong whether the reply form is displayed
  const [replyMessage, setReplyMessage] = useState(""); // store reply message
  const [conversation, setConversation] = useState<Message[]>([
    { author: "user", text: body, timestamp: new Date().toISOString() }, // Initial message from the user withthe  timestamps
  ]);

  const handleSendReply = () => {
    if (replyMessage.trim()) {

      // admin reply to the conversation
      setConversation((prev) => [
        ...prev, // timestamp for the admin reply
        { author: "admin", text: replyMessage, timestamp: new Date().toISOString() }, 
      ]);
      setReplyMessage(""); 
      setIsReplying(false); 
    }
  };

  const handleCloseTicket = () => {
    alert("This ticket will be closed.");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString(); // Format to a readable date
  };

  return (

    <div className="flex-1 w-full dark:bg-gray-900 p-4 space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold dark:text-gray-100 text-gray-800">
          #{ticketNumber} - {title}
        </h2>

      {/* Main Container with Fixed Height */}
        <div className="mt-4 max-h-[70.5vh] flex flex-col justify-between">
          
          {/* Scrollable Conversation Thread */}
          <div className="flex-1 overflow-y-auto hide-scrollbar space-y-4">
            {conversation.map((message, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg shadow-sm ${
                  message.author === "user"
                    ? "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
                    : "bg-blue-100 dark:bg-blue-700 text-blue-800 dark:text-blue-300"
                }`}
              >
                <p className="font-semibold text-gray-800 dark:text-gray-300">
                  {message.author === "user" ? user?.fullName || "User" : "Admin"}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Sent at: {formatDate(message.timestamp)}
                </p>
                <br />
                <p>{message.text}</p>
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
      </div>

  );
};

export default TicketConversation;
