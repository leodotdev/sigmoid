export type Category =
  | "Policy"
  | "Alignment"
  | "Interpretability"
  | "Economic Research"
  | "Societal Impacts"
  | "Announcements"
  | "Product"
  | "Evaluations";

export interface ResearchEntry {
  id: string;
  title: string;
  categories: Category[];
  date: Date;
  href?: string;
}

export const researchData: ResearchEntry[] = [
  {
    id: "1",
    title: "Project Fetch: Can Claude train a robot dog?",
    categories: ["Policy"],
    date: new Date("2025-11-12"),
  },
  {
    id: "2",
    title: "Commitments on model deprecation and preservation",
    categories: ["Alignment"],
    date: new Date("2025-11-04"),
  },
  {
    id: "3",
    title: "Signs of introspection in large language models",
    categories: ["Interpretability"],
    date: new Date("2025-10-28"),
  },
  {
    id: "4",
    title: "Preparing for AI's economic impact: exploring policy responses",
    categories: ["Policy"],
    date: new Date("2025-10-14"),
  },
  {
    id: "5",
    title: "A small number of samples can poison LLMs of any size",
    categories: ["Alignment"],
    date: new Date("2025-10-09"),
  },
  {
    id: "6",
    title: "Petri: An open-source auditing tool to accelerate AI safety research",
    categories: ["Alignment"],
    date: new Date("2025-10-06"),
  },
  {
    id: "7",
    title: "Building AI for cyber defenders",
    categories: ["Policy"],
    date: new Date("2025-10-03"),
  },
  {
    id: "8",
    title: "Anthropic Economic Index report: Uneven geographic and enterprise AI adoption",
    categories: ["Economic Research"],
    date: new Date("2025-09-15"),
  },
  {
    id: "9",
    title: "Anthropic Economic Index: Tracking AI's role in the US and global economy",
    categories: ["Economic Research"],
    date: new Date("2025-09-15"),
  },
  {
    id: "10",
    title: "Anthropic Education Report: How educators use Claude",
    categories: ["Societal Impacts"],
    date: new Date("2025-08-26"),
  },
  {
    id: "11",
    title: "Claude Opus 4 and 4.1 can now end a rare subset of conversations",
    categories: ["Alignment"],
    date: new Date("2025-08-15"),
  },
  {
    id: "12",
    title: "Persona vectors: Monitoring and controlling character traits in language models",
    categories: ["Interpretability"],
    date: new Date("2025-08-01"),
  },
  {
    id: "13",
    title: "Project Vend: Can Claude run a small shop? (And why does that matter?)",
    categories: ["Policy"],
    date: new Date("2025-06-27"),
  },
  {
    id: "14",
    title: "Agentic Misalignment: How LLMs could be insider threats",
    categories: ["Alignment"],
    date: new Date("2025-06-20"),
  },
  {
    id: "15",
    title: "Confidential Inference via Trusted Virtual Machines",
    categories: ["Announcements"],
    date: new Date("2025-06-18"),
  },
  {
    id: "16",
    title: "SHADE-Arena: Evaluating sabotage and monitoring in LLM agents",
    categories: ["Alignment"],
    date: new Date("2025-06-16"),
  },
  {
    id: "17",
    title: "Open-sourcing circuit tracing tools",
    categories: ["Interpretability"],
    date: new Date("2025-05-29"),
  },
  {
    id: "18",
    title: "Anthropic Economic Index: AI's impact on software development",
    categories: ["Societal Impacts"],
    date: new Date("2025-04-28"),
  },
  {
    id: "19",
    title: "Exploring model welfare",
    categories: ["Alignment"],
    date: new Date("2025-04-24"),
  },
  {
    id: "20",
    title: "Values in the wild: Discovering and analyzing values in real-world language model interactions",
    categories: ["Societal Impacts"],
    date: new Date("2025-04-21"),
  },
  {
    id: "21",
    title: "Anthropic Education Report: How university students use Claude",
    categories: ["Announcements", "Societal Impacts"],
    date: new Date("2025-04-08"),
  },
  {
    id: "22",
    title: "Reasoning models don't always say what they think",
    categories: ["Alignment"],
    date: new Date("2025-04-03"),
  },
  {
    id: "23",
    title: "Anthropic Economic Index: Insights from Claude 3.7 Sonnet",
    categories: ["Announcements", "Societal Impacts"],
    date: new Date("2025-03-27"),
  },
  {
    id: "24",
    title: "Tracing the thoughts of a large language model",
    categories: ["Interpretability"],
    date: new Date("2025-03-27"),
  },
  {
    id: "25",
    title: "Auditing language models for hidden objectives",
    categories: ["Alignment", "Interpretability"],
    date: new Date("2025-03-13"),
  },
  {
    id: "26",
    title: "Forecasting rare language model behaviors",
    categories: ["Alignment"],
    date: new Date("2025-02-25"),
  },
  {
    id: "27",
    title: "Claude's extended thinking",
    categories: ["Announcements"],
    date: new Date("2025-02-24"),
  },
  {
    id: "28",
    title: "Insights on Crosscoder Model Diffing",
    categories: ["Interpretability"],
    date: new Date("2025-02-20"),
  },
  {
    id: "29",
    title: "The Anthropic Economic Index",
    categories: ["Announcements", "Societal Impacts"],
    date: new Date("2025-02-10"),
  },
  {
    id: "30",
    title: "Constitutional Classifiers: Defending against universal jailbreaks",
    categories: ["Alignment"],
    date: new Date("2025-02-03"),
  },
  {
    id: "31",
    title: "Building effective agents",
    categories: ["Product"],
    date: new Date("2024-12-19"),
  },
  {
    id: "32",
    title: "Alignment faking in large language models",
    categories: ["Alignment"],
    date: new Date("2024-12-18"),
  },
  {
    id: "33",
    title: "Clio: A system for privacy-preserving insights into real-world AI use",
    categories: ["Societal Impacts"],
    date: new Date("2024-12-12"),
  },
  {
    id: "34",
    title: "A statistical approach to model evaluations",
    categories: ["Evaluations"],
    date: new Date("2024-11-19"),
  },
  {
    id: "35",
    title: "Raising the bar on SWE-bench Verified with Claude 3.5 Sonnet",
    categories: ["Product"],
    date: new Date("2024-10-30"),
  },
  {
    id: "36",
    title: "Evaluating feature steering: A case study in mitigating social biases",
    categories: ["Societal Impacts", "Interpretability"],
    date: new Date("2024-10-25"),
  },
  {
    id: "37",
    title: "Developing a computer use model",
    categories: ["Announcements", "Product"],
    date: new Date("2024-10-22"),
  },
  {
    id: "38",
    title: "Sabotage evaluations for frontier models",
    categories: ["Alignment"],
    date: new Date("2024-10-18"),
  },
  {
    id: "39",
    title: "Using dictionary learning features as classifiers",
    categories: ["Interpretability"],
    date: new Date("2024-10-16"),
  },
  {
    id: "40",
    title: "Circuits Updates - September 2024",
    categories: ["Interpretability"],
    date: new Date("2024-10-01"),
  },
];

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
