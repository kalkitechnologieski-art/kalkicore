'use client';

import { motion } from 'framer-motion';
import { Users, Target, Eye, Award, Sparkles, Cpu, Globe, Zap } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  const team = [
    { name: 'Nikhil Singh', role: 'Founder & Lead Developer', icon: Cpu },
    { name: 'Priya Patel', role: 'AI Researcher', icon: Sparkles },
    { name: 'Acharya Nikhil', role: 'Digital Strategist', icon: Globe },
    { name: 'Dr. Krishnakant', role: 'Healthcare AI Lead', icon: Award },
    { name: 'Rahul Sharma', role: 'Edge AI Engineer', icon: Zap },
  ];

  return (
    <section className="min-h-screen pt-32 pb-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-serif gold-gradient mb-4">About KALKI</h1>
          <p className="text-text-muted text-lg max-w-3xl mx-auto">
            We are the <strong>Temple of Technology</strong> – building the future of private, distributed, and intelligent systems.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="glass p-8 rounded-2xl border border-primary/20"
          >
            <Target className="w-10 h-10 text-primary mb-4" />
            <h2 className="text-2xl font-serif gold-gradient mb-3">Our Mission</h2>
            <p className="text-text-muted leading-relaxed">
              To democratize access to cutting‑edge AI by building a distributed, private, and ultra‑fast inference network that empowers businesses of all sizes.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass p-8 rounded-2xl border border-primary/20"
          >
            <Eye className="w-10 h-10 text-primary mb-4" />
            <h2 className="text-2xl font-serif gold-gradient mb-3">Our Vision</h2>
            <p className="text-text-muted leading-relaxed">
              A world where AI is open, private, and accessible to everyone – powered by the collective compute of millions of devices.
            </p>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 glass p-6 rounded-2xl mb-16">
          <div className="text-center">
            <div className="text-3xl font-bold gold-gradient">1,247</div>
            <div className="text-xs text-text-muted">Active Nodes</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold gold-gradient">342</div>
            <div className="text-xs text-text-muted">Clients</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold gold-gradient">67</div>
            <div className="text-xs text-text-muted">Countries</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold gold-gradient">212+</div>
            <div className="text-xs text-text-muted">Services</div>
          </div>
        </div>

        {/* Team */}
        <h2 className="text-3xl font-serif gold-gradient text-center mb-8">Meet the Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass p-6 rounded-2xl text-center hover:border-primary/30 transition-all group"
            >
              <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <member.icon className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mt-3">{member.name}</h3>
              <p className="text-xs text-text-muted">{member.role}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-serif gold-gradient mb-4">Join the Temple</h3>
          <p className="text-text-muted mb-6">Be part of the future of AI.</p>
          <Link href="/contact" className="button">
            <div className="button-outer">
              <div className="button-inner">
                <span>Get Started</span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
