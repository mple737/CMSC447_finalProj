import HomePage from "./ui/home/homepage";
import Demo from "./ui/home/demo";
import About from "./ui/home/about";
import ContactForm from "./ui/home/contactForm";
import FAQ from "./ui/home/FAQ";

export default function Home() {
  // Design the website layout to match NETLIFY's style
  //The current problem/bug that i am having is coming from the contactForm page

  return (
    <div className="flex min-h-screen flex-col items-center">
      <HomePage />
      <Demo />
      <About />
      <FAQ />  
      
    </div>
  );
}
