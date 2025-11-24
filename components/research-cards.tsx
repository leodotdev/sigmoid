import { ResearchEntry, formatDate } from "@/lib/data";

interface ResearchCardsProps {
  entries: ResearchEntry[];
}

export function ResearchCards({ entries }: ResearchCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {entries.map((entry) => (
        <a
          key={entry.id}
          href={entry.href || "#"}
          className="group block p-5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors"
        >
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex flex-wrap gap-1.5">
              {entry.categories.map((category) => (
                <span
                  key={category}
                  className="inline-flex px-2 py-0.5 text-xs font-medium rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
          <h3 className="text-[15px] font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-amber-700 dark:group-hover:text-amber-500 transition-colors mb-2">
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
