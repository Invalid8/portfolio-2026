import type { Metadata } from "next";
import { Geist, Geist_Mono, Bricolage_Grotesque, Allura } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "./providers";
import { fetchSections, fetchCollections } from "@/lib/cms/data";
import "./globals.css";

// Body / UI.
const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

// Captions, eyebrows, the "field-spec" labels.
const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

// Display — big, tight editorial headlines.
const bricolage = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
});

// Signature wordmark flourish (footer).
const allura = Allura({
  variable: "--font-script",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Daniel Fadamitan — Frontend Developer",
  description:
    "Daniel Fadamitan is a Nigeria-based frontend developer building accessible, high-performing, and beautiful web experiences.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [initialSections, initialCollections] = await Promise.all([
    fetchSections(),
    fetchCollections(),
  ]);

  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} ${bricolage.variable} ${allura.variable} h-full antialiased`}
    >
      <body className="grain min-h-full flex flex-col bg-background text-foreground">
        <Providers
          initialSections={initialSections}
          initialCollections={initialCollections}
        >
          {children}
        </Providers>
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
