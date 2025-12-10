"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

// Design System Colors (Light/Ivory theme)
const colors = {
  // Backgrounds
  bgPrimary: "#FAF9F5",      // Gray 050 (Ivory)
  bgSecondary: "#EDECE8",    // Gray 150
  bgTertiary: "#E5E4E0",     // Gray 200

  // Foregrounds
  fgPrimary: "#1A1916",      // Gray 950 (Slate)
  fgSecondary: "#4A4942",    // Gray 750
  fgTertiary: "#6B6A63",     // Gray 600

  // Borders
  borderPrimary: "#E5E4E0",  // Gray 200
  borderSecondary: "#D4D3CE", // Gray 250

  // Button/Tertiary
  btnTertiaryBg: "#FAF9F5",  // Gray 050 (Ivory)
  btnTertiaryFg: "#6B6A63",  // Gray 600
  btnTertiaryBorder: "#E5E4E0", // Gray 200

  // Accents
  clay: "#C46849",
  clayInteractive: "#C6613F",
};

// Icons
const ChevronDown = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const GridIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="11" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="3" y="11" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="11" y="11" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="9" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M13 13L16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const MenuIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 6H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M3 10H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M3 14H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const MoreDotsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="4" cy="10" r="1.5" fill="currentColor"/>
    <circle cx="10" cy="10" r="1.5" fill="currentColor"/>
    <circle cx="16" cy="10" r="1.5" fill="currentColor"/>
  </svg>
);

const ExternalIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 3L3 9M9 3V7M9 3H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Nav Button component (Button/Tertiary style)
const NavButton = ({
  children,
  hasDropdown = false,
  active = false,
}: {
  children: React.ReactNode;
  hasDropdown?: boolean;
  active?: boolean;
}) => {
  return (
    <button
      className={`flex items-center gap-1 text-sm transition-all duration-150 px-4 py-1.5 rounded-full border
        ${active
          ? ''
          : 'hover:text-[#1A1916] hover:border-[#D4D3CE] active:bg-[#EDECE8] active:border-[#1A1916]'
        }`}
      style={{
        fontWeight: 500,
        color: active ? colors.fgPrimary : colors.btnTertiaryFg,
        backgroundColor: colors.btnTertiaryBg,
        borderColor: active ? colors.fgPrimary : colors.btnTertiaryBorder,
      }}
    >
      {children}
      {hasDropdown && <ChevronDown />}
    </button>
  );
};

// Icon Button component with squircle
const IconButton = ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
  <button
    className="transition-all duration-150 flex items-center justify-center hover:bg-[#DCD9CE] active:bg-[#D0CEC4] active:text-[#1A1916]"
    style={{
      color: '#4D4C48',
      backgroundColor: '#E8E6DC',
      width: '36px',
      height: '36px',
      borderRadius: '10px',
      // @ts-expect-error - cornerShape is a newer CSS property
      cornerShape: 'squircle',
    }}
    onClick={onClick}
  >
    {children}
  </button>
);

// Nav Menu Dropdown (for small screens)
const NavMenuDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
          buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        className="transition-all duration-150 flex items-center justify-center border rounded-full hover:bg-[#EDECE8] hover:border-[#D4D3CE] active:bg-[#E5E4E0] active:border-[#1A1916]"
        style={{
          color: colors.fgTertiary,
          backgroundColor: 'transparent',
          borderColor: colors.borderPrimary,
          width: '36px',
          height: '36px',
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <MoreDotsIcon />
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 mt-2 w-40 rounded-xl py-2 z-[100]"
          style={{ backgroundColor: colors.bgPrimary, boxShadow: '0 4px 20px rgba(0,0,0,0.1), 0 0 0 1px ' + colors.borderPrimary }}
        >
          <button
            className="w-full text-left px-4 py-2 text-sm font-medium transition-colors hover:bg-[#EDECE8]"
            style={{ color: colors.fgPrimary }}
            onClick={() => setIsOpen(false)}
          >
            Research
          </button>
          <button
            className="w-full text-left px-4 py-2 text-sm font-medium transition-colors hover:bg-[#EDECE8]"
            style={{ color: colors.fgTertiary }}
            onClick={() => setIsOpen(false)}
          >
            News
          </button>
          <button
            className="w-full text-left px-4 py-2 text-sm font-medium transition-colors hover:bg-[#EDECE8]"
            style={{ color: colors.fgTertiary }}
            onClick={() => setIsOpen(false)}
          >
            Policy
          </button>
        </div>
      )}
    </div>
  );
};

