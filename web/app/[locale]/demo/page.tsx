import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Globe2,
  LayoutDashboard,
  MapPin,
  Palette,
} from "lucide-react";
import { Link } from "@/i18n/routing";

export const metadata: Metadata = {
  title: "Live Car Rental Website Demos",
  description:
    "Explore six live HyRento car rental website experiences created for Mauritius, Spain, Europe, the USA, the UAE, and South Africa.",
};

const demos = [
  {
    number: "01",
    market: "Mauritius",
    flag: "🇲🇺",
    domain: "demo.hyrento.com",
    href: "https://demo.hyrento.com/en",
    image:
      "https://res.cloudinary.com/dm4jfxbcs/image/upload/v1784003731/hyrentodemo1_mabpkh.png",
    title: "Island-ready car hire",
    description:
      "A bright, conversion-focused rental experience designed around airport pickup, island travel, and an effortless booking journey.",
    tags: ["Airport booking", "Island locations", "MUR pricing"],
  },
  {
    number: "02",
    market: "Spain",
    flag: "🇪🇸",
    domain: "demo1.hyrento.com",
    href: "https://demo1.hyrento.com/en",
    image:
      "https://res.cloudinary.com/dm4jfxbcs/image/upload/v1784003736/hyrentodemo2_iymyrv.png",
    title: "Mediterranean mobility",
    description:
      "A warm Spanish storefront shaped for holiday renters, coastal routes, local pickup points, and multilingual customers.",
    tags: ["Localised design", "EUR pricing", "Tourist routes"],
  },
  {
    number: "03",
    market: "Europe",
    flag: "🇪🇺",
    domain: "demo2.hyrento.com",
    href: "https://demo2.hyrento.com/en",
    image:
      "https://res.cloudinary.com/dm4jfxbcs/image/upload/v1784003737/hyrentodemo6_cuz8c3.png",
    title: "Modern European fleet",
    description:
      "A refined, premium experience for cross-border operators who need clear pricing, flexible locations, and a polished fleet showcase.",
    tags: ["Multi-country", "Premium fleet", "EUR pricing"],
  },
  {
    number: "04",
    market: "United States",
    flag: "🇺🇸",
    domain: "demo3.hyrento.com",
    href: "https://demo3.hyrento.com/en",
    image:
      "https://res.cloudinary.com/dm4jfxbcs/image/upload/v1784003737/hyrentodemo5_yikirm.png",
    title: "Built for the open road",
    description:
      "A bold US rental website made for large fleets, airport customers, road trips, and a fast mobile-first reservation flow.",
    tags: ["USD pricing", "Road trips", "Large fleet"],
  },
  {
    number: "05",
    market: "United Arab Emirates",
    flag: "🇦🇪",
    domain: "demo4.hyrento.com",
    href: "https://demo4.hyrento.com/en",
    image:
      "https://res.cloudinary.com/dm4jfxbcs/image/upload/v1784003736/hyrentodemo4_grcie2.png",
    title: "Luxury, delivered",
    description:
      "A high-end UAE experience for luxury fleets, hotel delivery, premium service, and customers who expect instant booking.",
    tags: ["Luxury fleet", "Hotel delivery", "AED pricing"],
  },
  {
    number: "06",
    market: "South Africa",
    flag: "🇿🇦",
    domain: "demo5.hyrento.com",
    href: "https://demo5.hyrento.com/en",
    image:
      "https://res.cloudinary.com/dm4jfxbcs/image/upload/v1784003733/hyrentodemo3_aymtzi.png",
    title: "Adventure starts here",
    description:
      "A confident South African rental experience covering city pickup, scenic drives, capable vehicles, and flexible travel plans.",
    tags: ["Adventure fleet", "City pickup", "ZAR pricing"],
  },
] as const;

const showcaseHighlights = [
  {
    icon: Palette,
    title: "Your brand, your style",
    description: "Every website is shaped around the operator and market.",
  },
  {
    icon: Globe2,
    title: "Localised for every market",
    description: "Country, currency, language, locations, and content included.",
  },
  {
    icon: LayoutDashboard,
    title: "One operating system",
    description: "All storefronts connect to the same HyRento platform.",
  },
] as const;

