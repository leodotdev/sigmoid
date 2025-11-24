"use client";

import { useState } from "react";
import { ResearchTable } from "./research-table";
import { ResearchCards } from "./research-cards";
import { ResearchTimeline } from "./research-timeline";
import { ResearchEntry } from "@/lib/data";

type View = "table" | "cards" | "timeline";

interface ViewToggleProps {
  entries: ResearchEntry[];
}

export function ViewToggle({ entries }: ViewToggleProps) {
  const [activeView, setActiveView] = useState<View>("table");

  const views: { id: View; label: string }[] = [
    { id: "table", label: "Table" },
    { id: "cards", label: "Cards" },
    { id: "timeline", label: "Timeline" },
  ];

  return (
    <div>
      <div className="flex justify-end mb-8">
        <div className="inline-flex rounded-lg border border-zinc-200 dark:border-zinc-800 p-1 bg-zinc-50 dark:bg-zinc-900">
          {views.map((view) => (
            <button
              key={view.id}
              onClick={() => setActiveView(view.id)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                activeView === view.id
                  ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"
              }`}
            >
              {view.label}
            </button>
          ))}
        </div>
      </div>

      {activeView === "table" && <ResearchTable entries={entries} />}

      {activeView === "cards" && <ResearchCards entries={entries} />}

      {activeView === "timeline" && <ResearchTimeline entries={entries} />}
    </div>
  );
}
