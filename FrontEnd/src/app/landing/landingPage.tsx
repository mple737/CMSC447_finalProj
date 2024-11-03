import HomePage from "./home/homepage";
import Demo from "./home/demo";
import About from "./home/about";
import ContactForm from "./home/contactForm";
import FAQ from "./home/FAQ";
import Header from "./home/header";
import ServiceSlider from "./home/services";

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
