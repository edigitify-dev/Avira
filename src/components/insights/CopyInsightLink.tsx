"use client";

import { useState } from "react";
import { Check, Link as LinkIcon } from "lucide-react";

export function CopyInsightLink() {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setStatus("copied");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={copyLink}
        className="inline-flex cursor-pointer items-center gap-3 font-sans text-xs font-medium text-forest outline-offset-4 hover:text-ink focus-visible:outline-2 focus-visible:outline-forest"
      >
        {status === "copied" ? <Check aria-hidden className="h-4 w-4" /> : <LinkIcon aria-hidden className="h-4 w-4" />}
        {status === "copied" ? "Link copied" : "Copy article link"}
      </button>
      <p role="status" className="mt-2 font-sans text-xs leading-5 text-ink/65">
        {status === "copied" && "Ready to share."}
        {status === "error" && "Please copy the URL from your address bar."}
      </p>
    </div>
  );
}
