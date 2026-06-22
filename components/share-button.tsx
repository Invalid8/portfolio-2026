"use client";

import { Share2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function ShareButton({
  title,
  text,
  url,
}: {
  title: string;
  text: string;
  url: string;
}) {
  async function share() {
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied");
    } catch {
      toast.error("Could not copy the link");
    }
  }

  return (
    <Button type="button" variant="outline" size="lg" onClick={share}>
      <Share2 className="size-4" /> Share
    </Button>
  );
}
