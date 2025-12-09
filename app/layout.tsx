"use client";  
import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins, Plus_Jakarta_Sans,} from "next/font/google";
import localFont from "next/font/local";
import { usePathname } from "next/navigation";

import "../public/styles/main.css";
import "../public/styles/pages/discover-page/layout.css";
import "../public/styles/main-responsive.css";
import "../public/styles/pages/discover-page/responsive.css";
import "../public/styles/icons.css"
import "../public/styles/style.css";
import "react-datepicker/dist/react-datepicker.css";

import Header from "@/components/Layouts/Header";
import Sidebar from "@/components/Layouts/Sidebar";
import Footer from "@/components/Layouts/Footer";
import { Toaster } from "react-hot-toast";


const calSans = localFont({
  src: "../public/webfont/CalSans-Regular.woff2",
  variable: "--font-family-heading",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-family-base",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-family-secondary",
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Check if current page is an auth page
  const isAuthPage =
    pathname?.includes("/signup") ||
    pathname?.includes("/creator") ||
    pathname?.includes("/contact-us") ||
    pathname?.includes("/benefits");

  return (
    <html lang="en">
      <head>
        <title>Moneyboy</title>
        <meta name="description" content="Moneyboy" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${jakarta.variable} ${calSans.variable} antialiased`}
      >
         <Toaster position="top-center" reverseOrder={false} />
        {isAuthPage ? (
          <>
            <div className="auth-page">{children}</div>
            <Footer />
          </>
        ) : (
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
        )}
      </body>
    </html>
  );
}
