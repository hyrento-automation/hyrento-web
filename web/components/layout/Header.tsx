"use client";

import { useState, useEffect, useRef } from "react";
import { Link, useRouter, usePathname } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, Globe, Car } from "lucide-react";
import { cn } from "@/lib/utils";
import { MegaMenuPlatform } from "./megamenus/MegaMenuPlatform";
import { MegaMenuSolutions } from "./megamenus/MegaMenuSolutions";
import { MegaMenuFeatures } from "./megamenus/MegaMenuFeatures";
import { MegaMenuPricing } from "./megamenus/MegaMenuPricing";
import { MobileNav } from "./MobileNav";

// Moved navItems inside the component to access translations

const languages = ["EN", "DE", "FR", "ES", "NL"];

export function Header() {
  const t = useTranslations("Header");
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const activeLang = locale.toUpperCase();
  
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  
  const navItems = [
    { label: t("nav_platform"), menu: "platform" },
    { label: t("nav_solutions"), menu: "solutions" },
    { label: t("nav_features"), menu: "features" },
    { label: t("nav_pricing"), menu: "pricing" },
  ];
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuEnter = (menu: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMenu(menu);
  };

  const handleMenuLeave = () => {
    closeTimer.current = setTimeout(() => setActiveMenu(null), 150);
  };

  const getMegaMenu = (menu: string) => {
    switch (menu) {
      case "platform": return <MegaMenuPlatform />;
      case "solutions": return <MegaMenuSolutions />;
      case "features": return <MegaMenuFeatures />;
      case "pricing": return <MegaMenuPricing />;
      default: return null;
    }
  };

  return (
    <>
      {/* Main sticky header */}
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-200",
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-card-sm border-b border-bg-border"
            : "bg-white border-b border-transparent"
        )}
        style={{ "--header-height": "72px" } as React.CSSProperties}
      >
        <div className="content-container">
          <div className="flex items-center justify-between h-[72px]">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0 group">
              <div className="w-8 h-8 bg-brand-navy rounded-md flex items-center justify-center">
                <Car className="w-5 h-5 text-white" strokeWidth={2} />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-heading font-700 text-brand-navy text-[15px] tracking-tight">
                  HyRento
                </span>
              </div>
            </Link>

            {/* Desktop navigation */}
            <nav
              className="hidden lg:flex items-center gap-1"
              onMouseLeave={handleMenuLeave}
            >
              {navItems.map((item) => (
                <button
                  key={item.menu}
                  className={cn(
                    "flex items-center gap-1 px-3 py-2 rounded-md text-nav font-heading font-500 transition-colors duration-150",
                    activeMenu === item.menu
                      ? "text-brand-blue bg-brand-blue-pale"
                      : "text-text-secondary hover:text-text-primary hover:bg-bg-soft"
                  )}
                  onMouseEnter={() => handleMenuEnter(item.menu)}
                  aria-expanded={activeMenu === item.menu}
                  aria-haspopup="true"
                >
                  {item.label}
                  <ChevronDown
                    className={cn(
                      "w-3.5 h-3.5 transition-transform duration-200",
                      activeMenu === item.menu ? "rotate-180 text-brand-blue" : ""
                    )}
                  />
                </button>
              ))}

              {/* Simple nav items */}
              <Link
                href="/about"
                className="px-3 py-2 rounded-md text-nav font-heading font-500 text-text-secondary hover:text-text-primary hover:bg-bg-soft transition-colors"
              >
                {t("nav_about")}
              </Link>
              <Link
                href="/contact"
                className="px-3 py-2 rounded-md text-nav font-heading font-500 text-text-secondary hover:text-text-primary hover:bg-bg-soft transition-colors"
              >
                {t("nav_contact")}
              </Link>
            </nav>

            {/* Right side actions */}
            <div className="flex items-center gap-2">
              {/* Language switcher — desktop dropdown */}
              <div 
                className="hidden lg:flex relative items-center mr-2"
                onMouseEnter={() => setLangMenuOpen(true)}
                onMouseLeave={() => setLangMenuOpen(false)}
              >
                <button 
                  className="flex items-center gap-1.5 px-2 py-1.5 rounded-md hover:bg-bg-soft transition-colors"
                  aria-label="Change language"
                  aria-expanded={langMenuOpen}
                >
                  <Globe className="w-3.5 h-3.5 text-text-muted" />
                  <span className="text-[12px] font-heading font-600 text-brand-navy">{activeLang}</span>
                  <ChevronDown className="w-3 h-3 text-text-muted" />
                </button>
                
                <AnimatePresence>
                  {langMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full right-0 mt-1 bg-white border border-bg-border rounded-lg shadow-card-sm overflow-hidden min-w-[80px] z-50 flex flex-col"
                    >
                      {languages.map((lang) => (
                        <button
                          key={lang}
                          onClick={() => {
                            router.replace(pathname, { locale: lang.toLowerCase() });
                            setLangMenuOpen(false);
                          }}
                          className={cn(
                            "w-full text-left px-4 py-2 text-[12px] font-heading transition-colors",
                            activeLang === lang
                              ? "bg-brand-blue-pale text-brand-blue font-700"
                              : "text-text-secondary hover:bg-bg-soft hover:text-brand-navy font-500"
                          )}
                        >
                          {lang}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                href="/onboarding"
                className="inline-flex items-center px-4 py-2 text-btn font-heading font-600 text-white bg-brand-green hover:bg-brand-green-hover rounded-full shadow-btn-green transition-all duration-200"
                id="header-cta"
              >
                <span className="hidden sm:inline">{t("btn_trial")}</span>
                <span className="sm:hidden">{t("btn_trial_mobile")}</span>
              </Link>

              {/* Mobile hamburger */}
              <button
                className="lg:hidden p-2 rounded-md text-text-secondary hover:bg-bg-soft transition-colors ml-1"
                onClick={() => setMobileOpen(true)}
                aria-label="Open navigation menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Mega menu dropdown */}
        <AnimatePresence>
          {activeMenu && (
            <motion.div
              key={activeMenu}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute left-0 right-0 top-full bg-white shadow-mega-menu border-b border-bg-border rounded-b-xl z-50"
              onMouseEnter={() => handleMenuEnter(activeMenu)}
              onMouseLeave={handleMenuLeave}
            >
              {getMegaMenu(activeMenu)}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile navigation drawer */}
      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
