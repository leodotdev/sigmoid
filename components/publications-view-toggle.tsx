"use client";

import { useState } from "react";
import { ResearchTableSigmoid } from "./research-table-sigmoid";
import { PublicationsGrid } from "./publications-grid";
import { ResearchEntry } from "@/lib/data";

type View = "table" | "grid";

interface PublicationsViewToggleProps {
  entries: ResearchEntry[];
}

export function PublicationsViewToggle({ entries }: PublicationsViewToggleProps) {
  const [activeView, setActiveView] = useState<View>("table");

  const views: { id: View; label: string }[] = [
    { id: "table", label: "Table" },
    { id: "grid", label: "Grid" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          Publications
        </h1>
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

      {activeView === "table" && <ResearchTableSigmoid entries={entries} />}
      {activeView === "grid" && <PublicationsGrid entries={entries} />}
    </div>
  );
}
