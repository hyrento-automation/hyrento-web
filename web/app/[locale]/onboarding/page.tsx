import type { Metadata } from "next";
import { Clock3, CreditCard, ShieldCheck } from "lucide-react";
import { OnboardingWizard } from "@/components/onboarding/OnboardingWizard";

export const metadata: Metadata = {
  title: "Get Started with HyRento",
  description:
    "Tell us about your rental business, fleet, brand, pricing, and setup preferences in a guided five-step onboarding form.",
};

const promises = [
  {
    icon: CreditCard,
    title: "No card required",
    description: "Start your 14-day trial without payment details.",
  },
  {
    icon: ShieldCheck,
    title: "Full feature access",
    description: "Explore the complete platform during your trial.",
  },
  {
    icon: Clock3,
    title: "Save and return",
    description: "Your answers stay saved on this device.",
  },
] as const;

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-bg-soft">
      <section className="relative overflow-hidden border-b border-bg-border bg-white">
        <div className="absolute -left-32 top-0 h-80 w-80 rounded-full bg-brand-blue/10 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-brand-green/10 blur-3xl" />
        <div className="content-container relative py-16 text-center sm:py-20 lg:py-24">
          <div className="mx-auto max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-blue/15 bg-brand-blue-pale px-4 py-2 text-[11px] font-700 uppercase tracking-[0.16em] text-brand-blue">
              <span className="h-2 w-2 rounded-full bg-brand-green" />
              Client onboarding
            </div>
            <h1 className="text-h1-mobile font-heading font-700 leading-[1.08] tracking-[-0.035em] text-brand-navy sm:text-h1-desktop lg:text-[3.75rem]">
              Get Started with <span className="gradient-text">HyRento</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-text-secondary sm:text-body-lg sm:leading-8">
              A few short steps give our setup team everything needed to build
              your website, configure your fleet, and prepare your 14-day trial.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-4xl gap-3 sm:grid-cols-3">
            {promises.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="flex items-center gap-3 rounded-2xl border border-bg-border bg-white/90 p-4 text-left shadow-card-sm backdrop-blur-sm"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-green-pale text-brand-green">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-sm font-700 text-brand-navy">{title}</h2>
                  <p className="mt-0.5 text-[11px] leading-4 text-text-secondary">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14 lg:py-16">
        <div className="content-container">
          <OnboardingWizard />
        </div>
      </section>
    </div>
  );
}
