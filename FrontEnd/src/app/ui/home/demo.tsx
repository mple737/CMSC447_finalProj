import Image from "next/image";

export default function Demo() {
  return (
    <main className="flex w-full h-screen bg-white">
      <div className="relative w-full flex flex-col justify-center items-center h-full p-6">
        <Image 
          src="/logo/ai.avif" 
          alt="Demo Image" 
          width={600} 
          height={700} 
          className="rounded-lg shadow-md" 
        />
      </div>
    </main>
  );
}
