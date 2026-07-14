import type { Metadata } from "next";
import { DM_Sans, Inter } from "next/font/google";
import "../globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/shared/CookieBanner";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hyrento.com"),
  title: {
    default: "HyRento — The Complete Operating System for Car Rental Businesses",
    template: "%s | HyRento",
  },
  description:
    "HyRento gives you everything — your own website, booking engine, fleet control, CRM, invoicing, contracts, and real-time reports. Built for rental operators in the US and Europe.",
  keywords: [
    "car rental software",
    "fleet management system",
    "rental booking engine",
    "car rental CRM",
    "rental business software",
    "fleet management",
    "car rental management",
    "HyRento",
  ],
  authors: [{ name: "HyRento" }],
  creator: "HyRento",
  publisher: "HyRento",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hyrento.com",
    siteName: "HyRento",
    title: "HyRento — The Complete Operating System for Car Rental Businesses",
    description:
      "Run your entire car rental business from one powerful system. Online booking, fleet management, CRM, contracts, and analytics — all included.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "HyRento — Car Rental Management System",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HyRento — The Complete Operating System for Car Rental Businesses",
    description:
      "Run your entire car rental business from one powerful system.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as typeof routing.locales[number])) {
    notFound();
  }
  const messages = await getMessages();
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "HyRento",
    url: "https://hyrento.com",
    logo: "https://hyrento.com/logo.png",
    description: "The Complete Operating System for Car Rental Businesses — serving the US and European markets.",
    contactPoint: {
      "@type": "ContactPoint",
      email: "support@hyrento.com",
      contactType: "Customer Support",
      availableLanguage: ["English", "German", "French", "Spanish", "Dutch"],
      hoursAvailable: "Mo-Su 00:00-23:59",
    },
    sameAs: [
      "https://www.linkedin.com/company/hyrento",
    ],
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "HyRento",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: "https://hyrento.com",
    description:
      "Cloud-based car rental management system covering fleet management, online booking, CRM, digital contracts, payments, and analytics.",
    offers: [
      {
        "@type": "Offer",
        name: "Starter Plan",
        price: "99",
        priceCurrency: "USD",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          billingDuration: "P1M",
        },
      },
      {
        "@type": "Offer",
        name: "Professional Plan",
        price: "220",
        priceCurrency: "EUR",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          billingDuration: "P3M",
        },
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "320",
    },
  };

  return (
    <html lang={locale} className={`${dmSans.variable} ${inter.variable}`}>
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-T5B6TL6C');`,
          }}
        />
        {/* End Google Tag Manager */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
        />
      </head>
      <body className="font-body bg-bg-base text-text-primary antialiased">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-T5B6TL6C"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main>{children}</main>
          <Footer />
          <CookieBanner />
        </NextIntlClientProvider>

        {/* Crisp Chat Widget — replace CRISP_WEBSITE_ID with your ID */}
        {process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.$crisp=[];
                window.CRISP_WEBSITE_ID="${process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID}";
                (function(){var d=document;var s=d.createElement("script");
                s.src="https://client.crisp.chat/l.js";
                s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();
              `,
            }}
          />
        )}
      </body>
    </html>
  );
}

