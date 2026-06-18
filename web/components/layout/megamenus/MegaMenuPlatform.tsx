"use client";

import { Link } from "@/i18n/routing";
import {
  Server, Calendar, Users, FileText, AlertTriangle, Car,
  CreditCard, Globe, Building2, Layers, TrendingUp,
  LayoutDashboard, UserCircle, Activity, Bell, Cloud, Smartphone,
} from "lucide-react";
import { useTranslations } from "next-intl";

const col1 = [
  { icon: Car, key: "online_booking_engine", href: "/features#booking" },
  { icon: Server, key: "fleet_management", href: "/features#fleet" },
  { icon: Calendar, key: "reservations_calendar", href: "/features#reservations" },
  { icon: Users, key: "driver_customer_management", href: "/features#crm" },
  { icon: FileText, key: "contract_agreement_builder", href: "/features#contracts" },
  { icon: AlertTriangle, key: "damage_inspection_reports", href: "/features#damage" },
];

const col2 = [
  { icon: UserCircle, key: "crm_customer_profiles", href: "/features#crm" },
  { icon: CreditCard, key: "invoicing_payments", href: "/features#payments" },
  { icon: Globe, key: "multi_currency_vat", href: "/features#payments" },
  { icon: Building2, key: "multi_location_management", href: "/features#multilocation" },
  { icon: Layers, key: "multi_brand_management", href: "/features#multibrand" },
  { icon: TrendingUp, key: "dynamic_pricing_rate_rules", href: "/features#pricing" },
];

const col3 = [
  { icon: LayoutDashboard, key: "admin_dashboard", href: "/features#dashboard" },
  { icon: UserCircle, key: "client_facing_portal", href: "/features#portal" },
  {
    icon: Activity,
    key: "realtime_reporting_analytics",
    href: "/features#analytics",
    live: true,
  },
  { icon: Bell, key: "automated_email_sms_notifications", href: "/features#notifications" },
  { icon: Cloud, key: "data_backup_cloud_storage", href: "/features#cloud" },
  { icon: Smartphone, key: "mobile_access_manage_anywhere", href: "/features#mobile" },
];

const ColHeader = ({ label }: { label: string }) => (
  <p className="text-badge font-body font-500 text-text-muted uppercase tracking-widest mb-3">
    {label}
  </p>
);

const MenuItem = ({
  icon: Icon,
  label,
  href,
  live,
}: {
  icon: React.ElementType;
  label: string;
  href: string;
  live?: boolean;
}) => (
  <Link
    href={href}
    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-bg-soft group transition-all duration-150"
  >
    <div className="w-8 h-8 bg-brand-blue-pale rounded-md flex items-center justify-center shrink-0">
      <Icon className="w-4 h-4 text-brand-blue" />
    </div>
    <span className="text-[14px] font-heading font-500 text-text-primary group-hover:text-brand-blue transition-colors">
      {label}
    </span>
    {live && (
      <span className="ml-auto flex items-center gap-1 text-[11px] font-body font-500 text-status-success">
        <span className="w-1.5 h-1.5 bg-online-dot rounded-full" />
        Live
      </span>
    )}
  </Link>
);

export function MegaMenuPlatform() {
  const t = useTranslations("MegaMenuPlatform");

  return (
    <div className="max-w-content mx-auto px-8">
      <div className="py-8 grid grid-cols-3 gap-8">
        <div>
          <ColHeader label={t("col_core_system")} />
          <div className="space-y-0.5">
            {col1.map((item) => (
              <MenuItem key={item.key} icon={item.icon} label={t(item.key)} href={item.href} />
            ))}
          </div>
        </div>
        <div className="border-x border-bg-subtle px-8">
          <ColHeader label={t("col_business_tools")} />
          <div className="space-y-0.5">
            {col2.map((item) => (
              <MenuItem key={item.key} icon={item.icon} label={t(item.key)} href={item.href} />
            ))}
          </div>
        </div>
        <div>
          <ColHeader label={t("col_growth_operations")} />
          <div className="space-y-0.5">
            {col3.map((item) => (
              <MenuItem key={item.key} icon={item.icon} label={t(item.key)} href={item.href} live={item.live} />
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-bg-border bg-bg-soft -mx-8 px-8 py-4 rounded-b-xl flex items-center justify-between">
        <p className="text-[13px] font-body text-text-secondary italic">
          {t("bottom_tagline")}
        </p>
        <Link
          href="/features"
          className="inline-flex items-center gap-1 px-4 py-2 bg-brand-green hover:bg-brand-green-hover text-white text-btn font-heading font-600 rounded-full shadow-btn-green transition-all duration-200 text-sm"
        >
          {t("cta_full_feature_list")}
        </Link>
      </div>
    </div>
  );
}
