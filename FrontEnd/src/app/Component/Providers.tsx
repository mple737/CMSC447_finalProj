'use client'
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { ThemeProvider, useTheme } from "next-themes";
import { Suspense } from 'react'

export default function Providers({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();
  return (
    <Suspense>
      <ClerkProvider
        dynamic
        appearance={{ baseTheme: resolvedTheme == "dark" ? dark : undefined }}

      >
        {children}
      </ClerkProvider>
    </Suspense>
  );
}
