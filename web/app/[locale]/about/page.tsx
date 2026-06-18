import { Metadata } from "next";
import { ShieldCheck, Heart, Globe } from "lucide-react";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "About Us — Our Mission & Story",
  description: "Learn about CarRental.digital, a product of Maruti Digital India. Discover our mission to empower independent car rental operators in the US and Europe.",
};

const valueCardIcons = [Heart, ShieldCheck, Globe];

const teamMembers = [
  { nameKey: "team_1_name", roleKey: "team_1_role", divisionKey: "team_1_division", initials: "AV" },
  { nameKey: "team_2_name", roleKey: "team_2_role", divisionKey: "team_2_division", initials: "JM" },
  { nameKey: "team_3_name", roleKey: "team_3_role", divisionKey: "team_3_division", initials: "DK" },
  { nameKey: "team_4_name", roleKey: "team_4_role", divisionKey: "team_4_division", initials: "SR" }
];

export default async function AboutPage() {
  const t = await getTranslations("AboutPage");

  return (
    <div className="bg-bg-soft min-h-screen">
      {/* Page Header */}
      <section className="bg-white border-b border-bg-border py-16 sm:py-24">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-copy">
          <span className="text-[10px] font-heading font-800 text-brand-blue bg-brand-blue-pale border border-brand-blue/10 px-3 py-1 rounded-full uppercase tracking-wider">
            {t("badge")}
          </span>
          <h1 className="text-h1-mobile sm:text-h1-desktop font-heading font-800 text-brand-navy leading-tight mt-4 mb-4">
            {t("heading")}
          </h1>
          <p className="text-body-lg font-body text-text-secondary">
            {t("subheading")}
          </p>
        </div>
      </section>

      {/* Story & Mission Section */}
      <SectionWrapper theme="light" className="py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-h2-mobile sm:text-h3-desktop font-heading font-800 text-brand-navy leading-tight">
              {t("story_title")}
            </h2>
            <p className="font-body text-body-default text-text-secondary leading-relaxed">
              {t("story_p1")}
            </p>
            <p className="font-body text-body-default text-text-secondary leading-relaxed">
              {t("story_p2")}
            </p>
          </div>
          <div className="lg:col-span-6 bg-slate-900 text-white rounded-2xl p-8 sm:p-12 shadow-card-lg space-y-6 relative overflow-hidden border border-slate-800">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/10 rounded-full blur-[60px] pointer-events-none" />
            
            <h3 className="font-heading font-700 text-h3-desktop text-white leading-none">
              {t("mission_title")}
            </h3>
            
            <blockquote className="font-body text-body-lg text-slate-300 italic border-l-4 border-brand-green pl-4 py-1">
              &ldquo;{t("mission_quote")}&rdquo;
            </blockquote>
            
            <p className="font-body text-body-sm text-slate-400">
              {t("mission_desc")}
            </p>
          </div>
        </div>
      </SectionWrapper>

      {/* Values Grid */}
      <SectionWrapper theme="soft" className="border-t border-bg-border">
        <div className="text-center max-w-copy mx-auto mb-12">
          <h2 className="text-h3-desktop font-heading font-800 text-brand-navy">
            {t("values_title")}
          </h2>
          <p className="font-body text-body-sm text-text-secondary mt-1">
            {t("values_subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((num, idx) => {
            const Icon = valueCardIcons[idx];
            return (
              <div key={idx} className="bg-white border border-bg-border rounded-xl p-6 sm:p-8 shadow-card-sm hover:shadow-card-md hover:border-brand-blue/20 transition-all duration-200">
                <div className="w-10 h-10 bg-brand-blue-pale text-brand-blue rounded-lg flex items-center justify-center mb-6">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-700 text-h4 text-brand-navy mb-3">
                  {t(`value_${num}_title`)}
                </h3>
                <p className="font-body text-body-sm text-text-secondary leading-relaxed">
                  {t(`value_${num}_desc`)}
                </p>
              </div>
            );
          })}
        </div>
      </SectionWrapper>

      {/* Team Grid Section */}
      <SectionWrapper theme="light" className="border-t border-bg-border">
        <div className="text-center max-w-copy mx-auto mb-16">
          <h2 className="text-h3-desktop font-heading font-800 text-brand-navy">
            {t("team_title")}
          </h2>
          <p className="font-body text-body-sm text-text-secondary mt-1">
            {t("team_subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="bg-white border border-bg-border rounded-xl p-6 text-center shadow-card-sm hover:shadow-card-md transition-shadow">
              {/* Fallback initials avatar */}
              <div className="w-16 h-16 bg-slate-900 text-white font-heading font-700 text-lg rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-800 shadow-sm select-none">
                {member.initials}
              </div>
              <h3 className="font-heading font-700 text-body-default text-brand-navy leading-none mb-1">
                {t(member.nameKey)}
              </h3>
              <p className="font-body text-[12px] text-brand-blue font-600 mb-0.5">
                {t(member.roleKey)}
              </p>
              <p className="font-body text-[10px] text-text-muted">
                {t(member.divisionKey)}
              </p>
            </div>
          ))}
        </div>
      </SectionWrapper>
    </div>
  );
}
