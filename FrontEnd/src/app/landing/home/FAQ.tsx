'use client';

// This is the FAQ section that will display common questions about our website.
import React, { useState } from 'react';

const FAQ: React.FC = () => {
  const faqs: { question: string; answer: string }[] = [
    {
      question: "What is Supportlify?",
      answer: "Supportlify is an IT Helpdesk solution that allows users to create, manage, and resolve support tickets, connecting contacts with administrators for efficient assistance."
    },
    {
      question: "How do I create a support ticket?",
      answer: "To create a support ticket, log in to your Supportlify account and select the 'Create Ticket' option. Provide details such as the title and body of the ticket, and you can also include images or links if necessary."
    },
    {
      question: "Can I edit my ticket after submission?",
      answer: "Contact users cannot edit tickets after submission, but administrators can update ticket details, including type, category, status, and assignment."
    },
    {
      question: "What user roles are available?",
      answer: "There are two user roles: Contact and Administrator. Contacts can create and view tickets, while Administrators have the ability to edit tickets and user roles, and communicate directly with contacts."
    },
    {
      question: "How do I create an account?",
      answer: "To create an account, sign up as a Contact user. Your account may later be promoted to an Administrator by an existing Administrator if needed."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAnswer = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="flex w-full h-screen bg-white">
      <div
        className="relative w-full flex flex-col items-center justify-center h-full p-6 bg-cover bg-no-repeat"
        style={{ backgroundImage: "url('/logo/Capture.PNG')" }}
      >
        {/* Overlay for better text visibility */}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center p-6">
          <h2 className="text-3xl font-bold mb-6 text-center text-white">Frequently Asked Questions</h2>
          <div className="space-y-4 w-full max-w-2xl">
            {faqs.map((faq, index: number) => (
              <div key={index} className="border rounded-lg shadow-md overflow-hidden">
                {/* FAQ Question */}
                <button
                  className="flex justify-between items-center w-full p-4 text-left bg-gray-100 hover:bg-gray-200 focus:outline-none transition-colors duration-200"
                  onClick={() => toggleAnswer(index)}
                >
                  <span className="font-semibold text-lg text-black">{faq.question}</span>
                  <span
                    className={`ml-2 transform transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>
                {/* FAQ Answer */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index ? "max-h-40" : "max-h-0"
                  }`}
                >
                  <div className="p-4 bg-white text-gray-800">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default FAQ;
