// pages/create-ticket.js
import React, { useState } from 'react';
import Sidebar from '../../Component/SideBar';
import Header from '../../Component/header';

const CreateTicket: React.FC = () => {
  const [contactName, setContactName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
  
    const ticketData = {
      contactName,
      email,
      phone,
      subject,
      description,
    };
  
    console.log('Ticket Created:', ticketData);
    setSuccessMessage('Ticket created successfully!');
    setErrorMessage('');
    setContactName('');
    setEmail('');
    setPhone('');
    setSubject('');
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
                  <label className="block text-gray-700 font-semibold">Customer Name</label>
                  <input
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    required
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-black"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-gray-700 font-semibold">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-black"
                  />
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="block text-gray-700 font-semibold">Subject</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-black"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-gray-700 font-semibold">Phone</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-black"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold">Description</label>
                <textarea
                  value={description}
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
