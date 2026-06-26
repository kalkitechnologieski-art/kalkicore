'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import servicesData from '@/lib/content/services-full.json';
import { Search, Filter, ChevronDown, Sparkles } from 'lucide-react';

interface Service {
  slug: string;
  title: string;
  category: string;
  priceUSD: number;
  priceINR: number;
  description: string;
  features: string[];
}

export default function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'latest' | 'price-low' | 'price-high'>('latest');

  const categories = useMemo(() => {
    const cats = ['All', ...new Set(servicesData.map((s: Service) => s.category))];
    return cats;
  }, []);

  const filteredServices = useMemo(() => {
    let filtered = servicesData as Service[];
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        s =>
          s.title.toLowerCase().includes(term) ||
          s.description.toLowerCase().includes(term) ||
          s.category.toLowerCase().includes(term)
      );
    }
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(s => s.category === selectedCategory);
    }
    if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.priceUSD - b.priceUSD);
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.priceUSD - a.priceUSD);
    }
    return filtered;
  }, [searchTerm, selectedCategory, sortBy]);

  return (
    <section className="min-h-screen pt-0 bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background pt-32 pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(233,180,76,0.08),transparent_70%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 glass text-xs uppercase tracking-widest text-primary border border-primary/20 rounded-full mb-6">
              <Sparkles className="w-3 h-3 inline mr-2" />
              Temple of Technology
            </span>
            <h1 className="text-5xl md:text-7xl font-serif gold-gradient mb-4">
              EXPLORE TEMPLE OF TECHNOLOGY
            </h1>
            <p className="text-xl text-text-muted max-w-2xl mx-auto">
              Discover {servicesData.length}+ AI‑powered services to accelerate your business.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between glass p-4 rounded-2xl border border-white/5">
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent border border-white/10 rounded-full pl-10 pr-4 py-2 text-text placeholder-text-muted focus:outline-none focus:border-primary"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-text-muted" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-transparent border border-white/10 rounded-full px-4 py-2 text-text focus:outline-none focus:border-primary"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat} className="bg-background">{cat}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <ChevronDown className="w-4 h-4 text-text-muted" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent border border-white/10 rounded-full px-4 py-2 text-text focus:outline-none focus:border-primary"
              >
                <option value="latest" className="bg-background">Latest</option>
                <option value="price-low" className="bg-background">Price: Low → High</option>
                <option value="price-high" className="bg-background">Price: High → Low</option>
              </select>
            </div>
          </div>
          <div className="text-sm text-text-muted">{filteredServices.length} services</div>
        </div>
      </div>

      {/* Cards Grid – EXACT HTML */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
          <AnimatePresence>
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: (index % 12) * 0.04, duration: 0.4 }}
                className="card"
              >
                <div className="card__border"></div>
                <div className="card_title__container">
                  <span className="card_title">{service.title}</span>
                  <p className="card_paragraph">{service.description}</p>
                </div>
                <hr className="line" />
                <ul className="card__list">
                  {service.features.slice(0, 5).map((feature, i) => (
                    <li key={i} className="card__list_item">
                      <span className="check">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="check_svg">
                          <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span className="list_text">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-between items-center mb-2 px-1">
                  <span className="text-xs text-text-muted">From</span>
                  <span className="text-sm font-bold text-primary">${service.priceUSD} <span className="text-xs text-text-muted">/ ₹{service.priceINR.toLocaleString()}</span></span>
                </div>
                <Link href={`/services/${service.slug}`} className="button">Book a Call</Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        {filteredServices.length === 0 && (
          <div className="text-center py-20 glass p-8 rounded-2xl">
            <h3 className="text-2xl font-serif gold-gradient">No services found</h3>
            <p className="text-text-muted mt-2">Try adjusting your search or filter.</p>
          </div>
        )}
      </div>
    </section>
  );
}
