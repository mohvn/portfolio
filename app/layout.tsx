import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { Caveat, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Mohan Elias",
  description: "The personal website of Mohan Elias.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={cn(
        "h-full",
        GeistSans.variable,
        jetbrainsMono.variable,
        caveat.variable,
      )}
      suppressHydrationWarning
    >
      <body>{children}</body>
    </html>
  );
}
