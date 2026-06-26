'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, ShoppingBag, Image, Heart, ThumbsUp, ThumbsDown, Share2, Send, Plus, Users, Award, Sparkles, Zap, Cpu, Crown } from 'lucide-react';
import Link from 'next/link';

type Tab = 'community' | 'marketplace' | 'social';

// Mock data
const communityPosts = [
  { id: '1', author: 'Nikhil Singh', title: 'KALKI 6.0 Launched', content: 'The fastest inference engine is now live.', upvotes: 42, downvotes: 3, comments: 12, created_at: '2026-06-24' },
  { id: '2', author: 'Priya Patel', title: 'AI for Everyone', content: 'Democratizing AI with WebLLM.', upvotes: 28, downvotes: 1, comments: 8, created_at: '2026-06-23' },
  { id: '3', author: 'Acharya Nikhil', title: 'SEO in AI Era', content: 'How generative AI is changing SEO.', upvotes: 35, downvotes: 2, comments: 15, created_at: '2026-06-22' },
  { id: '4', author: 'Dr. Krishnakant', title: 'Healthcare AI', content: 'AI solutions for medical diagnostics.', upvotes: 19, downvotes: 0, comments: 5, created_at: '2026-06-21' },
  { id: '5', author: 'Rahul Sharma', title: 'Edge AI Trends', content: 'What’s next for on‑device AI.', upvotes: 27, downvotes: 4, comments: 9, created_at: '2026-06-20' },
  { id: '6', author: 'Acharya Nikhil', title: 'WebGPU Revolution', content: 'WebGPU is unlocking massive performance.', upvotes: 33, downvotes: 1, comments: 11, created_at: '2026-06-19' },
  { id: '7', author: 'Priya Patel', title: 'AI Ethics', content: 'Building fair and transparent AI.', upvotes: 22, downvotes: 0, comments: 7, created_at: '2026-06-18' },
  { id: '8', author: 'Nikhil Singh', title: 'Distributed Inference', content: 'How we shard models across nodes.', upvotes: 45, downvotes: 2, comments: 18, created_at: '2026-06-17' },
];

const marketplaceItems = [
  { id: '1', name: 'AI Chatbot Pro', description: 'Intelligent chatbot for your business.', price: 299, seller: 'KALKI Labs', badge: 'Premium' },
  { id: '2', name: 'SEO Optimizer Suite', description: 'Automated SEO toolkit with AI.', price: 199, seller: 'KALKI Labs', badge: 'Popular' },
  { id: '3', name: 'WebLLM Starter', description: 'Pre‑configured WebLLM models.', price: 149, seller: 'OpenAI Community', badge: 'Best Value' },
  { id: '4', name: 'Data Pipeline Kit', description: 'ETL pipelines for AI training.', price: 399, seller: 'DataFlow Inc.', badge: 'Pro' },
  { id: '5', name: 'Analytics Dashboard', description: 'Real‑time AI analytics.', price: 249, seller: 'KALKI Labs', badge: 'Premium' },
  { id: '6', name: 'Model Fine‑Tuner', description: 'Fine‑tune LLMs on custom data.', price: 499, seller: 'ML Masters', badge: 'Expert' },
  { id: '7', name: 'AI Content Generator', description: 'Generate high‑quality content with AI.', price: 159, seller: 'ContentAI', badge: 'Popular' },
  { id: '8', name: 'Computer Vision Kit', description: 'Image recognition and analysis.', price: 329, seller: 'Vision Labs', badge: 'Premium' },
  { id: '9', name: 'Voice Assistant SDK', description: 'Voice‑enabled AI assistants.', price: 259, seller: 'VoiceTech', badge: 'New' },
  { id: '10', name: 'Edge AI Module', description: 'Run AI on edge devices.', price: 449, seller: 'EdgeAI Inc.', badge: 'Pro' },
  { id: '11', name: 'GAN Image Studio', description: 'Generate realistic images with GANs.', price: 379, seller: 'ImagiNet', badge: 'Premium' },
  { id: '12', name: 'NLP Pipeline', description: 'Complete NLP processing pipeline.', price: 299, seller: 'LinguaAI', badge: 'Popular' },
];

