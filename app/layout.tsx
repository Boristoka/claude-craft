import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, DM_Serif_Display } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap", // Prevents layout shift
});

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

// Base URL for metadata - update this to your production domain
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://example.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Claude Craft - Build beautiful websites with Claude Code",
    template: "%s | Claude Craft",
  },
  description:
    "A professional UI kit for building modern business websites with Claude Code. Editorial design style, no generic AI-look. Built with Next.js, Tailwind CSS, and Framer Motion.",
  keywords: [
    "UI kit",
    "website builder",
    "Claude Code",
    "Next.js",
    "Tailwind CSS",
    "web design",
    "business website",
    "React components",
  ],
  authors: [{ name: "Claude Craft" }],
  creator: "Claude Craft",
  publisher: "Claude Craft",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Claude Craft",
    title: "Claude Craft - Build beautiful websites with Claude Code",
    description:
      "A professional UI kit for building modern business websites. Editorial design style, no generic AI-look.",
  },
  twitter: {
    card: "summary",
    title: "Claude Craft - Build beautiful websites with Claude Code",
    description:
      "A professional UI kit for building modern business websites. Editorial design style, no generic AI-look.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Uncomment and add your verification codes:
  // verification: {
  //   google: "your-google-verification-code",
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${plusJakartaSans.variable} ${dmSerifDisplay.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
