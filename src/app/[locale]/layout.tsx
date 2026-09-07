/**
 * @file layout.tsx
 * @package src/app/[locale]
 * @preview The definitive localized root layout of the portfolio application. Orchestrates global font families, 
 * injects Tailwind v4, and wraps reactive contexts for next-themes, next-intl, sonner, nextjs-toploader, and tanstack-query.
 */

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { ThemeProvider } from "@/providers/theme-provider";
import { ToasterProvider } from "@/providers/toaster-provider";
import { ProgressProvider } from "@/providers/progress-provider";
import { QueryProvider } from "@/providers/query-provider";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import "../globals.css";

/**
 * Global sans-serif font initialization mapping to Geist typography behaviors.
 */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

/**
 * Global monospace font initialization for programmatic syntax blocks.
 */
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * Scalable production metadata registry governing global SEO attributes.
 */
export const metadata: Metadata = {
  title: "Ahmed Tarek | Frontend & Full-Stack Engineer",
  description: "Professional portfolio showcasing advanced Next.js engineering, Turborepo workspaces, and cartoon-fluid front-end architectures.",
};

/**
 * Root localized structural layout shell wrapping all downstream rendering route contexts.
 * Synchronizes dynamic HTML direction matrix rules, client-side translation hydration bundles,
 * global toast notifications, page loading progress triggers, and persistent layout headers/footers.
 */
export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  // Await and resolve the asynchronous layout parameters segment
  const { locale } = await params;

  // Validate that the incoming locale segment is officially supported within our routing policy
  if (!routing.locales.includes(locale as "en" | "ar")) {
    notFound();
  }

  // Fetch the server-side message translation catalog for the active locale scope
  const messages = await getMessages();

  // Define global DOM layout text direction dynamically based on regional standards
  const direction = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
      >
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {/* Global Asynchronous State Management Layer */}
            <QueryProvider>
              {/* Global top page navigation progress indicator */}
              <ProgressProvider />

              {/* Global toast notification system container */}
              <ToasterProvider />

              {/* Main layout container implementing structural screen wrappers */}
              <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors duration-300">
                {/* Global Application Responsive Top Header */}
                <Navbar />

                {/* Dynamic Content Boundary Box injecting child view components */}
                <main className="grow">
                  {children}
                </main>

                {/* Global Application Sticky Bottom Footer */}
                <Footer />
              </div>
            </QueryProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}