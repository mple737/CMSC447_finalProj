"use client";

import React, { useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";

//This define the form data type
interface ContactFormInputs {
  name: string;
  email: string;
  subject: string; 
  message: string;
}

const ContactSection: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ContactFormInputs>({
    mode: "onTouched",
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const onSubmit: SubmitHandler<ContactFormInputs> = async (data) => {
    setIsSuccess(true);
    setMessage("Message sent successfully!");
    reset(); // Reset the form
  };

  return (
    <main className="flex w-full h-screen bg-white">
      <div className="relative w-full flex flex-col justify-center items-center h-full p-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center px-6 md:px-12">
         
          {/* Contact Form Section */}
          <div id="contact-form" className="w-full max-w-lg p-8 mt-10 rounded-lg ">

            <h1 className="text-4xl font-semibold mb-8 text-black"> Want to contact us? </h1> {/* Increased size */}

            <form onSubmit={handleSubmit(onSubmit)}>
           
               <div className="mb-4">
               <input
                  type="text"
                  placeholder="Subject"
                  className={`w-full px-4 py-3 border-2 placeholder:text-gray-400 text-black rounded-md outline-none focus:ring-4 transition duration-200 ${
                    errors.subject ? "border-red-600 focus:border-red-600" : "border-gray-300 focus:border-gray-600"
                  }`}
                  {...register("subject", {
                    required: "Subject is required",
                    maxLength: { value: 100, message: "Max length is 100" },
                  })}
                />

                {errors.subject && (
                  <div className="mt-1 text-red-600">
                    <small>{errors.subject.message}</small>
                  </div>
                )}
              </div>

              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className={`w-full px-4 py-3 border-2 placeholder:text-gray-400 text-black rounded-md outline-none focus:ring-4 transition duration-200 ${
                    errors.name ? "border-red-600 focus:border-red-600" : "border-gray-300 focus:border-gray-600"
                  }`}
                  {...register("name", {
                    required: "Full name is required",
                    maxLength: { value: 80, message: "Max length is 80" },
                  })}
                />
                {errors.name && (
                  <div className="mt-1 text-red-600">
                    <small>{errors.name.message}</small>
                  </div>
                )}
              </div>

              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Email Address"
                  className={`w-full px-4 py-3 border-2 placeholder:text-gray-400 text-black rounded-md outline-none focus:ring-4 transition duration-200 ${
                    errors.email ? "border-red-600 focus:border-red-600" : "border-gray-300 focus:border-gray-600"
                  }`}
                  {...register("email", {
                    required: "Enter your email",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Please enter a valid email",
                    },
                  })}
                />
                {errors.email && (
                  <div className="mt-1 text-red-600">
                    <small>{errors.email.message}</small>
                  </div>
                )}
              </div>

             
              <div className="mb-4">
                <textarea
                  placeholder="Your Message"
                  className={`w-full px-4 py-3 border-2 placeholder:text-gray-400 text-black rounded-md outline-none h-36 focus:ring-4 transition duration-200 ${
                    errors.message ? "border-red-600 focus:border-red-600" : "border-gray-300 focus:border-gray-600"
                  }`}
                  {...register("message", {
                    required: "Enter your Message",
                  })}
                />
                {errors.message && (
                  <div className="mt-1 text-red-600">
                    <small>{errors.message.message}</small>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-4 font-semibold text-white transition-colors bg-gray-900 rounded-md hover:bg-gray-800 focus:outline-none"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
            
            {isSubmitSuccessful && (
              <div className="mt-3 text-sm text-center">
                <div className={`text-${isSuccess ? 'green' : 'red'}-500`}>
                  {message || (isSuccess ? "Success. Message sent successfully." : "Something went wrong. Please try later.")}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactSection;
