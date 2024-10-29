// src/app/page.tsx
import Dashboard from "./ui/dashboard/page"; // Importing the dashboard component

export default function Home() {
  // This page will render the appropriate component based on user authentication status.
  return (
    <> 
      <Dashboard />   {/* Display the dashboard for authenticated users */}
    </>
  );
}
