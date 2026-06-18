"use client";

import { useTranslations } from "next-intl";
import { Globe, Monitor, UserCheck } from "lucide-react";
import { SectionWrapper } from "../shared/SectionWrapper";
import { GifMockup } from "../shared/GifMockup";

const calloutKeys = ["item_1", "item_2", "item_3"];
const calloutIcons = [Globe, Monitor, UserCheck];

export function WhatIsSection() {
  const t = useTranslations("WhatIs");

  return (
    <SectionWrapper theme="light" id="what-is">
      <div className="text-center max-w-copy mx-auto mb-12 sm:mb-16">
        <h2 className="text-h2-mobile sm:text-h2-desktop font-heading font-800 text-brand-navy leading-tight mb-4">
          {t("heading")}
        </h2>
        <p className="text-body-lg font-body text-text-secondary">
          {t("subheading")}
        </p>
      </div>

      {/* Large system screen preview */}
      <div className="mb-16">
        <GifMockup className="w-full max-w-5xl mx-auto shadow-card-lg border border-bg-border/60" />
      </div>

      {/* 3 Column Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {calloutKeys.map((key, idx) => {
          const Icon = calloutIcons[idx];
          return (
            <div 
              key={idx} 
              className="bg-bg-soft border border-bg-border/60 hover:border-brand-blue/30 rounded-xl p-6 sm:p-8 transition-all duration-200 hover:shadow-card-md group"
            >
              <div className="w-10 h-10 bg-brand-blue-pale text-brand-blue rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-700 text-h4 text-brand-navy mb-3">
                {t(`${key}_title`)}
              </h3>
              <p className="font-body text-body-sm text-text-secondary leading-relaxed">
                {t(`${key}_desc`)}
              </p>
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
