"use client";

import React, { useRef } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

export default function ServicePage() {
  const services = [
    {
      title: "IT Services",
      description: "",
    },
    {
      title: "Healthcare",
      description: ".",
    },
    {
      title: "Education",
      description: ".",
    },
    {
      title: "Finance",
      description: ".",
    },
    {
      title: "E-commerce",
      description: ".",
    },
    {
      title: "Marketing",
      description: ".",
    },
    {
      title: "Real Estate",
      description: ".",
    },
    {
      title: "Manufacturing",
      description: ".",
    },
    {
      title: "Logistics",
      description: ".",
    },
    {
      title: "Travel & Hospitality",
      description: ".",
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
