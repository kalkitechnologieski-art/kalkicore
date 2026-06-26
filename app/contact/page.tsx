'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, CheckCircle, MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { supabase } from '@/lib/api/supabase';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormData = z.infer<typeof schema>;

export default function ContactPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const [success, setSuccess] = useState(false);

  const onSubmit = async (data: FormData) => {
    try {
      const { error } = await supabase.from('leads').insert([
        { name: data.name, email: data.email, phone: data.phone, service: data.service, message: data.message }
      ]);
      if (error) throw error;
      setSuccess(true);
      reset();
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error('Form submission error:', err);
    }
  };

  return (
    <section className="min-h-screen pt-32 pb-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left – Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-serif gold-gradient mb-4">Get in Touch</h1>
            <p className="text-text-muted text-lg mb-8">
              Ready to transform your business? Let's talk.
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-4 glass p-4 rounded-2xl hover:border-primary/30 transition-all">
                <div className="p-3 bg-primary/10 rounded-full">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Address</h3>
                  <p className="text-text-muted text-sm">123 AI Avenue, Mumbai, India</p>
                </div>
              </div>
              <div className="flex items-center gap-4 glass p-4 rounded-2xl hover:border-primary/30 transition-all">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <p className="text-text-muted text-sm">+91 22 6897 5412</p>
                </div>
              </div>
              <div className="flex items-center gap-4 glass p-4 rounded-2xl hover:border-primary/30 transition-all">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-text-muted text-sm">hello@kalki.tech</p>
                </div>
              </div>
              <div className="flex items-center gap-4 glass p-4 rounded-2xl hover:border-primary/30 transition-all">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Working Hours</h3>
                  <p className="text-text-muted text-sm">Mon–Sat: 10:00 – 19:00 IST</p>
                </div>
              </div>
              <div className="glass p-4 rounded-2xl border border-primary/20">
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5 text-primary" />
                  <span className="text-sm">Or use the <strong>KALKI SUPPORT</strong> widget in the bottom‑right corner.</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right – Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass p-8 rounded-2xl border border-white/5"
          >
            {success ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-12"
              >
                <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-serif gold-gradient">Thank You!</h3>
                <p className="text-text-muted">We'll get back to you within 24 hours.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name *</label>
                  <input
                    {...register('name')}
                    className="w-full bg-transparent border border-white/10 rounded-xl px-4 py-3 text-text placeholder-text-muted focus:outline-none focus:border-primary"
                    placeholder="Enter your name"
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email Address *</label>
                  <input
                    {...register('email')}
                    className="w-full bg-transparent border border-white/10 rounded-xl px-4 py-3 text-text placeholder-text-muted focus:outline-none focus:border-primary"
                    placeholder="you@example.com"
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Phone Number</label>
                  <input
                    {...register('phone')}
                    className="w-full bg-transparent border border-white/10 rounded-xl px-4 py-3 text-text placeholder-text-muted focus:outline-none focus:border-primary"
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Service Interested In *</label>
                  <select
                    {...register('service')}
                    className="w-full bg-transparent border border-white/10 rounded-xl px-4 py-3 text-text focus:outline-none focus:border-primary"
                  >
                    <option value="" className="bg-background">Select a service</option>
                    <option value="ai-automation" className="bg-background">AI Automation</option>
                    <option value="seo-services" className="bg-background">SEO Services</option>
                    <option value="web-development" className="bg-background">Web Development</option>
                    <option value="digital-marketing" className="bg-background">Digital Marketing</option>
                    <option value="other" className="bg-background">Other</option>
                  </select>
                  {errors.service && <p className="text-red-400 text-xs mt-1">{errors.service.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Message *</label>
                  <textarea
                    {...register('message')}
                    rows={4}
                    className="w-full bg-transparent border border-white/10 rounded-xl px-4 py-3 text-text placeholder-text-muted focus:outline-none focus:border-primary resize-none"
                    placeholder="Tell us about your project..."
                  />
                  {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="button w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="button-outer">
                    <div className="button-inner">
                      <span className="flex items-center justify-center gap-2">
                        {isSubmitting ? 'Sending...' : <><Send className="w-4 h-4" /> Send Message</>}
                      </span>
                    </div>
                  </div>
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