// Try Claude Dropdown
const TryClaudeDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
          buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative">
      <div ref={buttonRef} className="flex items-center gap-3">
        <a
          href="#"
          className="text-sm transition-all duration-150 hover:opacity-70 active:opacity-50"
          style={{ fontWeight: 500, color: colors.fgPrimary }}
        >
          Try Claude
        </a>
        <div style={{ width: '1px', height: '20px', backgroundColor: colors.borderPrimary }} />
        <button
          className="p-1 transition-all duration-150 hover:text-[#1A1916] active:text-[#1A1916]"
          style={{ color: colors.fgTertiary }}
          onClick={() => setIsOpen(!isOpen)}
        >
          <ChevronDown />
        </button>
      </div>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-full right-0 mt-2 w-56 bg-zinc-900 rounded-lg shadow-xl py-2 text-white z-50"
        >
          <div className="px-3 py-1.5 text-xs text-zinc-500 uppercase tracking-wider">Products</div>
          <a href="#" className="flex items-center justify-between px-3 py-2 hover:bg-zinc-800 text-sm">
            Claude <ExternalIcon />
          </a>
          <a href="#" className="flex items-center justify-between px-3 py-2 hover:bg-zinc-800 text-sm">
            Claude Code <ExternalIcon />
          </a>
          <a href="#" className="flex items-center justify-between px-3 py-2 hover:bg-zinc-800 text-sm">
            Claude Developer Platform <ExternalIcon />
          </a>
          <a href="#" className="flex items-center justify-between px-3 py-2 hover:bg-zinc-800 text-sm">
            Pricing <ExternalIcon />
          </a>
          <a href="#" className="flex items-center justify-between px-3 py-2 hover:bg-zinc-800 text-sm">
            Contact sales <ExternalIcon />
          </a>
          <div className="border-t border-zinc-800 my-2" />
          <div className="px-3 py-1.5 text-xs text-zinc-500 uppercase tracking-wider">Models</div>
          <a href="#" className="block px-3 py-2 hover:bg-zinc-800 text-sm">Opus</a>
          <a href="#" className="block px-3 py-2 hover:bg-zinc-800 text-sm">Sonnet</a>
          <a href="#" className="block px-3 py-2 hover:bg-zinc-800 text-sm">Haiku</a>
          <div className="border-t border-zinc-800 my-2" />
          <div className="px-3 py-1.5 text-xs text-zinc-500 uppercase tracking-wider">Login</div>
          <a href="#" className="block px-3 py-2 hover:bg-zinc-800 text-sm">Log in</a>
          <a href="#" className="flex items-center justify-between px-3 py-2 hover:bg-zinc-800 text-sm">
            Claude.ai <ExternalIcon />
          </a>
          <a href="#" className="flex items-center justify-between px-3 py-2 hover:bg-zinc-800 text-sm">
            Claude Console <ExternalIcon />
          </a>
        </div>
      )}
    </div>
  );
};

// Logo
const Logo = ({ panelOpen = false }: { panelOpen?: boolean }) => (
  <>
    <Image
      src="/anthropic-logo-long.svg"
      alt="Anthropic"
      width={222}
      height={25}
      style={{ height: 'auto' }}
      className={panelOpen ? "hidden min-[1360px]:block" : "hidden min-[960px]:block"}
    />
    <Image
      src="/anthropic-logo-short.svg"
      alt="Anthropic"
      width={35}
      height={24}
      style={{ height: 'auto' }}
      className={panelOpen ? "block min-[1360px]:hidden" : "block min-[960px]:hidden"}
    />
  </>
);

