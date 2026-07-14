"use client";

import { Link } from "@/i18n/routing";
import { ArrowRight, Calendar } from "lucide-react";
import { SectionWrapper } from "../shared/SectionWrapper";

export function FooterCTABand() {
  return (
    <SectionWrapper theme="navy" className="relative overflow-hidden border-t border-slate-800">
      {/* Background glow graphics */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-blue/15 rounded-full blur-[90px] pointer-events-none" />

      <div className="text-center max-w-copy mx-auto space-y-6 relative z-10 py-4 sm:py-8">
        <span className="text-[10px] font-heading font-800 text-brand-green bg-brand-green/10 border border-brand-green/20 px-3 py-1 rounded-full uppercase tracking-wider">
          Get Started Today
        </span>
        
        <h2
          className="text-h2-mobile sm:text-h1-desktop font-heading font-800 leading-tight tracking-tight"
          style={{ color: "#ffffff" }}
        >
          Stop Losing Bookings. Stop Losing Data. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue-light to-emerald-400">
            Start Running a Proper Business.
          </span>
        </h2>
        
        <p className="font-body text-body-lg text-slate-300 max-w-narrow mx-auto leading-relaxed">
          Join rental operators across the US and Europe who replaced chaos with a system that just works. No setup fees, cancel anytime.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
          <Link
            href="/onboarding"
            className="inline-flex items-center justify-center gap-1.5 px-8 py-4 bg-brand-green hover:bg-brand-green-hover text-white font-heading font-700 text-btn rounded-full shadow-btn-green transition-all duration-200 hover:scale-[1.02]"
          >
            <span>Start Your Free Trial</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          
          <Link
            href="/demo?inquiry=demo"
            className="inline-flex items-center justify-center gap-1.5 px-8 py-4 border-2 border-white hover:bg-white hover:text-brand-navy text-white font-heading font-700 text-btn rounded-full transition-all duration-200"
          >
            <Calendar className="w-4 h-4" />
            <span>Book a Live Demo</span>
          </Link>
        </div>
      </div>
    </SectionWrapper>
  );
}
