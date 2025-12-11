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

// Category tag colors
const categoryColors: Record<string, string> = {
  "POLICY": "#788C5D",
  "ALIGNMENT": "#788C5D",
  "INTERPRETABILITY": "#6A9BCC",
  "ECONOMIC RESEARCH": "#C46686",
  "SOCIETAL IMPACTS": "#C46686",
};

const getCategoryColor = (category: string): string => {
  return categoryColors[category] || "#5E5D59";
};

// Icons
const ChevronDown = () => (
  <Image src="/icons/Caret Down Small.svg" alt="" width={20} height={20} />
);

const ClaudificationIcon = () => (
  <Image src="/icons/Claudification.svg" alt="" width={20} height={20} />
);

const SearchIcon = () => (
  <Image src="/icons/Search.svg" alt="" width={20} height={20} />
);

const MenuIcon = () => (
  <Image src="/icons/Menu - 24.svg" alt="" width={24} height={24} />
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
  <Image src="/icons/X.svg" alt="" width={20} height={20} />
);

// Main active constellation - 12 nodes arranged in a cluster, each node = one list item
// Positioned in the left area of the SVG
const activeConstellationNodes = [
  { id: 0, x: 45, y: 200 },   // Item 1
  { id: 1, x: 70, y: 175 },   // Item 2
  { id: 2, x: 55, y: 235 },   // Item 3
  { id: 3, x: 85, y: 215 },   // Item 4
  { id: 4, x: 30, y: 220 },   // Item 5
  { id: 5, x: 60, y: 250 },   // Item 6
  { id: 6, x: 95, y: 190 },   // Item 7
  { id: 7, x: 40, y: 260 },   // Item 8
  { id: 8, x: 75, y: 265 },   // Item 9
  { id: 9, x: 100, y: 240 },  // Item 10
  { id: 10, x: 25, y: 245 },  // Item 11
  { id: 11, x: 110, y: 220 }, // Item 12
];

// Edges connecting the active constellation nodes
const activeConstellationEdges: [number, number][] = [
  [0, 1], [0, 2], [0, 4], [1, 6], [2, 3], [2, 5], [3, 9], [4, 10], [5, 7], [5, 8], [7, 10], [8, 9], [3, 11], [6, 11]
];

// All background nodes in one pool
const backgroundNodes = [
  // Top area cluster 1
  { x: 120, y: 45 }, { x: 145, y: 30 }, { x: 155, y: 55 },
  // Top area cluster 2
  { x: 200, y: 50 }, { x: 225, y: 35 }, { x: 240, y: 60 },
  // Top right
  { x: 290, y: 55 }, { x: 310, y: 40 }, { x: 320, y: 65 },
  // Right side upper
  { x: 300, y: 100 }, { x: 325, y: 85 }, { x: 330, y: 115 },
  // Right side mid
  { x: 310, y: 160 }, { x: 335, y: 150 }, { x: 330, y: 180 },
  // Right side lower
  { x: 295, y: 220 }, { x: 320, y: 210 }, { x: 310, y: 245 },
  // Center upper
  { x: 160, y: 100 }, { x: 185, y: 85 }, { x: 200, y: 110 }, { x: 175, y: 125 },
  // Center mid-right
  { x: 240, y: 120 }, { x: 265, y: 105 }, { x: 270, y: 135 },
  // Center
  { x: 150, y: 160 }, { x: 175, y: 145 }, { x: 190, y: 170 },
  // Center lower-right
  { x: 230, y: 180 }, { x: 255, y: 165 }, { x: 260, y: 195 }, { x: 235, y: 210 },
  // Bottom center
  { x: 155, y: 230 }, { x: 180, y: 215 }, { x: 195, y: 240 },
  // Bottom right
  { x: 230, y: 265 }, { x: 255, y: 250 }, { x: 265, y: 280 },
  // Bottom far right
  { x: 290, y: 285 }, { x: 315, y: 270 }, { x: 320, y: 300 },
  // Left side upper
  { x: 80, y: 90 }, { x: 105, y: 75 }, { x: 115, y: 105 },
  // Left side mid
  { x: 120, y: 150 }, { x: 145, y: 135 },
  // Bottom left
  { x: 135, y: 285 }, { x: 160, y: 295 }, { x: 150, y: 320 },
];

