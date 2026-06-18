import { Metadata } from "next";
import { Link } from "@/i18n/routing";
import { HelpCircle, Calendar, MessageSquare } from "lucide-react";
import { PricingSection } from "@/components/marketing/PricingSection";
import { SectionWrapper } from "@/components/shared/SectionWrapper";

export const metadata: Metadata = {
  title: "Pricing — Simple, Honest Rates",
  description: "Review subscription options for CarRental.digital. Starter, Professional, and Enterprise plans with no hidden fees and no transaction commissions.",
};

const pricingFaqs = [
  {
    q: "Are there any setup fees?",
    a: "No. We set up your account, configure your custom domain, customize your logo styling, and upload your initial vehicles for free as part of our onboarding service."
  },
  {
    q: "Can I change plans later?",
    a: "Yes. You can upgrade, downgrade, or cancel your subscription at the end of any billing cycle directly from your billing dashboard."
  },
  {
    q: "Do you offer monthly billing cycles?",
    a: "No, we operate exclusively on quarterly and yearly billing cycles to maintain high-quality human onboarding and 24/7 technical support. Yearly subscriptions receive a 20% discount."
  },
  {
    q: "Do you charge booking transaction fees?",
    a: "No. Unlike other reservation platforms, we charge zero commissions or transaction fees on your bookings. You pay a flat rate subscription and keep 100% of your earnings."
  },
  {
    q: "Can I host data in a specific region?",
    a: "Yes. During onboarding, Enterprise customers can request their databases and booking engines be hosted on dedicated servers in either the United States or the European Union for compliance reasons."
  }
];

export default function PricingPage() {
  return (
    <div className="bg-bg-soft min-h-screen">

      {/* Page Header */}
      <div className="page-hero-section">
        <div className="content-container text-center">
          <span className="text-[10px] font-heading font-800 text-brand-blue bg-brand-blue-pale border border-brand-blue/10 px-3 py-1 rounded-full uppercase tracking-wider">
            Plans &amp; Pricing
          </span>
          <h1 className="page-hero-heading">
            Honest Pricing. Every Feature Clear.
          </h1>
          <p className="text-body-lg font-body text-text-secondary" style={{ maxWidth: "42rem", marginLeft: "auto", marginRight: "auto" }}>
            No transaction fees. No hidden add-on costs. Choose a plan that matches your fleet size and scale as you grow.
          </p>
        </div>
      </div>

      {/* Main Pricing Section */}
      <PricingSection />

      {/* Pricing specific FAQs */}
      <SectionWrapper theme="soft" className="border-t border-bg-border">
        <div style={{ maxWidth: "56rem", marginLeft: "auto", marginRight: "auto" }}>
          <div className="text-center" style={{ marginBottom: "3rem" }}>
            <h2 className="pricing-section-heading">
              Pricing &amp; Billing FAQs
            </h2>
            <p className="font-body text-body-sm text-text-secondary" style={{ marginTop: "0.25rem" }}>
              Have questions about payments, invoicing, or cancellations?
            </p>
          </div>

          <div className="faq-grid">
            {pricingFaqs.map((faq, idx) => (
              <div key={idx} className="bg-white border border-bg-border rounded-xl shadow-card-sm" style={{ padding: "1.5rem" }}>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center shrink-0">
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-heading font-700 text-body-default text-brand-navy leading-snug">
                      {faq.q}
                    </h3>
                    <p className="font-body text-body-sm text-text-secondary leading-relaxed" style={{ marginTop: "0.5rem" }}>
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Book a Call CTA */}
      <SectionWrapper theme="light" className="border-t border-bg-border">
        <div className="cta-card">
          {/* glow orb */}
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "20rem",
              height: "20rem",
              background: "rgba(37,99,235,0.08)",
              borderRadius: "9999px",
              filter: "blur(70px)",
              pointerEvents: "none",
            }}
          />

          <span className="text-[10px] font-heading font-800 text-brand-green bg-brand-green/10 border border-brand-green/20 px-3 py-1 rounded-full uppercase tracking-wider">
            Consultation
          </span>

          <h2 className="cta-heading">
            Still Unsure About the Right Plan?
          </h2>

          <p className="cta-body">
            Book a 15-minute alignment call with our fleet experts. We&apos;ll look at your fleet size, multi-location requirements, and recommend the most cost-efficient plan for your operations.
          </p>

          <div className="cta-buttons">
            <Link
              href="/demo"
              className="inline-flex items-center justify-center gap-1.5 px-6 py-3 bg-brand-green hover:bg-brand-green-hover text-white font-heading font-700 text-body-sm rounded-full transition-colors"
            >
              <Calendar className="w-4 h-4" />
              <span>Schedule Call</span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-1.5 px-6 py-3 border border-slate-700 hover:bg-slate-800 text-white font-heading font-700 text-body-sm rounded-full transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Message Sales</span>
            </Link>
          </div>
        </div>
      </SectionWrapper>

    </div>
  );
}
