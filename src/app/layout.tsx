import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "AHVAÉ Studios — Visual Storytelling",
    template: "%s | AHVAÉ Studios",
  },
  description:
    "Visual storytelling for brands, businesses and events. AHVAÉ Studios brings film, photography and creative direction together to create work with feeling. Based in Ontario, Canada.",
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
      "Visual storytelling for brands, businesses and events. Film, photography and creative direction. Based in Ontario, Canada.",
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
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
