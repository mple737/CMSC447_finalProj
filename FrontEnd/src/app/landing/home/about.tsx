import React from 'react';
import Image from 'next/image'; // Only if you're using Next.js

const About = () => {
  return (
    <main className="flex w-full h-screen bg-white">
      <div className="relative w-full flex flex-col justify-center items-center h-full p-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center px-6 md:px-12">
          
          {/* Text Section */}
          <div className="md:w-1/2 mb-7 md:mb-0 flex justify-center md:ml-12"> {/* Added margin-left */}
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-semibold mb-4 text-black"> ABOUT US </h2>
              <p className="text-lg leading-relaxed text-black">
                Welcome to our AI-powered User Management Platform! Streamline user
                roles, support tickets, and messaging with ease. Stay connected
                with features like role management, a contacts list, and
                notifications for smooth interactions.
              </p>
            </div>
          </div>

          {/* Image Section */}
          <div className="md:w-1/2 flex justify-center">
            <Image
              src="/logo/customerService.avif"
              alt="About Us Illustration"
              width={300}
              height={300}
              className="rounded-3xl shadow-lg"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default About;
