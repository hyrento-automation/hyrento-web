import { Metadata } from "next";
import { CheckCircle2, Car, Calendar, Users, FileText, CreditCard, BarChart3, Building, Bell } from "lucide-react";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { GifMockup } from "@/components/shared/GifMockup";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Features — All Management Tools",
  description: "Explore the comprehensive feature modules of CarRental.digital. Fleet management, booking engines, digital contracts, payment links, and CRM tools built for growth.",
};

const featureDetails = [
  {
    id: "fleet",
    label: "Fleet Management",
    icon: Car,
    emoji: "🚘",
    headline: "Always know exactly where your fleet stands.",
    paragraphs: [
      "With CarRental.digital, every vehicle in your fleet has its own profile. See status in real time — available, rented, in maintenance, or reserved. Track mileage, service history, damage logs, documents (insurance, registration), and upcoming maintenance schedules. Never lose track of a vehicle again.",
      "Our damage log is exceptionally detailed, allowing your staff to record scratch and dent coordinates on a visual wireframe model of each car and upload inspection photographs directly from their mobile devices."
    ],
    planBadge: "All Plans",
    bullets: [
      "Real-time vehicle status board",
      "Individual vehicle profiles (docs, history, photos)",
      "Maintenance scheduling and alerts",
      "Damage tracking with photo uploads",
      "Fleet utilization reporting",
      "Multi-location fleet view",
      "GPS location display"
    ]
  },
  {
    id: "booking",
    label: "Booking & Reservations",
    icon: Calendar,
    emoji: "📅",
    headline: "Take bookings 24 hours a day. Automatically.",
    paragraphs: [
      "Your branded booking engine is live on your website around the clock. Customers choose a vehicle, pick up date, drop-off location, add extras (child seat, GPS, additional driver), pay online — and the booking lands instantly in your system. No phone call. No manual entry. No errors.",
      "The reservation pipeline handles automated availability checks, so vehicles can never be double-booked. It automatically accounts for turn-around cleaning times between bookings."
    ],
    planBadge: "All Plans",
    bullets: [
      "Real-time availability calendar",
      "Multi-step booking flow with add-ons",
      "Online payment at time of booking",
      "Instant booking confirmation email to customer",
      "Modify, cancel, or extend bookings from admin",
      "Manual booking entry by staff",
      "Group and corporate booking support",
      "Seasonal pricing rules"
    ]
  },
  {
    id: "crm",
    label: "CRM & Customer Management",
    icon: Users,
    emoji: "👤",
    headline: "Every customer. Every rental. Every note. In one place.",
    paragraphs: [
      "Build real relationships with your renters. CarRental.digital stores the complete profile of every customer — contact details, ID documents, rental history, payment records, and any internal notes your team adds. You can see at a glance who your best customers are, what they rented, and when they're coming back.",
      "Verify driver details with our document vault. Upload secure, encrypted copies of driving licenses, international permits, and passports. Automatically flag problematic renters using our global security warning system."
    ],
    planBadge: "All Plans",
    bullets: [
      "Complete customer profiles",
      "Rental history per customer",
      "Document storage (driving license, passport, ID)",
      "Customer notes and tags",
      "Blacklist/flag problematic renters",
      "Loyalty tracking",
      "Email communication log",
      "Corporate account management"
    ]
  },
  {
    id: "contracts",
    label: "Contracts & Agreements",
    icon: FileText,
    emoji: "✍️",
    headline: "Digital contracts. Signed in seconds. Stored forever.",
    paragraphs: [
      "No more printing, scanning, or filing paper agreements. CarRental.digital generates rental agreements automatically based on the booking — pre-filled with vehicle info, customer details, rental dates, and pricing. The customer signs digitally on any device. The signed document is saved permanently and accessible anytime.",
      "Fully compliant with US e-SIGN and European eIDAS regulations, our contracts are legally binding and include tamper-evident digital seal markers."
    ],
    planBadge: "All Plans",
    bullets: [
      "Auto-generated rental agreements",
      "E-signature (works on any device)",
      "Custom terms & conditions",
      "Damage waiver acknowledgment",
      "Pre- and post-rental inspection forms",
      "PDF export & download",
      "Document archive — never lost"
    ]
  },
  {
    id: "payments",
    label: "Payments & Invoicing",
    icon: CreditCard,
    emoji: "💳",
    headline: "Get paid faster. Track every penny.",
    paragraphs: [
      "CarRental.digital handles all payment flows — deposits, pre-authorizations, balance payments, refunds, and late fees. Issue invoices automatically, send payment links by email or SMS, and accept major payment methods. Multi-currency support built in for businesses operating across borders.",
      "Stripe integration lets you hold security deposits before keys are handed over, and release them automatically upon return check-in if zero damages are logged."
    ],
    planBadge: "All Plans",
    bullets: [
      "Auto-generated invoices",
      "Payment link via email and SMS",
      "Deposit and pre-authorization",
      "Multi-currency (EUR, USD, GBP, and more)",
      "VAT / tax calculation per country",
      "Partial payment and balance tracking",
      "Refund management",
      "Payment gateway integrations",
      "Revenue summary by date, vehicle, or branch"
    ]
  },
  {
    id: "analytics",
    label: "Analytics & Reports",
    icon: BarChart3,
    emoji: "📈",
    headline: "Stop guessing. Start knowing.",
    paragraphs: [
      "Your business generates data every day. CarRental.digital turns it into clear, actionable reports. See which vehicles earn the most, which sit idle too long, how revenue compares month to month, and where your customers come from. Make better decisions. Grow faster.",
      "Export clean reports to hand off to accounting or export full vehicle utilisation charts to analyze seasonal fleet trends."
    ],
    planBadge: "All Plans",
    bullets: [
      "Revenue reports by day, month, vehicle, branch",
      "Fleet utilization rate",
      "Booking volume trends",
      "Top customers by spend",
      "Outstanding payments report",
      "Damage and incident reports",
      "Export reports as PDF or CSV",
      "Custom date-range filters"
    ]
  },
  {
    id: "locations",
    label: "Multi-Location & Multi-Brand",
    icon: Building,
    emoji: "🏢",
    headline: "One system. Multiple branches. Multiple brands.",
    paragraphs: [
      "Running more than one location? More than one brand? No problem. CarRental.digital supports multi-location and multi-brand setups from a single admin login. Switch between branches, view performance per location, and manage separate vehicle pools — all under the same subscription.",
      "Track vehicle transfer logs when a car is picked up at location A and dropped off at location B. Control staff roles and branch assignments easily."
    ],
    planBadge: "Professional & Enterprise Plans",
    bullets: [
      "Unlimited locations per plan",
      "Separate fleet pools per location",
      "Branch-level reporting",
      "Staff access per branch",
      "Multiple brands under one admin",
      "Cross-location vehicle transfer log",
      "Centralized customer database across all branches"
    ]
  },
  {
    id: "notifications",
    label: "Notifications & Automation",
    icon: Bell,
    emoji: "🔔",
    headline: "Your business runs — even when you're not at your desk.",
    paragraphs: [
      "CarRental.digital automates the repetitive communication your team handles every day. Booking confirmations, payment reminders, contract signing requests, return reminders, and review requests — all sent automatically at the right moment, branded as your business.",
      "Setup custom templates for email, SMS, and WhatsApp alerts to notify customers of booking changes, key pick-ups, and invoice due dates."
    ],
    planBadge: "All Plans (Templates customizable on Pro/Ent)",
    bullets: [
      "Booking confirmation — auto email & SMS",
      "Payment reminders",
      "Contract signing reminder",
      "Return reminder (day before and day of)",
      "Post-rental thank-you and review request",
      "Maintenance alerts for your team",
      "Custom notification templates",
      "Multi-language notification support"
    ]
  }
];

