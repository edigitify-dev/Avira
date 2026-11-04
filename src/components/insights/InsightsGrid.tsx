import type { Insight } from "@/lib/insights";

export function InsightsGrid({ items }: { items: Insight[] }) {
  if (items.length === 0) {
    return (
      <p className="font-sans text-base leading-7 text-ink/55">
        New insights will be published here soon.
      </p>
    );
  }

  return (
    <ul className="grid gap-px bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <li key={item.title} className="flex flex-col gap-4 bg-cream p-8">
          <p className="font-sans text-xs uppercase tracking-[0.15em] text-ink/45">{item.date}</p>
          <p className="font-serif text-2xl leading-snug text-ink">{item.title}</p>
          <p className="font-sans text-sm leading-6 text-ink/60">{item.summary}</p>
        </li>
      ))}
    </ul>
  );
}
