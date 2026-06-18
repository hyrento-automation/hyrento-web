"use client";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

const bySize = [
  { emoji: "🚗", key: "small_fleet", href: "/solutions#small" },
  { emoji: "🚙", key: "mid_size_fleet", href: "/solutions#mid" },
  { emoji: "🚐", key: "large_enterprise", href: "/solutions#enterprise" },
];

const byType = [
  { key: "single_brand_rental", href: "/solutions#single" },
  { key: "multi_brand_rental_group", href: "/solutions#multi" },
  { key: "airport_station_operators", href: "/solutions#airport" },
  { key: "luxury_premium_car_rental", href: "/solutions#luxury" },
  { key: "economy_budget_fleet", href: "/solutions#economy" },
  { key: "tourism_holiday_rental", href: "/solutions#tourism" },
];

export function MegaMenuSolutions() {
  const t = useTranslations("MegaMenuSolutions");

  return (
    <div className="max-w-content mx-auto px-8">
      <div className="py-8 grid grid-cols-2 gap-12">
        <div>
          <p className="text-badge font-body font-500 text-text-muted uppercase tracking-widest mb-4">
            {t("by_business_size")}
          </p>
          <div className="space-y-2">
            {bySize.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="flex items-center gap-4 px-3 py-3 rounded-lg hover:bg-bg-soft group transition-all duration-150"
              >
                <span className="text-2xl">{item.emoji}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] font-heading font-600 text-text-primary group-hover:text-brand-blue transition-colors">
                      {t(`size_${item.key}_label`)}
                    </span>
                    <span className="px-2 py-0.5 bg-brand-blue-pale text-brand-blue text-[11px] font-body font-500 rounded-full">
                      {t(`size_${item.key}_sub`)}
                    </span>
                  </div>
                  <p className="text-[12px] font-body text-text-muted mt-0.5">{t(`size_${item.key}_desc`)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="border-l border-bg-subtle pl-12">
          <p className="text-badge font-body font-500 text-text-muted uppercase tracking-widest mb-4">
            {t("by_business_type")}
          </p>
          <div className="space-y-0.5">
            {byType.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-bg-soft group transition-all duration-150"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-brand-blue-pale group-hover:bg-brand-blue transition-colors" />
                <span className="text-[14px] font-heading font-500 text-text-primary group-hover:text-brand-blue transition-colors">
                  {t(`type_${item.key}`)}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-bg-border bg-bg-soft -mx-8 px-8 py-4 rounded-b-xl flex items-center justify-between">
        <p className="text-[13px] font-body text-text-secondary italic">
          {t("bottom_tagline")}
        </p>
        <Link
          href="/pricing"
          className="inline-flex items-center gap-1 px-4 py-2 bg-brand-green hover:bg-brand-green-hover text-white text-sm font-heading font-600 rounded-full shadow-btn-green transition-all duration-200"
        >
          {t("cta_find_your_plan")}
        </Link>
      </div>
    </div>
  );
}
