"use client";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

const features = [
  { emoji: "🖥️", key: "branded_website", href: "/features#website", isNew: false },
  { emoji: "⚡", key: "fastest_hosting", href: "/features#hosting", isNew: false },
  { emoji: "📋", key: "admin_panel", href: "/features#dashboard", isNew: false },
  { emoji: "👤", key: "client_side_portal", href: "/features#portal", isNew: false },
  { emoji: "🚘", key: "fleet_management", href: "/features#fleet", isNew: false },
  { emoji: "📆", key: "booking_calendar", href: "/features#booking", isNew: true },
  { emoji: "💳", key: "payment_processing", href: "/features#payments", isNew: false },
  { emoji: "📄", key: "digital_contracts", href: "/features#contracts", isNew: false },
  { emoji: "📊", key: "crm_customer_data", href: "/features#crm", isNew: false },
  { emoji: "🔔", key: "automated_notifications", href: "/features#notifications", isNew: true },
  { emoji: "📈", key: "analytics_reports", href: "/features#analytics", isNew: false },
  { emoji: "🌍", key: "multi_location_ready", href: "/features#multilocation", isNew: false },
  { emoji: "🛡️", key: "cloud_based", href: "/features#cloud", isNew: false },
  { emoji: "🔒", key: "gdpr_compliant", href: "/features#gdpr", isNew: false },
];

export function MegaMenuFeatures() {
  const t = useTranslations("MegaMenuFeatures");
  const half = Math.ceil(features.length / 2);
  const col1 = features.slice(0, half);
  const col2 = features.slice(half);

  return (
    <div className="max-w-content mx-auto px-8">
      <div className="py-8 grid grid-cols-2 gap-4">
        {[col1, col2].map((col, i) => (
          <div key={i} className="space-y-0.5">
            {col.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-bg-soft group transition-all duration-150"
              >
                <span className="text-lg w-6">{item.emoji}</span>
                <span className="text-[14px] font-heading font-500 text-text-primary group-hover:text-brand-blue transition-colors flex-1">
                  {t(item.key)}
                </span>
                {item.isNew && (
                  <span className="px-1.5 py-0.5 bg-brand-green-pale text-brand-green text-[10px] font-body font-500 rounded uppercase tracking-wide">
                    {t("badge_new")}
                  </span>
                )}
              </Link>
            ))}
          </div>
        ))}
      </div>
      <div className="border-t border-bg-border bg-bg-soft -mx-8 px-8 py-4 rounded-b-xl flex items-center justify-center">
        <Link
          href="/demo"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-brand-green hover:bg-brand-green-hover text-white font-heading font-600 rounded-full shadow-btn-green transition-all duration-200"
        >
          {t("cta_watch_demo")}
        </Link>
      </div>
    </div>
  );
}
