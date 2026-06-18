import { Metadata } from "next";
import { 
  Car, Award, 
  PlaneTakeoff, Layers, Building2, CheckCircle2 
} from "lucide-react";
import { Link } from "@/i18n/routing";
import { SectionWrapper } from "@/components/shared/SectionWrapper";

export const metadata: Metadata = {
  title: "Solutions — For Every Fleet Size & Type",
  description: "Whether you run a small local fleet, a multi-brand group, luxury rentals, or airport shuttle operations, CarRental.digital adapts to your business model.",
};

const solutions = [
  {
    id: "small",
    icon: Car,
    title: "Small Fleet (20–50 Vehicles)",
    description: "You run a lean operation and every hour counts. CarRental.digital gives you a professional online presence, automated bookings, and a management system that removes the admin load from your day. You can handle more customers with the same team.",
    highlights: ["Go live in 48 hours", "Direct domain booking site", "Electronic signatures", "Standard reporting"]
  },
  {
    id: "midsize",
    icon: Layers,
    title: "Mid-Size Fleet (50–200 Vehicles)",
    description: "At this stage, coordination becomes the challenge. Multiple staff, multiple vehicles, multiple customers active at once. Our system keeps everything visible, organized, and under control — from one dashboard.",
    highlights: ["Staff roles & permissions", "Priority email & chat", "Advanced utilization charts", "Multiple payment gateways"]
  },
  {
    id: "enterprise",
    icon: Building2,
    title: "Large & Enterprise (200–500+ Vehicles)",
    description: "Scale requires systems. Our Enterprise plan handles unlimited vehicles, unlimited locations, and unlimited brands — with full API access for custom integrations and a dedicated account manager to support your team.",
    highlights: ["Unlimited locations & brands", "Full API & Webhooks", "SLA uptime guarantee", "Dedicated account manager"]
  },
  {
    id: "multibrand",
    icon: Layers,
    title: "Multi-Brand Operators",
    description: "Running two or more rental brands? Switch between them inside one admin login. Separate websites, separate booking engines, separate fleets — all managed from one place.",
    highlights: ["Central customer base", "Split fleet pools", "Consolidated finance reports", "Brand-specific communications"]
  },
  {
    id: "luxury",
    icon: Award,
    title: "Luxury Rental Businesses",
    description: "Your vehicles are premium. Your booking experience should match. CarRental.digital gives you a polished, professional website and booking flow that matches the expectations of high-value customers.",
    highlights: ["High-resolution photos", "Custom damage inspection logs", "Hold security deposits", "Polished client portal"]
  },
  {
    id: "airport",
    icon: PlaneTakeoff,
    title: "Airport & Station Operators",
    description: "Fast check-ins, clear fleet availability, and smooth contract signing are essential when time is tight at pickup. Our system is built for speed and accuracy at high-volume locations.",
    highlights: ["Flight number tracking", "Quick return checklists", "Digital signature on tablets", "Auto-receipt printing"]
  }
];

export default function SolutionsPage() {
  return (
    <div className="bg-bg-soft min-h-screen">
      {/* Page Header */}
      <section className="bg-white border-b border-bg-border py-16 sm:py-24">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-copy">
          <span className="text-[10px] font-heading font-800 text-brand-blue bg-brand-blue-pale border border-brand-blue/10 px-3 py-1 rounded-full uppercase tracking-wider">
            Our Solutions
          </span>
          <h1 className="text-h1-mobile sm:text-h1-desktop font-heading font-800 text-brand-navy leading-tight mt-4 mb-4">
            Whatever the Size. However You Operate. We Have Your System.
          </h1>
          <p className="text-body-lg font-body text-text-secondary">
            CarRental.digital is designed to adjust to your workflow. We support operators across the US and Europe with tools customized for fleet scale and business model.
          </p>
        </div>
      </section>

      {/* Solutions Grid */}
      <SectionWrapper theme="light" className="py-16 sm:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((sol) => {
            const Icon = sol.icon;
            return (
              <div 
                key={sol.id} 
                className="bg-white border border-bg-border rounded-2xl p-6 sm:p-8 shadow-card-sm hover:shadow-card-md hover:border-brand-blue/20 transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-10 h-10 bg-brand-blue-pale text-brand-blue rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  
                  <h3 className="font-heading font-700 text-h4 text-brand-navy mb-3">
                    {sol.title}
                  </h3>
                  
                  <p className="font-body text-body-sm text-text-secondary leading-relaxed mb-6">
                    {sol.description}
                  </p>

                  <div className="h-px bg-bg-subtle my-5" />

                  <h4 className="font-heading font-700 text-[11px] text-brand-navy uppercase tracking-wider mb-3">
                    Key Features for this Solution
                  </h4>
                  
                  <ul className="space-y-2 mb-8">
                    {sol.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-body-sm font-body text-text-primary">
                        <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="/demo"
                  className="w-full text-center py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-full font-heading font-750 text-body-sm transition-colors mt-auto"
                >
                  Request Solution Setup →
                </Link>
              </div>
            );
          })}
        </div>
      </SectionWrapper>
    </div>
  );
}
