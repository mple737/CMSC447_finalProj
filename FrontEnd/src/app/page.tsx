
import HomePage from "./ui/home/homepage";
import Demo from "./ui/home/demo";
import About from "./ui/home/about";
export default function Home() {

  //Create the website design the same as NETLIFY design 

  return (
    <div className="flex min-h-screen flex-col items-center">
      <HomePage />
      <Demo />
      <About />
    </div>
  );
}
