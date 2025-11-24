"use client";

import { ResearchEntry, formatDate } from "@/lib/data";
import { useState, useEffect, useRef } from "react";

interface PublicationsGridProps {
  entries: ResearchEntry[];
}

export function PublicationsGrid({ entries }: PublicationsGridProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [gridCols, setGridCols] = useState(3);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateGridCols = () => {
      if (!gridRef.current) return;
      const width = gridRef.current.offsetWidth;
      // Match Tailwind breakpoints: md:grid-cols-2 lg:grid-cols-3
      if (width < 768) {
        setGridCols(1);
      } else if (width < 1024) {
        setGridCols(2);
      } else {
        setGridCols(3);
      }
    };

    updateGridCols();
    window.addEventListener("resize", updateGridCols);
    return () => window.removeEventListener("resize", updateGridCols);
  }, []);

  const calculateScale = (index: number): number => {
    if (hoveredIndex === null) return 1;
    if (index === hoveredIndex) return 1;

    // Calculate grid position for both items
    const hoveredRow = Math.floor(hoveredIndex / gridCols);
    const hoveredCol = hoveredIndex % gridCols;
    const currentRow = Math.floor(index / gridCols);
    const currentCol = index % gridCols;

    // Calculate 2D Euclidean distance
    const distance = Math.sqrt(
      Math.pow(currentRow - hoveredRow, 2) + Math.pow(currentCol - hoveredCol, 2)
    );

    const midpoint = 2.5;
    const steepness = 1.5;
    const minScale = 0.95;

    const sigmoid = 1 / (1 + Math.exp(-steepness * (distance - midpoint)));
    const scale = 1 - (1 - minScale) * sigmoid;

    return scale;
  };

  return (
    <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {entries.map((entry, index) => (
        <a
          key={entry.id}
          href={entry.href || "#"}
          className="group block p-5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-200 ease-out"
          style={{
            transform: `scale(${calculateScale(index)})`,
          }}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div className="flex flex-wrap gap-1.5 mb-3">
            {entry.categories.map((category) => (
              <span
                key={category}
                className="inline-flex px-2 py-0.5 text-xs font-medium rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
              >
                {category}
              </span>
            ))}
          </div>
          <h3 className="text-[15px] font-medium text-amber-700 group-hover:text-amber-800 dark:text-amber-600 dark:group-hover:text-amber-500 group-hover:underline transition-colors mb-2 line-clamp-3">
            {entry.title}
          </h3>
          <p className="text-sm text-zinc-400 dark:text-zinc-500">
            {formatDate(entry.date)}
          </p>
        </a>
      ))}
    </div>
  );
}