// Close Icon
const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 5L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

// Constellation clusters - each cluster is associated with a card
const constellationClusters = [
  // Cluster 0 - associated with first card (Project Fetch - robot dog)
  {
    id: 0,
    nodes: [
      { id: 'c0-0', x: -20, y: 0, size: 4 },
      { id: 'c0-1', x: 0, y: 20, size: 4 },
      { id: 'c0-2', x: 25, y: 5, size: 4 },
      { id: 'c0-3', x: 10, y: -15, size: 4 },
    ],
    edges: [[0, 1], [1, 2], [2, 3], [0, 3]],
    baseX: 80,
    baseY: 220,
  },
  // Cluster 1
  {
    id: 1,
    nodes: [
      { id: 'c1-0', x: 0, y: 0, size: 3 },
      { id: 'c1-1', x: 20, y: -15, size: 3 },
      { id: 'c1-2', x: 40, y: 5, size: 3 },
      { id: 'c1-3', x: 25, y: 20, size: 3 },
    ],
    edges: [[0, 1], [1, 2], [2, 3], [0, 3], [1, 3]],
    baseX: 100,
    baseY: 60,
  },
  // Cluster 2
  {
    id: 2,
    nodes: [
      { id: 'c2-0', x: 0, y: 0, size: 3 },
      { id: 'c2-1', x: 25, y: -10, size: 3 },
      { id: 'c2-2', x: 15, y: 15, size: 3 },
    ],
    edges: [[0, 1], [1, 2], [0, 2]],
    baseX: 200,
    baseY: 50,
  },
  // Cluster 3 - large central cluster
  {
    id: 3,
    nodes: [
      { id: 'c3-0', x: 0, y: 0, size: 3 },
      { id: 'c3-1', x: 25, y: -20, size: 3 },
      { id: 'c3-2', x: 50, y: -5, size: 3 },
      { id: 'c3-3', x: 45, y: 25, size: 3 },
      { id: 'c3-4', x: 20, y: 35, size: 3 },
      { id: 'c3-5', x: -10, y: 20, size: 3 },
    ],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0], [0, 3], [1, 4]],
    baseX: 140,
    baseY: 130,
  },
  // Cluster 4
  {
    id: 4,
    nodes: [
      { id: 'c4-0', x: 0, y: 0, size: 3 },
      { id: 'c4-1', x: 20, y: 15, size: 3 },
      { id: 'c4-2', x: -5, y: 25, size: 3 },
    ],
    edges: [[0, 1], [1, 2], [0, 2]],
    baseX: 60,
    baseY: 100,
  },
  // Cluster 5
  {
    id: 5,
    nodes: [
      { id: 'c5-0', x: 0, y: 0, size: 3 },
      { id: 'c5-1', x: 30, y: 5, size: 3 },
      { id: 'c5-2', x: 15, y: 25, size: 3 },
      { id: 'c5-3', x: 40, y: 30, size: 3 },
    ],
    edges: [[0, 1], [1, 2], [2, 3], [1, 3]],
    baseX: 220,
    baseY: 120,
  },
  // Cluster 6
  {
    id: 6,
    nodes: [
      { id: 'c6-0', x: 0, y: 0, size: 3 },
      { id: 'c6-1', x: 15, y: 20, size: 3 },
      { id: 'c6-2', x: -10, y: 25, size: 3 },
    ],
    edges: [[0, 1], [0, 2]],
    baseX: 65,
    baseY: 180,
  },
  // Cluster 7
  {
    id: 7,
    nodes: [
      { id: 'c7-0', x: 0, y: 0, size: 3 },
      { id: 'c7-1', x: 25, y: -5, size: 3 },
      { id: 'c7-2', x: 35, y: 20, size: 3 },
      { id: 'c7-3', x: 10, y: 25, size: 3 },
    ],
    edges: [[0, 1], [1, 2], [2, 3], [3, 0]],
    baseX: 180,
    baseY: 200,
  },
  // Cluster 8
  {
    id: 8,
    nodes: [
      { id: 'c8-0', x: 0, y: 0, size: 3 },
      { id: 'c8-1', x: 20, y: 15, size: 3 },
    ],
    edges: [[0, 1]],
    baseX: 260,
    baseY: 180,
  },
  // Cluster 9
  {
    id: 9,
    nodes: [
      { id: 'c9-0', x: 0, y: 0, size: 3 },
      { id: 'c9-1', x: 25, y: 10, size: 3 },
      { id: 'c9-2', x: 15, y: -15, size: 3 },
    ],
    edges: [[0, 1], [0, 2], [1, 2]],
    baseX: 120,
    baseY: 240,
  },
  // Cluster 10
  {
    id: 10,
    nodes: [
      { id: 'c10-0', x: 0, y: 0, size: 3 },
      { id: 'c10-1', x: 20, y: -10, size: 3 },
      { id: 'c10-2', x: 30, y: 15, size: 3 },
    ],
    edges: [[0, 1], [1, 2]],
    baseX: 200,
    baseY: 260,
  },
  // Cluster 11
  {
    id: 11,
    nodes: [
      { id: 'c11-0', x: 0, y: 0, size: 3 },
      { id: 'c11-1', x: -15, y: 15, size: 3 },
      { id: 'c11-2', x: 10, y: 25, size: 3 },
    ],
    edges: [[0, 1], [1, 2], [0, 2]],
    baseX: 270,
    baseY: 100,
  },
];

