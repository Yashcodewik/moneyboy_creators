"use client";

import { SessionProvider } from "next-auth/react";
import { ReactQueryProvider } from "@/libs/ReactQueryProvider";
import { Toaster } from "react-hot-toast";

type ProvidersProps = {
  children: React.ReactNode;
  session: any;
};

export default function AuthProviders({ children, session }: ProvidersProps) {
  return (
    <SessionProvider session={session}>
      <ReactQueryProvider>
        {children}
        <Toaster />
      </ReactQueryProvider>
    </SessionProvider>
  );
}
