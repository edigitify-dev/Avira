"use client";

import { useState } from "react";

type FormState = "idle" | "submitting" | "success";

export function NewsletterForm() {
  const [state, setState] = useState<FormState>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    await new Promise((r) => setTimeout(r, 1000));
    setState("success");
  }

  if (state === "success") {
    return (
      <p className="font-serif text-xl text-cream">Thank you for subscribing.</p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-4">
      <div className="flex flex-1 flex-col gap-2">
        <label
          htmlFor="newsletter-email"
          className="font-sans text-xs font-medium uppercase tracking-[0.15em] text-cream/40"
        >
          Email
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          autoComplete="email"
          className="w-full border-b border-cream/20 bg-transparent pb-2 pt-1 font-sans text-sm text-cream placeholder:text-cream/25 transition-colors duration-200 focus:border-cream/60 focus:outline-none"
        />
      </div>
      <button
        type="submit"
        disabled={state === "submitting"}
        className="inline-flex shrink-0 cursor-pointer items-center gap-2 border border-cream/25 px-6 py-3 font-sans text-xs font-medium uppercase tracking-[0.15em] text-cream transition-colors duration-300 hover:bg-cream hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
      >
        {state === "submitting" ? "Subscribing…" : <>Subscribe <span aria-hidden>→</span></>}
      </button>
    </form>
  );
}
