import { ImageResponse } from "next/og";
import { HomeOgCard } from "@/components/og-card";

export const alt =
  "Daniel builds accessible, fast web experiences people actually enjoy.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(<HomeOgCard />, size);
}
