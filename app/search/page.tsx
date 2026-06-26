'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import servicesData from '@/lib/content/services-full.json';

interface Service {
  slug: string;
  title: string;
  description: string;
  category: string;
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const q = searchParams.get('q') || '';
  const [results, setResults] = useState<Service[]>([]);

  useEffect(() => {
    if (q.trim() === '') {
      setResults([]);
      return;
    }
    const lowerQuery = q.toLowerCase();
    const filtered = (servicesData as Service[]).filter(
      (s) =>
        s.title.toLowerCase().includes(lowerQuery) ||
        s.description.toLowerCase().includes(lowerQuery) ||
        s.category.toLowerCase().includes(lowerQuery)
    );
    setResults(filtered);
  }, [q]);

  return (
    <section className="min-h-screen pt-32 pb-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-serif gold-gradient mb-2">Search Results</h1>
        <p className="text-text-muted mb-8">
          {results.length} {results.length === 1 ? 'result' : 'results'} for "{q}"
        </p>

        {results.length === 0 && q && (
          <div className="glass p-8 text-center">
            <p className="text-text-muted">No results found for "{q}".</p>
            <p className="text-sm text-text-muted mt-2">Try adjusting your search terms.</p>
          </div>
        )}

        <div className="space-y-4">
          {results.map((service, index) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link href={`/services/${service.slug}`}>
                <div className="glass p-6 hover:border-primary transition-all duration-300 cursor-pointer">
                  <h3 className="text-xl font-semibold text-text">{service.title}</h3>
                  <p className="text-text-muted text-sm mt-1">{service.description}</p>
                  <div className="mt-2 text-xs text-primary">{service.category}</div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
