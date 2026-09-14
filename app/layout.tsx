import Header from "@/components/navbar/Header";
import "./globals.css";
import "./clean.css";
import { Bebas_Neue, DM_Sans } from "next/font/google";
import Footer from "@/components/footer/Footer";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });
const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas" });

export const metadata: Metadata = {
  title: "CJ FLIX | Stream Movies & TV Series Online",
  description: "Stream unlimited movies and TV series. Discover new releases, genres, and exclusive content. Ad-free streaming experience.",
  keywords: ["movies", "streaming", "TV series", "cinema", "film", "watch online", "video streaming"],
  authors: [{ name: "CJ FLIX" }],
  creator: "CJ FLIX",
  publisher: "CJ FLIX",
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  metadataBase: new URL("https://cjflix.com"),
  alternates: {
    canonical: "https://cjflix.com",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cjflix.com",
    siteName: "CJ FLIX",
    title: "CJ FLIX | Stream Movies & TV Series Online",
    description: "Stream unlimited movies and TV series. Discover new releases, genres, and exclusive content. Ad-free streaming experience.",
    images: [
      {
        url: "https://cjflix.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "CJ FLIX - Streaming Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CJ FLIX | Stream Movies & TV Series Online",
    description: "Stream unlimited movies and TV series. Discover new releases, genres, and exclusive content.",
    creator: "@cjflix",
    images: ["https://cjflix.com/og-image.jpg"],
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
        <meta name="theme-color" content="#E50914" />
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
