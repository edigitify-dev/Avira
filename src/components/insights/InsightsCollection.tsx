"use client";

import { useState } from "react";
import { InsightsGrid } from "@/components/insights/InsightsGrid";
import { insightCategories, type Insight } from "@/lib/insights";

export function InsightsCollection({ items }: { items: Insight[] }) {
  const [category, setCategory] = useState<(typeof insightCategories)[number]>("All insights");
  const filtered = category === "All insights" ? items : items.filter((item) => item.category === category);

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filter insights by topic">
        {insightCategories.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={category === item}
            onClick={() => setCategory(item)}
            className={`cursor-pointer border px-4 py-3 font-sans text-xs font-medium outline-offset-4 transition-colors focus-visible:outline-2 focus-visible:outline-forest motion-reduce:transition-none ${
              category === item
                ? "border-ink bg-ink text-cream"
                : "border-ink/20 text-ink/75 hover:border-forest hover:bg-paper"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
      <p role="status" className="mb-5 font-sans text-xs text-ink/65">
        {String(filtered.length).padStart(2, "0")} {filtered.length === 1 ? "insight" : "insights"}
        {category !== "All insights" && ` in ${category}`}
      </p>
      <InsightsGrid key={category} items={filtered} />
    </div>
  );
}
