"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Car, Calendar, Users, FileText, CreditCard, 
  BarChart3, Building, Bell, CheckCircle2, ChevronDown 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { GifMockup } from "../shared/GifMockup";

const tabsData = [
  {
    id: "fleet",
    label: "Fleet Management",
    icon: Car,
    emoji: "🚘",
    headline: "Always know exactly where your fleet stands.",
    content: "With CarRental.digital, every vehicle in your fleet has its own profile. See status in real time — available, rented, in maintenance, or reserved. Track mileage, service history, damage logs, documents (insurance, registration), and upcoming maintenance schedules. Never lose track of a vehicle again.",
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
    content: "Your branded booking engine is live on your website around the clock. Customers choose a vehicle, pick up date, drop-off location, add extras (child seat, GPS, additional driver), pay online — and the booking lands instantly in your system. No phone call. No manual entry. No errors.",
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
    content: "Build real relationships with your renters. CarRental.digital stores the complete profile of every customer — contact details, ID documents, rental history, payment records, and any internal notes your team adds. You can see at a glance who your best customers are, what they rented, and when they're coming back.",
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
    content: "No more printing, scanning, or filing paper agreements. CarRental.digital generates rental agreements automatically based on the booking — pre-filled with vehicle info, customer details, rental dates, and pricing. The customer signs digitally on any device. The signed document is saved permanently and accessible anytime.",
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
    content: "CarRental.digital handles all payment flows — deposits, pre-authorizations, balance payments, refunds, and late fees. Issue invoices automatically, send payment links by email or SMS, and accept major payment methods. Multi-currency support built in for businesses operating across borders.",
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
    content: "Your business generates data every day. CarRental.digital turns it into clear, actionable reports. See which vehicles earn the most, which sit idle too long, how revenue compares month to month, and where your customers come from. Make better decisions. Grow faster.",
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
    content: "Running more than one location? More than one brand? No problem. CarRental.digital supports multi-location and multi-brand setups from a single admin login. Switch between branches, view performance per location, and manage separate vehicle pools — all under the same subscription.",
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
    content: "CarRental.digital automates the repetitive communication your team handles every day. Booking confirmations, payment reminders, contract signing requests, return reminders, and review requests — all sent automatically at the right moment, branded as your business.",
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

export function FeatureTabs() {
  const [activeTab, setActiveTab] = useState("fleet");
  const [mobileOpenSection, setMobileOpenSection] = useState<string | null>("fleet");

  const currentTab = tabsData.find((t) => t.id === activeTab) || tabsData[0];

  const handleMobileToggle = (id: string) => {
    if (mobileOpenSection === id) {
      setMobileOpenSection(null);
    } else {
      setMobileOpenSection(id);
    }
  };

  return (
    <section className="relative bg-white border-b border-bg-border py-12 sm:py-20 lg:py-28" id="features">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-copy mx-auto mb-12 sm:mb-16">
          <h2 className="text-h2-mobile sm:text-h2-desktop font-heading font-800 text-brand-navy leading-tight mb-4">
            Every Feature Your Rental Business Needs. All In One Place.
          </h2>
          <p className="text-body-lg font-body text-text-secondary">
            Take full control of your operation. Eliminate manual processes, save time, and scale your vehicle rental business with our integrated modules.
          </p>
        </div>

        {/* Sticky Desktop Navigation Tabs (Hidden on Mobile) */}
        <div className="hidden lg:block feature-tabs-sticky top-[72px] -mx-8 px-8 mb-16">
          <div className="flex justify-between items-center gap-1 py-4 overflow-x-auto">
            {tabsData.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-3 rounded-full text-[13px] font-heading font-600 transition-all duration-150 shrink-0",
                    isActive
                      ? "bg-brand-blue text-white shadow-card-blue"
                      : "text-text-secondary hover:text-text-primary hover:bg-bg-soft"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Desktop Content Section (Hidden on Mobile) */}
        <div className="hidden lg:block min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-12 gap-12 items-center"
            >
              {/* Left Side: Browser Mockup */}
              <div className="col-span-6">
                <GifMockup 
                  url={`app.carrental.digital/features/${currentTab.id}`}
                  className="w-full shadow-card-lg border border-bg-border/60"
                />
              </div>

              {/* Right Side: Tab Details */}
              <div className="col-span-6 space-y-6">
                <div className="space-y-3">
                  <span className="text-[28px]">{currentTab.emoji}</span>
                  <h3 className="font-heading font-800 text-h2-desktop text-brand-navy leading-tight">
                    {currentTab.headline}
                  </h3>
                  <p className="font-body text-body-default text-text-secondary leading-relaxed">
                    {currentTab.content}
                  </p>
                </div>

                <div className="h-px bg-bg-subtle" />

                <div>
                  <h4 className="font-heading font-700 text-body-sm text-brand-navy uppercase tracking-wider mb-4">
                    Key Capabilities Included
                  </h4>
                  <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
                    {currentTab.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-body-sm font-body text-text-primary">
                        <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile/Tablet Accordion Layout (Hidden on Desktop) */}
        <div className="lg:hidden space-y-4">
          {tabsData.map((tab) => {
            const Icon = tab.icon;
            const isOpen = mobileOpenSection === tab.id;
            return (
              <div 
                key={tab.id} 
                className={cn(
                  "border border-bg-border rounded-2xl overflow-hidden transition-all duration-200 bg-white",
                  isOpen ? "shadow-card-md border-brand-blue/30" : ""
                )}
              >
                {/* Accordion Trigger */}
                <button
                  onClick={() => handleMobileToggle(tab.id)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-bg-soft flex items-center justify-center text-brand-blue">
                      <Icon className="w-4 h-4" />
                    </span>
                    <span className="font-heading font-700 text-body-default text-brand-navy">
                      {tab.label}
                    </span>
                  </div>
                  <ChevronDown 
                    className={cn(
                      "w-5 h-5 text-text-secondary transition-transform duration-200",
                      isOpen ? "rotate-180 text-brand-blue" : ""
                    )}
                  />
                </button>

                {/* Accordion Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden border-t border-bg-soft"
                    >
                      <div className="p-5 space-y-6">
                        {/* Browser Mockup */}
                        <GifMockup 
                          url={`app.carrental.digital/features/${tab.id}`}
                          className="w-full shadow-card-sm border border-bg-border"
                        />

                        {/* Copy */}
                        <div className="space-y-3">
                          <h3 className="font-heading font-800 text-h3-desktop text-brand-navy leading-snug">
                            {tab.headline}
                          </h3>
                          <p className="font-body text-body-sm text-text-secondary leading-relaxed">
                            {tab.content}
                          </p>
                        </div>

                        {/* Bullets */}
                        <div className="space-y-3 pt-4 border-t border-bg-soft">
                          <h4 className="font-heading font-700 text-[11px] text-brand-navy uppercase tracking-wider">
                            Key Capabilities Included
                          </h4>
                          <ul className="space-y-2.5">
                            {tab.bullets.map((bullet, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-body-sm font-body text-text-primary">
                                <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
