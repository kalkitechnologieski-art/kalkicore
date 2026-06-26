'use client';

import { motion } from 'framer-motion';

const stats = [
  { label: 'Active Nodes', value: 1247, suffix: '+' },
  { label: 'AI Requests', value: 2.4, suffix: 'M' },
  { label: 'Clients', value: 342, suffix: '+' },
  { label: 'Countries', value: 67, suffix: '' },
];

export function Stats() {
  return (
    <section className="py-20 bg-background/60 backdrop-blur-sm border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold gold-gradient">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-text-muted mt-2 text-sm uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
