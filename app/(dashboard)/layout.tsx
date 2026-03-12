"use client";

import React from "react";
import Header from "@/components/Layouts/Header";
import Sidebar from "@/components/Layouts/Sidebar";
import RoleRouteGuard from "@/components/RouteGuard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    <RoleRouteGuard>
      <div className="moneyboy-layout-container">
        <Header />
        <div className="container">
          <div className="moneyboy-main-asides-layout-container">
            <Sidebar />
            <div className="moneyboy-page-content-container">
              <main className="moneyboy-dynamic-content-layout">{children}
              </main>
            </div>
          </div>
        </div>
      </div>
      <div className="mobile-popup-overlay" />
      </RoleRouteGuard>
    </>
  );
}
