'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { Send, Sparkles, Cpu, Zap } from 'lucide-react';

export function ChatPreview() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! How can I help you today?' },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    // Simulate response
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Great question! Let me show you how KALKI AI can help.' }]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <section className="py-24 bg-background/80 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-8 h-8 text-primary" />
              <h2 className="text-4xl font-serif gold-gradient">KI Bot</h2>
            </div>
            <p className="text-text-muted text-lg mb-6">
              Experience the future of AI conversations – private, blazing‑fast, and intelligent.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3 text-text-muted"><Zap className="w-5 h-5 text-primary" /> Sub‑100ms inference</li>
              <li className="flex items-center gap-3 text-text-muted"><Cpu className="w-5 h-5 text-primary" /> Runs locally in your browser</li>
              <li className="flex items-center gap-3 text-text-muted"><Sparkles className="w-5 h-5 text-primary" /> Multi‑model support</li>
            </ul>
            <Link href="/ki-bot" className="button">
              <div className="button-outer">
                <div className="button-inner">
                  <span>Launch KI Bot</span>
                </div>
              </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass p-6 rounded-2xl border border-primary/20 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs uppercase tracking-wider text-text-muted">Live</span>
              </div>
              <span className="text-xs text-text-muted">KI Bot v3.0</span>
            </div>
            <div className="space-y-3 max-h-64 overflow-y-auto mb-4 pr-2 scrollbar-thin">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`p-3 rounded-lg max-w-[80%] ${msg.role === 'user' ? 'bg-primary/20 text-text' : 'bg-white/5 text-text'}`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-3 rounded-lg flex gap-1">
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything..."
                className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-text placeholder-text-muted focus:outline-none focus:border-primary"
              />
              <button
                onClick={handleSend}
                className="p-2 rounded-full bg-primary text-background hover:bg-primary/80 transition-colors"
                aria-label="Send"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
