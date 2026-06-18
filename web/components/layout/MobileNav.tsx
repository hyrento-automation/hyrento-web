"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import { useRouter, usePathname } from "@/i18n/routing";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown, Car } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

const navSectionKeys = [
  {
    key: "platform",
    items: [
      { key: "online_booking_engine", href: "/features#booking" },
      { key: "fleet_management", href: "/features#fleet" },
      { key: "crm_customer_profiles", href: "/features#crm" },
      { key: "digital_contracts", href: "/features#contracts" },
      { key: "invoicing_payments", href: "/features#payments" },
      { key: "analytics_reports", href: "/features#analytics" },
    ],
  },
  {
    key: "solutions",
    items: [
      { key: "small_fleet", href: "/solutions#small" },
      { key: "mid_size_fleet", href: "/solutions#mid" },
      { key: "large_enterprise_fleet", href: "/solutions#enterprise" },
      { key: "multi_brand_rental_group", href: "/solutions#multi" },
      { key: "luxury_car_rental", href: "/solutions#luxury" },
      { key: "airport_station_operators", href: "/solutions#airport" },
    ],
  },
  {
    key: "features",
    items: [
      { key: "all_features", href: "/features" },
      { key: "admin_dashboard", href: "/features#dashboard" },
      { key: "client_portal", href: "/features#portal" },
      { key: "multi_location", href: "/features#multilocation" },
      { key: "notifications", href: "/features#notifications" },
    ],
  },
  {
    key: "resources",
    items: [
      { key: "getting_started_guide", href: "/resources/guide" },
      { key: "video_tutorials", href: "/resources/videos" },
      { key: "help_center", href: "/resources/help" },
      { key: "blog", href: "/blog" },
      { key: "downloads", href: "/downloads" },
    ],
  },
];

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const t = useTranslations("MobileNav");
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50 lg:hidden"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
            className="fixed top-0 right-0 bottom-0 w-[320px] bg-white z-50 lg:hidden flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-bg-border">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-brand-navy rounded-md flex items-center justify-center">
                  <Car className="w-4 h-4 text-white" />
                </div>
                <span className="font-heading font-700 text-brand-navy text-[15px]">CarRental.digital</span>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-md text-text-secondary hover:bg-bg-soft transition-colors"
                aria-label={t("close_menu")}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav items */}
            <div className="flex-1 overflow-y-auto py-4">
              {navSectionKeys.map((section) => (
                <div key={section.key} className="border-b border-bg-soft last:border-0">
                  <button
                    className="w-full flex items-center justify-between px-5 py-3.5 text-[15px] font-heading font-600 text-text-primary hover:bg-bg-soft transition-colors"
                    onClick={() => setExpanded(expanded === section.key ? null : section.key)}
                  >
                    {t(`section_${section.key}`)}
                    <ChevronDown
                      className={`w-4 h-4 text-text-muted transition-transform duration-200 ${
                        expanded === section.key ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {expanded === section.key && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="bg-bg-soft pb-2">
                          {section.items.map((item) => (
                            <Link
                              key={item.key}
                              href={item.href}
                              onClick={onClose}
                              className="block px-8 py-2.5 text-[14px] font-body text-text-secondary hover:text-brand-blue transition-colors"
                            >
                              {t(`${section.key}_${item.key}`)}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              <div className="px-5 py-3">
                {[
                  { key: "pricing", href: "/pricing" },
                  { key: "about", href: "/about" },
                  { key: "contact", href: "/contact" },
                ].map((item) => (
                  <Link
                    key={item.key}
                    href={item.href}
                    onClick={onClose}
                    className="block py-3.5 text-[15px] font-heading font-600 text-text-primary hover:text-brand-blue border-b border-bg-soft transition-colors"
                  >
                    {t(`link_${item.key}`)}
                  </Link>
                ))}
              </div>
            </div>

            {/* Bottom CTAs */}
            <div className="p-5 border-t border-bg-border space-y-3">
              <Link
                href="/demo"
                onClick={onClose}
                className="block w-full text-center py-3.5 bg-brand-green hover:bg-brand-green-hover text-white font-heading font-600 rounded-full shadow-btn-green transition-all"
                id="mobile-nav-trial-cta"
              >
                {t("start_free_trial")}
              </Link>
              <Link
                href="/login"
                onClick={onClose}
                className="block w-full text-center py-3 border border-bg-border text-text-secondary font-heading font-600 rounded-md hover:bg-bg-soft transition-all"
              >
                {t("login")}
              </Link>
              {/* Language row */}
              <div className="flex items-center justify-center gap-3 pt-1">
                {[
                  { code: "en", display: "🇺🇸 EN" },
                  { code: "de", display: "🇩🇪 DE" },
                  { code: "fr", display: "🇫🇷 FR" },
                  { code: "es", display: "🇪🇸 ES" },
                  { code: "nl", display: "🇳🇱 NL" },
                ].map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => router.replace(pathname, { locale: lang.code })}
                    className={`text-[12px] font-body transition-colors ${
                      currentLocale === lang.code
                        ? "text-brand-blue font-600"
                        : "text-text-muted hover:text-text-secondary"
                    }`}
                  >
                    {lang.display}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
