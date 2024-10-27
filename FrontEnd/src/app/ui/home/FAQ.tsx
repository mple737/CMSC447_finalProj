"use client";

import React, { useState } from 'react';

const FAQ: React.FC = () => {
  const faqs: { question: string; answer: string }[] = [
    {
      question: "What is your return policy?",
      answer: "You can return any item within 30 days of purchase for a full refund."
    },
    {
      question: "How do I track my order?",
      answer: "Once your order is shipped, you will receive an email with a tracking link."
    },
    {
      question: "Can I change my order after it's been placed?",
      answer: "If your order has not yet been processed, you can change it by contacting customer service."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept Visa, MasterCard, American Express, and PayPal."
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship to most countries worldwide."
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

    <div className="absolute inset-0 bg-black bg-opacity-45 flex flex-col justify-center items-center p-6">
        <h2 className="text-4xl font-bold mb-6 text-center text-white"> Frequently Asked Questions </h2>
        <div className="space-y-4 w-full max-w-xl">
          {faqs.map((faq, index: number) => (
            <div key={index} className="border rounded-lg shadow-md overflow-hidden">
              <button
                className="flex justify-between items-center w-full p-4 text-left bg-gray-100 hover:bg-gray-200 focus:outline-none"
                onClick={() => toggleAnswer(index)}
              >
                <span className="font-semibold text-lg text-black">{faq.question}</span>
                <span className={`ml-2 transition-transform ${openIndex === index ? "transform rotate-180" : ""}`}>
                  ▼
                </span>
              </button>
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? "max-h-40" : "max-h-0"}`}
              >
                <div className={`p-4 bg-white text-black transition-all duration-300 ease-in-out`}>
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
