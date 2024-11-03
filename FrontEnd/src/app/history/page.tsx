
//page.tsx for history
"use client";

import React from 'react';
import { SignedIn } from "@clerk/nextjs"
import History from '../pages/History/page';

export default function DashboardPage() {
  return (
    <SignedIn>
      <History />
    </SignedIn>
  );
}
