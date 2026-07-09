import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { cn } from "@/components/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL("https://mohvn.github.io"),
  title: {
    default: "Mohan Elias",
    template: `%s | Mohan Elias`,
  },
  description: "Hey! I'm Mohan Elias, and this is my portfolio website.",
  openGraph: {
    title: "Mohan Elias",
    description: "Hey! I'm Mohan Elias, and this is my portfolio website.",
    siteName: "Mohan Elias",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    title: "Mohan Elias",
    card: "summary_large_image",
  },
  verification: {
    google: "",
    yandex: "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={cn(GeistSans.variable, GeistMono.variable)}
      suppressHydrationWarning
    >
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
        )}
      >
        <ThemeProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
