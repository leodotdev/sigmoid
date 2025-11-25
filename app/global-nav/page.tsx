"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

// Types for configuration
interface NavConfig {
  // Logo
  logoPosition: "left" | "center";
  logoType: "long" | "short";

  // Left nav items
  showResearch: boolean;
  showNews: boolean;
  showMore: boolean;

  // Right side
  showTryClaude: boolean;
  tryClaudeStyle: "filled-pill" | "filled-squircle" | "outlined-pill" | "outlined-squircle" | "ghost";
  tryClaudePosition: "left" | "right";
  showGridIcon: boolean;
  showSearchIcon: boolean;
  showMenuIcon: boolean;

  // Layout
  navLayout: "spread" | "compact" | "logo-left-nav-center" | "logo-left-nav-right";
}

interface MenuConfig {
  // Drawer position and size
  position: "top" | "right";
  drawerSize: "large" | "medium";

  // Content layout
  contentLayout: "list-left" | "list-right" | "horizontal" | "centered";
  showFooterLinks: boolean;

  // Animation
  animation: "slide" | "fade" | "scale";
  staggerItems: boolean;
  staggerDelay: number; // ms between each item
  animationDuration: number; // ms
}

// Icons
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

const ChevronDown = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 5L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const ExternalIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 3L3 9M9 3V7M9 3H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Logo components
const LogoLong = ({ className = "" }: { className?: string }) => (
  <Image
    src="/anthropic-logo-long.svg"
    alt="Anthropic"
    width={222}
    height={25}
    className={className}
    style={{ height: 'auto' }}
  />
);

const LogoShort = ({ className = "" }: { className?: string }) => (
  <Image
    src="/anthropic-logo-short.svg"
    alt="Anthropic"
    width={35}
    height={24}
    className={className}
    style={{ height: 'auto' }}
  />
);

// Nav Button component
const NavButton = ({
  children,
  hasDropdown = false,
  variant = "outlined"
}: {
  children: React.ReactNode;
  hasDropdown?: boolean;
  variant?: "outlined" | "filled";
}) => {
  const baseClasses = "flex items-center gap-1 text-sm font-medium transition-colors px-4 py-1.5 rounded-full";
  const variantClasses = variant === "filled"
    ? "bg-zinc-900 text-white hover:bg-zinc-800"
    : "border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50";

  return (
    <button className={`${baseClasses} ${variantClasses}`}>
      {children}
      {hasDropdown && <ChevronDown />}
    </button>
  );
};

// Icon Button component
const IconButton = ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
  <button
    className="p-2 rounded-lg hover:bg-zinc-100 transition-colors text-zinc-600 hover:text-zinc-900"
    onClick={onClick}
  >
    {children}
  </button>
);

