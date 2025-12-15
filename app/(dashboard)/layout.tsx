"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/Layouts/Header";
import Sidebar from "@/components/Layouts/Sidebar";
import { useRouter } from "next/navigation";

export default function DashboardLayout({children,}: {children: React.ReactNode;}) {const router = useRouter();

  return (
    <div className="moneyboy-layout-container">
      <Header />
      <div className="container">
        <div className="moneyboy-main-asides-layout-container">
          <Sidebar />
          <div className="moneyboy-page-content-container">
            <main className="moneyboy-dynamic-content-layout">
              {children}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
