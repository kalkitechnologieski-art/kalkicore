'use client';

import { motion } from 'framer-motion';

// Client data: 5 clients + 1 "500+ Clients" card
const items = [
  {
    type: 'client',
    name: 'Puneet Dubey',
    role: 'Astro Puneet Guru Ji',
    text: 'KALKI AI transformed our online presence. Incredible results!',
    angle: -25,
  },
  {
    type: 'client',
    name: 'Acharya Nikhil',
    role: 'Digital Strategist',
    text: 'The AI chatbot is a game‑changer for our business.',
    angle: -15,
  },
  {
    type: 'client',
    name: 'Dr. Krishnakant',
    role: 'Healthcare Professional',
    text: 'Fast, reliable, and truly intelligent. Highly recommend.',
    angle: -5,
  },
  {
    type: 'client',
    name: 'Rahul Sharma',
    role: 'Startup Founder',
    text: 'The distributed node network is revolutionary.',
    angle: 5,
  },
  {
    type: 'client',
    name: 'Priya Patel',
    role: 'Marketing Head',
    text: 'Our revenue grew 300% in 6 months with KALKI AI.',
    angle: 15,
  },
  {
    type: 'count',
    label: '500+ Clients',
    icon: 'users',
    text: 'Trusted by businesses worldwide.',
    angle: 25,
  },
];

// SVG user icon (simple silhouette)
const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

// SVG group icon (for 500+ clients)
const GroupIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
  </svg>
);

export function Testimonials() {
  return (
    <section className="py-24 bg-background/80 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif gold-gradient mb-4">What Our Clients Say</h2>
          <p className="text-text-muted">Real stories from real people.</p>
        </div>

        <motion.div
          className="fan-container"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {items.map((item, index) => {
            const isCount = item.type === 'count';
            const angle = item.angle || 0;
            return (
              <motion.div
                key={index}
                className="glass-card"
                style={{ '--r': angle } as React.CSSProperties}
                initial={{ opacity: 0, scale: 0.8, rotate: angle }}
                whileInView={{ opacity: 1, scale: 1, rotate: angle }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                data-text={isCount ? item.label : item.name}
              >
                {isCount ? <GroupIcon /> : <UserIcon />}
                {!isCount && (
                  <>
                    <div className="testimonial-text">"{item.text}"</div>
                    <div className="client-name">{item.name}</div>
                    <div className="client-role">{item.role}</div>
                  </>
                )}
                {isCount && (
                  <>
                    <div className="testimonial-text" style={{ fontSize: '1rem', fontWeight: 600 }}>
                      {item.text}
                    </div>
                    <div className="client-name" style={{ fontSize: '1.4rem', marginTop: 0 }}>
                      {item.label}
                    </div>
                  </>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