// Scattered dots in a circular pattern
const scatteredDots: Array<{ id: string; x: number; y: number; size: number }> = [];
const centerX = 175;
const centerY = 170;
const numDots = 40;
for (let i = 0; i < numDots; i++) {
  const angle = (i / numDots) * Math.PI * 2 + Math.random() * 0.3;
  const radius = 80 + Math.random() * 100;
  scatteredDots.push({
    id: `dot-${i}`,
    x: centerX + Math.cos(angle) * radius,
    y: centerY + Math.sin(angle) * radius,
    size: 2.5,
  });
}

// Related content data
const relatedContent = [
  {
    id: 1,
    title: "Project Fetch: Can Claude train a robot dog?",
    category: "POLICY",
    date: "Nov 12, 2025",
  },
  {
    id: 2,
    title: "From shortcuts to sabotage: natural emergent misalignment from reward hacking",
    category: "ALIGNMENT",
    date: "Nov 21, 2025",
  },
  {
    id: 3,
    title: "Signs of introspection in large language models",
    category: "INTERPRETABILITY",
    date: "Oct 28, 2025",
  },
  {
    id: 4,
    title: "Preparing for AI's economic impact: exploring policy responses",
    category: "POLICY",
    date: "Oct 14, 2025",
  },
  {
    id: 5,
    title: "A small number of samples can poison LLMs of any size",
    category: "ALIGNMENT",
    date: "Oct 9, 2025",
  },
  {
    id: 6,
    title: "Petri: An open-source auditing tool to accelerate AI safety research",
    category: "ALIGNMENT",
    date: "Oct 6, 2025",
  },
  {
    id: 7,
    title: "Building AI for cyber defenders",
    category: "POLICY",
    date: "Oct 3, 2025",
  },
  {
    id: 8,
    title: "Anthropic Economic Index report: Uneven geographic and enterprise AI adoption",
    category: "ECONOMIC RESEARCH",
    date: "Sep 15, 2025",
  },
  {
    id: 9,
    title: "Anthropic Education Report: How educators use Claude",
    category: "SOCIETAL IMPACTS",
    date: "Aug 26, 2025",
  },
  {
    id: 10,
    title: "Claude Opus 4 and 4.1 can now end a rare subset of conversations",
    category: "ALIGNMENT",
    date: "Aug 15, 2025",
  },
  {
    id: 11,
    title: "Persona vectors: Monitoring and controlling character traits in language models",
    category: "INTERPRETABILITY",
    date: "Aug 1, 2025",
  },
  {
    id: 12,
    title: "Project Vend: Can Claude run a small shop? (And why does that matter?)",
    category: "POLICY",
    date: "Jun 27, 2025",
  },
];

