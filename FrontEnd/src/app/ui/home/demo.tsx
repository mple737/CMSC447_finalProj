import Image from "next/image";

export default function Demo() {
  return (
    <main className="flex w-full h-screen bg-gradient-to-r from-purple-600 to-blue-600">
      <div className="relative w-full flex flex-col justify-center items-center bg-black bg-opacity-60 h-full p-6">
        <Image src="/logo/ai.avif" alt="Demo Image" width={200} height={100} />
      </div>
    </main>
  );
}