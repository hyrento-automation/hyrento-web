"use client";

import { useState } from "react";
import { DownloadCard } from "@/components/shared/DownloadCard";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { X, CheckCircle, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { trackGAEvent } from "@/lib/analytics";

const brochuresList = [
  {
    id: "product-overview",
    titleKey: "brochure_1_title",
    descKey: "brochure_1_desc",
    languages: ["EN", "DE", "FR", "ES", "NL"],
    fileSize: "2.4 MB",
    uploadDate: "June 2026",
    pdfUrl: "/downloads/CarRental_Product_Overview.pdf",
    gated: false
  },
  {
    id: "features-deep-dive",
    titleKey: "brochure_2_title",
    descKey: "brochure_2_desc",
    languages: ["EN", "DE"],
    fileSize: "4.1 MB",
    uploadDate: "June 2026",
    pdfUrl: "/downloads/CarRental_Platform_Deep_Dive.pdf",
    gated: false
  },
  {
    id: "pricing-guide",
    titleKey: "brochure_3_title",
    descKey: "brochure_3_desc",
    languages: ["EN", "DE", "FR", "ES", "NL"],
    fileSize: "1.8 MB",
    uploadDate: "June 2026",
    pdfUrl: "/downloads/CarRental_Pricing_Guide.pdf",
    gated: true
  },
  {
    id: "small-fleet-guide",
    titleKey: "brochure_4_title",
    descKey: "brochure_4_desc",
    languages: ["EN", "DE", "NL"],
    fileSize: "1.5 MB",
    uploadDate: "June 2026",
    pdfUrl: "/downloads/Small_Fleet_Starter_Guide.pdf",
    gated: false
  },
  {
    id: "enterprise-guide",
    titleKey: "brochure_5_title",
    descKey: "brochure_5_desc",
    languages: ["EN", "DE"],
    fileSize: "3.2 MB",
    uploadDate: "June 2026",
    pdfUrl: "/downloads/Enterprise_Solutions_Guide.pdf",
    gated: true
  },
  {
    id: "migration-guide",
    titleKey: "brochure_6_title",
    descKey: "brochure_6_desc",
    languages: ["EN", "DE", "FR"],
    fileSize: "1.2 MB",
    uploadDate: "June 2026",
    pdfUrl: "/downloads/Business_Migration_Playbook.pdf",
    gated: false
  },
  {
    id: "roi-workbook",
    titleKey: "brochure_7_title",
    descKey: "brochure_7_desc",
    languages: ["EN", "DE", "FR", "ES", "NL"],
    fileSize: "850 KB",
    uploadDate: "June 2026",
    pdfUrl: "/downloads/ROI_Calculator_Workbook.pdf",
    gated: false
  },
  {
    id: "gdpr-summary",
    titleKey: "brochure_8_title",
    descKey: "brochure_8_desc",
    languages: ["EN", "DE"],
    fileSize: "980 KB",
    uploadDate: "June 2026",
    pdfUrl: "/downloads/GDPR_Security_Summary.pdf",
    gated: false
  }
];

export default function DownloadsPage() {
  const t = useTranslations("DownloadsPage");
  const [gateModalOpen, setGateModalOpen] = useState(false);
  const [selectedBrochure, setSelectedBrochure] = useState<{ title: string; pdfUrl: string } | null>(null);
  const [email, setEmail] = useState("");
  const [gateSubmitted, setGateSubmitted] = useState(false);

  const handleCardDownloadClick = (item: typeof brochuresList[0]) => {
    if (item.gated) {
      setSelectedBrochure({ title: t(item.titleKey), pdfUrl: item.pdfUrl });
      setGateModalOpen(true);
      setGateSubmitted(false);
      setEmail("");
    } else {
      // Direct download - trigger virtual link click
      triggerDownload(item.pdfUrl);
    }
  };

  const triggerDownload = (url: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = url.split("/").pop() || "brochure.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleGateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && selectedBrochure) {
      setGateSubmitted(true);
      trackGAEvent("brochure_download_gated", {
        brochure_title: selectedBrochure.title,
        email: email,
        source_page: "/downloads"
      });
      setTimeout(() => {
        setGateModalOpen(false);
        triggerDownload(selectedBrochure.pdfUrl);
      }, 1500);
    }
  };

  return (
    <div className="bg-bg-soft min-h-screen relative">
      {/* Page Header */}
      <section className="bg-white border-b border-bg-border py-16 sm:py-24">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-copy">
          <span className="text-[10px] font-heading font-800 text-brand-blue bg-brand-blue-pale border border-brand-blue/10 px-3 py-1 rounded-full uppercase tracking-wider">
            {t("badge")}
          </span>
          <h1 className="text-h1-mobile sm:text-h1-desktop font-heading font-800 text-brand-navy leading-tight mt-4 mb-4">
            {t("heading")}
          </h1>
          <p className="text-body-lg font-body text-text-secondary">
            {t("subheading")}
          </p>
        </div>
      </section>

      {/* Grid wrapper */}
      <SectionWrapper theme="light" className="py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {brochuresList.map((item) => (
            <DownloadCard
              key={item.id}
              title={t(item.titleKey)}
              description={t(item.descKey)}
              languages={item.languages}
              fileSize={item.fileSize}
              uploadDate={item.uploadDate}
              pdfUrl={item.pdfUrl}
              onDownload={() => handleCardDownloadClick(item)}
            />
          ))}
        </div>
      </SectionWrapper>

      {/* Gated Lead Capture Modal overlay */}
      <AnimatePresence>
        {gateModalOpen && selectedBrochure && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Download brochure">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setGateModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl border border-bg-border shadow-mega-menu w-full max-w-md p-6 sm:p-8 relative z-10 overflow-hidden"
            >
              <button
                onClick={() => setGateModalOpen(false)}
                className="absolute top-4 right-4 text-text-muted hover:text-text-secondary transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              {gateSubmitted ? (
                <div className="text-center py-6 space-y-4">
                  <div className="w-12 h-12 bg-brand-green-pale text-brand-green rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-800 text-body-default text-brand-navy leading-none">
                    {t("modal_preparing")}
                  </h3>
                  <p className="font-body text-[12px] text-text-secondary leading-relaxed max-w-[240px] mx-auto">
                    {t("modal_preparing_desc")}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleGateSubmit} className="space-y-5">
                  <div className="flex gap-3 items-center mb-2">
                    <div className="w-9 h-9 bg-brand-blue-pale text-brand-blue rounded-lg flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-heading font-700 text-body-default text-brand-navy leading-none">
                        {t("modal_title")}
                      </h3>
                      <p className="font-body text-[11px] text-text-secondary mt-1">
                        {t("modal_subtitle_prefix")}{selectedBrochure.title}{t("modal_subtitle_suffix")}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="gate-email" className="block text-[10px] font-heading font-700 text-brand-navy uppercase tracking-wider">
                      {t("modal_email_label")}
                    </label>
                    <input
                      type="email"
                      id="gate-email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t("modal_email_placeholder")}
                      className="w-full px-3.5 py-2.5 bg-bg-soft border border-bg-border rounded-lg text-body-sm font-body text-text-primary focus:outline-none focus:border-brand-blue transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-brand-green hover:bg-brand-green-hover text-white rounded-full font-heading font-700 text-btn transition-colors shadow-btn-green flex items-center justify-center gap-1.5"
                  >
                    <span>{t("modal_download_btn")}</span>
                    <span>&rarr;</span>
                  </button>

                  <p className="text-[10px] font-body text-text-muted text-center leading-normal">
                    {t("modal_disclaimer")}
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
