// pages/create-ticket.js
import React, { useState } from 'react';
import Sidebar from '../../Component/SideBar';
import Header from '../../Component/header';

import { useUser, useOrganization, useAuth } from '@clerk/nextjs' 

const CreateTicket: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [body, setDescription] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { user } = useUser()
  const { organization } = useOrganization()
  const { getToken } = useAuth()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
  
    const ticketData = {
      organizationId: organization?.id,
      title,
      body,
      userId: user?.id
    };

    await fetch('http://localhost:3500/tickets', {
      method:'POST',
      headers:{
        Authorization: `Bearer ${await getToken()}`,
        "Content-Type": "application/json"
      },
      body:JSON.stringify(ticketData)
    })
    
    console.log('Ticket Created:', JSON.stringify(ticketData));
    setSuccessMessage('Ticket created successfully!');
    setErrorMessage('');
    setTitle('');
    setDescription('');
  
    // Set a timeout to clear the success message after 5 seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 2000);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="h-screen overflow-y-auto hide-scrollbar">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header />

        <div className="flex flex-1 p-4 md:p-8 overflow-y-auto hide-scrollbar">
          <div className="flex-1 max-w-8xl w-full bg-white p-8 rounded-lg shadow-lg mx-auto">
            <h1 className="text-3xl font-bold mb-4 text-gray-800">Create Ticket</h1>
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
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="block text-gray-700 font-semibold">Subject</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-black"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold">Description</label>
                <textarea
                  value={body}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-black"
                  rows={4}
                />
              </div>
              <button
                type="submit"
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-500 transition duration-200"
              >
                Create Ticket
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTicket;
