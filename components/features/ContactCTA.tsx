'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export function ContactCTA() {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-primary/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-serif gold-gradient mb-4">Ready to Transform Your Business?</h2>
          <p className="text-text-muted text-lg mb-8">Let's build the future together.</p>
          <Link href="/contact" className="button">
            <div className="button-outer">
              <div className="button-inner">
                <span>Contact Us Now</span>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
