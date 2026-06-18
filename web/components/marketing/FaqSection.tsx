"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageCircle } from "lucide-react";
import { Link } from "@/i18n/routing";
import { SectionWrapper } from "../shared/SectionWrapper";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "How quickly can we go live?",
    a: "Most businesses are fully set up and live within 48 hours of signing up. Our onboarding team handles the configuration, logo setup, and vehicle uploading for you, so you don't have to lift a finger."
  },
  {
    q: "Do I need technical knowledge to use the system?",
    a: "No. The system is designed to be used by non-technical business owners and their staff. If you can use a smartphone or check your email, you can easily navigate and run your operations on CarRental.digital."
  },
  {
    q: "Can I use my own domain name?",
    a: "Yes. Your branded public booking website launches on your existing domain (e.g., rentals.yourbrand.com). We handle the DNS connections and SSL certificates at no extra charge."
  },
  {
    q: "What happens to my data if I cancel?",
    a: "You own your data completely. You can download everything — customer history, active bookings, contracts, and financial logs — in standard CSV/PDF formats at any time. There are no export fees or lock-ins."
  },
  {
    q: "Does the system work for luxury car rentals and economy rentals?",
    a: "Yes. The system is fleet-agnostic. You can configure custom security deposits, mileage restrictions, and rental rules per vehicle category. It works equally well for high-end luxury Porsche fleets or budget economy fleets."
  },
  {
    q: "Can I manage multiple brands from one account?",
    a: "Yes. The Professional and Enterprise plans support multi-brand management. You can define separate vehicle pools, booking rules, invoice templates, and emails per brand, all managed from a single admin interface."
  },
  {
    q: "Is the system mobile-friendly?",
    a: "The admin panel and client portal are fully responsive. Your staff can verify documents, release cars, and sign contracts on tablets or phones directly at the vehicle lot."
  },
  {
    q: "What payment methods do you support?",
    a: "We integrate natively with Stripe, PayPal, and major merchant processors. You can accept credit/debit cards, Apple Pay, Google Pay, and direct bank transfers (SEPA/ACH), with automated security deposit holding."
  },
  {
    q: "Is my data secure?",
    a: "Absolutely. Data is stored on enterprise-grade cloud servers (AWS/Google Cloud), encrypted in transit and at rest, with daily automated backups. We offer dedicated EU-based servers for strict GDPR compliance."
  },
  {
    q: "Do you offer support in my language?",
    a: "Our customer success team operates in English, German, French, Spanish, and Dutch. You will always get responses from real support specialists who understand the car rental business."
  }
];

export function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <SectionWrapper theme="light" id="faq">
      {/* Header */}
      <div className="text-center max-w-copy mx-auto mb-12 sm:mb-16">
        <span className="text-[10px] font-heading font-800 text-brand-blue bg-brand-blue-pale border border-brand-blue/10 px-3 py-1 rounded-full uppercase tracking-wider">
          Frequently Asked Questions
        </span>
        <h2 className="text-h2-mobile sm:text-h2-desktop font-heading font-800 text-brand-navy leading-tight mt-4 mb-3">
          Questions. Answered.
        </h2>
        <p className="text-body-lg font-body text-text-secondary">
          Everything you need to know about the platform, onboarding, pricing, and support.
        </p>
      </div>

      {/* Accordion list - 2 column layout on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4 max-w-5xl mx-auto mb-16">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className={cn(
                "border border-bg-border rounded-xl overflow-hidden bg-white transition-all duration-200 self-start",
                isOpen ? "shadow-card-sm border-brand-blue/30" : "hover:border-slate-300"
              )}
            >
              {/* Question */}
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full flex justify-between items-center p-5 text-left font-heading font-700 text-body-sm sm:text-body-default text-brand-navy gap-4"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={cn(
                    "w-4 h-4 text-text-secondary shrink-0 transition-transform duration-200",
                    isOpen ? "rotate-180 text-brand-blue" : ""
                  )}
                />
              </button>

              {/* Answer */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 pt-0 border-t border-bg-soft font-body text-body-sm text-text-secondary leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Bottom Soft CTA */}
      <div className="bg-bg-soft rounded-2xl border border-bg-border p-6 text-center max-w-xl mx-auto shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-left">
          <div className="w-10 h-10 bg-brand-blue-pale text-brand-blue rounded-full flex items-center justify-center shrink-0">
            <MessageCircle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-heading font-700 text-body-sm text-brand-navy leading-none">
              Still have questions?
            </h4>
            <p className="font-body text-[11px] text-text-secondary mt-1">
              We&apos;re here to help. Get in touch with our support specialists.
            </p>
          </div>
        </div>
        <Link
          href="/contact"
          className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white font-heading font-600 text-body-sm px-5 py-2.5 rounded-full transition-colors shrink-0"
        >
          Chat with our team &rarr;
        </Link>
      </div>
    </SectionWrapper>
  );
}
