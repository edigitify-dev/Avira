"use client";

export default function AdminError({ reset }: { reset: () => void }) {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-cream px-6 text-ink">
      <div className="max-w-md">
        <h1 className="font-serif text-4xl">The inbox is unavailable.</h1>
        <p className="mt-5 leading-7 text-ink/70">We couldn&apos;t connect just now. Please try again shortly.</p>
        <button onClick={reset} className="mt-8 bg-forest px-6 py-3 text-cream">Try again</button>
      </div>
    </main>
  );
}
