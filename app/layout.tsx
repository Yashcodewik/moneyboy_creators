import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Poppins,
  Plus_Jakarta_Sans,
} from "next/font/google";
import localFont from "next/font/local";
import "../public/styles/main.css";
import "../public/styles/pages/discover-page/layout.css";
import "../public/styles/main-responsive.css";
import "../public/styles/pages/discover-page/responsive.css";
import "../public/styles/icons.css";
import "../public/styles/style.scss";
import "../public/styles/modal.scss";
import AuthProviders from "@/libs/authProviders";
import { getServerSession } from "next-auth/next";
import { buildAuthOptions } from "@/libs/auth";
import ReduxProvider from "@/redux/ReduxProvider";
import ScrollToTop from "./ScrollToTop";
import AgeGate from "./AgeGate";
import SocketProvider from "./providers/SocketProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://moneyboy.com"), // IMPORTANT

  title: {
    default: "Moneyboy Creators",
    template: "%s | Moneyboy Creators",
  },

  description:
    "Monetize your content and connect with fans on Moneyboy Creators platform.",

  keywords: [
    "moneyboy",
    "creators platform",
    "content monetization",
    "subscription platform",
    "earn online",
  ],

  authors: [{ name: "Moneyboy Team" }],

  alternates: {
    canonical: "https://moneyboy.com", 
  },

  openGraph: {
    title: "Moneyboy Creators",
    description: "Join Moneyboy Creators and start earning from your content.",
    url: "https://moneyboy.com",
    siteName: "Moneyboy Creators",
    images: [
      {
        url: "/images/micons.png", // add this image
        width: 1200,
        height: 630,
        alt: "Moneyboy Creators",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Moneyboy Creators",
    description: "Start earning from your content today.",
    images: ["/images/micons.png"],
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: [{ url: "/images/favicon.ico" }],
    apple: [
      { url: "/images/logo/favicons/apple-touch-icon.png", sizes: "180x180" },
    ],
  },

  manifest: "/site.webmanifest",
};

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(buildAuthOptions());

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#f9f9f9" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${jakarta.variable} ${calSans.variable} antialiased`}
      >
        <ScrollToTop />
        <ReduxProvider>
          <AuthProviders session={session}>
            <SocketProvider>
              {children}
              <AgeGate />
            </SocketProvider>
          </AuthProviders>
        </ReduxProvider>
      </body>
    </html>
  );
}
