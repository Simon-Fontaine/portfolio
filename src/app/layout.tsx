import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { InternshipAnnouncementBanner } from "@/components/announcement-banner";
import { Header } from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  weight: ["400"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Simon Fontaine | Développeur Full-Stack",
  description:
    "Portfolio de Simon Fontaine, développeur full-stack étudiant à l'EPHEC. Spécialisé en React, Node.js, PostgreSQL et technologies web modernes.",
  keywords: ["développeur", "full-stack", "React", "Node.js", "portfolio"],
  authors: [{ name: "Simon Fontaine" }],
  openGraph: {
    type: "website",
    locale: "fr_BE",
    title: "Simon Fontaine | Développeur Full-Stack",
    description: "Portfolio de Simon Fontaine, développeur full-stack",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <InternshipAnnouncementBanner />
          <main>{children}</main>
          <footer className="border-t py-8 px-4 text-center text-sm text-muted-foreground">
            <div className="container mx-auto max-w-7xl">
              <p>
                © {new Date().getFullYear()} Simon Fontaine. Tous droits
                réservés.
              </p>
            </div>
          </footer>
          <Toaster richColors position="top-right" />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