const socialPosts = [
  { id: '1', author: 'Acharya Nikhil', caption: 'Exploring the future of AI.', likes: 56, comments: 7, views: 332 },
  { id: '2', author: 'Dr. Krishnakant', caption: 'Healthcare AI in action.', likes: 34, comments: 4, views: 221 },
  { id: '3', author: 'Priya Patel', caption: 'My new AI assistant.', likes: 42, comments: 6, views: 298 },
  { id: '4', author: 'Nikhil Singh', caption: 'KALKI 6.0 demo live.', likes: 78, comments: 12, views: 511 },
  { id: '5', author: 'Rahul Sharma', caption: 'Edge AI is the future.', likes: 23, comments: 3, views: 189 },
  { id: '6', author: 'Acharya Nikhil', caption: 'Building the Temple of Technology.', likes: 51, comments: 8, views: 367 },
  { id: '7', author: 'Priya Patel', caption: 'AI for everyone.', likes: 39, comments: 5, views: 276 },
  { id: '8', author: 'Nikhil Singh', caption: 'Distributed inference is here.', likes: 64, comments: 10, views: 448 },
  { id: '9', author: 'Dr. Krishnakant', caption: 'Medical AI breakthrough.', likes: 47, comments: 6, views: 303 },
  { id: '10', author: 'Rahul Sharma', caption: 'WebGPU performance gains.', likes: 31, comments: 4, views: 215 },
  { id: '11', author: 'Acharya Nikhil', caption: 'The future of SEO.', likes: 28, comments: 3, views: 198 },
  { id: '12', author: 'Nikhil Singh', caption: 'KALKI 6.0 architecture.', likes: 55, comments: 9, views: 412 },
];

