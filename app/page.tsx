import { ViewToggle } from "@/components/view-toggle";
import { researchData } from "@/lib/data";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <main className="mx-auto max-w-5xl px-6 py-16">
        <h1 className="mb-8 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          Research
        </h1>
        <ViewToggle entries={researchData} />
      </main>
    </div>
  );
}