export default function FeaturesPage() {
  return (
    <div className="bg-bg-soft min-h-screen">
      {/* Intro Header */}
      <section className="bg-white border-b border-bg-border py-16 sm:py-24">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-copy">
          <span className="text-[10px] font-heading font-800 text-brand-blue bg-brand-blue-pale border border-brand-blue/10 px-3 py-1 rounded-full uppercase tracking-wider">
            All Features
          </span>
          <h1 className="text-h1-mobile sm:text-h1-desktop font-heading font-800 text-brand-navy leading-tight mt-4 mb-4">
            Every Tool Your Rental Business Needs. Nothing You Don&apos;t.
          </h1>
          <p className="text-body-lg font-body text-text-secondary">
            CarRental.digital is a complete management system for car rental operators. Below is a full list of what&apos;s included in your subscription — organized by function.
          </p>
        </div>
      </section>

      {/* Feature Sections List */}
      <div className="divide-y divide-bg-border/60">
        {featureDetails.map((feat, idx) => {
          const Icon = feat.icon;
          const isEven = idx % 2 === 0;

          return (
            <SectionWrapper 
              key={feat.id}
              id={feat.id} 
              theme={isEven ? "light" : "soft"}
              className="py-16 sm:py-24"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                {/* Visual Mockup - Left or Right depending on Even/Odd */}
                <div className={cn(
                  "lg:col-span-6",
                  isEven ? "lg:order-1" : "lg:order-2"
                )}>
                  <GifMockup 
                    url={`app.carrental.digital/features/${feat.id}`}
                    className="w-full shadow-card-lg border border-bg-border/80" 
                  />
                </div>

                {/* Text Copy details */}
                <div className={cn(
                  "lg:col-span-6 space-y-6",
                  isEven ? "lg:order-2" : "lg:order-1"
                )}>
                  <div className="space-y-3">
                    {/* Badge showing plan availability */}
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-lg bg-brand-blue-pale text-brand-blue flex items-center justify-center">
                        <Icon className="w-4.5 h-4.5" />
                      </span>
                      <span className="text-[11px] font-heading font-700 bg-slate-100 text-text-secondary border border-bg-border px-2.5 py-0.5 rounded-full uppercase">
                        {feat.planBadge}
                      </span>
                    </div>

                    <h2 className="text-h2-mobile sm:text-h3-desktop font-heading font-800 text-brand-navy leading-tight">
                      {feat.headline}
                    </h2>
                    
                    {feat.paragraphs.map((p, pIdx) => (
                      <p key={pIdx} className="font-body text-body-sm sm:text-body-default text-text-secondary leading-relaxed">
                        {p}
                      </p>
                    ))}
                  </div>

                  <div className="h-px bg-bg-subtle" />

                  <div>
                    <h3 className="font-heading font-700 text-body-sm text-brand-navy uppercase tracking-wider mb-4">
                      Capabilities &amp; Benefits
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {feat.bullets.map((bullet, bulletIdx) => (
                        <li key={bulletIdx} className="flex items-start gap-2.5 text-body-sm font-body text-text-primary">
                          <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </SectionWrapper>
          );
        })}
      </div>
    </div>
  );
}
