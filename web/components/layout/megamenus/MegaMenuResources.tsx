"use client";

import { Link } from "@/i18n/routing";
import { BookOpen, Video, HelpCircle, FileText, Rss, Code, MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";

const items = [
  { icon: BookOpen, key: "getting_started_guide", href: "/resources/guide" },
  { icon: Video, key: "video_tutorials", href: "/resources/videos" },
  { icon: HelpCircle, key: "help_center_docs", href: "/resources/help" },
  { icon: FileText, key: "case_studies", href: "/resources/cases" },
  { icon: Rss, key: "blog_insights", href: "/blog" },
  { icon: Code, key: "api_documentation", href: "/resources/api" },
  { icon: MessageCircle, key: "contact_support", href: "/contact" },
];

export function MegaMenuResources() {
  const t = useTranslations("MegaMenuResources");

  return (
    <div className="max-w-content mx-auto px-8">
      <div className="py-8 grid grid-cols-2 gap-2">
        {items.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-bg-soft group transition-all duration-150"
          >
            <div className="w-8 h-8 bg-brand-blue-pale rounded-md flex items-center justify-center shrink-0">
              <item.icon className="w-4 h-4 text-brand-blue" />
            </div>
            <div>
              <p className="text-[14px] font-heading font-500 text-text-primary group-hover:text-brand-blue transition-colors">
                {t(`${item.key}_label`)}
              </p>
              <p className="text-[12px] font-body text-text-muted">{t(`${item.key}_sub`)}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className="border-t border-bg-border bg-bg-soft -mx-8 px-8 py-4 rounded-b-xl flex items-center gap-3">
        <span className="flex items-center gap-1.5 text-[13px] font-body text-status-success font-500">
          <span className="w-2 h-2 bg-online-dot rounded-full animate-pulse-slow" />
          {t("live_support")}
        </span>
        <span className="text-bg-border">|</span>
        <Link href="/contact" className="text-[13px] font-heading font-600 text-brand-blue hover:underline">
          {t("chat_with_team")}
        </Link>
      </div>
    </div>
  );
}