// Edges - mostly within clusters, only 2-3 cross-cluster connections
const backgroundEdges: [number, number][] = [
  // Cluster 1 (top left)
  [0, 1], [1, 2], [0, 2],
  // Cluster 2 (top center)
  [3, 4], [4, 5], [3, 5],
  // Cluster 3 (top right)
  [6, 7], [7, 8],
  // Cluster 4 (right upper)
  [9, 10], [10, 11], [9, 11],
  // Cluster 5 (right mid)
  [12, 13], [13, 14],
  // Cluster 6 (right lower)
  [15, 16], [16, 17], [15, 17],
  // Cluster 7 (center upper)
  [18, 19], [19, 20], [20, 21], [21, 18], [18, 20],
  // Cluster 8 (center mid-right)
  [22, 23], [23, 24], [22, 24],
  // Cluster 9 (center)
  [25, 26], [26, 27],
  // Cluster 10 (center lower-right)
  [28, 29], [29, 30], [30, 31], [28, 31],
  // Cluster 11 (bottom center)
  [32, 33], [33, 34], [32, 34],
  // Cluster 12 (bottom right)
  [35, 36], [36, 37],
  // Cluster 13 (bottom far right)
  [38, 39], [39, 40], [38, 40],
  // Cluster 14 (left upper)
  [41, 42], [42, 43], [41, 43],
  // Cluster 15 (left mid)
  [44, 45],
  // Cluster 16 (bottom left)
  [46, 47], [47, 48],
  // Only a few cross-cluster connections
  [2, 3],    // top left to top center
  [20, 22],  // center upper to center mid-right
  [31, 35],  // center lower-right to bottom right
];

// Scattered dots spread throughout
const scatteredDots: Array<{ id: string; x: number; y: number; size: number }> = [];
const dotPositions = [
  // Outer ring
  { x: 25, y: 50 }, { x: 60, y: 35 }, { x: 95, y: 25 }, { x: 175, y: 20 }, { x: 270, y: 25 },
  { x: 330, y: 50 }, { x: 345, y: 100 }, { x: 350, y: 150 }, { x: 345, y: 200 }, { x: 340, y: 280 },
  { x: 320, y: 320 }, { x: 250, y: 330 }, { x: 180, y: 325 }, { x: 100, y: 320 }, { x: 40, y: 300 },
  { x: 20, y: 250 }, { x: 15, y: 180 }, { x: 20, y: 120 }, { x: 25, y: 80 },
  // Mid ring
  { x: 55, y: 70 }, { x: 130, y: 60 }, { x: 260, y: 75 }, { x: 310, y: 130 },
  { x: 325, y: 210 }, { x: 295, y: 300 }, { x: 200, y: 305 }, { x: 120, y: 295 },
  { x: 35, y: 270 }, { x: 30, y: 160 },
  // Inner scattered
  { x: 135, y: 135 }, { x: 250, y: 100 }, { x: 280, y: 180 }, { x: 240, y: 240 },
  { x: 170, y: 280 }, { x: 105, y: 180 }, { x: 190, y: 140 },
];

