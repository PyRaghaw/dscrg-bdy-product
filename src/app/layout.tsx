import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "../components/SmoothScroll";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "VANI — AI-Powered Recovery Companion",
  description:
    "VANI turns your confusing hospital prescription into a clear, AI-monitored recovery plan — with smart reminders, real-time alerts for your family, and Beary keeping you on track.",
  openGraph: {
    title: "VANI — AI-Powered Recovery Companion",
    description:
      "Never miss a step in your recovery. Scan prescriptions, auto-schedule medicines, and stay connected with your care circle.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-gray-900 selection:bg-brand/20 selection:text-brand-dark">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
