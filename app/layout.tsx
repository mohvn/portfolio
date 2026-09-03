import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Mohan Elias – Frontend developer",
  description: "the personal website of mohan elias.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={cn("dark h-full", GeistSans.variable, jetbrainsMono.variable)}
      suppressHydrationWarning
    >
      <body>{children}</body>
    </html>
  );
}
