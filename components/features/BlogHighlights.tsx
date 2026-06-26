'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const posts = [
  { title: 'Distributed Inference Explained', date: 'June 20, 2026', excerpt: 'How WebLLM powers the future of AI.', color: '#e11d48' },
  { title: 'SEO in the Age of AI', date: 'June 18, 2026', excerpt: 'Optimising for answer engines.', color: '#f472b6' },
  { title: 'Building a Private AI Stack', date: 'June 15, 2026', excerpt: 'Privacy‑first AI with WebGPU.', color: '#fb923c' },
  { title: 'AI and Ethics', date: 'June 12, 2026', excerpt: 'Navigating the moral landscape.', color: '#facc15' },
  { title: 'WebGPU for Everyone', date: 'June 10, 2026', excerpt: 'Democratising GPU compute.', color: '#84cc16' },
  { title: 'Distributed Learning', date: 'June 8, 2026', excerpt: 'How federated learning works.', color: '#10b981' },
  { title: 'Zero‑Trust Security', date: 'June 5, 2026', excerpt: 'Building secure AI systems.', color: '#0ea5e9' },
  { title: 'Edge AI Trends', date: 'June 3, 2026', excerpt: 'What’s next for edge computing.', color: '#3b82f6' },
  { title: 'AI for Good', date: 'June 1, 2026', excerpt: 'Using AI to solve global issues.', color: '#8b5cf6' },
  { title: 'The Future of Work', date: 'May 30, 2026', excerpt: 'How AI will transform jobs.', color: '#a78bfa' },
];

export function BlogHighlights() {
  return (
    <section className="py-24 bg-background/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif gold-gradient mb-4">Latest Insights</h2>
          <p className="text-text-muted">Stay ahead with our expert articles.</p>
        </div>

        <div className="container-items">
          {posts.map((post, index) => (
            <motion.button
              key={index}
              className="item-color"
              style={{ '--color': post.color } as React.CSSProperties}
              aria-label={post.title}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              viewport={{ once: true }}
              onClick={() => window.location.href = `/blog/${post.title.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <span className="sr-only">{post.title}</span>
            </motion.button>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/blog" className="button">
            <div className="button-outer">
              <div className="button-inner">
                <span>View All Articles</span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
