"use client";

import { Link } from "@/i18n/routing";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";

const plans = [
  {
    key: "starter",
    href: "/pricing#starter",
    highlighted: false,
    featureCount: 4,
  },
  {
    key: "professional",
    href: "/pricing#professional",
    highlighted: true,
    featureCount: 4,
  },
  {
    key: "enterprise",
    href: "/pricing#enterprise",
    highlighted: false,
    featureCount: 4,
  },
];

export function MegaMenuPricing() {
  const t = useTranslations("MegaMenuPricing");

  return (
    <div className="max-w-content mx-auto px-8">
      <div className="py-8 grid grid-cols-3 gap-4">
        {plans.map((plan) => (
          <Link
            key={plan.key}
            href={plan.href}
            className={`relative block p-5 rounded-xl border transition-all duration-200 hover:shadow-card-md group ${
              plan.highlighted
                ? "border-brand-blue shadow-card-blue bg-white"
                : "border-bg-border bg-white hover:border-brand-blue/30"
            }`}
          >
            {plan.highlighted && (
              <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-brand-blue text-white text-[11px] font-heading font-600 rounded-full whitespace-nowrap">
                {t(`${plan.key}_badge`)}
              </span>
            )}
            <div className="mb-3">
              <p className="text-[13px] font-heading font-600 text-text-secondary">{t(`${plan.key}_name`)}</p>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-[24px] font-heading font-700 text-text-primary">{t(`${plan.key}_price`)}</span>
                <span className="text-[13px] font-body text-text-muted">{t(`${plan.key}_period`)}</span>
              </div>
              <p className="text-[12px] font-body text-text-muted mt-1">{t(`${plan.key}_fleet`)}</p>
            </div>
            <ul className="space-y-1.5">
              {Array.from({ length: plan.featureCount }, (_, i) => (
                <li key={i} className="flex items-center gap-2 text-[13px] font-body text-text-secondary">
                  <Check className="w-3.5 h-3.5 text-brand-green shrink-0" />
                  {t(`${plan.key}_feature_${i + 1}`)}
                </li>
              ))}
            </ul>
          </Link>
        ))}
      </div>
      <div className="border-t border-bg-border bg-bg-soft -mx-8 px-8 py-4 rounded-b-xl flex items-center justify-center">
        <Link
          href="/pricing"
          className="inline-flex items-center gap-2 px-6 py-2.5 border-2 border-brand-blue text-brand-blue font-heading font-600 rounded-full hover:bg-brand-blue-pale transition-all duration-200"
        >
          {t("cta_compare_all_plans")}
        </Link>
      </div>
    </div>
  );
}