// Global Nav Component
const GlobalNav = ({
  config,
  onMenuOpen
}: {
  config: NavConfig;
  onMenuOpen: () => void;
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const renderLogo = () => {
    const Logo = config.logoType === "long" ? LogoLong : LogoShort;
    return <Logo className="dark:invert" />;
  };

  const renderNavItems = () => (
    <div className="flex items-center gap-2">
      {config.showResearch && (
        <NavButton>Research</NavButton>
      )}
      {config.showNews && (
        <NavButton>News</NavButton>
      )}
      {config.showMore && (
        <NavButton hasDropdown>More</NavButton>
      )}
    </div>
  );

  const renderTryClaude = () => {
    if (!config.showTryClaude) return null;

    const dropdownContent = (
      <div className="absolute top-full left-0 mt-1 w-56 bg-zinc-900 rounded-lg shadow-xl py-2 text-white z-50">
        <div className="px-3 py-1 text-xs text-zinc-500 uppercase tracking-wider">Products</div>
        <a href="#" className="flex items-center justify-between px-3 py-2 hover:bg-zinc-800">
          Claude <ExternalIcon />
        </a>
        <a href="#" className="flex items-center justify-between px-3 py-2 hover:bg-zinc-800">
          Claude Code <ExternalIcon />
        </a>
        <a href="#" className="flex items-center justify-between px-3 py-2 hover:bg-zinc-800">
          Claude Developer Platform <ExternalIcon />
        </a>
        <a href="#" className="flex items-center justify-between px-3 py-2 hover:bg-zinc-800">
          Pricing <ExternalIcon />
        </a>
        <a href="#" className="flex items-center justify-between px-3 py-2 hover:bg-zinc-800">
          Contact sales <ExternalIcon />
        </a>
        <div className="border-t border-zinc-800 my-2" />
        <div className="px-3 py-1 text-xs text-zinc-500 uppercase tracking-wider">Models</div>
        <a href="#" className="block px-3 py-2 hover:bg-zinc-800">Opus</a>
        <a href="#" className="block px-3 py-2 hover:bg-zinc-800">Sonnet</a>
        <a href="#" className="block px-3 py-2 hover:bg-zinc-800">Haiku</a>
        <div className="border-t border-zinc-800 my-2" />
        <div className="px-3 py-1 text-xs text-zinc-500 uppercase tracking-wider">Login</div>
        <a href="#" className="block px-3 py-2 hover:bg-zinc-800">Log in</a>
        <a href="#" className="flex items-center justify-between px-3 py-2 hover:bg-zinc-800">
          Claude.ai <ExternalIcon />
        </a>
        <a href="#" className="flex items-center justify-between px-3 py-2 hover:bg-zinc-800">
          Claude Console <ExternalIcon />
        </a>
      </div>
    );

    // Ghost style - text only split button
    if (config.tryClaudeStyle === "ghost") {
      return (
        <div className="relative flex items-center">
          <a
            href="#"
            className="text-sm font-medium text-zinc-900 hover:text-zinc-600 transition-colors"
          >
            Try Claude
          </a>
          <button
            className="p-1 ml-0.5 text-zinc-600 hover:text-zinc-900 transition-colors"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <ChevronDown />
          </button>
          {showDropdown && dropdownContent}
        </div>
      );
    }

    // Determine shape and fill
    const isFilled = config.tryClaudeStyle.startsWith("filled");
    const isPill = config.tryClaudeStyle.endsWith("pill");
    const radiusClass = isPill ? "rounded-full" : "rounded-lg";

    if (isFilled) {
      return (
        <div className="relative flex items-center">
          <div className={`flex items-center bg-zinc-900 ${radiusClass} overflow-hidden`}>
            <a
              href="#"
              className="px-3 py-1.5 text-sm font-medium text-white hover:bg-zinc-800 transition-colors"
            >
              Try Claude
            </a>
            <div className="w-px self-stretch bg-zinc-700" />
            <button
              className="px-2 py-1.5 text-white hover:bg-zinc-800 transition-colors"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <ChevronDown />
            </button>
          </div>
          {showDropdown && dropdownContent}
        </div>
      );
    }

    // Outlined style - split button with border
    return (
      <div className="relative flex items-center">
        <div className={`flex items-center border border-zinc-200 ${radiusClass} overflow-hidden`}>
          <a
            href="#"
            className="px-3 py-1.5 text-sm font-medium text-zinc-900 hover:bg-zinc-50 transition-colors"
          >
            Try Claude
          </a>
          <div className="w-px self-stretch bg-zinc-200" />
          <button
            className="px-2 py-1.5 text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 transition-colors"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <ChevronDown />
          </button>
        </div>
        {showDropdown && dropdownContent}
      </div>
    );
  };

  const renderIcons = () => (
    <div className="flex items-center">
      {config.showGridIcon && <IconButton><GridIcon /></IconButton>}
      {config.showSearchIcon && <IconButton><SearchIcon /></IconButton>}
      {config.showMenuIcon && <IconButton onClick={onMenuOpen}><MenuIcon /></IconButton>}
    </div>
  );

  // Different layout configurations
  if (config.navLayout === "logo-left-nav-center") {
    return (
      <nav className="flex items-center justify-between px-6 py-4">
        <div className="flex-1">
          {renderLogo()}
        </div>
        <div className="flex-1 flex justify-center">
          {renderNavItems()}
        </div>
        <div className="flex-1 flex justify-end items-center gap-2">
          {config.tryClaudePosition === "left" && renderTryClaude()}
          {renderIcons()}
          {config.tryClaudePosition === "right" && renderTryClaude()}
        </div>
      </nav>
    );
  }

  if (config.logoPosition === "center") {
    return (
      <nav className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          {config.tryClaudePosition === "left" && renderTryClaude()}
          {renderNavItems()}
        </div>
        <div className="absolute left-1/2 -translate-x-1/2">
          {renderLogo()}
        </div>
        <div className="flex items-center gap-2">
          {config.tryClaudePosition === "right" && renderTryClaude()}
          {renderIcons()}
        </div>
      </nav>
    );
  }

  // Default: logo left
  return (
    <nav className="flex items-center justify-between px-6 py-4">
      <div className="flex items-center gap-6">
        {renderLogo()}
        {renderNavItems()}
      </div>
      <div className="flex items-center gap-2">
        {config.tryClaudePosition === "left" && renderTryClaude()}
        {renderIcons()}
        {config.tryClaudePosition === "right" && renderTryClaude()}
      </div>
    </nav>
  );
};

// Drawer Menu Component
const DrawerMenu = ({
  config,
  isOpen,
  onClose,
  navConfig
}: {
  config: MenuConfig;
  isOpen: boolean;
  onClose: () => void;
  navConfig: NavConfig;
}) => {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setVisible(true);
        });
      });
    } else {
      setVisible(false);
      const timer = setTimeout(() => setMounted(false), config.animationDuration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, config.animationDuration]);

  if (!mounted) return null;

  const menuSections = [
    { label: "Index", href: "/" },
    {
      label: "Research",
      href: "/research",
      active: true,
      items: [
        { label: "Research teams", href: "#" },
        { label: "Interpretability", href: "#" },
        { label: "Alignment", href: "#" },
        { label: "Societal Impacts", href: "#" },
      ]
    },
    {
      label: "Company",
      href: "/company",
      items: [
        { label: "News", href: "#" },
        { label: "About", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Events", href: "#" },
      ]
    },
    {
      label: "Responsibility",
      href: "/responsibility",
      items: [
        { label: "Economic futures", href: "#" },
        { label: "Transparency", href: "#" },
        { label: "Scaling policy", href: "#" },
        { label: "Security and compliance", href: "#" },
      ]
    },
    {
      label: "Learn",
      href: "/learn",
      items: [
        { label: "Anthropic Academy", href: "#" },
        { label: "Use cases", href: "#" },
        { label: "Engineering at Anthropic", href: "#" },
        { label: "Developer Docs", href: "#" },
      ]
    },
  ];

  // Drawer size classes
  const getSizeClasses = () => {
    if (config.position === "top") {
      return config.drawerSize === "large" ? "h-[70vh]" : "h-auto";
    } else {
      return config.drawerSize === "large" ? "w-[420px]" : "w-[340px]";
    }
  };

  // Get animation transform
  const getTransform = () => {
    if (config.position === "top") {
      return visible ? "translateY(0)" : "translateY(-100%)";
    } else {
      return visible ? "translateX(0)" : "translateX(100%)";
    }
  };

  // Get item animation style
  const getItemStyle = (index: number) => {
    const baseDelay = 100;
    const delay = config.staggerItems ? baseDelay + index * config.staggerDelay : baseDelay;
    return {
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(12px)",
      transition: `opacity ${config.animationDuration}ms ease-out ${delay}ms, transform ${config.animationDuration}ms ease-out ${delay}ms`,
    };
  };

  // Position classes
  const positionClasses = config.position === "top"
    ? "inset-x-0 top-0"
    : "inset-y-0 right-0";

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-40 transition-opacity"
        style={{
          opacity: visible ? 1 : 0,
          transitionDuration: `${config.animationDuration}ms`,
        }}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed ${positionClasses} ${getSizeClasses()} bg-zinc-900 z-50 text-white overflow-auto`}
        style={{
          fontFamily: "'Anthropic Sans', sans-serif",
          transform: getTransform(),
          transitionProperty: "transform",
          transitionDuration: `${config.animationDuration}ms`,
          transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0, 1)"
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5">
          <a href="/" className="text-zinc-500 hover:text-white transition-colors text-lg">
            Index
          </a>
          <button
            className="p-2 -mr-2 text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-zinc-800"
            onClick={onClose}
          >
            <CloseIcon />
          </button>
        </div>

        {/* Menu Content */}
        <div className="px-6 pb-8">
          {menuSections.slice(1).map((section, sectionIndex) => (
            <div key={section.label} className="mb-6" style={getItemStyle(sectionIndex)}>
              <a
                href={section.href}
                className={`block text-2xl mb-3 transition-colors ${
                  section.active ? "font-semibold text-white" : "text-zinc-500 hover:text-white"
                }`}
              >
                {section.label}
              </a>
              {section.items && (
                <ul className="space-y-2">
                  {section.items.map((item, itemIndex) => (
                    <li key={item.label} style={config.staggerItems ? getItemStyle(sectionIndex + itemIndex * 0.3) : undefined}>
                      <a
                        href={item.href}
                        className="block text-zinc-400 hover:text-white transition-colors"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

// Control Panel Components
const ControlSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="space-y-3">
    <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">{title}</h3>
    {children}
  </div>
);

const Checkbox = ({
  label,
  checked,
  onChange
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) => (
  <label className="flex items-center gap-2 text-sm cursor-pointer">
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className="w-4 h-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-500"
    />
    {label}
  </label>
);

const RadioGroup = ({
  options,
  value,
  onChange,
  name
}: {
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
  name: string;
}) => (
  <div className="flex flex-wrap gap-2">
    {options.map((option) => (
      <label key={option.value} className="flex items-center gap-1.5 text-sm cursor-pointer">
        <input
          type="radio"
          name={name}
          checked={value === option.value}
          onChange={() => onChange(option.value)}
          className="w-4 h-4 border-zinc-300 text-zinc-900 focus:ring-zinc-500"
        />
        {option.label}
      </label>
    ))}
  </div>
);

// Main Page Component
export default function GlobalNavPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [navMinimized, setNavMinimized] = useState(false);

  const [navConfig, setNavConfig] = useState<NavConfig>({
    logoPosition: "center",
    logoType: "long",
    showResearch: true,
    showNews: true,
    showMore: true,
    showTryClaude: true,
    tryClaudeStyle: "filled-pill",
    tryClaudePosition: "left",
    showGridIcon: true,
    showSearchIcon: true,
    showMenuIcon: true,
    navLayout: "spread",
  });

  const [menuConfig, setMenuConfig] = useState<MenuConfig>({
    position: "top",
    drawerSize: "medium",
    contentLayout: "horizontal",
    showFooterLinks: true,
    animation: "slide",
    staggerItems: true,
    staggerDelay: 50,
    animationDuration: 300,
  });

  const updateNavConfig = <K extends keyof NavConfig>(key: K, value: NavConfig[K]) => {
    setNavConfig(prev => ({ ...prev, [key]: value }));
  };

  const updateMenuConfig = <K extends keyof MenuConfig>(key: K, value: MenuConfig[K]) => {
    setMenuConfig(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Anthropic Sans', sans-serif" }}>
      {/* Nav Preview - Always fixed at top */}
      <div className="fixed top-0 left-0 right-0 z-30 bg-white">
        <GlobalNav config={navConfig} onMenuOpen={() => setMenuOpen(true)} />
      </div>

      {/* Drawer Menu */}
      <DrawerMenu
        config={menuConfig}
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        navConfig={navConfig}
      />

      {/* Controls Panel */}
      <div
        className={`fixed left-0 right-0 z-20 bg-white border-t border-zinc-200 transition-all duration-300 ease-out ${
          navMinimized
            ? "bottom-0 h-12"
            : "bottom-0 h-[70vh] overflow-auto"
        }`}
      >
        {/* Minimize/Expand toggle bar */}
        <button
          onClick={() => setNavMinimized(!navMinimized)}
          className="w-full h-12 flex items-center justify-center gap-2 text-sm text-zinc-500 hover:text-zinc-700 hover:bg-zinc-50 transition-colors border-b border-zinc-100"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className={`transition-transform duration-300 ${navMinimized ? "rotate-180" : ""}`}
          >
            <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {navMinimized ? "Show Controls" : "Hide Controls"}
        </button>

        {/* Controls content */}
        {!navMinimized && (
          <div className="max-w-6xl mx-auto px-6 py-6 pb-8">
            <h1 className="text-xl font-semibold mb-6">Global Nav Configurator</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Logo Controls */}
          <div className="bg-white rounded-xl p-6 shadow-sm space-y-6">
            <ControlSection title="Logo">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-zinc-600 mb-2">Position</p>
                  <RadioGroup
                    name="logoPosition"
                    options={[
                      { label: "Left", value: "left" },
                      { label: "Center", value: "center" },
                    ]}
                    value={navConfig.logoPosition}
                    onChange={(v) => updateNavConfig("logoPosition", v as "left" | "center")}
                  />
                </div>
                <div>
                  <p className="text-sm text-zinc-600 mb-2">Type</p>
                  <RadioGroup
                    name="logoType"
                    options={[
                      { label: "Long (ANTHROPIC)", value: "long" },
                      { label: "Short (A\\)", value: "short" },
                    ]}
                    value={navConfig.logoType}
                    onChange={(v) => updateNavConfig("logoType", v as "long" | "short")}
                  />
                </div>
              </div>
            </ControlSection>

            <ControlSection title="Layout">
              <RadioGroup
                name="navLayout"
                options={[
                  { label: "Spread", value: "spread" },
                  { label: "Compact", value: "compact" },
                  { label: "Logo Left, Nav Center", value: "logo-left-nav-center" },
                ]}
                value={navConfig.navLayout}
                onChange={(v) => updateNavConfig("navLayout", v as NavConfig["navLayout"])}
              />
            </ControlSection>
          </div>

          {/* Nav Items Controls */}
          <div className="bg-white rounded-xl p-6 shadow-sm space-y-6">
            <ControlSection title="Navigation Items">
              <div className="space-y-2">
                <Checkbox
                  label="Research"
                  checked={navConfig.showResearch}
                  onChange={(v) => updateNavConfig("showResearch", v)}
                />
                <Checkbox
                  label="News"
                  checked={navConfig.showNews}
                  onChange={(v) => updateNavConfig("showNews", v)}
                />
                <Checkbox
                  label="More dropdown"
                  checked={navConfig.showMore}
                  onChange={(v) => updateNavConfig("showMore", v)}
                />
              </div>
            </ControlSection>

            <ControlSection title="Try Claude">
              <div className="space-y-4">
                <Checkbox
                  label="Show Try Claude"
                  checked={navConfig.showTryClaude}
                  onChange={(v) => updateNavConfig("showTryClaude", v)}
                />
                {navConfig.showTryClaude && (
                  <>
                    <div>
                      <p className="text-sm text-zinc-600 mb-2">Style</p>
                      <RadioGroup
                        name="tryClaudeStyle"
                        options={[
                          { label: "Filled Pill", value: "filled-pill" },
                          { label: "Filled Squircle", value: "filled-squircle" },
                          { label: "Outlined Pill", value: "outlined-pill" },
                          { label: "Outlined Squircle", value: "outlined-squircle" },
                          { label: "Ghost", value: "ghost" },
                        ]}
                        value={navConfig.tryClaudeStyle}
                        onChange={(v) => updateNavConfig("tryClaudeStyle", v as NavConfig["tryClaudeStyle"])}
                      />
                    </div>
                    <div>
                      <p className="text-sm text-zinc-600 mb-2">Position</p>
                      <RadioGroup
                        name="tryClaudePosition"
                        options={[
                          { label: "Before icons", value: "left" },
                          { label: "After icons", value: "right" },
                        ]}
                        value={navConfig.tryClaudePosition}
                        onChange={(v) => updateNavConfig("tryClaudePosition", v as "left" | "right")}
                      />
                    </div>
                  </>
                )}
              </div>
            </ControlSection>
          </div>

          {/* Menu Controls */}
          <div className="bg-white rounded-xl p-6 shadow-sm space-y-6">
            <ControlSection title="Drawer Menu">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-zinc-600 mb-2">Position</p>
                  <RadioGroup
                    name="menuPosition"
                    options={[
                      { label: "Top", value: "top" },
                      { label: "Right", value: "right" },
                    ]}
                    value={menuConfig.position}
                    onChange={(v) => updateMenuConfig("position", v as "top" | "right")}
                  />
                </div>
                <div>
                  <p className="text-sm text-zinc-600 mb-2">Size</p>
                  <RadioGroup
                    name="drawerSize"
                    options={[
                      { label: "Large", value: "large" },
                      { label: "Medium", value: "medium" },
                    ]}
                    value={menuConfig.drawerSize}
                    onChange={(v) => updateMenuConfig("drawerSize", v as "large" | "medium")}
                  />
                </div>
              </div>
            </ControlSection>

            <button
              onClick={() => setMenuOpen(true)}
              className="w-full py-2 px-4 bg-zinc-900 text-white rounded-lg text-sm font-medium hover:bg-zinc-800 transition-colors"
            >
              Preview Drawer Menu
            </button>
          </div>

          {/* Animation Controls */}
          <div className="bg-white rounded-xl p-6 shadow-sm space-y-6">
            <ControlSection title="Animation">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-zinc-600 mb-2">Type</p>
                  <RadioGroup
                    name="animation"
                    options={[
                      { label: "Slide", value: "slide" },
                      { label: "Fade", value: "fade" },
                      { label: "Scale", value: "scale" },
                    ]}
                    value={menuConfig.animation}
                    onChange={(v) => updateMenuConfig("animation", v as "slide" | "fade" | "scale")}
                  />
                </div>
                <div>
                  <p className="text-sm text-zinc-600 mb-2">Duration: {menuConfig.animationDuration}ms</p>
                  <input
                    type="range"
                    min="100"
                    max="800"
                    step="50"
                    value={menuConfig.animationDuration}
                    onChange={(e) => updateMenuConfig("animationDuration", parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
            </ControlSection>

            <ControlSection title="Stagger Effect">
              <div className="space-y-4">
                <Checkbox
                  label="Enable stagger"
                  checked={menuConfig.staggerItems}
                  onChange={(v) => updateMenuConfig("staggerItems", v)}
                />
                {menuConfig.staggerItems && (
                  <div>
                    <p className="text-sm text-zinc-600 mb-2">Delay: {menuConfig.staggerDelay}ms</p>
                    <input
                      type="range"
                      min="20"
                      max="150"
                      step="10"
                      value={menuConfig.staggerDelay}
                      onChange={(e) => updateMenuConfig("staggerDelay", parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                )}
              </div>
            </ControlSection>
          </div>
        </div>

            {/* Current Config Display */}
            <div className="mt-6 bg-zinc-50 rounded-xl p-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">Current Configuration</h3>
              <pre className="text-xs overflow-x-auto">
{JSON.stringify({ navConfig, menuConfig }, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
