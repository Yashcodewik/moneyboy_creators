"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/components/Layouts/Footer";

export default function AuthLayout({children,}: {children: React.ReactNode;}) {const router = useRouter();

  return (
    <>
      {children}
      <Footer />
    </>
  );
}