dotPositions.forEach((pos, i) => {
  scatteredDots.push({ id: `dot-${i}`, x: pos.x, y: pos.y, size: 2.5 });
});

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
const Constellation = ({
  activeIndex,
  onHoverIndex,
}: {
  activeIndex: number | null;
  onHoverIndex: (index: number | null) => void;
}) => {
  return (
    <svg width="100%" height="340" viewBox="0 0 350 340" className="overflow-visible">
      {/* Draw scattered dots */}
      {scatteredDots.map((dot) => (
        <circle
          key={dot.id}
          cx={dot.x}
          cy={dot.y}
          r={dot.size}
          fill={colors.fgTertiary}
          opacity={0.4}
        />
      ))}

      {/* Draw background constellation edges */}
      {backgroundEdges.map(([fromIdx, toIdx], edgeIndex) => {
        const from = backgroundNodes[fromIdx];
        const to = backgroundNodes[toIdx];
        return (
          <line
            key={`bg-edge-${edgeIndex}`}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke={colors.fgTertiary}
            strokeWidth={0.75}
          />
        );
      })}

      {/* Draw background constellation nodes */}
      {backgroundNodes.map((node, nIdx) => (
        <circle
          key={`bg-node-${nIdx}`}
          cx={node.x}
          cy={node.y}
          r={3}
          fill={colors.fgTertiary}
        />
      ))}

      {/* Draw active constellation edges (darker) */}
      {activeConstellationEdges.map(([fromIdx, toIdx], edgeIndex) => {
        const from = activeConstellationNodes[fromIdx];
        const to = activeConstellationNodes[toIdx];
        return (
          <line
            key={`active-edge-${edgeIndex}`}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke={colors.fgPrimary}
            strokeWidth={1}
          />
        );
      })}

      {/* Draw active constellation nodes (interactive, each = list item) */}
      {activeConstellationNodes.map((node, index) => {
        const isHovered = activeIndex === index;
        return (
          <circle
            key={`active-node-${index}`}
            cx={node.x}
            cy={node.y}
            r={isHovered ? 5 : 4}
            fill={colors.fgPrimary}
            style={{ cursor: 'pointer', transition: 'r 150ms ease' }}
            onMouseEnter={() => onHoverIndex(index)}
            onMouseLeave={() => onHoverIndex(null)}
          />
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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
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
      <div className="p-8 pb-0">
        <div className="flex items-start justify-between mb-2">
          <div>
            <p style={{ fontSize: '20px', lineHeight: '24px', color: '#141413', fontFamily: "'Anthropic Sans', sans-serif" }}>
              Explore the connections:
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xl font-medium italic" style={{ color: colors.fgPrimary, fontFamily: "'Anthropic Serif', serif" }}>
                &ldquo;{keyword}&rdquo;
              </span>
              <span
                className="px-3 pt-1 pb-0.5 rounded-full border inline-flex items-center leading-tight"
                style={{ fontSize: '11px', borderColor: '#DEDCD1', color: '#5E5D59', fontFamily: "'Anthropic Mono', monospace" }}
              >
                12 POSTS
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="transition-colors flex items-center justify-center cursor-pointer"
            style={{
              color: '#4D4C48',
              backgroundColor: '#E8E6DC',
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              // @ts-expect-error - cornerShape is a newer CSS property
              cornerShape: 'squircle',
            }}
          >
            <CloseIcon />
          </button>
        </div>
        <p className="flex items-baseline gap-1.5" style={{ color: '#5E5D59' }}>
          <span style={{ fontSize: '10px', lineHeight: '18px', fontFamily: "'Anthropic Sans', sans-serif" }}>powered by</span>
          <span style={{ fontSize: '20px', lineHeight: '24px', fontFamily: "'Anthropic Serif', serif" }}>Claude</span>
        </p>
      </div>

      {/* Constellation */}
      <div className="px-8 py-8">
        <Constellation activeIndex={hoveredIndex} onHoverIndex={setHoveredIndex} />
      </div>

      {/* Related Content */}
      <div className="px-8 pb-8">
        <div className="flex flex-col gap-2">
          {relatedContent.map((item, index) => {
            const isSelected = index === 0;
            const isHighlighted = hoveredIndex === index || isSelected;
            return (
              <div
                key={item.id}
                className="cursor-pointer transition-all duration-200 p-4 rounded-2xl"
                style={{
                  backgroundColor: isHighlighted ? colors.bgPrimary : 'transparent',
                  boxShadow: isHighlighted ? '0 0 0 1px ' + colors.borderPrimary : 'none',
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <h3
                  className="text-sm font-medium mb-3 leading-snug"
                  style={{ color: colors.fgPrimary }}
                >
                  {item.title}
                </h3>
                <div className="flex items-center gap-2">
                  <span
                    className="px-3 pt-1 pb-0.5 rounded-full border transition-colors duration-200 inline-flex items-center leading-tight"
                    style={{
                      fontSize: '11px',
                      fontFamily: "'Anthropic Mono', monospace",
                      borderColor: isHighlighted ? getCategoryColor(item.category) : '#DEDCD1',
                      color: isHighlighted ? getCategoryColor(item.category) : '#5E5D59',
                    }}
                  >
                    {item.category}
                  </span>
                  {item.date && isHighlighted && (
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

      {/* Footer with counts */}
      <div
        className="sticky bottom-0 px-8 py-8 flex items-center justify-between"
        style={{ backgroundColor: '#F0EEE6' }}
      >
        <span style={{ fontSize: '11px', color: colors.fgTertiary, fontFamily: "'Anthropic Mono', monospace" }}>
          15 PAPERS
        </span>
        <span style={{ fontSize: '11px', color: colors.fgTertiary, fontFamily: "'Anthropic Mono', monospace" }}>
          43 ARTICLES
        </span>
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
  const [robodogHovered, setRobodogHovered] = useState(false);

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
            <StaggerItem index={5} mounted={mounted}><IconButton><ClaudificationIcon /></IconButton></StaggerItem>
            <StaggerItem index={6} mounted={mounted}><IconButton><SearchIcon /></IconButton></StaggerItem>
            <StaggerItem index={7} mounted={mounted}><IconButton><MenuIcon /></IconButton></StaggerItem>
          </div>
        </div>
      </nav>

      {/* Article Content */}
      <article
        className="max-w-[720px] mx-auto px-6 pt-16"
        style={{ fontFamily: "'Anthropic Serif', serif" }}
      >
        <div className="relative">
          {/* Drop Cap */}
          <span
            className="float-left text-[5.5rem] leading-[0.8] mr-3 mt-3 transition-opacity duration-200"
            style={{ color: colors.fgPrimary, fontWeight: 400, opacity: (robodogHovered || connectionsPanelOpen) ? 0.6 : 1 }}
          >
            G
          </span>
          <p
            className="text-xl leading-relaxed mb-8 transition-opacity duration-200"
            style={{ color: colors.fgPrimary, opacity: (robodogHovered || connectionsPanelOpen) ? 0.6 : 1 }}
          >
            athered around a table in a warehouse, looking at computer screens with code that refused to work, with no access to their trusted AI assistant Claude, our volunteer researchers their trusted AI assistant Claude, our volunteer researchers did not expect to be attacked by a four-legged robot.
          </p>
        </div>

        <p className="text-xl leading-relaxed mb-8">
          <span
            className="transition-opacity duration-200"
            style={{ color: colors.fgPrimary, opacity: (robodogHovered || connectionsPanelOpen) ? 0.6 : 1 }}
          >
            Yet as the mechanical whirring and rubberized footfalls grew louder, the humans startled. They had been trying, without success, to establish a connection between their computers and a robotic quadruped—a "
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setConnectionsPanelOpen(!connectionsPanelOpen);
            }}
            onMouseEnter={() => setRobodogHovered(true)}
            onMouseLeave={() => setRobodogHovered(false)}
            className="underline decoration-1 underline-offset-2"
            style={{ color: colors.fgPrimary, cursor: 'pointer' }}
          >
            robodog
          </button>
          <span
            className="transition-opacity duration-200"
            style={{ color: colors.fgPrimary, opacity: (robodogHovered || connectionsPanelOpen) ? 0.6 : 1 }}
          >
            ." Meanwhile, the competing team on the other side of the room had long since done so and were now controlling their robot with a program largely written by Claude. But in an all-too-human error of arithmetic, Team Claude had instructed their robodog to move forward at a speed of one meter per second for five seconds—failing to realize that less than five meters away was the table with the other team.
          </span>
        </p>

        <p
          className="text-xl leading-relaxed mb-8 transition-opacity duration-200"
          style={{ color: colors.fgPrimary, opacity: (robodogHovered || connectionsPanelOpen) ? 0.6 : 1 }}
        >
          The robot did as it was instructed, careening toward the hapless coders. The event's organizer managed to grab hold of the robot and power it off before any damage was done to robots, tables, or human limbs. The morale of the inadvertently targeted team, however, did not escape unscathed.
        </p>

        <p
          className="text-xl leading-relaxed mb-8 transition-opacity duration-200"
          style={{ color: colors.fgPrimary, opacity: (robodogHovered || connectionsPanelOpen) ? 0.6 : 1 }}
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
