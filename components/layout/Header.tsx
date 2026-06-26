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
            className="fixed top-0 right-0 h-full w-4/5 max-w-sm glass border-l border-primary/20 p-6 md:hidden overflow-y-auto"
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
