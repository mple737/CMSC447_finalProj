"use client";

import React, { useState } from "react";
import Date from "@/app/Component/Date";
import { redirect } from "next/navigation";
import { useOrganization, useAuth, Protect } from "@clerk/nextjs";
import ModalPopup from "@/app/Component/ModalPopUp";

const TicketProperties: React.FC<{ ticket: any; user: any; admin: any }> = ({ ticket, user, admin }) => {
  
  const { getToken } = useAuth();
  const [type, setType] = useState(ticket.type || "");
  const [status, setStatus] = useState(ticket.status || "");
  const [category, setCategory] = useState(ticket.category || "");
  const [assignedToName, setAssignment] = useState(ticket.assignedToName || "");
  const [assignedToId, setAssignmentId] = useState(ticket.assignedToId || "");
  
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState<"success" | "error">("success");

  const { organization } = useOrganization();
  

  const categories = [
    { id: 1, category: "Email" },
    { id: 2, category: "Password" },
    { id: 3, category: "Software" },
    { id: 4, category: "Hardware" },
  ];

  const issues = [
    { id: 1, issue: "Question" },
    { id: 2, issue: "Problem" },
    { id: 3, issue: "Notification" },
  ];

  const statuses = [
    { id: 1, status: "Open" },
    { id: 2, status: "Closed" },
    { id: 3, status: "Pending" },
  ];

  // Deleted Ticket Handler
  const handleDelete = async () => {
    const ticketData = { id: ticket.id, organizationId: ticket.organizationId };
  
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tickets/${organization?.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${await getToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ticketData),
    });
  
    setModalMessage("Your ticket has been removed successfully!");
    setModalType("success");
    setShowDeleteModal(true);
    setTimeout(() => redirect("/"), 3000);
  };
  

  // Updated Ticket Handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tickets/${organization?.id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${await getToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ticketData),
    });

    setModalMessage("Your ticket has updated successfully!");
    setModalType("success");
    setShowSuccessModal(true);
    setTimeout(() => window.location.reload(), 2000); //refresh to update the status in coversation
    
    //setTimeout(() => {
    //  setShowSuccessModal(false); 
    //}, 3000);  
    //get rid of this since it is unccessary

  };

  return (
    <Protect role="org:admin">
     
<div className="bg-white w-full sm:w-1/4 md:w-1/5 min-w-[250px] p-3 bg-gray-500 dark:bg-gray-700 overflow-y-auto shadow-lg h-full">

        <h2 className="text-2xl sm:text-xl font-semibold mb-4 dark:text-gray-100 text-gray-800">
          
          Ticket Properties
        </h2>

        <div className="max-h-[76vh] overflow-y-auto hide-scrollbar grid grid-cols-1 gap-4">

          {/* Contact Info Card */}
          <div className="bg-gray-100 dark:bg-gray-600 p-4 shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out rounded-lg">
            
            <h3 className="font-semibold text-lg sm:text-md text-gray-800 dark:text-gray-300 mb-1">
              Contact Info
            </h3>
            
            <p className="text-gray-800 dark:text-gray-300 text-sm">
              Name: <b> {user.firstName} {user.lastName} </b>
            </p>
            
            <p className="text-gray-800 dark:text-gray-300 text-sm">
              Email: <b> {user.emailAddresses[0].emailAddress} </b>
            </p>
           
            <p className="text-gray-800 dark:text-gray-300 text-sm">
              Phone: <b> </b>
           
            </p>
          </div>

          {/* Key Information Card */}
          <div className="bg-gray-100 dark:bg-gray-600 p-4 shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out rounded-lg">
            <h3 className="font-semibold text-lg sm:text-md text-gray-800 dark:text-gray-300 mb-1">
            
              Key Information
            
            </h3>

            {/* Assigned To Row */}
            <div className="flex items-center space-x-2 mb-4">
              <label className="text-gray-800 dark:text-gray-300 text-sm">Agent: </label>
              <select
               
               defaultValue={assignedToName}
                onChange={(e) => {
                  setAssignmentId(e.target.options[e.target.selectedIndex].getAttribute("data-userid"));
                  setAssignment(e.target.value);
                }}
                className="bg-gray-100 p-1 border border-gray-300 text-gray-800 dark:bg-gray-700 text-sm dark:text-white dark:border-gray-600 rounded-md font-inter flex-1"
              >
               
                <option value=" "></option>
               
                {admin.map((ad: any) => (
                  <option key={ad.publicUserData.userId} data-userid = {ad.publicUserData.userId}>
                    {ad.publicUserData.firstName} {ad.publicUserData.lastName}
                 
                  </option>
               
               ))}
              </select>
            </div>

            {/* Status Row */}
            <div className="flex items-center space-x-2 mb-4">
              
              <label className="text-gray-800 dark:text-gray-300 text-sm">Status:</label>
              
              <select
                defaultValue={status}
                onChange={(e) => setStatus(e.target.value)}
                className="bg-gray-100 border p-1 border-gray-300 text-gray-800 dark:bg-gray-700 text-sm dark:text-white dark:border-gray-600 rounded-md font-inter flex-1"
              >
                {statuses.map((stat) => (
               
                 <option key={stat.id} value={stat.status}>{stat.status}</option>
               
               ))}
              </select>
            </div>

            <p className="flex flex-col text-gray-800 dark:text-gray-300 text-sm">
            Created On:
            
            <Date dateString={ticket.createdDate} />
            
          </p>

           
          </div>

          {/* Ticket Information Card */}
          <div className="bg-gray-100 dark:bg-gray-600 p-4 shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out rounded-lg">
            <h3 className="font-semibold text-lg sm:text-md text-gray-800 dark:text-gray-300 mb-4">Ticket Information</h3>

            {/* Categorya Row */}
            <div className="flex items-center space-x-2 mb-4">
            
              <label className="text-gray-800 dark:text-gray-300 text-sm">Category:</label>
             
              <select
                defaultValue={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-gray-100 p-1 border border-gray-300 text-gray-800 dark:bg-gray-700 text-sm dark:text-white dark:border-gray-600 rounded-md font-inter flex-1"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.category}>{cat.category}</option>
                ))}
              </select>
            </div>

            {/* Issue Type Row */}
            <div className="flex items-center space-x-2 mb-4">
             
              <label className="text-gray-800 dark:text-gray-300 text-sm">Issue Type:</label>
             
              <select
                defaultValue={type}
                onChange={(e) => setType(e.target.value)}
                className="bg-gray-100 p-1 border border-gray-300 text-gray-800 dark:text-white text-sm dark:bg-gray-700 dark:border-gray-600 rounded-md font-inter flex-1"
              >
                {issues.map((issue) => (
                  <option key={issue.id} value={issue.issue}>{issue.issue}</option>
                ))}
             
              </select>
           
            </div>
          </div>

            {/* Update Information Button */}
            <form onSubmit={handleSubmit} className="mb-0"> {/* Adds margin below this form */}
              <button type="submit" className="px-3 py-2 bg-blue-700 hover:bg-blue-800  text-white rounded w-full sm:w-3/4 lg:w-full">
                Update Information
              </button>
            </form>

            <button
              type="button"
              className="px-3 py-2 bg-red-700 hover:bg-red-800 text-white rounded w-full sm:w-3/4 lg:w-full"
              onClick={() => setShowDeleteModal(true)} // Show the confirmation modal
            >
              Delete Ticket
            </button>




          </div>


        {/* Modal Popups for scuessfully updated */}
        {showSuccessModal && (
          <ModalPopup
           
            open={showSuccessModal}
            title="Success"
            message={modalMessage}
            type="success"
           
            onOkay={() => setShowSuccessModal(false)}
          />
        )}


        {showDeleteModal && (
          <ModalPopup
            open={showDeleteModal}
            title="Confirm Delete"
            message="Are you sure you want to delete this ticket?"
            type="error"
            onClose={() => setShowDeleteModal(false)}
            onConfirm={handleDelete} // Proceed with delete
          />
        )}

        
        {showErrorModal && (
          
          <ModalPopup
            
            open={showErrorModal}
            title="Error"
            message={modalMessage}
            type="error"
           
            onClose={() => setShowErrorModal(false)}
          />
        )}
      </div>
      
    </Protect>
  );
};

export default TicketProperties;


