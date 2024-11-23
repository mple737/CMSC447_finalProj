'use client';

import { SignInButton } from '@clerk/nextjs';

export default function HomePage() {
  return (
    <main className="flex w-full h-screen">
      {/* Background Image */}
      <div 
        className="relative w-full h-full bg-cover bg-center"
        style={{ backgroundImage: "url('/logo/Capture.PNG')" }} // Replace with your image path
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-45 flex flex-col justify-center items-center p-6">
          {/* Content Section */}
          <section className="relative flex flex-col items-center z-10 text-center pt-24 lg:pt-32">
            {/* "Welcome to" with Dot SVG */}
            <section className="flex flex-col items-center mb-2 text-center">
              <div className="relative uppercase tracking-widest text-md bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent font-bold mb-4 flex items-center">
                {/* Dot SVG */}
                <div className="flex space-x-3 md:space-x-4 lg:space-x-5">
                  <svg
                    className="text-purple-600"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="12" cy="12" r="4" fill="currentColor"/>
                  </svg>
                  <svg
                    className="text-purple-500"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="12" cy="12" r="4" fill="currentColor"/>
                  </svg>
                  <svg
                    className="text-purple-400"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="12" cy="12" r="4" fill="currentColor"/>
                  </svg>
                </div>

                {/* "Welcome to" Text */}
                <span className="ml-2 md:ml-4 mr-2 md:mr-4 text-2xl md:text-base lg:text-xl xl:text-2xl bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent font-bold uppercase">
                  Welcome to
                </span>

                <div className="flex space-x-3 md:space-x-4 lg:space-x-5">
                  <svg
                    className="text-purple-400"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="12" cy="12" r="4" fill="currentColor"/>
                  </svg>
                  <svg
                    className="text-purple-500"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="12" cy="12" r="4" fill="currentColor"/>
                  </svg>
                  <svg
                    className="text-purple-600"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="12" cy="12" r="4" fill="currentColor"/>
                  </svg>
                </div>
              </div>
            </section>

            {/* Main Title */}
            <div className="text-[3rem] md:text-[4rem] lg:text-[5rem] bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent font-bold uppercase mb-4">
              Supportlify
            </div>

            {/* Sub Title */}
            <p className="relative uppercase tracking-widest text-md md:text-xl lg:text-xl bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent font-bold mb-8 ">
              <span> Connecting users and administrators<br/>
              for effective support.</span>
            </p>

            {/* Get Started Button */}
            <div className="flex flex-col items-center mb-8">
              <div className="px-4 py-2 bg-gradient-to-r from-purple-700 to-blue-700 text-white rounded-lg hover:from-purple-600 hover:to-blue-800 transition mb-4">
                <SignInButton mode="modal">Get Started</SignInButton>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
