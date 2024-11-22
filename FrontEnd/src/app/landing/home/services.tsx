'use client';

import React, { useRef } from 'react';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

export default function ServicePage() {
  const services = [
    { title: 'IT Services' },
    { title: 'Healthcare' },
    { title: 'Education' },
    { title: 'Finance' },
    { title: 'E-commerce' },
    { title: 'Marketing' },
    { title: 'Real Estate' },
    { title: 'Manufacturing' },
    { title: 'Logistics' },
    { title: 'Travel & Hospitality' },
  ];

  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -300,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 300,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div
      className="flex flex-col items-center w-full py-8 bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: "url('/logo/Capture.PNG')" }}
    >
      {/* Page Title */}
      <h1 className="text-3xl sm:text-3xl md:text-4xl font-bold text-center py-4 text-white">
        Industries We Serve
      </h1>

      {/* Scrolling Section */}
      <div className="relative flex items-center w-full max-w-7xl px-4">

        {/* Left Arrow */}
        <button
          onClick={scrollLeft}
          className="absolute -left-4 sm:-left-6 z-10 p-2 rounded-full bg-white shadow-md text-gray-600 hover:text-black transition"
          aria-label="Scroll left"
        >
          <IoChevronBack size={20} />
        </button>

        {/* Services Carousel */}
        <div
          ref={scrollRef}
          className="flex overflow-x-scroll snap-x snap-mandatory scrollbar-hide p-4 w-full space-x-4 sm:space-x-6 hide-scrollbar"
        >
          {services.map((service, index) => (
            <div
              key={index}
              className="flex-none w-44 sm:w-56 md:w-64 lg:w-72 h-48 sm:h-56 md:h-64 bg-gradient-to-b from-purple-700 via-purple-800 to-purple-900 rounded-lg shadow-lg snap-center flex justify-center items-center text-center text-white font-semibold text-lg sm:text-xl md:text-2xl transition-transform transform hover:scale-105"
            >
              {service.title}
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={scrollRight}
          className="absolute -right-4 sm:-right-6 z-10 p-2 rounded-full bg-white shadow-md text-gray-600 hover:text-black transition"
          aria-label="Scroll right"
        >
          <IoChevronForward size={20} />
        </button>
      </div>
    </div>
  );
}
