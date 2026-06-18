"use client";

import { Globe, Calendar, Users, FileText, CreditCard, BarChart3 } from "lucide-react";
import { SectionWrapper } from "../shared/SectionWrapper";

const showcaseItems = [
  {
    icon: Globe,
    title: "Booking engine on customer website",
    desc: "Mobile-responsive multi-step booking widget with real-time fleet inventory and pricing calculation.",
    slug: "customer-booking"
  },
  {
    icon: Calendar,
    title: "Admin fleet calendar view",
    desc: "Interactive timeline grid showing all vehicle assignments, statuses, blockouts, and cleaning windows.",
    slug: "fleet-calendar"
  },
  {
    icon: Users,
    title: "Customer profile in CRM",
    desc: "Single customer database storing driver credentials, rental histories, payment status, and communications.",
    slug: "crm-profile"
  },
  {
    icon: FileText,
    title: "Auto-generated contract with e-sign",
    desc: "Digital contracts generated instantly based on booking details, signed on any touch screen, and archived.",
    slug: "contract-esign"
  },
  {
    icon: CreditCard,
    title: "Invoice and payment link",
    desc: "Automated billing templates, custom deposit auths, Stripe integration, and direct secure invoice page links.",
    slug: "invoice-payment"
  },
  {
    icon: BarChart3,
    title: "Analytics dashboard & reports",
    desc: "Aggregated charts showing daily revenue, fleet utilization rates, top channels, and vehicle profitability.",
    slug: "analytics-dashboard"
  }
];

export function GifShowcase() {
  return (
    <SectionWrapper theme="soft" id="showcase" className="border-y border-bg-border">
      
      {/* Header */}
      <div className="text-center max-w-copy mx-auto mb-12 sm:mb-16">
        <span className="text-[10px] font-heading font-800 text-brand-blue bg-brand-blue-pale border border-brand-blue/10 px-3 py-1 rounded-full uppercase tracking-wider">
          System Walkthrough
        </span>
        <h2 className="text-h2-mobile sm:text-h2-desktop font-heading font-800 text-brand-navy leading-tight mt-4 mb-3">
          See It In Action
        </h2>
        <p className="text-body-lg font-body text-text-secondary">
          Real screens from the actual system. What you see is what you get.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {showcaseItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div 
              key={idx}
              className="bg-white border border-bg-border rounded-2xl overflow-hidden hover:shadow-card-md hover:border-brand-blue/20 transition-all duration-300 flex flex-col group"
            >
              {/* Fake browser preview */}
              <div className="bg-slate-900 aspect-[16/10] overflow-hidden relative">
                {/* Browser top header */}
                <div className="bg-slate-950 flex items-center px-3 py-1.5 gap-1.5 border-b border-slate-800">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-500/80" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500/80" />
                    <div className="w-2 h-2 rounded-full bg-green-500/80" />
                  </div>
                  <div className="flex-1 bg-slate-900 border border-slate-850 rounded text-[9px] text-slate-500 font-mono text-center truncate py-0.5">
                    app.carrental.digital/demo/{item.slug}
                  </div>
                </div>

                {/* Simulated dashboard animation fallback */}
                <div className="p-4 h-full flex flex-col justify-between text-white bg-slate-900 select-none">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1.5 text-[10px] font-heading font-700">
                      <Icon className="w-3.5 h-3.5 text-brand-blue-light" />
                      <span>{item.title}</span>
                    </div>
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                  </div>

                  {/* Visual simulated UI mockup */}
                  <div className="flex-1 flex flex-col justify-center gap-2 mt-2">
                    <div className="h-2 w-3/4 bg-slate-800 rounded shimmer" />
                    <div className="h-2 w-1/2 bg-slate-800 rounded shimmer" />
                    <div className="h-2 w-2/3 bg-slate-800 rounded shimmer" />
                    
                    {/* Simulated visual diagram */}
                    <div className="flex items-end gap-1.5 h-8 mt-2">
                      <div className="flex-1 bg-brand-blue/25 hover:bg-brand-blue h-[60%] rounded-sm transition-all" />
                      <div className="flex-1 bg-brand-blue/25 hover:bg-brand-blue h-[85%] rounded-sm transition-all animate-pulse" />
                      <div className="flex-1 bg-brand-blue/25 hover:bg-brand-blue h-[45%] rounded-sm transition-all" />
                      <div className="flex-1 bg-brand-blue/25 hover:bg-brand-blue h-[90%] rounded-sm transition-all" />
                      <div className="flex-1 bg-brand-blue/25 hover:bg-brand-blue h-[70%] rounded-sm transition-all" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Text description */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading font-700 text-h4 text-brand-navy mb-2 group-hover:text-brand-blue transition-colors">
                    {item.title}
                  </h3>
                  <p className="font-body text-body-sm text-text-secondary leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
