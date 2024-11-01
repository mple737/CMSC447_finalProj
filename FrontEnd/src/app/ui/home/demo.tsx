import Image from "next/image";
//This is the demo video section, where it will display the video that will go over what 
//our website is about and how to use it

export default function Demo() {
  return (
    <main className="flex w-full h-screen bg-white">
      <div className="relative w-full flex flex-col justify-center items-center h-full p-6">
        <Image 
          src="/logo/Capture.PNG" 
          alt="Demo Image" 
          width={500} 
          height={500} 
          className="rounded-lg shadow-md" 
        />
      </div>
    </main>
  );
}
