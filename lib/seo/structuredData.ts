import type { WithContext, Organization, WebSite, FAQPage, BreadcrumbList, Service, Product } from 'schema-dts';

const BASE_URL = 'https://kalki.tech';

export function organizationSchema(): WithContext<Organization> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'KALKI INTELLIGENCE',
    description: 'AI‑powered digital marketing and web development agency. Temple of Technology.',
    url: BASE_URL,
    logo: `${BASE_URL}/favicon.svg`,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+91-62610-31710',
        contactType: 'sales',
        availableLanguage: ['en', 'hi'],
        email: 'team@kalki-intelligence.in',
      },
      {
        '@type': 'ContactPoint',
        telephone: '+91-62610-31710',
        contactType: 'support',
        availableLanguage: ['en', 'hi'],
        email: 'support@kalki-intelligence.in',
      },
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: '802, Prestige Jindal City, 7th Cross',
      addressLocality: 'Bengaluru',
      addressRegion: 'Karnataka',
      postalCode: '560001',
      addressCountry: 'IN',
    },
    sameAs: [
      'https://www.linkedin.com/company/kalki-intelligence',
    ],
    founder: [
      {
        '@type': 'Person',
        name: 'Nikhil',
        jobTitle: 'CEO',
      },
      {
        '@type': 'Person',
        name: 'Mrs. Shri Urmila Singh',
        jobTitle: 'Chairperson',
      },
    ],
    foundingDate: '2025-12-01',
    numberOfEmployees: 10,
    taxID: 'UDYAM-MP-20-0113749',
  };
}

export function websiteSchema(): WithContext<WebSite> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'KALKI INTELLIGENCE – Temple of Technology',
    description: 'Open‑source private AI, WebLLM, digital marketing, SEO, and distributed intelligence.',
    url: BASE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${BASE_URL}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function breadcrumbSchema(items: { name: string; item: string }[]): WithContext<BreadcrumbList> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]): WithContext<FAQPage> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };
}

// Simplified service schema for individual service pages
export function serviceSchema(
  service: { name: string; description: string; price?: number; category?: string }
): WithContext<Service | Product> {
  const isProduct = service.price !== undefined && service.price > 0;
  const type = isProduct ? 'Product' : 'Service';

  const base = {
    '@context': 'https://schema.org',
    '@type': type,
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: 'KALKI INTELLIGENCE',
    },
  };

  if (isProduct) {
    return {
      ...base,
      offers: {
        '@type': 'Offer',
        price: service.price,
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: `${BASE_URL}/services/${service.name.toLowerCase().replace(/\s+/g, '-')}`,
      },
    } as WithContext<Product>;
  }

  return base as WithContext<Service>;
}
