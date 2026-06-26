import Link from 'next/link';
import { BadgeCheck, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-background/80 backdrop-blur-sm py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          {/* Brand */}
          <span className="font-serif text-2xl font-bold tracking-tight gold-gradient mb-4">
            KALKI INTELLIGENCE
          </span>

          {/* Emails */}
          <div className="flex flex-col items-center gap-1 mb-4 text-text-muted text-sm">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary" />
              <a
                href="mailto:team@kalki-intelligence.in"
                className="hover:text-primary transition-colors"
              >
                team@kalki-intelligence.in
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary" />
              <a
                href="mailto:ceo@kalki-intelligence.in"
                className="hover:text-primary transition-colors"
              >
                ceo@kalki-intelligence.in
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary" />
              <a
                href="mailto:support@kalki-intelligence.in"
                className="hover:text-primary transition-colors"
              >
                support@kalki-intelligence.in
              </a>
            </div>
          </div>

          {/* Legal & Company Info */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-bold uppercase tracking-widest text-text-muted mb-4">
            <Link href="/legal/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <span className="text-white/20">|</span>
            <Link href="/legal/terms" className="hover:text-primary transition-colors">
              Terms & Conditions
            </Link>
            <span className="text-white/20">|</span>
            <span className="text-primary/60">MSME: UDYAM-MP-20-0113749</span>
          </div>

          {/* LinkedIn Glitch Button */}
          <div className="mb-4">
            <a
              href="https://www.linkedin.com/posts/kalki-intelligence_business-development-internship-role-definition-activity-7475131797299716096-eOm1?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEfz0fwB7P-xW28g_m5VHA8RJtFZdRn3kAs"
              target="_blank"
              rel="noopener noreferrer"
              className="button-wrapper small"
            >
              <button className="spiderverse-button">
                LinkedIn
                <div className="glitch-layers">
                  <div className="glitch-layer layer-1">LinkedIn</div>
                  <div className="glitch-layer layer-2">LinkedIn</div>
                </div>
                <div className="noise"></div>
                <div className="glitch-slice"></div>
              </button>
            </a>
          </div>

          {/* MSME & GST Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-4 text-text-muted text-xs">
            <div className="flex items-center gap-1">
              <BadgeCheck className="w-4 h-4 text-primary" />
              <span className="font-bold uppercase tracking-wider">MSME Registered</span>
            </div>
            <div className="flex items-center gap-1">
              <BadgeCheck className="w-4 h-4 text-primary" />
              <span className="font-bold uppercase tracking-wider">GST Compliant</span>
            </div>
          </div>

          {/* Copyright */}
          <p className="text-xs text-text-muted/60 uppercase tracking-widest">
            &copy; 2017-2026. KALKI INTELLIGENCE – Temple of Technology.
          </p>
        </div>
      </div>
    </footer>
  );
}
