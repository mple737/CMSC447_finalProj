import Image from "next/image";
// This is the demo video section, where it will display the video that goes over what 
// our website is about and how to use it.

import React from "react";

export default function Demo() {
  return (
    <main className="flex w-full h-screen bg-white">
      <div className="relative w-full flex flex-col justify-center items-center h-full p-6">
        {/* Video Section */}
        <div className="w-full max-w-5xl flex justify-center p-4 sm:p-2">
          <video
            src="/Animations_vid.mp4"
            controls
            className="rounded-lg shadow-md w-full max-w-lg sm:max-w-full"
          />
        </div>
      </div>
    </main>
  );
}
