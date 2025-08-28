import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Free Invoice Generator | Create Professional Invoices Online",
  description:
    "Generate professional invoices instantly with our free Invoice Generator. Download, share, and customize invoices for your business in just a few clicks.",
  keywords: [
    "invoice generator",
    "free invoice maker",
    "create invoice online",
    "download invoice",
    "business invoice tool",
    "billing software",
    "online invoice template",
  ],
  openGraph: {
    title: "Free Invoice Generator | Create Professional Invoices Online",
    description:
      "Easily generate and customize invoices online. Free, fast, and professional invoice generator tool.",
    url: "https://invoice-generator.vercel.app",
    siteName: "Invoice Generator",
    images: [
      {
        url: "https://invoice-generator.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Invoice Generator Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Invoice Generator | Create Professional Invoices Online",
    description:
      "Generate invoices online for free. Professional, customizable, and easy to use.",
    images: ["https://invoice-generator.vercel.app/og-image.jpg"],
    creator: "@yourTwitterHandle",
  },
  metadataBase: new URL("https://invoice-generator.vercel.app"),
  alternates: {
    canonical: "https://invoice-generator.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
