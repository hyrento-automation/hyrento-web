"use client";

import { useTranslations } from "next-intl";
import { Cog, Globe, Layout } from "lucide-react";
import { Link } from "@/i18n/routing";
import { SectionWrapper } from "../shared/SectionWrapper";
import { GifMockup } from "../shared/GifMockup";

const stepIcons = [Cog, Globe, Layout];
const stepKeys = ["step_1", "step_2", "step_3"];
const stepNumbers = ["01", "02", "03"];

export function HowItWorks() {
  const t = useTranslations("HowItWorks");

  return (
    <SectionWrapper theme="soft" id="how-it-works" className="border-b border-bg-border">
      <div className="text-center max-w-copy mx-auto mb-16 sm:mb-20">
        <h2 className="text-h2-mobile sm:text-h2-desktop font-heading font-800 text-brand-navy leading-tight mb-4">
          {t("heading")}
        </h2>
        <p className="text-body-lg font-body text-text-secondary">
          {t("subheading")}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-16">
        
        {/* Left: 3 steps vertical list */}
        <div className="lg:col-span-5 space-y-8 relative">
          
          {/* Connecting vertical line for steps (desktop only) */}
          <div className="hidden lg:block absolute left-7 top-6 bottom-6 w-0.5 bg-bg-border -z-10" />

          {stepKeys.map((key, idx) => {
            const Icon = stepIcons[idx];
            return (
              <div key={idx} className="flex gap-6 items-start group">
                {/* Step number badge / icon */}
                <div className="w-14 h-14 rounded-full bg-white border border-bg-border group-hover:border-brand-blue group-hover:bg-brand-blue-pale text-brand-blue shrink-0 flex items-center justify-center font-heading font-700 text-body-lg shadow-card-sm transition-all duration-200">
                  <Icon className="w-5 h-5" />
                </div>
                
                {/* Step text */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-heading font-800 text-brand-blue tracking-widest uppercase">
                    {t("step_label")} {stepNumbers[idx]}
                  </span>
                  <h3 className="font-heading font-700 text-h4 text-brand-navy leading-tight">
                    {t(`${key}_title`)}
                  </h3>
                  <p className="font-body text-body-sm text-text-secondary leading-relaxed">
                    {t(`${key}_desc`)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Simulated Dashboard Transformation Preview */}
        <div className="lg:col-span-7">
          <GifMockup 
            url="app.carrental.digital/setup-wizard" 
            className="w-full shadow-card-lg border border-bg-border/60"
          />
        </div>

      </div>

      {/* CTA Band at bottom */}
      <div className="text-center">
        <Link
          href="/demo"
          className="inline-flex items-center gap-2 px-8 py-4 bg-brand-green hover:bg-brand-green-hover text-white font-heading font-700 text-btn rounded-full shadow-btn-green transition-all duration-200 hover:scale-[1.02]"
        >
          {t("cta_button")}
        </Link>
      </div>
    </SectionWrapper>
  );
}
