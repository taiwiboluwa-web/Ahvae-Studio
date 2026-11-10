import type { Metadata, Viewport } from "next";
import { DM_Sans, Cormorant_Garamond } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const editorial = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "AHVAÉ Studios — Visual Storytelling",
    template: "%s | AHVAÉ Studios",
  },
  description:
    "AHVAÉ Studios is an independent visual production studio bringing film, photography and creative direction together to create distinctive work with feeling.",
  applicationName: "AHVAÉ Studios",
  creator: "AHVAÉ Studios",
  keywords: [
    "AHVAÉ Studios",
    "Ontario filmmaker",
    "photography studio",
    "creative direction",
    "brand storytelling",
    "event films",
  ],
  openGraph: {
    type: "website",
    siteName: "AHVAÉ Studios",
    title: "AHVAÉ Studios — Visual Storytelling",
    description:
      "Film, photography and creative direction for stories that deserve to be felt.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AHVAÉ Studios — Visual Storytelling",
    description: "Visual storytelling for brands, businesses and events.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f8f9fa",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sans.variable} ${editorial.variable}`}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
