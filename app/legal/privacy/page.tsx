'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Shield, Lock, Eye, Database, Cookie, UserCheck, Mail, FileText, CheckCircle } from 'lucide-react';

export default function PrivacyPage() {
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
            <Shield className="w-8 h-8 text-primary" />
            <h1 className="text-3xl md:text-4xl font-serif gold-gradient">Privacy Policy</h1>
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
            <h2>1. Introduction</h2>
            <p>
              At KALKI INTELLIGENCE (“we”, “our”, “us”), we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website (<span className="text-primary">kalki.tech</span>), use our services, or interact with our AI bots (KI Bot and KALKI SUPPORT). 
            </p>
            <p>
              We are an <strong>MSME registered company</strong> (UDYAM-MP-20-0113749) with a mission to democratize AI for local businesses while maintaining the highest ethical standards. Our Chairman, <strong>Mrs. Shri Urmila Singh</strong>, and CEO, <strong>Mr. Nikhil</strong>, are committed to transparency, trust, and data protection.
            </p>
            <p>
              By using our services, you agree to the collection and use of information in accordance with this policy. If you do not agree, please do not use our services.
            </p>

            <h2>2. Information We Collect</h2>
            <h3>2.1 Personal Information You Provide</h3>
            <p>
              When you fill out a contact form, sign up for a consultation, or communicate with our support bot, we may collect:
            </p>
            <ul>
              <li><strong>Name</strong> – to address you personally.</li>
              <li><strong>Email Address</strong> – to respond to your inquiries and send updates.</li>
              <li><strong>Phone Number</strong> – for follow‑up calls or WhatsApp communication.</li>
              <li><strong>Service Interest</strong> – to understand which of our 212+ services you need.</li>
              <li><strong>Message</strong> – the content of your query or feedback.</li>
            </ul>

            <h3>2.2 Automatically Collected Data</h3>
            <p>
              When you visit our website, we may automatically collect:
            </p>
            <ul>
              <li><strong>IP Address</strong> – to understand geographic distribution and prevent abuse.</li>
              <li><strong>Browser Type and Version</strong> – for compatibility improvements.</li>
              <li><strong>Pages Visited</strong> – to analyze user behavior and improve our content.</li>
              <li><strong>Referral URLs</strong> – to know how you found us.</li>
              <li><strong>Device Information</strong> – to optimize mobile experience.</li>
            </ul>
            <p>
              We use this data in aggregated, anonymized form for analytics and performance monitoring. We do not share raw log data with third parties except as required by law.
            </p>

            <h3>2.3 Cookies and Tracking Technologies</h3>
            <p>
              We use cookies and similar tracking technologies to enhance your experience, remember your preferences, and analyze site traffic. You can control cookie settings in your browser. However, disabling cookies may affect some functionality.
            </p>
            <p>
              Our cookie usage includes:
            </p>
            <ul>
              <li><strong>Essential Cookies</strong> – required for basic site operation.</li>
              <li><strong>Analytics Cookies</strong> – to track usage patterns.</li>
              <li><strong>Preference Cookies</strong> – to remember your theme choice (dark/light).</li>
              <li><strong>Session Cookies</strong> – to maintain chat sessions.</li>
            </ul>
            <p>
              We do not use third‑party advertising cookies; we do not sell your data.
            </p>

            <h3>2.4 Data from AI Interactions</h3>
            <p>
              When you chat with KI Bot or KALKI SUPPORT, we may log the conversation for quality assurance, training, and to improve our AI models. However:
            </p>
            <ul>
              <li>We anonymize all logs – personal identifiers are removed.</li>
              <li>We do not use your conversations for any purpose other than internal improvement.</li>
              <li>You can request deletion of your chat history by contacting us.</li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <p>We use your personal information for the following purposes:</p>
            <ul>
              <li><strong>To Provide Services</strong> – respond to inquiries, process requests, and deliver our AI and digital marketing services.</li>
              <li><strong>To Improve Our Offerings</strong> – analyze usage to enhance user experience and service quality.</li>
              <li><strong>To Communicate</strong> – send you updates, newsletters (with your consent), and respond to support tickets.</li>
              <li><strong>To Comply with Legal Obligations</strong> – as required by Indian law and regulatory authorities.</li>
              <li><strong>To Protect Our Rights</strong> – prevent fraud, abuse, and enforce our terms.</li>
            </ul>
            <p>
              We do <strong>not</strong> share your personal information with third parties for their marketing purposes. We only share data with trusted service providers who help us operate our business (e.g., hosting, email delivery) and who are bound by confidentiality agreements.
            </p>

            <h2>4. Data Retention</h2>
            <p>
              We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy, or as required by law. Typically:
            </p>
            <ul>
              <li>Contact form data is kept for up to 3 years for follow‑up and reference.</li>
              <li>Chat logs are anonymized after 90 days; raw logs are deleted.</li>
              <li>Analytics data is kept in aggregated form indefinitely for trend analysis.</li>
            </ul>
            <p>
              You may request deletion of your data at any time (see Section 9).
            </p>

            <h2>5. Data Security</h2>
            <p>
              We implement industry‑standard security measures to protect your data:
            </p>
            <ul>
              <li><strong>Encryption</strong> – all data transmitted between your browser and our servers is encrypted using TLS (HTTPS).</li>
              <li><strong>Access Controls</strong> – only authorized personnel have access to personal data.</li>
              <li><strong>Regular Audits</strong> – we review our security practices periodically.</li>
              <li><strong>Secure Hosting</strong> – our infrastructure is hosted on Vercel and Supabase, both of which comply with strict security standards.</li>
            </ul>
            <p>
              While we strive to protect your data, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security, but we commit to using all commercially reasonable efforts to safeguard your information.
            </p>

            <h2>6. Third‑Party Services</h2>
            <p>
              We use the following third‑party services that may process your data:
            </p>
            <ul>
              <li><strong>Supabase</strong> – for database storage and authentication.</li>
              <li><strong>Upstash Redis</strong> – for caching and session management.</li>
              <li><strong>Vercel</strong> – for hosting and edge functions.</li>
              <li><strong>Groq, Zhipu, Cerebras</strong> – for AI inference (data is anonymized).</li>
              <li><strong>Google Analytics</strong> – for website traffic analysis (anonymized).</li>
            </ul>
            <p>
              Each of these providers adheres to their own privacy policies, and we have data processing agreements in place where required.
            </p>

            <h2>7. Your Rights</h2>
            <p>Under Indian law and applicable global regulations, you have the following rights:</p>
            <ul>
              <li><strong>Right to Access</strong> – request a copy of the data we hold about you.</li>
              <li><strong>Right to Rectification</strong> – correct inaccurate or incomplete data.</li>
              <li><strong>Right to Erasure</strong> – request deletion of your personal data.</li>
              <li><strong>Right to Restrict Processing</strong> – limit how we use your data.</li>
              <li><strong>Right to Data Portability</strong> – receive your data in a structured format.</li>
              <li><strong>Right to Object</strong> – object to certain processing activities.</li>
            </ul>
            <p>
              To exercise any of these rights, please contact us at <span className="text-primary">legal@kalki.tech</span>. We will respond within 30 days.
            </p>

            <h2>8. Children’s Privacy</h2>
            <p>
              Our services are not directed to individuals under the age of 16. We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal information, please contact us, and we will delete it.
            </p>

            <h2>9. International Data Transfers</h2>
            <p>
              We are based in India, and your data may be processed in India or other countries where our service providers operate. We ensure that any cross‑border data transfer complies with applicable data protection laws, including the use of Standard Contractual Clauses where required.
            </p>

            <h2>10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the “Last Updated” date. We encourage you to review this policy periodically.
            </p>

            <h2>11. Contact Us</h2>
            <p>
              If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
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
              <span>This policy is effective from June 26, 2026.</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
