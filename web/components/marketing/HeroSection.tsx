"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Play } from "lucide-react";
import { TrustBadges } from "@/components/shared/TrustBadges";
import { GifMockup } from "@/components/shared/GifMockup";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
} as const;

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

export function HeroSection() {
  const t = useTranslations("Hero");

  return (
    <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-32 overflow-hidden bg-gradient-to-b from-bg-soft via-white to-white">
      {/* Background blobs for premium depth */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-brand-blue-pale/50 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center mb-16 lg:mb-24">
          
          {/* Left: Text copy */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-6 space-y-6 text-center lg:text-left"
          >
            {/* Tagline / Market indicator */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-blue-pale border border-brand-blue/10 rounded-full">
              <span className="text-[10px] font-heading font-700 bg-brand-blue text-white px-2 py-0.5 rounded-full uppercase tracking-wider">{t("tagline_new")}</span>
              <span className="text-[11px] font-heading font-600 text-brand-blue tracking-wide">
                {t("tagline_text")}
              </span>
            </motion.div>

            {/* H1 Heading */}
            <motion.h1 
              variants={itemVariants} 
              className="text-hero-mobile sm:text-hero-desktop font-heading font-800 text-brand-navy leading-none tracking-tight"
            >
              {t("headline_1")}<span className="gradient-text-blue">{t("headline_2")}</span>
            </motion.h1>

            {/* Subtext description */}
            <motion.p 
              variants={itemVariants}
              className="text-body-lg font-body text-text-secondary max-w-copy mx-auto lg:mx-0"
            >
              {t("subtext")}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2"
            >
              <Link
                href="/demo"
                className="inline-flex items-center justify-center px-8 py-4 bg-brand-green hover:bg-brand-green-hover text-white font-heading font-700 text-btn rounded-full shadow-btn-green transition-all duration-200 hover:scale-[1.02]"
              >
                {t("btn_trial")}
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-bg-border hover:border-brand-blue hover:text-brand-blue text-text-secondary font-heading font-700 text-btn rounded-full transition-all duration-200"
              >
                <Play className="w-4 h-4 fill-current" />
                {t("btn_watch")}
              </a>
            </motion.div>
          </motion.div>

          {/* Right: Simulated App Screen Mockup */}
          <motion.div
            initial={{ x: 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 80, damping: 18, delay: 0.3 }}
            className="lg:col-span-6 relative w-full"
          >
            <GifMockup className="w-full relative z-10" />
            
            {/* Visual glow backdrop behind the laptop mockup */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-brand-blue/15 rounded-full blur-[80px] -z-10" />
          </motion.div>

        </div>

        {/* Bottom Trust Badges */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          className="border-t border-bg-subtle pt-10"
        >
          <TrustBadges />
        </motion.div>
      </div>
    </section>
  );
}
