import Header from "@/components/navbar/Header";
import "./globals.css";
import "./clean.css";
import { Bebas_Neue, DM_Sans } from "next/font/google";
import Footer from "@/components/footer/Footer";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });
const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas" });

export const metadata: Metadata = {
  title: "Craft Movies | Discover Popular Movies & TV Shows",
  description: "Discover popular movies, trending TV shows, new releases, and top-rated stories. Find your next favorite on Craft Movies.",
  keywords: ["movies", "streaming", "TV series", "cinema", "film", "watch online", "video streaming"],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Craft Movies | Discover Popular Movies & TV Shows",
    description: "Discover popular movies, trending TV shows, new releases, and top-rated stories. Find your next favorite on Craft Movies.",
  },
  twitter: {
    card: "summary",
    title: "Craft Movies | Discover Popular Movies & TV Shows",
    description: "Discover popular movies, trending TV shows, new releases, and top-rated stories.",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  verification: {
    google: "LNIHjq83_6ghxpoOyNT2MpMlnr9ehcj-rUehGV1cM7M",
  },
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={cn(dmSans.variable, bebas.variable)}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0B0B0E" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      </head>
      <body className={cn(dmSans.className, "app-bg-enhanced")}>
        <Header />
        {children}
        <Footer />
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
