// src/app/page.tsx
"use client";

import Dashboard from "./dashboard/page"; // Importing the dashboard component

export default function Home() {
  // This page will render the appropriate component based on user authentication status.
  //When user is log in it will displaying the dashboard component
  return (
    <> 
    {/* Display the dashboard for authenticated users */}
      <Dashboard />   
    </>
  );
}
