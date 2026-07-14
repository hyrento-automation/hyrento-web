"use client";

import { useEffect, useState } from "react";
import { Link } from "@/i18n/routing";
import { MessageSquare, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

export function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);
  const t = useTranslations("StickyMobileCTA");

  useEffect(() => {
    const handleScroll = () => {
      // Show CTA only after scrolling down 400px
      if (window.scrollY > 400) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-bg-border shadow-mega-menu px-4 py-3 flex items-center gap-3 lg:hidden"
        >
          <Link
            href="/contact"
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 border border-bg-border rounded-full text-[13px] font-heading font-600 text-text-secondary hover:bg-bg-soft transition-colors"
          >
            <MessageSquare className="w-4 h-4 text-brand-blue" />
            <span>{t("chat_now")}</span>
          </Link>
          
          <Link
            href="/onboarding"
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-brand-green hover:bg-brand-green-hover text-white rounded-full text-[13px] font-heading font-600 shadow-btn-green transition-colors"
          >
            <Calendar className="w-4 h-4" />
            <span>{t("start_free_trial")}</span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
