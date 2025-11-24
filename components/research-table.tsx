import { ResearchEntry, formatDate } from "@/lib/data";

interface ResearchTableProps {
  entries: ResearchEntry[];
}

export function ResearchTable({ entries }: ResearchTableProps) {
  return (
    <div className="w-full">
      <table className="w-full border-collapse">
        <tbody>
          {entries.map((entry) => (
            <tr
              key={entry.id}
              className="border-t border-zinc-200 dark:border-zinc-800"
            >
              <td className="py-4 pr-4">
                <a
                  href={entry.href || "#"}
                  className="text-[15px] font-medium text-amber-700 hover:text-amber-800 dark:text-amber-600 dark:hover:text-amber-500 transition-colors"
                >
                  {entry.title}
                </a>
              </td>
              <td className="py-4 px-4 whitespace-nowrap">
                <span className="text-[15px] text-zinc-500 dark:text-zinc-400">
                  {entry.categories.join(" · ")}
                </span>
              </td>
              <td className="py-4 pl-4 text-right whitespace-nowrap">
                <span className="text-[15px] text-zinc-400 dark:text-zinc-500">
                  {formatDate(entry.date)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
