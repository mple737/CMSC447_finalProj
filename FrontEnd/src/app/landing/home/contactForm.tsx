"use client";

import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";

interface ContactFormInputs {
  name: string;
  email: string;
  subject: string; 
  message: string;
}

const ContactSection: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ContactFormInputs>({ mode: "onTouched" });

  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const onSubmit: SubmitHandler<ContactFormInputs> = async (data) => {
    const API_URL = "https://api.web3forms.com/submit";
    const API_KEY = process.env.NEXT_PUBLIC_ACCESS_KEY;

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, access_key: API_KEY }),
      });

      if (response.ok) {
        setIsSuccess(true);
        setMessage("Message sent!");
        reset();
        setTimeout(() => setMessage(""), 5000);
      } else {
        setIsSuccess(false);
        setMessage("Error sending message. Please try again later.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setIsSuccess(false);
      setMessage("Network error. Please check your connection.");
    }
  };

  if (!isClient) return null;

  return (
    <main className="w-full min-h-screen bg-white px-4 sm:px-6 md:px-8 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Side: Info Section */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-black text-center md:text-left">
            Want to contact us?
          </h1>
          <p className="text-lg font-semibold leading-relaxed text-gray-700 text-center md:text-left">
            We’re here to help! Whether you have questions about our services or need support, feel free to reach out.
            Our team aims to respond within 24 hours. Check out our FAQ section for quick answers.
          </p>
        </div>

        {/* Right Side: Contact Form */}
        <div className="p-8 py-16 rounded-lg">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Subject Field */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Subject"
                className={`w-full px-4 py-3 text-sm sm:text-base border-2 rounded-md placeholder:text-gray-400 focus:ring-4 outline-none transition ${
                  errors.subject ? "border-red-600 focus:ring-red-600" : "border-gray-300 focus:ring-blue-600"
                }`}
                {...register("subject", {
                  required: "Subject is required",
                  maxLength: { value: 100, message: "Max length is 100" },
                })}
              />
              {errors.subject && <small className="text-red-600">{errors.subject.message}</small>}
            </div>

            {/* Name Field */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Full Name"
                className={`w-full px-4 py-3 text-sm sm:text-base border-2 rounded-md placeholder:text-gray-400 focus:ring-4 outline-none transition ${
                  errors.name ? "border-red-600 focus:ring-red-600" : "border-gray-300 focus:ring-blue-600"
                }`}
                {...register("name", {
                  required: "Full name is required",
                  maxLength: { value: 80, message: "Max length is 80" },
                })}
              />
              {errors.name && <small className="text-red-600">{errors.name.message}</small>}
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email Address"
                className={`w-full px-4 py-3 text-sm sm:text-base border-2 rounded-md placeholder:text-gray-400 focus:ring-4 outline-none transition ${
                  errors.email ? "border-red-600 focus:ring-red-600" : "border-gray-300 focus:ring-blue-600"
                }`}
                {...register("email", {
                  required: "Enter your email",
                  pattern: { value: /^\S+@\S+$/i, message: "Enter a valid email" },
                })}
              />
              {errors.email && <small className="text-red-600">{errors.email.message}</small>}
            </div>

            {/* Message Field */}
            <div className="mb-4">
              <textarea
                placeholder="Your Message"
                className={`w-full px-4 py-3 text-sm sm:text-base border-2 rounded-md placeholder:text-gray-400 focus:ring-4 outline-none transition ${
                  errors.message ? "border-red-600 focus:ring-red-600" : "border-gray-300 focus:ring-blue-600"
                }`}
                rows={5}
                {...register("message", { required: "Enter your message" })}
              ></textarea>
              {errors.message && <small className="text-red-600">{errors.message.message}</small>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 text-white text-sm sm:text-base bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg hover:from-purple-700 hover:to-blue-700 focus:outline-none transition"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>

          {/* Success/Error Message */}
          {isSubmitSuccessful && (
            <div className="mt-3 text-center">
              <p className={`text-sm sm:text-base ${isSuccess ? "text-green-600" : "text-red-600"}`}>{message}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default ContactSection;
