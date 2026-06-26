'use client';

import { useEffect, useState, useRef } from 'react';
import { useChat } from '@/hooks/useChat';
import { useWebLLM } from '@/hooks/useWebLLM';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Sparkles,
  Menu,
  X,
  Plus,
  Trash2,
  Copy,
  User,
  Bot,
  PanelLeftClose,
  PanelLeftOpen,
  Crown,
  Gem,
  Loader2,
} from 'lucide-react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function KIBotPage() {
  const [sessionId] = useState(() => `session-${Date.now()}`);
  const { messages, sendMessage, isGenerating, clearMessages } = useChat(sessionId);
  const { isLoaded: webllmLoaded, progress: webllmProgress, status: webllmStatus } = useWebLLM();
  const [input, setInput] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [conversations, setConversations] = useState<{ id: string; title: string; preview: string }[]>([]);
  const [thinkingExpanded, setThinkingExpanded] = useState(false);
  const [showThinking, setShowThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = Math.min(inputRef.current.scrollHeight, 200) + 'px';
    }
  }, [input]);

  useEffect(() => {
    if (messages.length === 1 && messages[0].role === 'user') {
      const title = messages[0].content.slice(0, 30) + (messages[0].content.length > 30 ? '...' : '');
      setConversations((prev) => [{ id: sessionId, title, preview: title }, ...prev]);
    }
  }, [messages, sessionId]);

  // Show thinking when generating
  useEffect(() => {
    setShowThinking(isGenerating);
  }, [isGenerating]);

  const handleSend = async () => {
    if (!input.trim() || isGenerating) return;
    const prompt = input.trim();
    setInput('');
    await sendMessage(prompt);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleNewChat = () => {
    clearMessages();
    setConversations([]);
  };

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Thinking indicator
  const ThinkingIndicator = () => {
    if (!showThinking) return null;
    return (
      <div className="flex justify-start">
        <div className="glass p-4 rounded-2xl border border-white/10 flex flex-col gap-2 backdrop-blur-md max-w-2xl">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
              <span className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              <span className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
            </div>
            <span className="text-sm text-text-muted">KALKI is thinking...</span>
            <button
              onClick={() => setThinkingExpanded(!thinkingExpanded)}
              className="text-xs text-text-muted hover:text-primary transition-colors"
            >
              {thinkingExpanded ? 'Collapse' : 'Expand'}
            </button>
          </div>
          {thinkingExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="text-xs text-text-muted/70 space-y-1 border-t border-white/10 pt-2 mt-1"
            >
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                <span>Groq: {webllmLoaded ? 'ready' : 'downloading...'}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                <span>Zhipu: {webllmLoaded ? 'ready' : 'waiting...'}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                <span>Cerebras: {webllmLoaded ? 'ready' : 'waiting...'}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />
                <span>WebLLM: {webllmStatus} {webllmProgress}%</span>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-full w-full bg-background">
      {/* Sidebar */}
      <motion.aside
        initial={{ width: sidebarOpen ? 300 : 0 }}
        animate={{ width: sidebarOpen ? 300 : 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative flex-shrink-0 overflow-hidden border-r border-white/10 glass"
      >
        <div className="p-5 h-full flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Gem className="w-5 h-5 text-primary" />
              <span className="font-serif text-xl gold-gradient">KI Bot</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <PanelLeftClose className="w-5 h-5" />
            </button>
          </div>

          <button
            onClick={handleNewChat}
            className="flex items-center gap-2 w-full glass p-3 rounded-xl hover:border-primary transition-all duration-300 mb-6 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform relative z-10" />
            <span className="text-sm font-medium relative z-10">New Chat</span>
          </button>

          <div className="flex-1 overflow-y-auto space-y-1 pr-1">
            {conversations.length === 0 && (
              <div className="text-xs text-text-muted text-center py-8 opacity-60">No conversations yet</div>
            )}
            {conversations.map((conv) => (
              <motion.div
                key={conv.id}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.02, x: 4 }}
                className="glass p-3 rounded-xl cursor-pointer hover:border-primary/50 transition-all duration-300 border border-transparent group relative"
              >
                <div className="text-sm truncate font-medium">{conv.title}</div>
                <div className="text-xs text-text-muted truncate opacity-70">{conv.preview}</div>
                <button className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-white/10 rounded-lg">
                  <Trash2 className="w-3 h-3 text-text-muted" />
                </button>
              </motion.div>
            ))}
          </div>

          <div className="border-t border-white/10 pt-4 mt-4">
            <button
              onClick={clearMessages}
              className="flex items-center gap-2 w-full p-2 hover:bg-white/5 rounded-lg text-text-muted hover:text-text transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span className="text-sm">Clear all</span>
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col min-w-0 relative bg-gradient-to-b from-background to-background/95">
        {/* Top bar */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 glass backdrop-blur-xl bg-black/20">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              {sidebarOpen ? <PanelLeftClose className="w-5 h-5" /> : <PanelLeftOpen className="w-5 h-5" />}
            </button>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/30" />
              <span className="text-sm text-text-muted">Online</span>
              <span className="text-xs text-text-muted ml-2 opacity-50">• {conversations.length} chats</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="p-2 hover:bg-white/10 rounded-full transition-colors relative group"
            >
              <Crown className="w-6 h-6 text-primary/70 group-hover:text-primary transition-colors" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-primary rounded-full animate-pulse" />
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] text-text-muted opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Contact
              </span>
            </Link>
            {/* Model label with progress bar */}
            <div className="flex items-center gap-2 glass px-4 py-1.5 rounded-full text-sm relative">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="font-medium">KALKI 6.0</span>
              {webllmProgress < 100 && (
                <div className="absolute -bottom-1 left-0 right-0 h-1 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${Math.min(webllmProgress, 100)}%` }}
                  />
                </div>
              )}
              {webllmLoaded && (
                <span className="text-[8px] text-green-400">● Live</span>
              )}
            </div>
          </div>
        </div>

        {/* Messages */}
        <div
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth"
          style={{ scrollBehavior: 'smooth' }}
        >
          {messages.length === 0 && (
            <div className="flex items-center justify-center h-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <div className="relative inline-block">
                  <Sparkles className="w-20 h-20 text-primary/30 mx-auto mb-4" />
                  <div className="absolute inset-0 animate-ping rounded-full bg-primary/5" />
                </div>
                <h2 className="text-3xl font-serif gold-gradient">KALKI 6.0</h2>
                <p className="text-text-muted mt-2 opacity-70">Parallel multi‑model ensemble at your service.</p>
              </motion.div>
            </div>
          )}
          <AnimatePresence initial={false}>
            {messages.map((msg, index) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-3xl rounded-2xl p-5 ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-br from-primary/30 to-primary/10 text-text border border-primary/30 shadow-lg shadow-primary/5'
                      : 'glass border border-white/10 backdrop-blur-md shadow-lg'
                  } relative group`}
                >
                  {msg.role === 'assistant' && (
                    <div className="flex items-center gap-2 text-xs text-text-muted mb-2 opacity-60">
                      <Bot className="w-4 h-4" />
                      <span>KALKI AI</span>
                    </div>
                  )}
                  {msg.role === 'user' && (
                    <div className="flex items-center gap-2 text-xs text-text-muted mb-2 opacity-60">
                      <User className="w-4 h-4" />
                      <span>You</span>
                    </div>
                  )}
                  {msg.role === 'assistant' ? (
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeHighlight]}
                      className="prose prose-invert max-w-none prose-sm leading-relaxed"
                    >
                      {msg.content}
                    </ReactMarkdown>
                  ) : (
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">{msg.content}</div>
                  )}
                  {msg.role === 'assistant' && (
                    <button
                      onClick={() => handleCopy(msg.content)}
                      className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-white/10 rounded-lg text-text-muted hover:text-text"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <ThinkingIndicator />
          <div ref={messagesEndRef} />
        </div>

        {/* Input bar */}
        <div
          className={`p-4 border-t border-white/10 glass backdrop-blur-xl ${isGenerating ? 'chat-glowing-border' : ''}`}
        >
          <div className="flex items-end gap-3 max-w-4xl mx-auto">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="w-full bg-transparent border border-white/10 rounded-2xl px-5 py-3 pr-14 text-text placeholder-text-muted focus:outline-none focus:border-primary/50 resize-none min-h-[56px] max-h-[200px] transition-colors text-sm leading-relaxed"
                rows={1}
              />
              <button
                onClick={handleSend}
                disabled={isGenerating || !input.trim()}
                className="absolute right-3 bottom-3 p-2.5 rounded-full bg-primary text-background disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary/80 transition-all hover:scale-105 shadow-lg shadow-primary/20"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="flex justify-between text-xs text-text-muted mt-2 max-w-4xl mx-auto opacity-60">
            <span>Enter to send, Shift+Enter for new line</span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
              <span>KALKI 6.0</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
