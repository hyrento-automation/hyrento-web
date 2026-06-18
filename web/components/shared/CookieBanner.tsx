"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const t = useTranslations("CookieBanner");

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "all");
    setVisible(false);
  };

  const manage = () => {
    localStorage.setItem("cookie-consent", "essential");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-sm z-50"
          role="dialog"
          aria-label={t("aria_label")}
        >
          <div className="bg-white border border-bg-border rounded-xl shadow-card-lg p-5">
            <p className="text-[14px] font-body text-text-primary mb-1 font-500">
              {t("title")}
            </p>
            <p className="text-[13px] font-body text-text-secondary mb-4 leading-relaxed">
              {t("description")}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={accept}
                className="flex-1 py-2 bg-brand-green hover:bg-brand-green-hover text-white text-[13px] font-heading font-600 rounded-md transition-colors"
                id="cookie-accept-all"
              >
                {t("accept_all")}
              </button>
              <button
                onClick={manage}
                className="flex-1 py-2 border border-bg-border text-text-secondary text-[13px] font-heading font-600 rounded-md hover:bg-bg-soft transition-colors"
                id="cookie-manage-prefs"
              >
                {t("manage")}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
