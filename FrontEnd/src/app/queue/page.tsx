
//page.tsx for history
"use client";

import React from 'react';
import { SignedIn } from "@clerk/nextjs"
import Queue from '../pages/Queue/page';

export default function DashboardPage() {
  return (
    <SignedIn>
      <Queue />
    </SignedIn>
  );
}
