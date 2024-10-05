import { SignInButton } from '@clerk/nextjs';
//import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';

const Page: React.FC = () => {
  return (
    <main className="flex w-full h-screen bg-cover bg-center bg-[url('/logo/ai.avif')]">
      {/* Main Section with Background Image */}
     
      <div className="relative w-full flex flex-col justify-center items-center bg-black bg-opacity-60 h-full p-6">
        <section className="relative flex flex-col items-center z-10 text-center pt-24 lg:pt-32"> {/* Increased padding-top for larger screens */}
          
          
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
              <span className="ml-2 md:ml-4 mr-2 md:mr-4 text-sm md:text-base lg:text-lg xl:text-xl bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent font-bold uppercase">
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
          <div className="text-[3rem] md:text-[4rem] lg:text-[5rem] bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent font-bold uppercase mb-4 shadow-lg">
            Supportlify
          </div>

          {/* Sub Title */}
          <p className="relative uppercase tracking-widest text-md md:text-xl lg:text-xl bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent font-bold mb-8 shadow-lg">
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
    </main>
  );
};

export default Page;
