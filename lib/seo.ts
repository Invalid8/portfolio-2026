import type { Metadata } from "next";

export const siteConfig = {
  name: "Daniel Fadamitan",
  title: "Daniel Fadamitan — Frontend Developer",
  description:
    "Nigeria-based frontend developer building accessible, high-performing web and mobile experiences with React, Next.js, and TypeScript.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://dalgoridim.com",
  locale: "en_NG",
  twitter: "@D_Invalid1",
  defaultOgImage: "/images/og/home.png",
} as const;

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}

export function summarize(value: string, maxLength = 160) {
  const plain = value.replace(/[#*_>`\[\]()~-]/g, "").replace(/\s+/g, " ").trim();
  if (plain.length <= maxLength) return plain;
  return `${plain.slice(0, maxLength - 1).trimEnd()}…`;
}

export function toIsoDate(value?: string) {
  if (!value) return undefined;
  const normalized = /^\d{4}-\d{2}$/.test(value) ? `${value}-01` : value;
  const date = new Date(normalized);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
}

export function createPageMetadata({
  title,
  description,
  path,
  image = siteConfig.defaultOgImage,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const canonical = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);
  const socialTitle = `${title} | ${siteConfig.name}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url: canonical,
      siteName: siteConfig.name,
      title: socialTitle,
      description,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: socialTitle }],
    },
    twitter: {
      card: "summary_large_image",
      creator: siteConfig.twitter,
      title: socialTitle,
      description,
      images: [imageUrl],
    },
  };
}