// Constellation Visualization Component
const Constellation = ({ hoveredCard }: { hoveredCard: number | null }) => {
  const [hoveredCluster, setHoveredCluster] = useState<number | null>(null);

  const activeHover = hoveredCard !== null ? hoveredCard : hoveredCluster;
  const svgCenter = { x: 175, y: 170 };

  // Calculate position for a cluster - when hovered, zoom in; when another is hovered, push to outer ring
  const getClusterTransform = (cluster: typeof constellationClusters[0], index: number) => {
    if (activeHover === null) {
      return { x: cluster.baseX, y: cluster.baseY, scale: 1, opacity: 1 };
    }

    if (activeHover === index) {
      // This cluster is hovered - move to center and scale up
      return { x: svgCenter.x - 20, y: svgCenter.y - 10, scale: 1.8, opacity: 1 };
    }

    // Another cluster is hovered - push slightly outward
    const angle = Math.atan2(cluster.baseY - svgCenter.y, cluster.baseX - svgCenter.x);
    const currentRadius = Math.sqrt(Math.pow(cluster.baseX - svgCenter.x, 2) + Math.pow(cluster.baseY - svgCenter.y, 2));
    const outerRadius = currentRadius * 1.25;
    return {
      x: svgCenter.x + Math.cos(angle) * outerRadius,
      y: svgCenter.y + Math.sin(angle) * outerRadius,
      scale: 0.85,
      opacity: 0.3,
    };
  };

  // Calculate dot position - when hovering, push dots slightly outward
  const getDotTransform = (dot: typeof scatteredDots[0]) => {
    if (activeHover === null) {
      return { x: dot.x, y: dot.y, opacity: 0.5 };
    }

    // Push dots slightly outward
    const angle = Math.atan2(dot.y - svgCenter.y, dot.x - svgCenter.x);
    const currentRadius = Math.sqrt(Math.pow(dot.x - svgCenter.x, 2) + Math.pow(dot.y - svgCenter.y, 2));
    const outerRadius = currentRadius * 1.2;
    return {
      x: svgCenter.x + Math.cos(angle) * outerRadius,
      y: svgCenter.y + Math.sin(angle) * outerRadius,
      opacity: 0.2,
    };
  };

  return (
    <svg width="100%" height="340" viewBox="0 0 350 340" className="overflow-visible">
      {/* Draw scattered dots */}
      {scatteredDots.map((dot) => {
        const transform = getDotTransform(dot);
        const offsetX = transform.x - dot.x;
        const offsetY = transform.y - dot.y;
        return (
          <circle
            key={dot.id}
            cx={dot.x}
            cy={dot.y}
            r={dot.size}
            fill={colors.fgTertiary}
            style={{
              transform: `translate(${offsetX}px, ${offsetY}px)`,
              opacity: transform.opacity,
              transition: 'transform 500ms cubic-bezier(0.16, 1, 0.3, 1), opacity 300ms ease',
            }}
          />
        );
      })}

      {/* Draw clusters */}
      {constellationClusters.map((cluster, clusterIndex) => {
        const transform = getClusterTransform(cluster, clusterIndex);
        const isActive = activeHover === clusterIndex;

        // Calculate bounding box for hit area
        const minX = Math.min(...cluster.nodes.map(n => n.x)) - 15;
        const maxX = Math.max(...cluster.nodes.map(n => n.x)) + 15;
        const minY = Math.min(...cluster.nodes.map(n => n.y)) - 15;
        const maxY = Math.max(...cluster.nodes.map(n => n.y)) + 15;

        return (
          <g
            key={cluster.id}
            style={{
              transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
              transformOrigin: '0 0',
              transition: 'transform 500ms cubic-bezier(0.16, 1, 0.3, 1), opacity 300ms ease',
              opacity: transform.opacity,
              cursor: 'pointer',
            }}
            onMouseEnter={() => setHoveredCluster(clusterIndex)}
            onMouseLeave={() => setHoveredCluster(null)}
          >
            {/* Invisible hit area */}
            <rect
              x={minX}
              y={minY}
              width={maxX - minX}
              height={maxY - minY}
              fill="transparent"
              rx={8}
            />
            {/* Draw edges */}
            {cluster.edges.map(([fromIdx, toIdx], edgeIndex) => {
              const from = cluster.nodes[fromIdx];
              const to = cluster.nodes[toIdx];
              return (
                <line
                  key={`edge-${edgeIndex}`}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke={isActive ? colors.fgPrimary : colors.fgTertiary}
                  strokeWidth={isActive ? 1 : 0.75}
                />
              );
            })}
            {/* Draw nodes */}
            {cluster.nodes.map((node) => (
              <circle
                key={node.id}
                cx={node.x}
                cy={node.y}
                r={node.size}
                fill={isActive ? colors.fgPrimary : colors.fgTertiary}
              />
            ))}
          </g>
        );
      })}
    </svg>
  );
};

