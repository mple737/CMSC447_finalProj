"use client";

//Still figureing out how to fix and make this look better

import React, { useState, useRef, useEffect } from "react";

export default function SlidingServices() {
  const services = ["Consulting", "Development", "Marketing", "Support", "Design", "Strategy"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Update the currentIndex based on the scroll position
  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const itemWidth = (scrollRef.current.firstChild as HTMLDivElement)?.clientWidth + 24; // 24px is the space between items
      const index = Math.round(scrollLeft / itemWidth);
      setCurrentIndex(index);
    }
  };

  // Scroll to a specific item when a dot is clicked
  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      const itemWidth = (scrollRef.current.firstChild as HTMLDivElement)?.clientWidth + 24;
      scrollRef.current.scrollTo({
        left: itemWidth * index,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div className="bg-[#f9f5f0] py-10 overflow-hidden">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Industries We Service
      </h2>

      {/* Scrolling container */}
      <div
        ref={scrollRef}
        className="flex space-x-6 overflow-x-scroll snap-x snap-mandatory scrollbar-hide px-4"
      >
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-gray-200 p-4 rounded-lg shadow-lg text-center font-semibold text-gray-800 
                       min-w-[120px] sm:min-w-[150px] md:min-w-[180px] lg:min-w-[200px] max-w-[200px] 
                       text-lg sm:text-xl flex items-center justify-center snap-center"
          >
            {service}
          </div>
        ))}
      </div>

      {/* Indicator dots */}
      <div className="flex justify-center mt-4 space-x-2">
        {services.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              currentIndex === index ? "bg-gray-800" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
}
