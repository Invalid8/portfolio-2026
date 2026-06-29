import type { Metadata } from "next";
import { Geist, Geist_Mono, Bricolage_Grotesque, Allura } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "./providers";
import { absoluteUrl, siteConfig } from "@/lib/seo";
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
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "technology",
  keywords: [
    "Daniel Fadamitan",
    "frontend developer Nigeria",
    "React developer",
    "Next.js developer",
    "TypeScript developer",
    "web accessibility",
    "frontend performance",
    "React Native developer",
  ],
  alternates: { canonical: siteConfig.url },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: absoluteUrl(siteConfig.defaultOgImage),
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} frontend developer portfolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: siteConfig.twitter,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [absoluteUrl(siteConfig.defaultOgImage)],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`dark ${geistSans.variable} ${geistMono.variable} ${bricolage.variable} ${allura.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="grain min-h-full flex flex-col bg-background text-foreground"
      >
        <Providers>{children}</Providers>
        <Toaster position="bottom-right" />
        <Analytics />
      </body>
    </html>
  );
}
