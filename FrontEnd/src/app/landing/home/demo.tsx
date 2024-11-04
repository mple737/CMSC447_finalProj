import Image from "next/image";
// This is the demo video section, where it will display the video that goes over what 
// our website is about and how to use it.

export default function Demo() {
  return (
    <main className="flex w-full h-screen bg-white">
      <div className="relative w-full flex flex-col justify-center items-center h-full p-6">
        
        {/* Replace the Image with a video player */}
        <video 
          src="/Animations_vid.mp4" 
          controls 
          width="900" 
          height="900" 
          className="rounded-lg shadow-md"
        >
          
        </video>
        
       
      </div>
    </main>
  );
}
