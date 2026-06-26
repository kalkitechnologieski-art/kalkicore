export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'KALKI TECHNOLOGIES',
    url: 'https://kalki.tech',
    logo: 'https://kalki.tech/logo.png',
    contactPoint: { '@type': 'ContactPoint', telephone: '+91-22-6897-5412', contactType: 'sales', availableLanguage: ['en', 'hi'] },
    sameAs: ['https://github.com/CodeWander-666-github'],
  };
}
export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
  };
}
