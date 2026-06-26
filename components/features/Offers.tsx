'use client';

import { motion } from 'framer-motion';

const offers = [
  { title: 'AI Ignite', desc: 'Start your AI journey', price: '₹4,999' },
  { title: 'Pro Pulse', desc: 'Scale your business', price: '₹9,999' },
  { title: 'Enterprise Edge', desc: 'Full control & support', price: 'Custom' },
  { title: 'Hackathon Hub', desc: 'Build the future', price: 'Free' },
  { title: 'Workshop Wave', desc: 'Learn from experts', price: '₹2,499' },
  { title: 'VIP Vortex', desc: 'Priority access', price: '₹14,999' },
];

// KI Logo SVG (stylised "K" with a neural node)
const KILogo = () => (
  <svg
    width="64px"
    height="64px"
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
  >
    <defs>
      <linearGradient id="kiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#E9B44C" />
        <stop offset="100%" stopColor="#06B6D4" />
      </linearGradient>
    </defs>
    <circle cx="50" cy="50" r="45" stroke="url(#kiGrad)" strokeWidth="4" fill="none" />
    <text x="50" y="68" fontFamily="Inter, sans-serif" fontSize="48" fontWeight="700" fill="url(#kiGrad)" textAnchor="middle">K</text>
    <circle cx="50" cy="50" r="8" fill="url(#kiGrad)" opacity="0.3">
      <animate attributeName="r" values="8;12;8" dur="2s" repeatCount="indefinite" />
    </circle>
  </svg>
);

export function Offers() {
  return (
    <section className="py-24 bg-background/80 backdrop-blur-sm border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif gold-gradient mb-4">Exclusive Offers</h2>
          <p className="text-text-muted">Grab the best deals on our AI services.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
          {offers.map((offer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col items-center"
            >
              <div className="m2 mb-2">
                <div className="logo">
                  <KILogo />
                  <span>{offer.price}</span>
                </div>
              </div>
              <div className="text-center mt-2">
                <h3 className="text-lg font-semibold text-text">{offer.title}</h3>
                <p className="text-sm text-text-muted">{offer.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
