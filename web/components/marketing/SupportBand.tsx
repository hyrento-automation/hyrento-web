"use client";

import { useTranslations } from "next-intl";
import { MessageSquare, Mail, Phone, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { SectionWrapper } from "../shared/SectionWrapper";

const channelIcons = [MessageSquare, Mail, Phone];
const channelColors = [
  { color: "text-brand-blue", bg: "bg-brand-blue/10" },
  { color: "text-emerald-400", bg: "bg-emerald-400/10" },
  { color: "text-amber-400", bg: "bg-amber-400/10" }
];
const channelKeys = ["channel_1", "channel_2", "channel_3"];

export function SupportBand() {
  const t = useTranslations("SupportBand");

  return (
    <SectionWrapper theme="navy" className="relative overflow-hidden">
      {/* Background glow effects for premium look */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-blue/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-green/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left: Headline & Subtext */}
        <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
          <span className="text-[10px] font-heading font-800 text-brand-green bg-brand-green/10 border border-brand-green/20 px-3 py-1 rounded-full uppercase tracking-wider">
            {t("badge")}
          </span>
          <h2 className="text-h2-mobile sm:text-h2-desktop font-heading font-800 text-white leading-tight">
            {t("heading_line_1")}<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue-light to-emerald-400">
              {t("heading_line_2")}
            </span>
          </h2>
          <p className="font-body text-body-lg text-slate-300 max-w-copy mx-auto lg:mx-0">
            {t("subheading")}
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand-green hover:bg-brand-green-hover text-white font-heading font-700 text-btn rounded-full shadow-btn-green transition-all duration-200 hover:scale-[1.02]"
            >
              <span>{t("cta_button")}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Right: Support Channels Grid */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {channelKeys.map((key, idx) => {
            const Icon = channelIcons[idx];
            const { color, bg } = channelColors[idx];
            return (
              <div 
                key={idx} 
                className="bg-brand-navy-light/60 border border-slate-800 rounded-2xl p-6 text-center flex flex-col items-center justify-center space-y-4 hover:border-slate-700 hover:bg-brand-navy-light transition-all duration-200 shadow-card-sm"
              >
                <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center ${color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-heading font-700 text-body-default text-white">
                    {t(`${key}_label`)}
                  </h3>
                  <p className="font-body text-[11px] text-slate-400 leading-snug">
                    {t(`${key}_desc`)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </SectionWrapper>
  );
}
