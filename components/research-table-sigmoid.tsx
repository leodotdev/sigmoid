"use client";

import { ResearchEntry, formatDate } from "@/lib/data";
import { useState } from "react";

interface ResearchTableSigmoidProps {
  entries: ResearchEntry[];
}

export function ResearchTableSigmoid({ entries }: ResearchTableSigmoidProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const calculateScale = (index: number): number => {
    if (hoveredIndex === null) return 1;

    // Distance from hovered row
    const distance = Math.abs(index - hoveredIndex);

    // Hovered row stays at full scale
    if (distance === 0) return 1;

    // Sigmoid parameters
    const midpoint = 3; // Where the curve inflects (middle of S-curve)
    const steepness = 1.2; // Controls how steep the middle transition is
    const minScale = 0.95; // Minimum scale factor (95%)

    // Standard sigmoid function: σ(x) = 1 / (1 + e^(-k(x-x₀)))
    // This increases from 0 to 1, so we invert it to scale DOWN with distance
    const sigmoid = 1 / (1 + Math.exp(-steepness * (distance - midpoint)));

    // Invert: as distance increases, scale decreases from 1 to minScale
    const scale = 1 - (1 - minScale) * sigmoid;

    return scale;
  };

  return (
    <div className="w-full">
      {entries.map((entry, index) => (
        <div
          key={entry.id}
          className="transition-transform duration-200 ease-out origin-center"
          style={{
            transform: `scale(${calculateScale(index)})`,
          }}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <a
            href={entry.href || "#"}
            className="group block border-t border-zinc-200 dark:border-zinc-800"
          >
            <div className="grid grid-cols-[1fr_auto_auto] gap-4 py-4">
              <div className="pr-4">
                <span className="text-[15px] font-medium text-amber-700 group-hover:text-amber-800 dark:text-amber-600 dark:group-hover:text-amber-500 transition-colors group-hover:underline">
                  {entry.title}
                </span>
              </div>
              <div className="px-4 flex items-center gap-1.5">
                {entry.categories.map((category) => (
                  <span
                    key={category}
                    className="inline-flex px-2 py-0.5 text-xs font-medium rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                  >
                    {category}
                  </span>
                ))}
              </div>
              <div className="pl-4 text-right whitespace-nowrap">
                <span className="text-[15px] text-zinc-400 dark:text-zinc-500">
                  {formatDate(entry.date)}
                </span>
              </div>
            </div>
          </a>
        </div>
      ))}
    </div>
  );
}
