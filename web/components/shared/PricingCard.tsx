"use client";

import { Check, X } from "lucide-react";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export interface PricingPlanFeature {
  text: string;
  included: boolean;
}

interface PricingCardProps {
  name: string;
  badge?: string;
  priceQuarterly: number;
  priceYearly: number;
  billingPeriod: "quarter" | "year";
  fleetSize: string;
  features: PricingPlanFeature[];
  ctaText: string;
  ctaHref: string;
  highlighted?: boolean;
}

export function PricingCard({
  name,
  badge,
  priceQuarterly,
  priceYearly,
  billingPeriod,
  fleetSize,
  features,
  ctaText,
  ctaHref,
  highlighted = false,
}: PricingCardProps) {
  const t = useTranslations("PricingCard");
  const currentPrice = billingPeriod === "quarter" ? priceQuarterly : Math.round(priceYearly / 4);
  const periodLabel = billingPeriod === "quarter" ? t("per_quarter") : t("per_quarter_billed_annually");

  return (
    <div
      className={cn(
        "pricing-card",
        highlighted
          ? "pricing-card--highlighted"
          : ""
      )}
    >
      {highlighted && badge && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-brand-blue text-white text-badge font-heading font-700 rounded-full shadow-md whitespace-nowrap uppercase tracking-wider">
          {badge}
        </span>
      )}
      {!highlighted && badge && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-0.5 bg-slate-100 text-text-secondary text-[11px] font-heading font-600 rounded-full border border-bg-border whitespace-nowrap">
          {badge}
        </span>
      )}

      <div>
        {/* Header */}
        <div className="text-center mt-2 mb-6">
          <h3 className="font-heading font-700 text-h3-desktop text-brand-navy leading-none mb-2">
            {name}
          </h3>
          <p className="font-body text-body-sm text-text-secondary mb-4">{fleetSize}</p>
          
          <div className="flex items-baseline justify-center gap-1.5">
            <span className="text-pricing font-heading font-800 text-brand-navy">
              €{currentPrice}
            </span>
            <span className="text-body-sm font-body text-text-muted">{periodLabel}</span>
          </div>
          
          {billingPeriod === "year" && (
            <p className="text-[11px] font-body text-brand-green font-650 mt-1">
              {t("save_yearly")}
            </p>
          )}
        </div>

        {/* Divider */}
        <div className="h-px bg-bg-subtle my-6" />

        {/* Features List */}
        <ul className="space-y-3 mb-8">
          {features.map((feature, idx) => (
            <li
              key={idx}
              className={cn(
                "flex items-start gap-2.5 text-body-sm font-body",
                feature.included ? "text-text-primary" : "text-text-muted"
              )}
            >
              {feature.included ? (
                <Check className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
              ) : (
                <X className="w-4 h-4 text-status-error opacity-40 shrink-0 mt-0.5" />
              )}
              <span className={!feature.included ? "line-through opacity-70" : ""}>
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Button */}
      <Link
        href={ctaHref}
        className={cn(
          "w-full text-center py-3.5 px-6 rounded-full font-heading font-700 text-btn transition-all duration-200",
          highlighted
            ? "bg-brand-green hover:bg-brand-green-hover text-white shadow-btn-green"
            : "bg-slate-900 hover:bg-slate-800 text-white"
        )}
      >
        {ctaText}
      </Link>
    </div>
  );
}
