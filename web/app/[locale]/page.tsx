import { HeroSection } from "@/components/marketing/HeroSection";
import { ProblemBand } from "@/components/marketing/ProblemBand";
import { WhatIsSection } from "@/components/marketing/WhatIsSection";
import { FeatureTabs } from "@/components/marketing/FeatureTabs";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { SocialProof } from "@/components/marketing/SocialProof";
import { SupportBand } from "@/components/marketing/SupportBand";
import { PricingSection } from "@/components/marketing/PricingSection";
import { GifShowcase } from "@/components/marketing/GifShowcase";
import { FaqSection } from "@/components/marketing/FaqSection";
import { DownloadStrip } from "@/components/marketing/DownloadStrip";
import { FooterCTABand } from "@/components/marketing/FooterCTABand";
import { StickyMobileCTA } from "@/components/shared/StickyMobileCTA";

export default function Home() {
  return (
    <div className="relative w-full min-h-screen bg-white">
      {/* 11 Section Marketing Assembly */}
      <HeroSection />
      <ProblemBand />
      <WhatIsSection />
      <FeatureTabs />
      <HowItWorks />
      <SocialProof />
      <SupportBand />
      <PricingSection />
      <GifShowcase />
      <FaqSection />
      <DownloadStrip />
      <FooterCTABand />

      {/* Persistent global CTAs */}
      <StickyMobileCTA />
    </div>
  );
}
