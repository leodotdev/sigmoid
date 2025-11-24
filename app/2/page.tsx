import { PublicationsViewToggle } from "@/components/publications-view-toggle";
import { researchData } from "@/lib/data";

export default function ExperimentPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <main className="mx-auto max-w-5xl px-6 py-16">
        <PublicationsViewToggle entries={researchData} />
      </main>
    </div>
  );
}
