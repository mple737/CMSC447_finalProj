"use client";

import React, { useRef } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

export default function ServicePage() {
  const services = [
    {
      title: "IT Services",
      description: "Providing reliable and innovative technology solutions to enhance operational efficiency, streamline processes, and drive digital transformation for businesses of all sizes.",
    },
    {
      title: "Healthcare",
      description: "Delivering innovative solutions tailored to the healthcare industry, focusing on improving patient outcomes, optimizing workflows, and ensuring compliance with regulations.",
    },
    {
      title: "Education",
      description: "Creating e-learning platforms and educational technology solutions that foster interactive learning experiences, enhance student engagement, and facilitate remote education.",
    },
    {
      title: "Finance",
      description: "Offering expert financial consulting services and technology integration that help organizations manage their financial operations, optimize budgeting, and ensure regulatory compliance.",
    },
    {
      title: "E-commerce",
      description: "Building and optimizing online stores for success, focusing on user experience, payment integration, and marketing strategies to boost sales and customer retention.",
    },
    {
      title: "Marketing",
      description: "Developing strategic marketing campaigns that enhance brand visibility and engagement, leveraging data analytics and digital channels to reach target audiences effectively.",
    },
    {
      title: "Real Estate",
      description: "Providing comprehensive solutions for the real estate industry, including property management software, virtual tours, and marketing strategies to connect buyers and sellers.",
    },
    {
      title: "Manufacturing",
      description: "Implementing smart manufacturing solutions that enhance productivity, improve supply chain management, and ensure quality control through advanced technologies.",
    },
    {
      title: "Logistics",
      description: "Streamlining logistics operations with technology solutions that improve inventory management, enhance delivery tracking, and optimize supply chain efficiency.",
    },
    {
      title: "Travel & Hospitality",
      description: "Delivering tailored technology solutions for the travel and hospitality sector, focusing on enhancing customer experiences, managing bookings, and improving operational efficiency.",
    },
  ];

  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      className="flex flex-col items-center w-full py-8 bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: "url('/logo/Capture.PNG')" }}
    >
      <h1 className="text-3xl md:text-4xl font-bold text-center py-4 text-white">Industries We Serve</h1>

      <div className="relative flex items-center w-full max-w-7xl px-4 md:px-8 lg:px-12">
        {/* Left arrow */}
        <button
          onClick={scrollLeft}
          className="absolute -left-8 md:-left-10 z-10 p-2 md:p-3 rounded-full bg-white shadow-md text-gray-600 hover:text-black transition"
          aria-label="Scroll left"
        >
          <IoChevronBack size={24} />
        </button>

        {/* Scrolling container for services */}
        <div
          ref={scrollRef}
          className="flex overflow-x-scroll snap-x snap-mandatory scrollbar-hide p-4 w-full space-x-6 hide-scrollbar"
        >
          {services.map((service, index) => (
            <div
              key={index}
              className="flex-none w-60 sm:w-72 lg:w-80 h-64 bg-gradient-to-b from-white to-gray-100 rounded-lg shadow-lg snap-center flex flex-col p-6 transition-transform transform hover:scale-105"
            >
              {/* Service title */}
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{service.title}</h2>
              {/* Service description */}
              <p className="text-sm text-gray-700">{service.description}</p>
            </div>
          ))}
        </div>

        {/* Right arrow */}
        <button
          onClick={scrollRight}
          className="absolute -right-8 md:-right-10 z-10 p-2 md:p-3 rounded-full bg-white shadow-md text-gray-600 hover:text-black transition"
          aria-label="Scroll right"
        >
          <IoChevronForward size={24} />
        </button>
      </div>
    </div>
  );
}
