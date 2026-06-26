#!/bin/bash
set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🔧 Fixing hero search dropdown position (above buttons)...${NC}"

# ------------------------------------------------------------
# 1. Update Hero.tsx – dropdown appears above buttons
# ------------------------------------------------------------
echo -e "${BLUE}📄 Updating components/features/Hero.tsx...${NC}"
cat > components/features/Hero.tsx << 'EOF'
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import servicesData from '@/lib/content/services-full.json';

interface Service {
  slug: string;
  title: string;
  description: string;
  category: string;
}

export function Hero() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Service[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setShowDropdown(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (value.trim().length > 0) {
      const lower = value.toLowerCase();
      const filtered = (servicesData as Service[]).filter(
        (s) =>
          s.title.toLowerCase().includes(lower) ||
          s.description.toLowerCase().includes(lower) ||
          s.category.toLowerCase().includes(lower)
      );
      setSuggestions(filtered.slice(0, 6));
      setShowDropdown(true);
    } else {
      setSuggestions([]);
      setShowDropdown(false);
    }
  };

  const handleSuggestionClick = (slug: string) => {
    router.push(`/services/${slug}`);
    setShowDropdown(false);
    setQuery('');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        poster="/videos/hero-poster.jpg"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background/90 z-10" />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-serif font-bold gold-gradient mb-6">
            Temple of Technology
          </h1>
          <p className="text-xl md:text-2xl text-text-muted max-w-2xl mx-auto mb-10">
            AI‑powered solutions for the next generation of businesses.
          </p>
        </motion.div>

        {/* Search Bar with Dropdown above buttons */}
        <div className="flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="w-full max-w-2xl relative z-30"
            ref={wrapperRef}
          >
            <form onSubmit={handleSearch} className="input__container w-full relative">
              <div className="shadow__input glow-loop"></div>
              <button type="submit" className="input__button__shadow" aria-label="Search">
                <svg
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  height="20px"
                  width="20px"
                >
                  <path
                    d="M4 9a5 5 0 1110 0A5 5 0 014 9zm5-7a7 7 0 104.2 12.6.999.999 0 00.093.107l3 3a1 1 0 001.414-1.414l-3-3a.999.999 0 00-.107-.093A7 7 0 009 2z"
                    fillRule="evenodd"
                    fill="#17202A"
                  />
                </svg>
              </button>
              <input
                type="text"
                className="input__search"
                placeholder="Search 212+ services..."
                value={query}
                onChange={handleInputChange}
                onFocus={() => query.trim() && setShowDropdown(true)}
              />

              {/* Dropdown – positioned above the search bar, anchored to bottom of search container */}
              {showDropdown && suggestions.length > 0 && (
                <div className="absolute bottom-full left-0 right-0 mb-2 bg-background/95 backdrop-blur-xl border border-primary/20 rounded-xl overflow-hidden z-50 glass shadow-2xl">
                  {suggestions.map((s) => (
                    <button
                      key={s.slug}
                      onClick={() => handleSuggestionClick(s.slug)}
                      className="w-full text-left px-4 py-3 hover:bg-white/5 transition-colors text-text border-b border-white/5 last:border-b-0"
                    >
                      <div className="font-medium">{s.title}</div>
                      <div className="text-xs text-text-muted">{s.category}</div>
                    </button>
                  ))}
                  <button
                    onClick={() => router.push(`/search?q=${encodeURIComponent(query)}`)}
                    className="w-full text-left px-4 py-2 text-primary text-sm hover:bg-white/5 transition-colors border-t border-white/5"
                  >
                    View all results →
                  </button>
                </div>
              )}
            </form>
          </motion.div>

          {/* Buttons – now in a separate container below search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mt-6 relative z-20"
          >
            <Link href="/ki-bot" className="button">
              <div className="button-outer">
                <div className="button-inner">
                  <span>Explore KI Bot</span>
                </div>
              </div>
            </Link>
            <Link href="/services" className="button">
              <div className="button-outer">
                <div className="button-inner">
                  <span>Our Services</span>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
EOF

# ------------------------------------------------------------
# 2. Also adjust the input__container CSS to ensure dropdown has enough space
# ------------------------------------------------------------
echo -e "${BLUE}📄 Updating app/globals.css for dropdown positioning...${NC}"
if ! grep -q "input__container.*relative" app/globals.css; then
  # Add a small tweak to ensure the dropdown container is relative
  # and the dropdown has enough space above.
  cat >> app/globals.css << 'EOF'

/* Ensure the input container allows dropdown above */
.input__container {
  position: relative;
  z-index: 10;
}

/* Override any fixed height that might clip the dropdown */
.input__container .shadow__input,
.input__container .input__search {
  position: relative;
  z-index: 2;
}

/* The dropdown itself appears above the search bar */
.input__container .absolute.bottom-full {
  z-index: 50;
}
EOF
fi

# ------------------------------------------------------------
# 3. Final message
# ------------------------------------------------------------
echo -e "${GREEN}✅ Hero search dropdown fixed!${NC}"
echo -e "${BLUE}🔧 What was fixed:${NC}"
echo "  • The search bar and dropdown are now in a container with z-index: 30."
echo "  • Dropdown is positioned with 'bottom-full' and appears above the search bar."
echo "  • Buttons are in a separate container below with margin-top."
echo "  • The dropdown now shows fully above the buttons."
echo ""
echo -e "${BLUE}🚀 Next steps:${NC}"
echo "  1. Push to GitHub – changes will deploy."
echo "  2. On the homepage, start typing in the search bar."
echo "  3. The dropdown will appear above the search bar, and the buttons will remain visible below."
echo -e "${GREEN}🏛️ Your Temple of Technology now has a perfectly placed search dropdown!${NC}"