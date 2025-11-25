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
  drawerSize: "full" | "large" | "medium";

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
      <div className="absolute top-full right-0 mt-2 w-56 bg-zinc-900 rounded-lg shadow-xl py-2 text-white z-50">
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
        <div className="px-3 py-1 text-xs text-zinc-500">Models</div>
        <a href="#" className="block px-3 py-2 hover:bg-zinc-800">Opus</a>
        <a href="#" className="block px-3 py-2 hover:bg-zinc-800">Sonnet</a>
        <a href="#" className="block px-3 py-2 hover:bg-zinc-800">Haiku</a>
        <div className="border-t border-zinc-800 my-2" />
        <a href="#" className="block px-3 py-2 hover:bg-zinc-800 text-zinc-400">Log in</a>
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
  if (!isOpen) return null;

  const menuItems = [
    { label: "Index", href: "/" },
    { label: "Research", href: "/research", active: true },
    { label: "Company", href: "/company" },
    { label: "Economic Futures", href: "/economic-futures" },
    { label: "Learn", href: "/learn" },
  ];

  const footerLinks = [
    { label: "Responsibility", href: "#" },
    { label: "Careers", href: "#" },
    { label: "API Status", href: "#" },
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
  ];

  // Drawer size classes
  const getSizeClasses = () => {
    if (config.position === "top") {
      switch (config.drawerSize) {
        case "full": return "h-screen";
        case "large": return "h-[70vh]";
        case "medium": return "h-[50vh]";
      }
    } else {
      switch (config.drawerSize) {
        case "full": return "w-screen";
        case "large": return "w-[50vw]";
        case "medium": return "w-[400px]";
      }
    }
  };

  // Animation classes for drawer
  const getDrawerAnimationClasses = () => {
    const duration = `duration-${config.animationDuration}`;

    if (config.position === "top") {
      if (config.animation === "slide") {
        return isOpen ? "translate-y-0" : "-translate-y-full";
      } else if (config.animation === "scale") {
        return isOpen ? "scale-y-100 origin-top" : "scale-y-0 origin-top";
      } else {
        return isOpen ? "opacity-100" : "opacity-0";
      }
    } else {
      if (config.animation === "slide") {
        return isOpen ? "translate-x-0" : "translate-x-full";
      } else if (config.animation === "scale") {
        return isOpen ? "scale-x-100 origin-right" : "scale-x-0 origin-right";
      } else {
        return isOpen ? "opacity-100" : "opacity-0";
      }
    }
  };

  // Get item animation style
  const getItemStyle = (index: number) => {
    if (!config.staggerItems) {
      return {
        opacity: isOpen ? 1 : 0,
        transform: isOpen ? "translateY(0)" : "translateY(10px)",
        transition: `all ${config.animationDuration}ms ease-out`,
      };
    }

    const delay = index * config.staggerDelay;
    return {
      opacity: isOpen ? 1 : 0,
      transform: isOpen ? "translateY(0)" : "translateY(20px)",
      transition: `all ${config.animationDuration}ms ease-out ${delay}ms`,
    };
  };

  const Logo = navConfig.logoType === "long" ? LogoLong : LogoShort;

  // Position classes
  const positionClasses = config.position === "top"
    ? "inset-x-0 top-0"
    : "inset-y-0 right-0";

  // Render horizontal nav layout
  const renderHorizontalNav = () => (
    <div className="flex items-center justify-center gap-8 py-4 border-b border-zinc-800">
      {menuItems.map((item, index) => (
        <a
          key={item.label}
          href={item.href}
          className={`text-sm font-medium transition-all ${
            item.active
              ? "text-white border-b-2 border-white pb-1"
              : "text-zinc-400 hover:text-white"
          }`}
          style={getItemStyle(index)}
        >
          {item.label}
        </a>
      ))}
    </div>
  );

  // Render vertical list
  const renderVerticalList = (align: "left" | "right" | "center") => (
    <ul className={`space-y-3 ${align === "center" ? "text-center" : align === "right" ? "text-right" : ""}`}>
      {menuItems.map((item, index) => (
        <li key={item.label} style={getItemStyle(index)}>
          <a
            href={item.href}
            className={`block text-2xl transition-colors ${
              item.active ? "font-semibold text-white" : "text-zinc-400 hover:text-white"
            }`}
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );

  // Render footer links
  const renderFooterLinks = () => (
    <div
      className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-zinc-500"
      style={getItemStyle(menuItems.length)}
    >
      {footerLinks.map((link) => (
        <a key={link.label} href={link.href} className="hover:text-zinc-300 transition-colors">
          {link.label}
        </a>
      ))}
    </div>
  );

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDuration: `${config.animationDuration}ms` }}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed ${positionClasses} ${getSizeClasses()} ${getDrawerAnimationClasses()} bg-zinc-900 z-50 text-white overflow-auto transition-all`}
        style={{
          fontFamily: "'Anthropic Sans', sans-serif",
          transitionDuration: `${config.animationDuration}ms`,
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)"
        }}
      >
        {/* Header */}
        <nav className="flex items-center justify-between px-6 py-4">
          <Logo className="invert" />

          {config.contentLayout === "horizontal" && (
            <div className="flex items-center gap-6">
              {menuItems.map((item, index) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`text-sm font-medium transition-all ${
                    item.active
                      ? "text-white"
                      : "text-zinc-400 hover:text-white"
                  }`}
                  style={getItemStyle(index)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          )}

          <button
            className="p-2 text-white hover:text-zinc-300 transition-colors"
            onClick={onClose}
          >
            <CloseIcon />
          </button>
        </nav>

        {/* Content */}
        {config.contentLayout !== "horizontal" && (
          <div className="px-6 py-8">
            {config.contentLayout === "list-left" && (
              <div className="flex">
                <div className="flex-1">
                  {renderVerticalList("left")}
                </div>
                {config.showFooterLinks && (
                  <div className="ml-auto">
                    {renderFooterLinks()}
                  </div>
                )}
              </div>
            )}

            {config.contentLayout === "list-right" && (
              <div className="flex">
                {config.showFooterLinks && (
                  <div className="mr-auto">
                    {renderFooterLinks()}
                  </div>
                )}
                <div className="flex-1 flex justify-end">
                  {renderVerticalList("right")}
                </div>
              </div>
            )}

            {config.contentLayout === "centered" && (
              <div className="flex flex-col items-center justify-center min-h-[40vh]">
                {renderVerticalList("center")}
                {config.showFooterLinks && (
                  <div className="mt-12">
                    {renderFooterLinks()}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Footer for horizontal layout */}
        {config.contentLayout === "horizontal" && config.showFooterLinks && (
          <div className="absolute bottom-0 left-0 right-0 px-6 py-4 border-t border-zinc-800">
            {renderFooterLinks()}
          </div>
        )}
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
                      { label: "Full", value: "full" },
                      { label: "Large", value: "large" },
                      { label: "Medium", value: "medium" },
                    ]}
                    value={menuConfig.drawerSize}
                    onChange={(v) => updateMenuConfig("drawerSize", v as "full" | "large" | "medium")}
                  />
                </div>
                <div>
                  <p className="text-sm text-zinc-600 mb-2">Content Layout</p>
                  <RadioGroup
                    name="contentLayout"
                    options={[
                      { label: "Horizontal", value: "horizontal" },
                      { label: "List Left", value: "list-left" },
                      { label: "List Right", value: "list-right" },
                      { label: "Centered", value: "centered" },
                    ]}
                    value={menuConfig.contentLayout}
                    onChange={(v) => updateMenuConfig("contentLayout", v as MenuConfig["contentLayout"])}
                  />
                </div>
                <Checkbox
                  label="Show footer links"
                  checked={menuConfig.showFooterLinks}
                  onChange={(v) => updateMenuConfig("showFooterLinks", v)}
                />
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
