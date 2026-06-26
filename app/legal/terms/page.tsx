'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FileText, Scale, Users, Shield, CheckCircle, AlertCircle, BookOpen } from 'lucide-react';

export default function TermsPage() {
  return (
    <section className="min-h-screen pt-32 pb-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass p-8 md:p-12 rounded-2xl border border-white/5"
        >
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-8 h-8 text-primary" />
            <h1 className="text-3xl md:text-4xl font-serif gold-gradient">Terms & Conditions</h1>
          </div>
          <p className="text-text-muted text-sm mb-8">
            <span className="block">Effective Date: June 26, 2026</span>
            <span className="block">Last Updated: June 26, 2026</span>
            <span className="block mt-2">
              <strong>KALKI INTELLIGENCE</strong> (MSME: UDYAM-MP-20-0113749) – 
              <span className="text-primary"> Temple of Technology</span>
            </span>
          </p>

          <div className="prose prose-invert max-w-none prose-sm md:prose-base prose-headings:gold-gradient prose-headings:font-serif prose-a:text-primary">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using the website <span className="text-primary">kalki.tech</span> (the “Site”) and any related services, including KI Bot, KALKI SUPPORT, and our digital marketing services (collectively, the “Services”), you agree to be bound by these Terms & Conditions (the “Terms”). 
            </p>
            <p>
              These Terms constitute a legally binding agreement between you (“User”, “Client”) and <strong>KALKI INTELLIGENCE</strong>, an MSME registered company (UDYAM-MP-20-0113749) with its registered office at Mumbai, India.
            </p>
            <p>
              If you do not agree to these Terms, please do not use our Services. By using the Services, you represent that you are at least 18 years old and have the legal capacity to enter into this agreement.
            </p>

            <h2>2. Services Overview</h2>
            <p>
              KALKI INTELLIGENCE provides AI‑powered digital marketing, web development, SEO, social media management, and AI automation services (collectively, the “Services”). We also offer a community platform (KI Cloud) and a support chat (KALKI SUPPORT).
            </p>
            <p>
              Our Services are designed to help businesses grow by leveraging cutting‑edge AI technology. We have 212+ service offerings across categories such as AI Automation, Digital Marketing, Development, Consulting, and Content Creation. 
            </p>
            <p>
              All Services are provided on an “as‑is” basis, and we make no warranties beyond those explicitly stated in these Terms.
            </p>

            <h2>3. User Obligations</h2>
            <p>
              As a user of our Services, you agree to:
            </p>
            <ul>
              <li><strong>Provide Accurate Information</strong> – you must provide truthful and current information when using our contact forms, signing up for consultations, or engaging with our support.</li>
              <li><strong>Comply with Laws</strong> – you will not use our Services for any unlawful purpose or in violation of any applicable local, national, or international law.</li>
              <li><strong>Respect Intellectual Property</strong> – you will not copy, reproduce, or distribute any content from our Site without explicit permission.</li>
              <li><strong>Not Disrupt Services</strong> – you will not attempt to interfere with the proper functioning of our Site or Services, including introducing viruses, malware, or conducting denial‑of‑service attacks.</li>
              <li><strong>Not Misuse AI</strong> – you will not use our AI bots to generate illegal, harmful, or abusive content.</li>
            </ul>
            <p>
              Failure to comply with these obligations may result in termination of access to our Services.
            </p>

            <h2>4. Intellectual Property</h2>
            <p>
              All content, including text, graphics, logos, icons, images, audio clips, digital downloads, data compilations, and software, is the property of <strong>KALKI INTELLIGENCE</strong> or its content suppliers and is protected by Indian and international copyright laws.
            </p>
            <p>
              You are granted a limited, non‑exclusive, non‑transferable license to access and use the Site and Services for personal or business use, provided you do not modify, copy, distribute, transmit, display, perform, reproduce, publish, license, create derivative works from, transfer, or sell any information, software, products, or services obtained from the Site.
            </p>
            <p>
              KALKI INTELLIGENCE™ and the KALKI logo are trademarks of the company. Unauthorized use of these trademarks is strictly prohibited.
            </p>

            <h2>5. User‑Generated Content</h2>
            <p>
              Our Services may allow you to submit content (e.g., chat messages, forum posts, feedback). You retain ownership of your content, but by submitting it, you grant us a non‑exclusive, royalty‑free, perpetual, irrevocable, and fully sublicensable right to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, and display such content throughout the world in any media.
            </p>
            <p>
              You are responsible for the content you submit and warrant that you have all necessary rights to do so. We reserve the right, but have no obligation, to monitor and edit or remove any content we deem inappropriate, offensive, or in violation of these Terms.
            </p>

            <h2>6. Payments and Refunds</h2>
            <p>
              Fees for our Services are quoted in Indian Rupees (INR) or US Dollars (USD) as indicated on our pricing pages. Payment must be made in full before services are rendered, unless otherwise agreed in writing.
            </p>
            <p>
              We offer a <strong>Guaranteed ROI</strong> on certain services. If you do not see a measurable return on your investment within the agreed time frame, we will work with you to rectify or provide a partial refund, subject to the terms of the specific service agreement.
            </p>
            <p>
              Refunds are generally not provided for completed services. For ongoing services, you may cancel your subscription with 30 days’ notice. Refunds for prepaid, unused portions will be prorated.
            </p>
            <p>
              All fees are exclusive of applicable taxes (e.g., GST). You are responsible for any taxes imposed on the Services.
            </p>

            <h2>7. Guaranteed ROI Commitment</h2>
            <p>
              We stand by our promise to deliver results. Our <strong>Guaranteed ROI</strong> means:
            </p>
            <ul>
              <li>We will track and report on key performance indicators (KPIs) relevant to your campaign.</li>
              <li>If we fail to achieve the agreed‑upon ROI targets, we will provide additional services at no extra cost until the target is met.</li>
              <li>This guarantee is subject to fair use and cooperation from your side (e.g., providing necessary access, timely feedback).</li>
            </ul>
            <p>
              This guarantee applies to specific service packages as described in your service agreement. It does not apply to one‑off consultations or third‑party costs (e.g., ad spend).
            </p>

            <h2>8. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, <strong>KALKI INTELLIGENCE</strong> and its affiliates, directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from:
            </p>
            <ul>
              <li>Your use or inability to use the Services;</li>
              <li>Any unauthorized access to or use of our servers and/or any personal information stored therein;</li>
              <li>Any bugs, viruses, trojan horses, or the like that may be transmitted to or through our Services;</li>
              <li>Any errors or omissions in any content or for any loss or damage incurred as a result of the use of any content posted, emailed, transmitted, or otherwise made available through the Services.</li>
            </ul>
            <p>
              Our total liability to you for any claim arising out of or relating to these Terms or the Services shall not exceed the amount paid by you for the Services in the twelve (12) months preceding the claim.
            </p>

            <h2>9. Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless <strong>KALKI INTELLIGENCE</strong>, its affiliates, and their respective officers, directors, employees, and agents from and against any and all claims, damages, obligations, losses, liabilities, costs, or debt, and expenses (including but not limited to attorney’s fees) arising from:
            </p>
            <ul>
              <li>Your use of and access to the Services;</li>
              <li>Your violation of any term of these Terms;</li>
              <li>Your violation of any third‑party right, including without limitation any copyright, property, or privacy right;</li>
              <li>Any claim that your content caused damage to a third party.</li>
            </ul>
            <p>
              This indemnification obligation will survive the termination of these Terms and your use of the Services.
            </p>

            <h2>10. Termination</h2>
            <p>
              We may terminate or suspend your access to the Services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms.
            </p>
            <p>
              Upon termination, your right to use the Services will cease immediately. Provisions that by their nature should survive termination (e.g., intellectual property, indemnification, limitation of liability) shall survive.
            </p>

            <h2>11. Governing Law</h2>
            <p>
              These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions.
            </p>
            <p>
              Any dispute arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts located in Mumbai, India. You agree to submit to the personal jurisdiction of such courts.
            </p>

            <h2>12. Changes to Terms</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days’ notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
            </p>
            <p>
              By continuing to access or use our Services after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Services.
            </p>

            <h2>13. Force Majeure</h2>
            <p>
              We shall not be liable for any failure to perform our obligations under these Terms if such failure is caused by events beyond our reasonable control, including but not limited to natural disasters, acts of war, terrorism, strikes, power outages, internet failures, or government actions.
            </p>

            <h2>14. Entire Agreement</h2>
            <p>
              These Terms constitute the entire agreement between you and <strong>KALKI INTELLIGENCE</strong> regarding the use of the Services, superseding any prior agreements between you and us.
            </p>

            <h2>15. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <div className="glass p-4 rounded-xl mt-4 border border-primary/20">
              <p><strong>KALKI INTELLIGENCE</strong></p>
              <p>Email: <span className="text-primary">legal@kalki.tech</span></p>
              <p>Phone: <span className="text-primary">+91 22 6897 5412</span></p>
              <p>Address: 123 AI Avenue, Financial District, Mumbai, India</p>
              <p>MSME: UDYAM-MP-20-0113749</p>
            </div>

            <div className="mt-8 flex items-center gap-2 text-xs text-text-muted">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>These Terms are effective from June 26, 2026.</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
