import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins, Plus_Jakarta_Sans } from "next/font/google";
import localFont from "next/font/local";

import "../public/styles/main.css";
import "../public/styles/pages/discover-page/layout.css";
import "../public/styles/main-responsive.css";
import "../public/styles/pages/discover-page/responsive.css";
import "../public/styles/style.css";

import Header from "@/components/Layouts/Header";
import Sidebar from "@/components/Layouts/Sidebar";

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

export const metadata: Metadata = {
  title: "Moneyboy",
  description: "Moneyboy",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${jakarta.variable} ${calSans.variable} antialiased`}>
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
      </body>
    </html>
  );
}