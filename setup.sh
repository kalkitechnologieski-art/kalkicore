#!/bin/bash
set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🔧 Fixing mobile hamburger menu visibility (using Portal)...${NC}"

# ------------------------------------------------------------
# 1. Update Header.tsx to use React Portal
# ------------------------------------------------------------
echo -e "${BLUE}📄 Updating components/layout/Header.tsx...${NC}"
cat > components/layout/Header.tsx << 'EOF'
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTheme } from '@/components/providers/ThemeProvider';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/ki-bot', label: 'KI Bot', badge: 'NEW' },
  { href: '/ki-cloud', label: 'KI Cloud' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/hiring', label: 'Hiring' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Ensure portal only renders on client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close menu on window resize (switch to desktop)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuContent = (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="mobile-menu-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsMenuOpen(false);
          }}
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="mobile-menu-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="logo-area">
              <span className="brand">KALKI AI</span>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="close-btn"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <div key={link.href} className="voltage-button">
                  <Link
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <button className="w-full text-left">
                      {link.label}
                      {link.badge && (
                        <span className="badge">{link.badge}</span>
                      )}
                    </button>
                  </Link>
                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    viewBox="0 0 234.6 61.3"
                    preserveAspectRatio="none"
                    xmlSpace="preserve"
                  >
                    <filter id="glow">
                      <feGaussianBlur className="blur" result="coloredBlur" stdDeviation="2" />
                      <feTurbulence type="fractalNoise" baseFrequency="0.075" numOctaves="0.3" result="turbulence" />
                      <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="30" xChannelSelector="R" yChannelSelector="G" result="displace" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="displace" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                    <path className="voltage line-1" d="m216.3 51.2c-3.7 0-3.7-1.1-7.3-1.1-3.7 0-3.7 6.8-7.3 6.8-3.7 0-3.7-4.6-7.3-4.6-3.7 0-3.7 3.6-7.3 3.6-3.7 0-3.7-0.9-7.3-0.9-3.7 0-3.7-2.7-7.3-2.7-3.7 0-3.7 7.8-7.3 7.8-3.7 0-3.7-4.9-7.3-4.9-3.7 0-3.7-7.8-7.3-7.8-3.7 0-3.7-1.1-7.3-1.1-3.7 0-3.7 3.1-7.3 3.1-3.7 0-3.7 10.9-7.3 10.9-3.7 0-3.7-12.5-7.3-12.5-3.7 0-3.7 4.6-7.3 4.6-3.7 0-3.7 4.5-7.3 4.5-3.7 0-3.7 3.6-7.3 3.6-3.7 0-3.7-10-7.3-10-3.7 0-3.7-0.4-7.3-0.4-3.7 0-3.7 2.3-7.3 2.3-3.7 0-3.7 7.1-7.3 7.1-3.7 0-3.7-11.2-7.3-11.2-3.7 0-3.7 3.5-7.3 3.5-3.7 0-3.7 3.6-7.3 3.6-3.7 0-3.7-2.9-7.3-2.9-3.7 0-3.7 8.4-7.3 8.4-3.7 0-3.7-14.6-7.3-14.6-3.7 0-3.7 5.8-7.3 5.8-2.2 0-3.8-0.4-5.5-1.5-1.8-1.1-1.8-2.9-2.9-4.8-1-1.8 1.9-2.7 1.9-4.8 0-3.4-2.1-3.4-2.1-6.8s-9.9-3.4-9.9-6.8 8-3.4 8-6.8c0-2.2 2.1-2.4 3.1-4.2 1.1-1.8 0.2-3.9 2-5 1.8-1 3.1-7.9 5.3-7.9 3.7 0 3.7 0.9 7.3 0.9 3.7 0 3.7 6.7 7.3 6.7 3.7 0 3.7-1.8 7.3-1.8 3.7 0 3.7-0.6 7.3-0.6 3.7 0 3.7-7.8 7.3-7.8h7.3c3.7 0 3.7 4.7 7.3 4.7 3.7 0 3.7-1.1 7.3-1.1 3.7 0 3.7 11.6 7.3 11.6 3.7 0 3.7-2.6 7.3-2.6 3.7 0 3.7-12.9 7.3-12.9 3.7 0 3.7 10.9 7.3 10.9 3.7 0 3.7 1.3 7.3 1.3 3.7 0 3.7-8.7 7.3-8.7 3.7 0 3.7 11.5 7.3 11.5 3.7 0 3.7-1.4 7.3-1.4 3.7 0 3.7-2.6 7.3-2.6 3.7 0 3.7-5.8 7.3-5.8 3.7 0 3.7-1.3 7.3-1.3 3.7 0 3.7 6.6 7.3 6.6s3.7-9.3 7.3-9.3c3.7 0 3.7 0.2 7.3 0.2 3.7 0 3.7 8.5 7.3 8.5 3.7 0 3.7 0.2 7.3 0.2 3.7 0 3.7-1.5 7.3-1.5 3.7 0 3.7 1.6 7.3 1.6s3.7-5.1 7.3-5.1c2.2 0 0.6 9.6 2.4 10.7s4.1-2 5.1-0.1c1 1.8 10.3 2.2 10.3 4.3 0 3.4-10.7 3.4-10.7 6.8s1.2 3.4 1.2 6.8 1.9 3.4 1.9 6.8c0 2.2 7.2 7.7 6.2 9.5-1.1 1.8-12.3-6.5-14.1-5.5-1.7 0.9-0.1 6.2-2.2 6.2z" fill="transparent" stroke="#fff" />
                    <path className="voltage line-2" d="m216.3 52.1c-3 0-3-0.5-6-0.5s-3 3-6 3-3-2-6-2-3 1.6-6 1.6-3-0.4-6-0.4-3-1.2-6-1.2-3 3.4-6 3.4-3-2.2-6-2.2-3-3.4-6-3.4-3-0.5-6-0.5-3 1.4-6 1.4-3 4.8-6 4.8-3-5.5-6-5.5-3 2-6 2-3 2-6 2-3 1.6-6 1.6-3-4.4-6-4.4-3-0.2-6-0.2-3 1-6 1-3 3.1-6 3.1-3-4.9-6-4.9-3 1.5-6 1.5-3 1.6-6 1.6-3-1.3-6-1.3-3 3.7-6 3.7-3-6.4-6-6.4-3 2.5-6 2.5h-6c-3 0-3-0.6-6-0.6s-3-1.4-6-1.4-3 0.9-6 0.9-3 4.3-6 4.3-3-3.5-6-3.5c-2.2 0-3.4-1.3-5.2-2.3-1.8-1.1-3.6-1.5-4.6-3.3s-4.4-3.5-4.4-5.7c0-3.4 0.4-3.4 0.4-6.8s2.9-3.4 2.9-6.8-0.8-3.4-0.8-6.8c0-2.2 0.3-4.2 1.3-5.9 1.1-1.8 0.8-6.2 2.6-7.3 1.8-1 5.5-2 7.7-2 3 0 3 2 6 2s3-0.5 6-0.5 3 5.1 6 5.1 3-1.1 6-1.1 3-5.6 6-5.6 3 4.8 6 4.8 3 0.6 6 0.6 3-3.8 6-3.8 3 5.1 6 5.1 3-0.6 6-0.6 3-1.2 6-1.2 3-2.6 6-2.6 3-0.6 6-0.6 3 2.9 6 2.9 3-4.1 6-4.1 3 0.1 6 0.1 3 3.7 6 3.7 3 0.1 6 0.1 3-0.6 6-0.6 3 0.7 6 0.7 3-2.2 6-2.2 3 4.4 6 4.4 3-1.7 6-1.7 3-4 6-4 3 4.7 6 4.7 3-0.5 6-0.5 3-0.8 6-0.8 3-3.8 6-3.8 3 6.3 6 6.3 3-4.8 6-4.8 3 1.9 6 1.9 3-1.9 6-1.9 3 1.3 6 1.3c2.2 0 5-0.5 6.7 0.5 1.8 1.1 2.4 4 3.5 5.8 1 1.8 0.3 3.7 0.3 5.9 0 3.4 3.4 3.4 3.4 6.8s-3.3 3.4-3.3 6.8 4 3.4 4 6.8c0 2.2-6 2.7-7 4.4-1.1 1.8 1.1 6.7-0.7 7.7-1.6 0.8-4.7-1.1-6.8-1.1z" fill="transparent" stroke="#fff" />
                  </svg>
                  <div className="dots">
                    <div className="dot dot-1"></div>
                    <div className="dot dot-2"></div>
                    <div className="dot dot-3"></div>
                    <div className="dot dot-4"></div>
                    <div className="dot dot-5"></div>
                  </div>
                </div>
              ))}
            </nav>

            <div className="theme-toggle-area">
              <label className="toggle small relative" aria-label="Toggle theme">
                <input
                  type="checkbox"
                  checked={theme === 'light'}
                  onChange={toggleTheme}
                />
                <span className="button"></span>
                <span className="label">{theme === 'dark' ? '☼' : '☾'}</span>
              </label>
              <span className="toggle-label">Toggle Theme</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2 text-2xl font-serif tracking-tight">
            <span className="font-extrabold gold-gradient">KALKI INTELLIGENCE</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-text-muted hover:text-primary transition-colors relative group flex items-center gap-1"
              >
                {link.label}
                {link.badge && (
                  <span className="relative -top-2 ml-0.5 text-[8px] font-bold uppercase tracking-wider bg-gradient-to-r from-pink-500 to-purple-500 text-white px-1.5 py-0.5 rounded-full animate-pulse">
                    {link.badge}
                  </span>
                )}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <label className="toggle small relative" aria-label="Toggle theme">
                <input
                  type="checkbox"
                  checked={theme === 'light'}
                  onChange={toggleTheme}
                />
                <span className="button"></span>
                <span className="label">{theme === 'dark' ? '☼' : '☾'}</span>
              </label>
            </div>

            <Link href="/contact" className="hidden md:inline-block button">
              <div className="button-outer">
                <div className="button-inner">
                  <span>Start Project</span>
                </div>
              </div>
            </Link>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="hamburger-btn md:hidden"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Render menu via portal when mounted */}
      {mounted && createPortal(menuContent, document.body)}
    </header>
  );
}
EOF

# ------------------------------------------------------------
# 2. Final message
# ------------------------------------------------------------
echo -e "${GREEN}✅ Mobile menu fixed with React Portal!${NC}"
echo -e "${BLUE}🔧 What was fixed:${NC}"
echo "  • The mobile menu is now rendered directly into document.body via createPortal."
echo "  • This avoids the header's stacking context completely."
echo "  • The overlay now appears above all content."
echo "  • The panel slides in from the right with blur backdrop."
echo "  • All voltage‑button styles remain."
echo ""
echo -e "${BLUE}🚀 Next steps:${NC}"
echo "  1. Push to GitHub – changes will deploy."
echo "  2. On mobile, tap the hamburger icon – the menu will appear above everything."
echo "  3. The menu should now be fully visible and functional."
echo -e "${GREEN}🏛️ Your Temple of Technology now has a perfect mobile menu!${NC}"