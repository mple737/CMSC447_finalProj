
//page.tsx for history
"use client";

import React from 'react';
import { SignedIn } from "@clerk/nextjs"
import Setting  from '../pages/Setting/page';

export default function DashboardPage() {
  return (
    <SignedIn>
      <Setting />
    </SignedIn>
  );
}
