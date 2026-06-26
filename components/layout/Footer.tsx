import Link from 'next/link';
import { Github, Chrome, BadgeCheck } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-background/80 backdrop-blur-sm py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="font-serif text-2xl font-bold tracking-tight">KALKI <span className="text-primary">AI</span></span>
        <div className="flex flex-wrap items-center justify-center gap-6 my-6">
          <a href="https://github.com/CodeWander-666-github" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-primary transition-colors"><Github className="w-5 h-5" /></a>
          <a href="#" className="text-text-muted hover:text-primary transition-colors"><Chrome className="w-5 h-5" /></a>
          <div className="flex items-center gap-1 text-text-muted"><BadgeCheck className="w-5 h-5 text-primary" /><span className="text-xs font-bold uppercase tracking-wider">GST</span></div>
          <div className="flex items-center gap-1 text-text-muted"><BadgeCheck className="w-5 h-5 text-primary" /><span className="text-xs font-bold uppercase tracking-wider">Udyam</span></div>
        </div>
        <div className="flex flex-wrap justify-center gap-4 text-xs font-bold uppercase tracking-widest text-text-muted">
          <Link href="/legal/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
          <span className="text-white/20">|</span>
          <Link href="/legal/terms" className="hover:text-primary transition-colors">Terms & Conditions</Link>
        </div>
        <p className="mt-6 text-xs text-text-muted/60">&copy; 2017-2026. Kalki Technologies – Temple of Technology.</p>
      </div>
    </footer>
  );
}