// Connections Panel Component
const ConnectionsPanel = ({
  isOpen,
  onClose,
  keyword,
}: {
  isOpen: boolean;
  onClose: () => void;
  keyword: string;
}) => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setVisible(true);
        });
      });
    } else {
      setVisible(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed top-0 right-0 h-full z-50 overflow-y-auto"
      style={{
        width: '400px',
        backgroundColor: '#F0EEE6',
        transform: visible ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 400ms cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Header */}
      <div className="px-6 pt-4 min-[960px]:px-8 min-[960px]:pt-8 pb-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <p className="text-sm mb-1" style={{ color: colors.fgTertiary }}>
              Explore the connections:
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xl font-medium" style={{ color: colors.fgPrimary, fontFamily: "'Anthropic Serif', serif" }}>
                "{keyword}"
              </span>
              <span
                className="px-2 py-0.5 rounded-full border"
                style={{ fontSize: '11px', borderColor: colors.borderPrimary, color: colors.fgTertiary }}
              >
                12 POSTS
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="transition-colors flex items-center justify-center"
            style={{
              color: colors.fgTertiary,
              backgroundColor: colors.bgTertiary,
              width: '36px',
              height: '36px',
              borderRadius: '10px',
            }}
          >
            <CloseIcon />
          </button>
        </div>
        <p className="text-xs" style={{ color: colors.fgTertiary }}>
          powered by <span className="font-semibold" style={{ color: colors.fgPrimary, fontFamily: "'Anthropic Serif', serif" }}>Claude</span>
        </p>
      </div>

      {/* Constellation */}
      <div className="px-6 py-4">
        <Constellation hoveredCard={hoveredCard} />
      </div>

      {/* Related Content */}
      <div className="p-6">
        <div className="flex flex-col gap-2">
          {relatedContent.map((item, index) => {
            const isSelected = index === 0;
            const isHighlighted = hoveredCard === index || isSelected;
            return (
              <div
                key={item.id}
                className="cursor-pointer transition-all duration-200 p-4 rounded-2xl"
                style={{
                  backgroundColor: isHighlighted ? colors.bgPrimary : 'transparent',
                  boxShadow: isHighlighted ? '0 0 0 1px ' + colors.borderPrimary : 'none',
                }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <h3
                  className="text-sm font-medium mb-3 leading-snug"
                  style={{ color: colors.fgPrimary }}
                >
                  {item.title}
                </h3>
                <div className="flex items-center gap-2">
                  <span
                    className="px-2 py-0.5 rounded-full border transition-colors duration-200"
                    style={{
                      fontSize: '11px',
                      borderColor: isHighlighted ? '#C4C7A6' : colors.borderPrimary,
                      backgroundColor: isHighlighted ? '#E8EACE' : 'transparent',
                      color: isHighlighted ? '#5C5F45' : colors.fgTertiary,
                    }}
                  >
                    {item.category}
                  </span>
                  {item.date && (
                    <span className="text-xs" style={{ color: colors.fgTertiary }}>
                      {item.date}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Stagger animation helper
const StaggerItem = ({
  children,
  index,
  mounted
}: {
  children: React.ReactNode;
  index: number;
  mounted: boolean;
}) => (
  <div
    style={{
      opacity: mounted ? 1 : 0,
      transform: mounted ? 'translateY(0)' : 'translateY(-100px)',
      transition: `opacity 450ms cubic-bezier(0.16, 1, 0.3, 1) ${index * 50}ms, transform 450ms cubic-bezier(0.16, 1, 0.3, 1) ${index * 50}ms`,
    }}
  >
    {children}
  </div>
);

export default function NavPage() {
  const [mounted, setMounted] = useState(false);
  const [connectionsPanelOpen, setConnectionsPanelOpen] = useState(false);
  const [articleHovered, setArticleHovered] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen flex" style={{ fontFamily: "'Anthropic Sans', sans-serif", backgroundColor: colors.bgPrimary }}>
      {/* Main Content */}
      <div
        className="flex-1 min-h-screen transition-all duration-400"
        style={{
          marginRight: connectionsPanelOpen ? '400px' : '0',
          transition: 'margin-right 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onClick={() => connectionsPanelOpen && setConnectionsPanelOpen(false)}
      >
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between px-8 py-6 min-[960px]:px-20 min-[960px]:py-8">
        {/* Left - Nav Items */}
        <div className="flex items-center gap-3 flex-1">
          {/* Very small screens: Logo on left */}
          <div className={connectionsPanelOpen ? "min-[880px]:hidden" : "min-[480px]:hidden"}>
            <StaggerItem index={0} mounted={mounted}>
              <Logo panelOpen={connectionsPanelOpen} />
            </StaggerItem>
          </div>
          {/* Mobile: 3-dot menu */}
          <div className={connectionsPanelOpen ? "min-[1040px]:hidden" : "min-[640px]:hidden"}>
            <StaggerItem index={1} mounted={mounted}><NavMenuDropdown /></StaggerItem>
          </div>
          {/* Desktop: Nav buttons */}
          <div className={connectionsPanelOpen ? "hidden min-[1040px]:flex items-center gap-2" : "hidden min-[640px]:flex items-center gap-2"}>
            <StaggerItem index={1} mounted={mounted}><NavButton active>Research</NavButton></StaggerItem>
            <StaggerItem index={2} mounted={mounted}><NavButton>News</NavButton></StaggerItem>
            <StaggerItem index={3} mounted={mounted}><NavButton>Policy</NavButton></StaggerItem>
          </div>
        </div>

        {/* Center - Logo (hidden on very small screens) */}
        <div className={connectionsPanelOpen ? "hidden min-[880px]:block" : "hidden min-[480px]:block"}>
          <StaggerItem index={0} mounted={mounted}>
            <div className="flex-shrink-0">
              <Logo panelOpen={connectionsPanelOpen} />
            </div>
          </StaggerItem>
        </div>

        {/* Right - Try Claude + Icons */}
        <div className="flex items-center gap-4 flex-1 justify-end">
          <div className={connectionsPanelOpen ? "hidden min-[1040px]:block" : "hidden min-[640px]:block"}>
            <StaggerItem index={4} mounted={mounted}><TryClaudeDropdown /></StaggerItem>
          </div>
          <div className="flex items-center gap-2">
            <StaggerItem index={5} mounted={mounted}><IconButton><GridIcon /></IconButton></StaggerItem>
            <StaggerItem index={6} mounted={mounted}><IconButton><SearchIcon /></IconButton></StaggerItem>
            <StaggerItem index={7} mounted={mounted}><IconButton><MenuIcon /></IconButton></StaggerItem>
          </div>
        </div>
      </nav>

      {/* Article Content */}
      <article
        className="max-w-[720px] mx-auto px-6 pt-16"
        style={{ fontFamily: "'Anthropic Serif', serif" }}
        onMouseEnter={() => setArticleHovered(true)}
        onMouseLeave={() => setArticleHovered(false)}
      >
        <div className="relative">
          {/* Drop Cap */}
          <span
            className="float-left text-[5.5rem] leading-[0.8] mr-3 mt-3 transition-opacity duration-200"
            style={{ color: colors.fgPrimary, fontWeight: 400, opacity: (articleHovered || connectionsPanelOpen) ? 0.6 : 1 }}
          >
            G
          </span>
          <p
            className="text-xl leading-relaxed mb-8 transition-opacity duration-200"
            style={{ color: colors.fgPrimary, opacity: (articleHovered || connectionsPanelOpen) ? 0.6 : 1 }}
          >
            athered around a table in a warehouse, looking at computer screens with code that refused to work, with no access to their trusted AI assistant Claude, our volunteer researchers their trusted AI assistant Claude, our volunteer researchers did not expect to be attacked by a four-legged robot.
          </p>
        </div>

        <p className="text-xl leading-relaxed mb-8">
          <span
            className="transition-opacity duration-200"
            style={{ color: colors.fgPrimary, opacity: (articleHovered || connectionsPanelOpen) ? 0.6 : 1 }}
          >
            Yet as the mechanical whirring and rubberized footfalls grew louder, the humans startled. They had been trying, without success, to establish a connection between their computers and a robotic quadruped—a "
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setConnectionsPanelOpen(!connectionsPanelOpen);
            }}
            className="underline decoration-1 underline-offset-2"
            style={{ color: colors.fgPrimary, cursor: 'pointer' }}
          >
            robodog
          </button>
          <span
            className="transition-opacity duration-200"
            style={{ color: colors.fgPrimary, opacity: (articleHovered || connectionsPanelOpen) ? 0.6 : 1 }}
          >
            ." Meanwhile, the competing team on the other side of the room had long since done so and were now controlling their robot with a program largely written by Claude. But in an all-too-human error of arithmetic, Team Claude had instructed their robodog to move forward at a speed of one meter per second for five seconds—failing to realize that less than five meters away was the table with the other team.
          </span>
        </p>

        <p
          className="text-xl leading-relaxed mb-8 transition-opacity duration-200"
          style={{ color: colors.fgPrimary, opacity: (articleHovered || connectionsPanelOpen) ? 0.6 : 1 }}
        >
          The robot did as it was instructed, careening toward the hapless coders. The event's organizer managed to grab hold of the robot and power it off before any damage was done to robots, tables, or human limbs. The morale of the inadvertently targeted team, however, did not escape unscathed.
        </p>

        <p
          className="text-xl leading-relaxed mb-8 transition-opacity duration-200"
          style={{ color: colors.fgPrimary, opacity: (articleHovered || connectionsPanelOpen) ? 0.6 : 1 }}
        >
          At this point, you might be asking… What were we doing?
        </p>
      </article>

      </div>

      {/* Connections Panel */}
      <ConnectionsPanel
        isOpen={connectionsPanelOpen}
        onClose={() => setConnectionsPanelOpen(false)}
        keyword="robodog"
      />
    </div>
  );
}
