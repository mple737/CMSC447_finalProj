import HomePage from "./ui/home/homepage";
import Demo from "./ui/home/demo";
import About from "./ui/home/about";
import ContactForm from "./ui/home/contactForm";
import FAQ from "./ui/home/FAQ";

export default function Home() {
  // Design the website layout to match NETLIFY's style

  return (
    <div className="flex min-h-screen flex-col items-center">
      <HomePage />
      <Demo />
      <About />
      <FAQ />
      <ContactForm />
    </div>
  );
}
