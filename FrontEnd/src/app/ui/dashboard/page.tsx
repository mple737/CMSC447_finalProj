//page.tsx for dashboard

import React from 'react';
import { SignedIn } from "@clerk/nextjs";
import Dashboard from './Dashboard';

export default function DashboardPage() {
  return (
    <SignedIn>
      <Dashboard />
    </SignedIn>
  );
}