"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { AnimatedSection } from "@/components/motion/AnimatedSection";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { AboutPattern } from "@/components/about/AboutPattern";

export function AdminLogin() {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const data = new FormData(event.currentTarget);
    setPending(true);
    setError("");
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: data.get("username"), password: data.get("password") }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "We couldn't sign you in. Please try again.");
      window.location.assign("/admin");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "We couldn't connect. Please try again.");
      setPending(false);
    }
  }

  return (
    <main className="grid min-h-dvh bg-cream text-ink lg:grid-cols-2">
      <aside className="relative flex flex-col overflow-hidden bg-ink px-8 py-10 text-cream sm:px-16 lg:py-14">
        <Link href="/" className="w-fit outline-offset-4 focus-visible:outline-2">
          <Image src="/logo.png" alt="Avira Law" width={200} height={100} className="h-14 w-auto brightness-0 invert" priority />
        </Link>
        <div aria-hidden="true" className="mx-auto my-10 hidden w-full max-w-sm text-cream/60 lg:block">
          <AboutPattern variant="structure" />
        </div>
        <div className="mt-12 max-w-md lg:mt-auto">
          <p className="font-sans text-sm font-medium uppercase tracking-[0.2em] text-cream/70">Administration</p>
          <p className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">Your firm.<br />Your voice.</p>
          <p className="mt-5 leading-7 text-cream/70">Shape your website, publish considered updates, and manage every client enquiry in one place.</p>
        </div>
      </aside>

      <div className="flex items-center justify-center px-8 py-16 sm:px-16">
        <AnimatedSection as="div" stagger amount={0.1} className="w-full max-w-sm">
          <StaggerItem>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-forest">Team access</p>
            <h1 className="mt-4 font-serif text-5xl">Sign in.</h1>
            <p className="mt-5 leading-7 text-ink/70">Welcome to the Avira website studio.</p>
          </StaggerItem>
          <StaggerItem>
            <form onSubmit={submit} className="mt-10 space-y-6">
              <div>
                <label htmlFor="admin-username" className="block text-sm font-medium">Username</label>
                <input id="admin-username" name="username" autoComplete="username" required maxLength={64} defaultValue="avira"
                  className="mt-2 w-full border border-ink/25 bg-paper px-4 py-3.5 text-base outline-offset-2 focus:border-forest focus:outline-2 focus:outline-forest" />
              </div>
              <div>
                <label htmlFor="admin-password" className="block text-sm font-medium">Password</label>
                <div className="relative mt-2">
                  <input id="admin-password" name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" required maxLength={256}
                    className="w-full border border-ink/25 bg-paper py-3.5 pl-4 pr-14 text-base outline-offset-2 focus:border-forest focus:outline-2 focus:outline-forest" />
                  <button type="button" aria-label={showPassword ? "Hide password" : "Show password"} aria-pressed={showPassword}
                    onClick={() => setShowPassword(value => !value)} className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-forest focus-visible:outline-2 focus-visible:outline-forest">
                    {showPassword ? <EyeOff aria-hidden size={19} strokeWidth={1.5} /> : <Eye aria-hidden size={19} strokeWidth={1.5} />}
                  </button>
                </div>
              </div>
              {error && <p role="alert" className="border-l-2 border-forest pl-4 text-sm leading-6">{error}</p>}
              <button type="submit" disabled={pending} className="w-full bg-forest px-6 py-4 text-sm font-medium uppercase tracking-widest text-cream outline-offset-4 transition-colors hover:bg-ink focus-visible:outline-2 focus-visible:outline-forest disabled:opacity-60 motion-reduce:transition-none">
                {pending ? "Signing in…" : "Sign in"}
              </button>
            </form>
            <Link href="/" className="mt-8 inline-block text-sm text-forest underline underline-offset-4">Back to website</Link>
          </StaggerItem>
        </AnimatedSection>
      </div>
    </main>
  );
}
