'use client';

import { motion } from 'framer-motion';

const features = [
  { title: 'Private AI', desc: 'Your data stays local. Zero cloud exposure.' },
  { title: 'Ultra‑Fast', desc: 'Sub‑100ms inference powered by WebGPU.' },
  { title: 'Secure', desc: 'End‑to‑end encryption with zero‑trust architecture.' },
  { title: 'Global Network', desc: 'Distributed nodes across 60+ countries.' },
  { title: 'Smart Analytics', desc: 'Real‑time dashboards for your business.' },
  { title: 'Mobile Ready', desc: 'Optimised for every screen, everywhere.' },
];

export function Features() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif gold-gradient mb-4">Why KALKI AI</h2>
          <p className="text-text-muted">Built for the future, powered by you.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="rotating-card"
            >
              <h2>{feature.title}</h2>
              <p>{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
