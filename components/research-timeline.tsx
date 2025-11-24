import { ResearchEntry, formatDate } from "@/lib/data";

interface ResearchTimelineProps {
  entries: ResearchEntry[];
}

interface GroupedEntries {
  [key: string]: ResearchEntry[];
}

export function ResearchTimeline({ entries }: ResearchTimelineProps) {
  // Group entries by month/year
  const grouped = entries.reduce<GroupedEntries>((acc, entry) => {
    const key = entry.date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(entry);
    return acc;
  }, {});

  const sortedKeys = Object.keys(grouped).sort((a, b) => {
    const dateA = new Date(grouped[a][0].date);
    const dateB = new Date(grouped[b][0].date);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <div className="relative">
      {sortedKeys.map((monthYear, groupIndex) => (
        <div key={monthYear} className="relative">
          {/* Month/Year header */}
          <div className="sticky top-0 z-10 bg-white dark:bg-zinc-950 py-3">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              {monthYear}
            </h3>
          </div>

          {/* Entries for this month */}
          <div className="relative pl-6 pb-8">
            {/* Vertical line */}
            <div className="absolute left-[3px] top-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800" />

            {grouped[monthYear].map((entry, index) => (
              <div key={entry.id} className="relative pb-6 last:pb-0">
                {/* Dot on timeline */}
                <div className="absolute left-[-22px] top-1.5 w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />

                <a
                  href={entry.href || "#"}
                  className="group block"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[15px] font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-amber-700 dark:group-hover:text-amber-500 transition-colors">
                        {entry.title}
                      </h4>
                      <div className="mt-1 flex items-center gap-2 text-sm">
                        <span className="text-zinc-500 dark:text-zinc-400">
                          {entry.categories.join(" · ")}
                        </span>
                        <span className="text-zinc-300 dark:text-zinc-700">•</span>
                        <span className="text-zinc-400 dark:text-zinc-500">
                          {entry.date.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
