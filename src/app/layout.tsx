import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import SmoothScroll from "@/components/smooth-scroll";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "AHVAÉ Studios — Visual Storytelling",
    template: "%s | AHVAÉ Studios",
  },
  description:
    "AHVAÉ Studios creates considered visual stories for brands, businesses and events through film, photography and creative direction. Based in Ontario, Canada.",
  applicationName: "AHVAÉ Studios",
  creator: "AHVAÉ Studios",
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
    description:
      "Visual storytelling for brands, businesses and events.",
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
    <html lang="en" className={`${dmSans.variable} ${cormorant.variable}`}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
