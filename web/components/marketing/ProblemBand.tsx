"use client";

import { useTranslations } from "next-intl";
import { ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { SectionWrapper } from "../shared/SectionWrapper";

const problemKeys = [
  "item_1", "item_2", "item_3", "item_4",
  "item_5", "item_6", "item_7", "item_8"
];

export function ProblemBand() {
  const t = useTranslations("ProblemBand");

  return (
    <SectionWrapper theme="soft" className="border-y border-bg-border">
      <div className="text-center max-w-copy mx-auto mb-12 sm:mb-16">
        <h2 className="text-h2-mobile sm:text-h2-desktop font-heading font-800 text-brand-navy leading-tight">
          {t("heading")}
        </h2>
      </div>

      {/* Desktop Comparison Table (Hidden on Mobile) */}
      <div className="hidden lg:block bg-white border border-bg-border rounded-2xl overflow-hidden shadow-card-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-900 text-white font-heading font-600 text-[13px] uppercase tracking-wider">
              <th className="py-5 px-6 w-[45%]">{t("col_old_way")}</th>
              <th className="py-5 text-center w-[10%]"></th>
              <th className="py-5 px-6 w-[45%]">{t("col_new_way")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-bg-subtle">
            {problemKeys.map((key, idx) => (
              <tr key={idx} className="hover:bg-bg-soft transition-colors">
                <td className="py-4.5 px-6 font-body text-body-sm text-text-secondary flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-status-error shrink-0 mt-0.5" />
                  <span>{t(`${key}_problem`)}</span>
                </td>
                <td className="py-4.5 text-center">
                  <ArrowRight className="w-4 h-4 text-text-muted inline" />
                </td>
                <td className="py-4.5 px-6 font-body text-body-sm text-text-primary font-600 bg-brand-green-pale/30 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
                  <span>{t(`${key}_fix`)}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile/Tablet Stack Card Layout (Hidden on Desktop) */}
      <div className="lg:hidden space-y-4">
        {problemKeys.map((key, idx) => (
          <div 
            key={idx} 
            className="bg-white border border-bg-border rounded-xl p-5 shadow-card-sm space-y-3"
          >
            <div className="flex items-start gap-2 text-body-sm text-text-secondary">
              <AlertCircle className="w-4 h-4 text-status-error shrink-0 mt-0.5" />
              <div>
                <span className="font-heading font-700 text-slate-400 uppercase text-[10px] block tracking-wider mb-0.5">{t("label_problem")}</span>
                {t(`${key}_problem`)}
              </div>
            </div>
            
            <div className="flex justify-center py-1">
              <ArrowRight className="w-4 h-4 text-text-muted rotate-90" />
            </div>

            <div className="flex items-start gap-2 text-body-sm text-text-primary font-600 bg-brand-green-pale/40 p-3 rounded-lg border border-brand-green/10">
              <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
              <div>
                <span className="font-heading font-700 text-brand-green uppercase text-[10px] block tracking-wider mb-0.5">{t("label_fix")}</span>
                {t(`${key}_fix`)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Saving Stat Banner below */}
      <div className="mt-12 sm:mt-16 bg-slate-900 rounded-xl sm:rounded-full px-6 py-4 border border-slate-800 text-center max-w-copy mx-auto shadow-md">
        <p className="font-heading font-600 text-body-sm sm:text-body-default text-white">
          🚀 {t("stat_text_before")} <span className="text-brand-green font-700">{t("stat_highlight")}</span> {t("stat_text_after")}
        </p>
      </div>
    </SectionWrapper>
  );
}
