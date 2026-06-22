import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Content editor",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    noimageindex: true,
  },
};

export default function EditorLayout({ children }: { children: React.ReactNode }) {
  return <div className="relative z-20 min-h-svh bg-black">{children}</div>;
}
