// app/providers.tsx
"use client";

import { UserProvider } from "@/contexts/AuthContextProvider";
import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <Toaster closeButton richColors />
      <UserProvider>{children}</UserProvider>
    </NextUIProvider>
  );
}
