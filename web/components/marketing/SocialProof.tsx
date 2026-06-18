"use client";

import { useTranslations } from "next-intl";
import { SectionWrapper } from "../shared/SectionWrapper";
import { StatsCounter } from "../shared/StatsCounter";
import { TestimonialCard } from "../shared/TestimonialCard";

const testimonialKeys = ["testimonial_1", "testimonial_2", "testimonial_3"];

export function SocialProof() {
  const t = useTranslations("SocialProof");

  return (
    <SectionWrapper theme="light" id="social-proof" className="border-b border-bg-border">
      
      {/* Stats counter row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 sm:mb-28">
        <StatsCounter 
          value={500} 
          suffix="+" 
          label={t("stat_1_label")} 
        />
        <StatsCounter 
          value={40} 
          suffix="+" 
          label={t("stat_2_label")} 
        />
        <StatsCounter 
          value={2} 
          suffix="M+" 
          label={t("stat_3_label")} 
        />
        <StatsCounter 
          value={99.98} 
          suffix="%" 
          decimals={2} 
          label={t("stat_4_label")} 
        />
      </div>

      {/* Testimonials header */}
      <div className="text-center max-w-copy mx-auto mb-12 sm:mb-16">
        <h2 className="text-h2-mobile sm:text-h2-desktop font-heading font-800 text-brand-navy leading-tight mb-4">
          {t("heading")}
        </h2>
        <p className="text-body-lg font-body text-text-secondary">
          {t("subheading")}
        </p>
      </div>

      {/* Testimonial Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonialKeys.map((key, idx) => (
          <TestimonialCard 
            key={idx}
            quote={t(`${key}_quote`)}
            name={t(`${key}_name`)}
            role={t(`${key}_role`)}
            company={t(`${key}_company`)}
            country={t(`${key}_country`)}
            rating={5}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
