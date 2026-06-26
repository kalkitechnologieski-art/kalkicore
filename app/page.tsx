import { Hero } from '@/components/features/Hero';
import { Stats } from '@/components/features/Stats';
import { Features } from '@/components/features/Features';
import { Offers } from '@/components/features/Offers';
import { Testimonials } from '@/components/features/Testimonials';
import { ChatPreview } from '@/components/features/ChatPreview';
import { BlogHighlights } from '@/components/features/BlogHighlights';
import { ContactCTA } from '@/components/features/ContactCTA';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <Features />
      <Offers />
      <Testimonials />
      <ChatPreview />
      <BlogHighlights />
      <ContactCTA />
    </>
  );
}
