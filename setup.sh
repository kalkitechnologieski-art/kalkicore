#!/bin/bash
set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🏛️ Building High‑End About Page & Fixing Mobile Menu...${NC}"

# ------------------------------------------------------------
# 1. Create the About page
# ------------------------------------------------------------
echo -e "${BLUE}📄 Creating app/about/page.tsx...${NC}"
mkdir -p app/about
cat > app/about/page.tsx << 'EOF'
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Users, Target, Award, Shield, Heart, Sparkles, Gem, Crown } from 'lucide-react';

export default function AboutPage() {
  const stats = [
    { label: 'Clients', value: '500+', icon: Users },
    { label: 'Founded', value: 'Dec 2025', icon: Sparkles },
    { label: 'MSME Registered', value: '✅', icon: Shield },
    { label: 'Ethics First', value: '100%', icon: Heart },
  ];

  return (
    <section className="min-h-screen pt-32 pb-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <Gem className="w-10 h-10 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif gold-gradient mb-4">
            KALKI INTELLIGENCE
          </h1>
          <p className="text-text-muted text-lg max-w-3xl mx-auto">
            We are a <strong>MSME registered</strong> company (UDYAM: <span className="text-primary">UDYAM-MP-20-0113749</span>) 
            on a mission to reform the marketing industry through <strong>trust, transparency, and guaranteed ROI</strong>.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 glass p-6 rounded-2xl border border-white/5 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="flex justify-center mb-2">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="text-2xl font-bold gold-gradient">{stat.value}</div>
              <div className="text-xs text-text-muted uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Our Story */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="glass p-8 rounded-2xl border border-primary/20"
          >
            <h2 className="text-2xl font-serif gold-gradient mb-4">Our Story</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Founded in <strong>December 2025</strong>, KALKI INTELLIGENCE was born from a vision to 
              <strong> democratize AI</strong> for local businesses at affordable prices. 
              Our journey began with a simple belief: <em>“Technology should work for everyone, not just the elite.”</em>
            </p>
            <p className="text-text-muted leading-relaxed">
              Today, we proudly serve <strong>500+ clients</strong> who trust us for our integrity, 
              transparency, and the <strong>guaranteed ROI</strong> we deliver – a promise we keep.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass p-8 rounded-2xl border border-primary/20"
          >
            <h2 className="text-2xl font-serif gold-gradient mb-4">Our Mission & Values</h2>
            <ul className="space-y-4 text-text-muted">
              <li className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span><strong>Integrity First</strong> – We are building a society based on trust, not tricks.</span>
              </li>
              <li className="flex items-start gap-3">
                <Heart className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span><strong>Client‑Centric</strong> – Our clients are our family; their success is our success.</span>
              </li>
              <li className="flex items-start gap-3">
                <Award className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span><strong>Guaranteed ROI</strong> – We don’t just promise; we deliver measurable results.</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Leadership */}
        <div className="mb-16">
          <h2 className="text-3xl font-serif gold-gradient text-center mb-8">Our Leadership</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Chairman */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="glass p-8 rounded-2xl text-center hover:border-primary/30 transition-all group"
            >
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Crown className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Mrs. Shri Urmila Singh</h3>
              <p className="text-text-muted text-sm">Chairperson</p>
              <p className="text-text-muted text-xs mt-2">
                A wonderful entrepreneur who started AI enhancement to improve local businesses 
                affordably, reforming the marketing industry with guaranteed ROI and ethical practices.
              </p>
            </motion.div>

            {/* CEO */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass p-8 rounded-2xl text-center hover:border-primary/30 transition-all group"
            >
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Sparkles className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Mr. Nikhil</h3>
              <p className="text-text-muted text-sm">CEO</p>
              <p className="text-text-muted text-xs mt-2">
                Leading the company with a vision to leverage AI for social good, 
                ensuring every client gets tangible value and ethical service.
              </p>
            </motion.div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h3 className="text-2xl font-serif gold-gradient mb-4">Join the KALKI Family</h3>
          <p className="text-text-muted mb-6">Be part of a community that values trust, integrity, and results.</p>
          <Link href="/contact" className="button">
            <div className="button-outer">
              <div className="button-inner">
                <span>Get Started</span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
EOF

# ------------------------------------------------------------
# 2. Fix Header – ensure hamburger is visible and menu works
# ------------------------------------------------------------
echo -e "${BLUE}📄 Updating components/layout/Header.tsx...${NC}"
cat > components/layout/Header.tsx << 'EOF'
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useTheme } from '@/components/providers/ThemeProvider';
import { Menu, X, Sun, Moon, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/ki-bot', label: 'KI Bot' },
  { href: '/ki-cloud', label: 'KI Cloud' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/hiring', label: 'Hiring' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2 text-2xl font-serif">
            <Cpu className="w-6 h-6 text-primary" />
            <span className="font-extrabold tracking-tight">
              KALKI <span className="text-primary">AI</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-text-muted hover:text-primary transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <Link href="/contact" className="hidden md:inline-block button">
              <div className="button-outer">
                <div className="button-inner">
                  <span>Start Project</span>
                </div>
              </div>
            </Link>
            {/* Hamburger button – always visible on mobile */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-white/10 transition-colors relative z-50"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-4/5 max-w-sm glass border-l border-primary/20 p-6 md:hidden overflow-y-auto z-[100]"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="font-serif text-xl font-bold">KALKI AI</span>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-full hover:bg-white/10"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex flex-col gap-6 text-lg font-medium">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-text-muted hover:text-primary transition-colors border-b border-white/5 pb-3"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-6">
                <Link
                  href="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="button w-full block text-center"
                >
                  <div className="button-outer">
                    <div className="button-inner">
                      <span>Start Project</span>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="flex gap-4 mt-6">
                <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-white/10">
                  {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
                <span className="text-xs text-text-muted self-center">Toggle Theme</span>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
EOF

# ------------------------------------------------------------
# 3. Fix mobile card grid – ensure elegant stacking
# ------------------------------------------------------------
echo -e "${BLUE}📄 Updating globals.css for better mobile cards...${NC}"
if ! grep -q "grid-cols-1 sm:grid-cols-2" app/globals.css; then
  cat >> app/globals.css << 'EOF'

/* Mobile card improvements */
@media (max-width: 640px) {
  .grid-cols-1 {
    grid-template-columns: 1fr !important;
  }
  .sm\\:grid-cols-2 {
    grid-template-columns: 1fr !important;
  }
  .lg\\:grid-cols-3 {
    grid-template-columns: 1fr !important;
  }
  .xl\\:grid-cols-4 {
    grid-template-columns: 1fr !important;
  }
}
EOF
fi

# ------------------------------------------------------------
# 4. Final message
# ------------------------------------------------------------
echo -e "${GREEN}✅ About page and mobile fixes applied!${NC}"
echo -e "${BLUE}🔧 What was added:${NC}"
echo "  • High‑end About page with company story, stats, leadership, and CTA."
echo "  • Hamburger menu is now visible on mobile with a z-index fix."
echo "  • Mobile side menu has all the buttons (exactly as provided)."
echo "  • Cards now stack elegantly on mobile (single column)."
echo ""
echo -e "${BLUE}🚀 Next steps:${NC}"
echo "  1. Push to GitHub – changes will deploy."
echo "  2. Visit /about to see the new page."
echo "  3. On mobile, the hamburger icon appears top‑right."
echo -e "${GREEN}🏛️ Your Temple of Technology is now complete, mobile‑friendly, and tells a powerful story!${NC}"