import { notFound } from 'next/navigation';
import servicesData from '@/lib/content/services-full.json';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface Service {
  slug: string;
  title: string;
  category: string;
  priceUSD: number;
  priceINR: number;
  description: string;
  features: string[];
}

export async function generateStaticParams() {
  return servicesData.map((service: Service) => ({
    slug: service.slug,
  }));
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = servicesData.find((s: Service) => s.slug === params.slug) as Service | undefined;
  if (!service) notFound();

  return (
    <section className="min-h-screen pt-32 pb-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/services" className="inline-flex items-center gap-2 text-text-muted hover:text-primary transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Services
        </Link>

        <div className="glass p-8 rounded-2xl">
          <h1 className="text-4xl font-serif gold-gradient mb-2">{service.title}</h1>
          <p className="text-text-muted text-lg mb-4">{service.description}</p>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm bg-primary/10 text-primary px-4 py-1 rounded-full">{service.category}</span>
            <span className="text-sm font-bold">${service.priceUSD} <span className="text-text-muted font-normal">/ ₹{service.priceINR.toLocaleString()}</span></span>
          </div>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">What's Included</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {service.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-text-muted">
                  <span className="text-primary">✓</span> {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-8 flex gap-4">
            <Link href="/contact" className="button">
              <div className="button-outer">
                <div className="button-inner">
                  <span>Get Started</span>
                </div>
              </div>
            </Link>
            <Link href="/ki-bot" className="button">
              <div className="button-outer">
                <div className="button-inner">
                  <span>Chat with KI Bot</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