export default function KICloudPage() {
  const [activeTab, setActiveTab] = useState<Tab>('community');

  const tabs = [
    { id: 'community' as Tab, label: 'Community', icon: MessageSquare },
    { id: 'marketplace' as Tab, label: 'Marketplace', icon: ShoppingBag },
    { id: 'social' as Tab, label: 'Social Feed', icon: Image },
  ];

  return (
    <section className="min-h-screen pt-32 pb-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif gold-gradient mb-4">KI Cloud</h1>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">Connect, share, and grow with the community.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 glass p-6 rounded-2xl border border-white/5 mb-10">
          <div className="text-center">
            <div className="text-2xl font-bold gold-gradient">1,247</div>
            <div className="text-xs text-text-muted">Active Nodes</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold gold-gradient">342</div>
            <div className="text-xs text-text-muted">Members</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold gold-gradient">67</div>
            <div className="text-xs text-text-muted">Countries</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 glass p-1.5 rounded-2xl max-w-md mx-auto mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-2 rounded-xl transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-primary/20 text-primary border border-primary/30'
                  : 'text-text-muted hover:text-text hover:bg-white/5'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="text-sm font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'community' && (
            <motion.div
              key="community"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="flex justify-end">
                <button className="flex items-center gap-2 glass px-4 py-2 rounded-xl hover:border-primary transition-colors">
                  <Plus className="w-4 h-4" /> New Post
                </button>
              </div>
              {communityPosts.map((post) => (
                <div key={post.id} className="glass p-6 rounded-2xl hover:border-primary/30 transition-all duration-300 group">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-semibold">{post.title}</h3>
                      <p className="text-text-muted text-sm mt-1">{post.content}</p>
                      <div className="flex items-center gap-4 mt-3 text-xs text-text-muted">
                        <span>By {post.author}</span>
                        <span>•</span>
                        <span>{post.created_at}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="flex items-center gap-1 text-sm hover:text-primary transition-colors">
                        <ThumbsUp className="w-4 h-4" /> {post.upvotes}
                      </button>
                      <button className="flex items-center gap-1 text-sm hover:text-primary transition-colors">
                        <ThumbsDown className="w-4 h-4" /> {post.downvotes}
                      </button>
                      <button className="flex items-center gap-1 text-sm hover:text-primary transition-colors">
                        <MessageSquare className="w-4 h-4" /> {post.comments}
                      </button>
                      <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
                        <Share2 className="w-4 h-4 text-text-muted" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'marketplace' && (
            <motion.div
              key="marketplace"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-serif gold-gradient">AI Services Marketplace</h2>
                <span className="text-sm text-text-muted">{marketplaceItems.length} items</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {marketplaceItems.map((item) => (
                  <div key={item.id} className="container-premium">
                    <div className="card_box group">
                      <span data-badge={item.badge}></span>
                      <div>
                        <h3 className="text-lg font-bold">{item.name}</h3>
                        <p className="text-xs text-text-muted mt-1">{item.description}</p>
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-primary font-bold">${item.price}</span>
                          <span className="text-xs text-text-muted">by {item.seller}</span>
                        </div>
                        <button className="w-full mt-3 button text-xs py-1">
                          <div className="button-outer">
                            <div className="button-inner">
                              <span>Get This</span>
                            </div>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'social' && (
            <motion.div
              key="social"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-serif gold-gradient">Community Feed</h2>
                <span className="text-sm text-text-muted">{socialPosts.length} posts</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {socialPosts.map((post) => (
                  <div key={post.id} className="social-wrapper">
                    <div className="social-card">
                      <div className="social-fl">
                        <div className="fullscreen">
                          <svg viewBox="0 0 100 100" className="fullscreen_svg">
                            <path d="M3.563-.004a3.573 3.573 0 0 0-3.527 4.09l-.004-.02v28.141c0 1.973 1.602 3.57 3.57 3.57s3.57-1.598 3.57-3.57V12.218v.004l22.461 22.461a3.571 3.571 0 0 0 6.093-2.527c0-.988-.398-1.879-1.047-2.523L12.218 7.172h19.989c1.973 0 3.57-1.602 3.57-3.57s-1.598-3.57-3.57-3.57H4.035a3.008 3.008 0 0 0-.473-.035zM96.333 0l-.398.035.02-.004h-28.16a3.569 3.569 0 0 0-3.57 3.57 3.569 3.569 0 0 0 3.57 3.57h19.989L65.323 29.632a3.555 3.555 0 0 0-1.047 2.523 3.571 3.571 0 0 0 6.093 2.527L92.83 12.221v19.985a3.569 3.569 0 0 0 3.57 3.57 3.569 3.569 0 0 0 3.57-3.57V4.034v.004a3.569 3.569 0 0 0-3.539-4.043l-.105.004zM3.548 64.23A3.573 3.573 0 0 0 .029 67.8v28.626-.004l.016.305-.004-.016.004.059v-.012l.039.289-.004-.023.023.121-.004-.023c.074.348.191.656.34.938l-.008-.02.055.098-.008-.02.148.242-.008-.012.055.082-.008-.012c.199.285.43.531.688.742l.008.008.031.027.004.004c.582.461 1.32.742 2.121.762h.004l.078.004h28.61a3.569 3.569 0 0 0 3.57-3.57 3.569 3.569 0 0 0-3.57-3.57H12.224l22.461-22.461a3.569 3.569 0 0 0-2.492-6.125l-.105.004h.008a3.562 3.562 0 0 0-2.453 1.074L7.182 87.778V67.793a3.571 3.571 0 0 0-3.57-3.57h-.055.004zm92.805 0a3.573 3.573 0 0 0-3.519 3.57v19.993-.004L70.373 65.328a3.553 3.553 0 0 0-2.559-1.082h-.004a3.573 3.573 0 0 0-3.566 3.57c0 1.004.414 1.91 1.082 2.555l22.461 22.461H67.802a3.57 3.57 0 1 0 0 7.14h28.606c.375 0 .742-.059 1.082-.168l-.023.008.027-.012-.02.008.352-.129-.023.008.039-.02-.02.008.32-.156-.02.008.023-.016-.008.008c.184-.102.34-.207.488-.32l-.008.008.137-.113-.008.004.223-.211.008-.008c.156-.164.301-.34.422-.535l.008-.016-.008.016.008-.02.164-.285.008-.02-.008.016.008-.02c.098-.188.184-.406.246-.633l.008-.023-.004.008.008-.023a3.44 3.44 0 0 0 .121-.852v-.004l.004-.078V67.804a3.569 3.569 0 0 0-3.57-3.57h-.055.004z" />
                          </svg>
                        </div>
                      </div>
                      <div className="social-data">
                        <div className="social-img">
                          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 80 80">
                            <g strokeWidth="2.00" fill="none" strokeLinecap="butt">
                              <path stroke="#59afb1" d="M 14.06 0.00 Q 13.33 4.09 13.93 7.52 A 1.04 1.02 -78.7 0 0 14.37 8.19 L 32.87 20.19" />
                              <path stroke="#4fa6a8" d="M 32.87 20.19 L 42.25 26.79" />
                              <path stroke="#69cbc0" d="M 42.25 26.79 C 41.40 28.26 24.14 34.92 21.32 36.20" />
                              <path stroke="#6fcdbb" d="M 21.32 36.20 Q 15.81 38.21 11.00 41.21" />
                              <path stroke="#5ec8ab" d="M 11.00 41.21 L 9.75 40.96" />
                              <path stroke="#5cae9e" d="M 9.75 40.96 Q 5.99 37.71 1.71 35.19 A 1.00 1.00 0.0 0 0 0.22 35.85 L 0.00 36.94" />
                              <path stroke="#3190a6" d="M 79.95 6.12 L 62.46 11.32" />
                              <path stroke="#3a96a3" d="M 62.46 11.32 Q 47.42 14.67 32.87 20.19" />
                              <path stroke="#22a3be" d="M 80.00 11.06 L 64.50 17.46" />
                              <path stroke="#28879d" d="M 64.50 17.46 L 62.46 11.32" />
                              <path stroke="#2ba9bb" d="M 64.50 17.46 L 43.00 26.96" />
                              <path stroke="#4ab2b2" d="M 43.00 26.96 L 42.25 26.79" />
                              <path stroke="#45ced3" d="M 80.00 52.31 Q 71.64 45.91 62.46 40.67" />
                              <path stroke="#13636e" d="M 62.46 40.67 Q 62.43 36.88 58.50 36.79" />
                              <path stroke="#45ced3" d="M 58.50 36.79 Q 50.07 32.95 43.00 26.96" />
                              <path stroke="#326b65" d="M 58.50 36.79 Q 55.85 40.04 56.86 44.07 C 57.53 46.71 60.02 47.68 61.77 45.19 Q 61.91 44.99 61.94 44.74 L 62.46 40.67" />
                              <path stroke="#59d4b5" d="M 40.81 79.86 Q 46.22 74.94 52.34 70.94 A 1.00 1.00 0.0 0 0 52.39 69.30 Q 44.74 63.65 43.10 62.62 Q 34.11 56.98 32.50 55.79" />
                              <path stroke="#6ad8c5" d="M 32.50 55.79 C 36.74 55.42 30.64 48.79 29.79 47.81 C 27.54 45.21 26.34 42.09 24.05 39.44 Q 22.66 37.82 21.32 36.20" />
                              <path stroke="#326b65" d="M 48.75 39.07 A 2.30 2.30 0.0 0 0 46.45 36.77 L 46.05 36.77 A 2.30 2.30 0.0 0 0 43.75 39.07 L 43.75 44.21 A 2.30 2.30 0.0 0 0 46.05 46.51 L 46.45 46.51 A 2.30 2.30 0.0 0 0 48.75 44.21 L 48.75 39.07" />
                              <path stroke="#326b65" d="M 58.63 54.41 C 54.90 57.18 50.72 56.87 46.91 54.39 A 1.00 0.99 51.9 0 0 46.04 54.28 C 42.37 55.52 43.88 58.13 46.28 59.41 Q 53.38 63.20 60.15 58.94 C 62.54 57.43 62.47 54.80 59.41 54.23 A 1.00 1.00 0.0 0 0 58.63 54.41" />
                              <path stroke="#4bb793" d="M 9.75 40.96 Q 5.15 43.50 0.05 44.46" />
                              <path stroke="#5fd6b0" d="M 32.50 55.79 L 11.00 41.21" />
                              <path stroke="#48d08e" d="M 11.19 80.00 Q 12.51 79.61 11.57 78.67 Q 5.99 73.11 1.70 65.70 C 1.28 64.97 0.74 64.76 0.00 65.19" />
                            </g>
                            <path fill="#6ebfb6" d="M 0.00 0.00 L 14.06 0.00 Q 13.33 4.09 13.93 7.52 A 1.04 1.02 -78.7 0 0 14.37 8.19 L 32.87 20.19 L 42.25 26.79 C 41.40 28.26 24.14 34.92 21.32 36.20 Q 15.81 38.21 11.00 41.21 L 9.75 40.96 Q 5.99 37.71 1.71 35.19 A 1.00 1.00 0.0 0 0 0.22 35.85 L 0.00 36.94 L 0.00 0.00 Z" />
                            <path fill="#439eac" d="M 14.06 0.00 L 80.00 0.00 L 79.95 6.12 L 62.46 11.32 Q 47.42 14.67 32.87 20.19 L 14.37 8.19 A 1.04 1.02 -78.7 0 1 13.93 7.52 Q 13.33 4.09 14.06 0.00 Z" />
                            <path fill="#1f81a0" d="M 79.95 6.12 L 80.00 11.06 L 64.50 17.46 L 62.46 11.32 L 79.95 6.12 Z" />
                            <path fill="#308d99" d="M 62.46 11.32 L 64.50 17.46 L 43.00 26.96 L 42.25 26.79 L 32.87 20.19 Q 47.42 14.67 62.46 11.32 Z" />
                            <path fill="#25c5dc" d="M 80.00 11.06 L 80.00 52.31 Q 71.64 45.91 62.46 40.67 Q 62.43 36.88 58.50 36.79 Q 50.07 32.95 43.00 26.96 L 64.50 17.46 L 80.00 11.06 Z" />
                            <path fill="#64d6ca" d="M 42.25 26.79 L 43.00 26.96 Q 50.07 32.95 58.50 36.79 Q 55.85 40.04 56.86 44.07 C 57.53 46.71 60.02 47.68 61.77 45.19 Q 61.91 44.99 61.94 44.74 L 62.46 40.67 Q 71.64 45.91 80.00 52.31 L 80.00 80.00 L 40.81 79.86 Q 46.22 74.94 52.34 70.94 A 1.00 1.00 0.0 0 0 52.39 69.30 Q 44.74 63.65 43.10 62.62 Q 34.11 56.98 32.50 55.79 C 36.74 55.42 30.64 48.79 29.79 47.81 C 27.54 45.21 26.34 42.09 24.05 39.44 Q 22.66 37.82 21.32 36.20 C 24.14 34.92 41.40 28.26 42.25 26.79 Z M 48.75 39.07 A 2.30 2.30 0.0 0 0 46.45 36.77 L 46.05 36.77 A 2.30 2.30 0.0 0 0 43.75 39.07 L 43.75 44.21 A 2.30 2.30 0.0 0 0 46.05 46.51 L 46.45 46.51 A 2.30 2.30 0.0 0 0 48.75 44.21 L 48.75 39.07 Z M 58.63 54.41 C 54.90 57.18 50.72 56.87 46.91 54.39 A 1.00 0.99 51.9 0 0 46.04 54.28 C 42.37 55.52 43.88 58.13 46.28 59.41 Q 53.38 63.20 60.15 58.94 C 62.54 57.43 62.47 54.80 59.41 54.23 A 1.00 1.00 0.0 0 0 58.63 54.41 Z" />
                            <path fill="#499c85" d="M 9.75 40.96 Q 5.15 43.50 0.05 44.46 L 0.00 36.94 L 0.22 35.85 A 1.00 1.00 0.0 0 1 1.71 35.19 Q 5.99 37.71 9.75 40.96 Z" />
                            <path fill="#70dac0" d="M 21.32 36.20 Q 22.66 37.82 24.05 39.44 C 26.34 42.09 27.54 45.21 29.79 47.81 C 30.64 48.79 36.74 55.42 32.50 55.79 L 11.00 41.21 Q 15.81 38.21 21.32 36.20 Z" />
                            <rect fill="#000000" x="43.75" y="36.77" width="5.00" height="9.74" rx="2.30" />
                            <path fill="#000000" d="M 58.50 36.79 Q 62.43 36.88 62.46 40.67 L 61.94 44.74 Q 61.91 44.99 61.77 45.19 C 60.02 47.68 57.53 46.71 56.86 44.07 Q 55.85 40.04 58.50 36.79 Z" />
                            <path fill="#4dd1a0" d="M 9.75 40.96 L 11.00 41.21 L 32.50 55.79 Q 34.11 56.98 43.10 62.62 Q 44.74 63.65 52.39 69.30 A 1.00 1.00 0.0 0 1 52.34 70.94 Q 46.22 74.94 40.81 79.86 L 11.19 80.00 Q 12.51 79.61 11.57 78.67 Q 5.99 73.11 1.70 65.70 C 1.28 64.97 0.74 64.76 0.00 65.19 L 0.05 44.46 Q 5.15 43.50 9.75 40.96 Z" />
                            <path fill="#000000" d="M 46.91 54.39 C 50.72 56.87 54.90 57.18 58.63 54.41 A 1.00 1.00 0.0 0 1 59.41 54.23 C 62.47 54.80 62.54 57.43 60.15 58.94 Q 53.38 63.20 46.28 59.41 C 43.88 58.13 42.37 55.52 46.04 54.28 A 1.00 0.99 51.9 0 1 46.91 54.39 Z" />
                            <path fill="#43ce7c" d="M 11.19 80.00 L 0.00 80.00 L 0.00 65.19 C 0.74 64.76 1.28 64.97 1.70 65.70 Q 5.99 73.11 11.57 78.67 Q 12.51 79.61 11.19 80.00 Z" />
                          </svg>
                        </div>
                        <div className="social-text">
                          <div className="social-text-m">{post.author}</div>
                          <div className="social-text-s">{post.caption}</div>
                        </div>
                      </div>
                      <div className="social-btns">
                        <div className="likes">
                          <svg className="likes_svg" viewBox="-2 0 105 92"><path d="M85.24 2.67C72.29-3.08 55.75 2.67 50 14.9 44.25 2 27-3.8 14.76 2.67 1.1 9.14-5.37 25 5.42 44.38 13.33 58 27 68.11 50 86.81 73.73 68.11 87.39 58 94.58 44.38c10.79-18.7 4.32-35.24-9.34-41.71Z"></path></svg>
                          <span className="likes_text">{post.likes}</span>
                        </div>
                        <div className="comments">
                          <svg className="comments_svg" viewBox="-405.9 238 56.3 54.8"><path d="M-391 291.4c0 1.5 1.2 1.7 1.9 1.2 1.8-1.6 15.9-14.6 15.9-14.6h19.3c3.8 0 4.4-.8 4.4-4.5v-31.1c0-3.7-.8-4.5-4.4-4.5h-47.4c-3.6 0-4.4.9-4.4 4.5v31.1c0 3.7.7 4.4 4.4 4.4h10.4v13.5z"></path></svg>
                          <span className="comments_text">{post.comments}</span>
                        </div>
                        <div className="views">
                          <svg className="views_svg" viewBox="0 0 30.5 16.5"><path d="M15.3 0C8.9 0 3.3 3.3 0 8.3c3.3 5 8.9 8.3 15.3 8.3s12-3.3 15.3-8.3C27.3 3.3 21.7 0 15.3 0zm0 14.5c-3.4 0-6.2-2.8-6.2-6.2C9 4.8 11.8 2 15.3 2c3.4 0 6.2 2.8 6.2 6.2 0 3.5-2.8 6.3-6.2 6.3z"></path></svg>
                          <span className="views_text">{post.views}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
