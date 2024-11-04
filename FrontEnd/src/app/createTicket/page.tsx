
//page.tsx for history
"use client";

import React from 'react';
import { SignedIn } from "@clerk/nextjs"
import Create from '../pages/CreateTicket/page';

export default function DashboardPage() {
  return (
    <SignedIn>
      <Create />
    </SignedIn>
  );
}
