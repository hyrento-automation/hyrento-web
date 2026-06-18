"use client";

import { Link } from "@/i18n/routing";
import { useRouter, usePathname } from "@/i18n/routing";
import { Car } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

// Inline SVG social icons (lucide-react removed these in newer versions)
const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const platformLinks = [
  { key: "features", href: "/features" },
  { key: "pricing", href: "/pricing" },
  { key: "solutions", href: "/solutions" },
  { key: "system_demo", href: "/demo" },
  { key: "downloads", href: "/downloads" },
];

const companyLinks = [
  { key: "about", href: "/about" },
  { key: "contact_sales", href: "/contact" },
];

const supportLinks = [
  { key: "contact_us", href: "/contact" },
  { key: "support_line", href: "tel:+18005550100" },
];

export function Footer() {
  const t = useTranslations("Footer");
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  return (
    <footer style={{ backgroundColor: "#0A1628", color: "#ffffff" }}>
      <div className="content-container">
        <div className="footer-grid">
          {/* Column 1 — Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-md flex items-center justify-center" style={{ background: "rgba(255,255,255,0.1)" }}>
                <Car className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading font-700 text-white text-[16px] tracking-tight">
                CarRental.digital
              </span>
            </Link>
            <p className="text-[14px] font-body leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.6)", maxWidth: "240px" }}>
              {t("tagline")}
            </p>
            <div className="flex items-center gap-3 mb-5">
              {[
                { icon: LinkedinIcon, href: "#", label: "LinkedIn" },
                { icon: XIcon, href: "#", label: "Twitter/X" },
                { icon: YoutubeIcon, href: "#", label: "YouTube" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-md flex items-center justify-center footer-social-icon"
                >
                  <Icon />
                </a>
              ))}
            </div>
            <p className="text-[13px] font-body" style={{ color: "rgba(255,255,255,0.5)" }}>{t("markets")}</p>
          </div>

          {/* Column 2 — Platform */}
          <div>
            <p className="text-[11px] font-body font-500 uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>
              {t("platform_heading")}
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {platformLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-[14px] font-body transition-colors"
                    style={{ color: "rgba(255,255,255,0.6)" }}
                  >
                    {t(`platform_${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Company */}
          <div>
            <p className="text-[11px] font-body font-500 uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>
              {t("company_heading")}
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {companyLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-[14px] font-body transition-colors"
                    style={{ color: "rgba(255,255,255,0.6)" }}
                  >
                    {t(`company_${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Support */}
          <div>
            <p className="text-[11px] font-body font-500 uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>
              {t("support_heading")}
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {supportLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-[14px] font-body transition-colors leading-snug block"
                    style={{ color: "rgba(255,255,255,0.6)" }}
                  >
                    {t(`support_${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <div>
            <p className="text-[13px] font-body" style={{ color: "rgba(255,255,255,0.4)" }}>
              © {new Date().getFullYear()} CarRental.digital. {t("all_rights_reserved")}
            </p>
            <p className="text-[12px] font-body mt-1" style={{ color: "rgba(255,255,255,0.3)" }}>
              {t("product_of")}{" "}
              <a href="#" className="underline transition-colors" style={{ color: "rgba(255,255,255,0.5)" }}>
                Maruti Digital India
              </a>{" "}
              — {t("building_digital")}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            {[
              { key: "privacy_policy", href: "#" },
              { key: "terms_of_service", href: "#" },
              { key: "cookie_policy", href: "#" },
            ].map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className="text-[13px] font-body transition-colors"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                {t(link.key)}
              </Link>
            ))}
            <div className="flex items-center gap-2" style={{ marginLeft: "0.5rem" }}>
              {[
                { code: "en", display: "EN" },
                { code: "de", display: "DE" },
                { code: "fr", display: "FR" },
                { code: "es", display: "ES" },
                { code: "nl", display: "NL" },
              ].map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => router.replace(pathname, { locale: lang.code })}
                  className={`text-[12px] font-body transition-colors ${
                    currentLocale === lang.code
                      ? "text-white font-600"
                      : ""
                  }`}
                  style={currentLocale !== lang.code ? { color: "rgba(255,255,255,0.3)" } : undefined}
                >
                  {lang.display}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
