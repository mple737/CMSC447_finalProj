'use client'
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { ThemeProvider, useTheme } from "next-themes";

export default function Providers({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();
  return (

      <ClerkProvider
        appearance={{ baseTheme: resolvedTheme == "dark" ? dark : undefined }}
        dynamic
      >
        {children}
      </ClerkProvider>

  );
}
