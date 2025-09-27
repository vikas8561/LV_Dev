import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Basic SEO
  title: "Legacy Vogue - Premium Fashion & Lifestyle Collection",
  description: "Discover our exquisite collection of premium fashion and lifestyle products, crafted with love and attention to detail. Shop sarees, new arrivals, and festive wear.",
  keywords: "fashion, lifestyle, premium, sarees, new arrival, festive wear, clothing, style, legacy vogue, women's fashion, traditional wear, modern fashion",
  authors: [{ name: "Legacy Vogue Team" }],
  
  // Search Engine Instructions
  robots: {
    index: true,    // Allow search engines to index this page
    follow: true,   // Allow search engines to follow links
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Social Media Sharing (Facebook, LinkedIn)
  openGraph: {
    title: "Legacy Vogue - Premium Fashion & Lifestyle Collection",
    description: "Discover our exquisite collection of premium fashion and lifestyle products, crafted with love and attention to detail. Shop sarees, new arrivals, and festive wear.",
    type: "website",
    url: "https://legacyvogue.com",
    siteName: "Legacy Vogue",
    locale: "en_US",
    images: [
      {
        url: "/og-image.jpg",  // You'll need to add this image
        width: 1200,
        height: 630,
        alt: "Legacy Vogue - Premium Fashion Collection",
      },
    ],
  },
  
  // Twitter/X Sharing
  twitter: {
    card: "summary_large_image",
    title: "Legacy Vogue - Premium Fashion & Lifestyle Collection",
    description: "Discover our exquisite collection of premium fashion and lifestyle products, crafted with love and attention to detail.",
    images: ["/twitter-image.jpg"], // You'll need to add this image
    creator: "@legacyvogue",
    site: "@legacyvogue",
  },
  
  // Additional SEO
  alternates: {
    canonical: "https://legacyvogue.com",  // Tells search engines this is the main URL
  },
  
  // App/Website Info
  applicationName: "Legacy Vogue",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  
  // Additional Meta Tags
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "Legacy Vogue",
    "format-detection": "telephone=no",
    "mobile-web-app-capable": "yes",
    "msapplication-TileColor": "#EC4899",
    "msapplication-config": "/browserconfig.xml",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#EC4899" },
    { media: "(prefers-color-scheme: dark)", color: "#EC4899" },
  ],
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-900 text-white`}
      >
        <Navbar />
        <main className="min-h-screen pt-16 pb-16 md:pt-0 md:pb-0">
          {children}
        </main>
      </body>
    </html>
  );
}
