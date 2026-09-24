import type { Metadata } from "next";
import { Sora, Instrument_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar, Footer, SiteChrome } from "@/components/layout";
import { ThemeProvider } from "@/components/theme-provider";

const fontDisplay = Sora({
  subsets: ["latin"],
  variable: "--font-display",
});

const fontBody = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

const fontMono = IBM_Plex_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "FYNZ — Run your entire business in one place",
  description:
    "FYNZ is the all-in-one business platform: capture leads, book appointments, sell online, and run operations — with AI employees working 24/7.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen flex flex-col bg-background text-foreground antialiased",
          fontDisplay.variable,
          fontBody.variable,
          fontMono.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
          <SiteChrome>
            <Navbar />
          </SiteChrome>
          <main className="flex-1">{children}</main>
          <SiteChrome>
            <Footer />
          </SiteChrome>
        </ThemeProvider>
      </body>
    </html>
  );
}
