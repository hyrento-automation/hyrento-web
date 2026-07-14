"use client";

import { Fragment, useState } from "react";
import { Check, X, ChevronDown, ChevronUp } from "lucide-react";
import { PricingCard, PricingPlanFeature } from "../shared/PricingCard";
import { SectionWrapper } from "../shared/SectionWrapper";
import { cn } from "@/lib/utils";

// Plan features mapping
const starterFeatures: PricingPlanFeature[] = [
  { text: "Branded website on your domain", included: true },
  { text: "Online booking engine & client portal", included: true },
  { text: "Fleet management (up to 50 vehicles)", included: true },
  { text: "CRM & customer profiles", included: true },
  { text: "Digital contracts & e-signatures", included: true },
  { text: "Invoicing & payment links", included: true },
  { text: "Reports & analytics (standard)", included: true },
  { text: "1 Location / 1 Brand", included: true },
  { text: "24/7 Support (Email/Chat)", included: true },
  { text: "Multi-location & Multi-brand", included: false },
  { text: "Full API Access", included: false },
];

const proFeatures: PricingPlanFeature[] = [
  { text: "Branded website on your domain", included: true },
  { text: "Online booking engine & client portal", included: true },
  { text: "Fleet management (up to 200 vehicles)", included: true },
  { text: "CRM & customer profiles", included: true },
  { text: "Digital contracts & e-signatures", included: true },
  { text: "Invoicing & payment links", included: true },
  { text: "Advanced analytics & revenue reports", included: true },
  { text: "Up to 3 Locations / 2 Brands", included: true },
  { text: "Priority Support (Email/Chat)", included: true },
  { text: "Multi-location & Multi-brand", included: true },
  { text: "Full API Access", included: false },
];

const enterpriseFeatures: PricingPlanFeature[] = [
  { text: "Branded website on your domain", included: true },
  { text: "Online booking engine & client portal", included: true },
  { text: "Fleet management (500+ vehicles)", included: true },
  { text: "CRM & customer profiles", included: true },
  { text: "Digital contracts & e-signatures", included: true },
  { text: "Invoicing & payment links", included: true },
  { text: "Custom reports & data exports", included: true },
  { text: "Unlimited Locations / Brands", included: true },
  { text: "Priority 24/7 Phone Support & SLA", included: true },
  { text: "Multi-location & Multi-brand", included: true },
  { text: "Full API Access & Webhooks", included: true },
];

const comparisonData = [
  {
    category: "Fleet & Operations",
    rows: [
      { name: "Vehicle fleet size limit", starter: "Up to 50", pro: "Up to 200", enterprise: "Unlimited" },
      { name: "Locations / branches support", starter: "1 Location", pro: "Up to 3 Branches", enterprise: "Unlimited" },
      { name: "Brands under one login", starter: "1 Brand", pro: "Up to 2 Brands", enterprise: "Unlimited" },
      { name: "Vehicle document management", starter: "Basic", pro: "Advanced (with alerts)", enterprise: "Advanced (with alerts)" },
      { name: "Digital pre/post inspection", starter: false, pro: true, enterprise: true },
    ]
  },
  {
    category: "Bookings & Payments",
    rows: [
      { name: "Live booking engine website", starter: true, pro: true, enterprise: true },
      { name: "Customer CRM & profiles", starter: true, pro: true, enterprise: true },
      { name: "Digital contracts & e-signing", starter: true, pro: true, enterprise: true },
      { name: "Auto-generated invoicing & receipts", starter: true, pro: true, enterprise: true },
      { name: "Payment gateway integration (Stripe)", starter: true, pro: true, enterprise: true },
      { name: "Dynamic seasonal pricing rules", starter: false, pro: true, enterprise: true },
      { name: "Multi-currency and VAT setup", starter: false, pro: true, enterprise: true },
    ]
  },
  {
    category: "Growth & API",
    rows: [
      { name: "Reports & analytics dashboards", starter: "Standard", pro: "Advanced", enterprise: "Custom & CSV export" },
      { name: "Staff roles & custom permissions", starter: false, pro: true, enterprise: true },
      { name: "Corporate client accounts", starter: false, pro: true, enterprise: true },
      { name: "Full API Access & Webhooks", starter: false, pro: false, enterprise: true },
      { name: "Dedicated onboarding manager", starter: false, pro: false, enterprise: true },
      { name: "Support availability", starter: "24/7 Email/Chat", pro: "Priority 24/7 Email/Chat", enterprise: "Dedicated 24/7 Phone + SLA" },
    ]
  }
];