export default function DemoShowcasePage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden border-b border-bg-border bg-bg-soft">
        <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-brand-blue/10 blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-brand-green/10 blur-3xl" />

        <div className="content-container relative py-20 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-blue/15 bg-brand-blue-pale px-4 py-2 text-[11px] font-700 uppercase tracking-[0.16em] text-brand-blue">
              <span className="h-2 w-2 rounded-full bg-brand-green" />
              Six live rental experiences
            </div>

            <h1 className="text-h1-mobile font-heading font-700 leading-[1.08] tracking-[-0.035em] text-brand-navy sm:text-h1-desktop lg:text-[3.75rem]">
              See how your car rental website could look in{" "}
              <span className="gradient-text">your market.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-text-secondary sm:text-body-lg sm:leading-8">
              Explore six complete HyRento storefronts, each designed for a
              different country, customer, and visual style — all powered by
              the same booking and fleet management platform.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="#live-demos"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand-green px-6 py-3 text-sm font-600 text-white shadow-btn-green transition-colors hover:bg-brand-green-hover"
              >
                Explore live demos
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-bg-border bg-white px-6 py-3 text-sm font-600 text-brand-navy transition-colors hover:border-brand-blue/30 hover:bg-brand-blue-pale"
              >
                Build my rental website
              </Link>
            </div>
          </div>

          <div className="mx-auto mt-14 grid max-w-5xl gap-4 md:grid-cols-3">
            {showcaseHighlights.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="flex items-start gap-4 rounded-2xl border border-bg-border bg-white/90 p-5 shadow-card-sm backdrop-blur-sm"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-blue-pale text-brand-blue">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-sm font-700 text-brand-navy">{title}</h2>
                  <p className="mt-1 text-xs leading-5 text-text-secondary">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="live-demos" className="scroll-mt-24 bg-white py-20 sm:py-24">
        <div className="content-container">
          <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
            <div className="mb-4 inline-flex items-center gap-2 text-xs font-700 uppercase tracking-[0.16em] text-brand-blue">
              <Globe2 className="h-4 w-4" />
              Choose a market
            </div>
            <h2 className="text-h2-mobile font-heading font-700 tracking-[-0.025em] text-brand-navy sm:text-h2-desktop">
              Different storefronts. One powerful platform.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-text-secondary sm:text-base sm:leading-7">
              Open any live demo to explore the complete homepage, fleet,
              locations, booking flow, and market-specific brand experience.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-7 lg:grid-cols-2 lg:gap-8">
            {demos.map((demo, index) => (
              <article
                key={demo.market}
                className="group overflow-hidden rounded-2xl border border-bg-border bg-white shadow-card-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-blue/20 hover:shadow-card-lg"
              >
                <a
                  href={demo.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={"Open the " + demo.market + " live demo"}
                  className="block bg-bg-subtle p-3 sm:p-4"
                >
                  <div className="browser-frame relative overflow-hidden rounded-xl bg-white shadow-card-md">
                    <div className="browser-frame__bar">
                      <span className="browser-frame__dot bg-[#ef4444]" />
                      <span className="browser-frame__dot bg-[#f59e0b]" />
                      <span className="browser-frame__dot bg-[#22c55e]" />
                      <div className="browser-frame__url">
                        <span className="truncate">
                          https://{demo.domain}
                        </span>
                      </div>
                    </div>
                    <div className="relative aspect-[16/9] overflow-hidden bg-bg-soft">
                      <Image
                        src={demo.image}
                        alt={demo.market + " HyRento car rental website preview"}
                        fill
                        priority={index < 2}
                        sizes="(min-width: 1024px) 48vw, 100vw"
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                      <div className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/60 bg-white/90 px-3 py-1.5 text-[10px] font-700 uppercase tracking-wider text-brand-green shadow-sm backdrop-blur-sm">
                        <span className="h-1.5 w-1.5 rounded-full bg-online-dot" />
                        Live demo
                      </div>
                    </div>
                  </div>
                </a>

                <div className="p-6 sm:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="mb-3 flex items-center gap-2 text-xs font-700 uppercase tracking-[0.14em] text-brand-blue">
                        <span className="text-base" aria-hidden="true">
                          {demo.flag}
                        </span>
                        {demo.market}
                      </div>
                      <h3 className="text-h3-desktop font-heading font-700 tracking-[-0.02em] text-brand-navy">
                        {demo.title}
                      </h3>
                    </div>
                    <span className="text-sm font-700 text-text-muted">
                      {demo.number}
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-text-secondary">
                    {demo.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {demo.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1.5 rounded-full border border-brand-green/10 bg-brand-green-pale px-3 py-1.5 text-[11px] font-600 text-brand-green-hover"
                      >
                        <CheckCircle2 className="h-3 w-3" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-col gap-3 border-t border-bg-border pt-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2 text-xs text-text-secondary">
                      <MapPin className="h-4 w-4 text-brand-blue" />
                      <span>{demo.domain}</span>
                    </div>
                    <a
                      href={demo.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-brand-navy px-5 py-2.5 text-xs font-700 text-white transition-colors hover:bg-brand-blue"
                    >
                      View live demo
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bg-soft px-4 py-10 sm:px-6 sm:py-14">
        <div className="content-container overflow-hidden rounded-2xl bg-brand-navy px-6 py-12 text-center shadow-card-lg sm:px-10 sm:py-14">
          <div className="mx-auto max-w-2xl">
            <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-700 uppercase tracking-[0.16em] text-brand-blue-light">
              Built around your business
            </span>
            <h2 className="mt-5 text-h2-mobile font-heading font-700 tracking-[-0.025em] text-white sm:text-h2-desktop">
              Your market could be next.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">
              We tailor the brand, website, booking experience, locations,
              currency, and fleet presentation to your rental business.
            </p>
            <Link
              href="/contact"
              className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand-green px-6 py-3 text-sm font-600 text-white shadow-btn-green transition-colors hover:bg-brand-green-hover"
            >
              Talk to the HyRento team
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
