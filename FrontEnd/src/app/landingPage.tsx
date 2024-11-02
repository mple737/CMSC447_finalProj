import HomePage from "./ui/home/homepage";
import Demo from "./ui/home/demo";
import About from "./ui/home/about";
import ContactForm from "./ui/home/contactForm";
import FAQ from "./ui/home/FAQ";
import Header from "./ui/home/header";
import ServiceSlider from "./ui/home/services";

export default function Home() {
// Design the website layout to match NETLIFY's style
//Still trying to figure out the Hydrating error 
//and the contact form is not the reason why it is causing the error
// The raeson that cause hydration error is bc of the dark mode extension that i downloaded
//jsut remove the extenstion then the error will be fixed

  return (
    <div className="flex min-h-screen flex-col items-center">
      
      <Header /> 
      <HomePage />
      <Demo />
      <ServiceSlider />
      <About />
      <FAQ />  
      <ContactForm />
      
    </div>
  );
}
