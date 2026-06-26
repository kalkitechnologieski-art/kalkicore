'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, Calendar, User, Tag, ChevronRight, BookOpen } from 'lucide-react';
import blogPosts from '@/lib/content/blog.json';

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = useMemo(() => {
    const cats = ['All', ...new Set(blogPosts.map(p => p.category))];
    return cats;
  }, []);

  const filteredPosts = useMemo(() => {
    let filtered = blogPosts;
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        p =>
          p.title.toLowerCase().includes(term) ||
          p.excerpt.toLowerCase().includes(term) ||
          p.category.toLowerCase().includes(term)
      );
    }
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    return filtered;
  }, [searchTerm, selectedCategory]);

  return (
    <section className="min-h-screen pt-32 pb-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <BookOpen className="w-12 h-12 text-primary opacity-50" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif gold-gradient mb-4">Insights & Updates</h1>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Explore articles on AI, technology, and business growth.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 glass p-4 rounded-2xl mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent border border-white/10 rounded-full pl-10 pr-4 py-2 text-text placeholder-text-muted focus:outline-none focus:border-primary"
            />
          </div>
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

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="glass rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
            >
              <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center relative">
                <span className="text-5xl opacity-20">📄</span>
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                <span className="absolute bottom-3 right-3 text-xs bg-background/80 px-2 py-1 rounded-full text-primary border border-primary/20">
                  {post.category}
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-xs text-text-muted mb-3">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><User className="w-3 h-3" /> {post.author}</span>
                </div>
                <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="text-text-muted text-sm mt-2">{post.excerpt}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 text-primary text-sm font-medium mt-4 group-hover:gap-2 transition-all"
                >
                  Read more <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
        {filteredPosts.length === 0 && (
          <div className="text-center py-20 glass p-8 rounded-2xl">
            <h3 className="text-2xl font-serif gold-gradient">No articles found</h3>
            <p className="text-text-muted mt-2">Try adjusting your search or filter.</p>
          </div>
        )}
      </div>
    </section>
  );
}