export function PricingSection() {
  const [billingPeriod, setBillingPeriod] = useState<"quarter" | "year">("quarter");
  const [showComparison, setShowComparison] = useState(false);

  // Toggle helper
  const handleToggle = (period: "quarter" | "year") => {
    setBillingPeriod(period);
  };

  return (
    <SectionWrapper theme="light" id="pricing">
      {/* Header */}
      <div className="pricing-section-header">
        <span className="text-[10px] font-heading font-800 text-brand-blue bg-brand-blue-pale border border-brand-blue/10 px-3 py-1 rounded-full uppercase tracking-wider">
          Simple Pricing
        </span>
        <h2 className="pricing-section-heading">
          Simple, Honest Pricing. Everything Included.
        </h2>
        <p className="text-body-lg font-body text-text-secondary">
          No setup fees. No hidden charges. No surprises. Cancel anytime.
        </p>

        {/* Billing Toggle */}
        <div className="mt-8 flex justify-center">
          <div className="pricing-toggle">
            <button
              onClick={() => handleToggle("quarter")}
              className={cn(
                "pricing-toggle__option",
                billingPeriod === "quarter" && "active"
              )}
            >
              Quarterly
            </button>
            <button
              onClick={() => handleToggle("year")}
              className={cn(
                "pricing-toggle__option flex items-center gap-1.5",
                billingPeriod === "year" && "active"
              )}
            >
              <span>Yearly</span>
              <span className="bg-brand-green/10 text-brand-green text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                Save 20%
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="pricing-cards-grid">
        <PricingCard
          name="Starter"
          badge="Perfect for Small Fleets"
          priceQuarterly={160}
          priceYearly={512} // Save 20% (160 * 4 * 0.8)
          billingPeriod={billingPeriod}
          fleetSize="Up to 50 vehicles"
          features={starterFeatures}
          ctaText="Start With Starter →"
          ctaHref="/onboarding?plan=starter"
        />

        <PricingCard
          name="Professional"
          badge="Most Popular — Growing Fleets"
          priceQuarterly={220}
          priceYearly={704} // Save 20% (220 * 4 * 0.8)
          billingPeriod={billingPeriod}
          fleetSize="Up to 200 vehicles"
          features={proFeatures}
          ctaText="Start With Professional →"
          ctaHref="/onboarding?plan=professional"
          highlighted={true}
        />

        <PricingCard
          name="Enterprise"
          badge="Built for Scale"
          priceQuarterly={280}
          priceYearly={896} // Save 20% (280 * 4 * 0.8)
          billingPeriod={billingPeriod}
          fleetSize="200–500+ vehicles"
          features={enterpriseFeatures}
          ctaText="Talk to Enterprise Sales →"
          ctaHref="/contact?inquiry=enterprise"
        />
      </div>

      {/* Comparison Toggle Button */}
      <div className="text-center mb-10">
        <button
          onClick={() => setShowComparison(!showComparison)}
          className="inline-flex items-center gap-2 text-brand-blue font-heading font-700 hover:underline hover:text-brand-blue-light"
          style={{ fontSize: "0.95rem" }}
        >
          <span>
            {showComparison 
              ? "Hide feature comparison" 
              : "See the full feature comparison table"}
          </span>
          {showComparison ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Expandable Comparison Table */}
      {showComparison && (
        <div className="max-w-4xl mx-auto border border-bg-border rounded-2xl overflow-hidden bg-white shadow-card-md animate-fade-in mb-16">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white font-heading font-600 text-[12px] uppercase tracking-wider">
                <th className="py-4 px-5 w-[40%]">Features</th>
                <th className="py-4 px-5 w-[20%] text-center">Starter</th>
                <th className="py-4 px-5 w-[20%] text-center">Professional</th>
                <th className="py-4 px-5 w-[20%] text-center">Enterprise</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bg-subtle">
              {comparisonData.map((cat, catIdx) => (
                <Fragment key={catIdx}>
                  <tr className="bg-slate-50 border-y border-bg-border">
                    <td colSpan={4} className="py-2.5 px-5 font-heading font-700 text-[11px] text-brand-navy uppercase tracking-wider">
                      {cat.category}
                    </td>
                  </tr>
                  {cat.rows.map((row, rowIdx) => (
                    <tr key={rowIdx} className="hover:bg-bg-soft/50 transition-colors">
                      <td className="py-3.5 px-5 font-body text-body-sm text-text-primary">
                        {row.name}
                      </td>
                      <td className="py-3.5 px-5 text-center font-body text-body-sm text-text-secondary">
                        {typeof row.starter === "boolean" ? (
                          row.starter ? <Check className="w-4 h-4 text-brand-green mx-auto" /> : <X className="w-4 h-4 text-status-error opacity-40 mx-auto" />
                        ) : (
                          row.starter
                        )}
                      </td>
                      <td className="py-3.5 px-5 text-center font-body text-body-sm text-text-primary font-600">
                        {typeof row.pro === "boolean" ? (
                          row.pro ? <Check className="w-4 h-4 text-brand-green mx-auto" /> : <X className="w-4 h-4 text-status-error opacity-40 mx-auto" />
                        ) : (
                          row.pro
                        )}
                      </td>
                      <td className="py-3.5 px-5 text-center font-body text-body-sm text-text-primary font-600">
                        {typeof row.enterprise === "boolean" ? (
                          row.enterprise ? <Check className="w-4 h-4 text-brand-green mx-auto" /> : <X className="w-4 h-4 text-status-error opacity-40 mx-auto" />
                        ) : (
                          row.enterprise
                        )}
                      </td>
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Trust Row below */}
      <div className="trust-row">
        <div className="trust-items">
          {[
            "No setup fee",
            "Cancel anytime",
            "Quarterly or yearly — your choice",
            "Data export at any time",
            "GDPR Compliant (EU servers available)"
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 text-body-sm font-body text-text-secondary">
              <Check className="w-4 h-4 text-brand-green shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
