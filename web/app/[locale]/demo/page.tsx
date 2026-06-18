"use client";

import { useState } from "react";
import { Calendar, Clock, CheckCircle2 } from "lucide-react";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { useTranslations } from "next-intl";

export default function DemoPage() {
  const t = useTranslations("DemoPage");
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [booked, setBooked] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const dates = [t("date_1"), t("date_2"), t("date_3"), t("date_4")];
  const times = ["09:30 AM", "11:00 AM", "02:00 PM", "03:30 PM", "05:00 PM"];

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDate && selectedTime && name && email) {
      setBooked(true);
    }
  };

  return (
    <div className="bg-bg-soft min-h-screen">
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

      {/* Main Grid: Scheduler on left, Walkthrough details on right */}
      <SectionWrapper theme="light" className="py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start max-w-5xl mx-auto">
          
          {/* Left Column: Simulated Interactive Scheduler */}
          <div className="lg:col-span-7 bg-white border border-bg-border rounded-2xl p-6 sm:p-8 shadow-card-sm">
            {booked ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-brand-green-pale text-brand-green rounded-full flex items-center justify-center mx-auto mb-6 border border-brand-green/10 shadow-sm animate-bounce">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-heading font-800 text-h3-desktop text-brand-navy leading-none">
                  {t("booked_title")}
                </h3>
                <p className="font-body text-body-sm text-text-secondary max-w-xs mx-auto leading-relaxed">
                  {t("booked_desc_prefix")}<span className="font-600 text-text-primary">{selectedDate} {t("booked_at")} {selectedTime}</span>{t("booked_desc_middle")}<span className="font-600 text-text-primary">{email}</span>{t("booked_desc_suffix")}
                </p>
                <button
                  onClick={() => {
                    setBooked(false);
                    setSelectedTime(null);
                    setSelectedDate(null);
                    setName("");
                    setEmail("");
                  }}
                  className="mt-6 inline-flex items-center gap-1 bg-slate-900 hover:bg-slate-800 text-white font-heading font-700 text-body-sm px-6 py-3 rounded-full transition-colors"
                >
                  {t("schedule_another")}
                </button>
              </div>
            ) : (
              <form onSubmit={handleBook} className="space-y-6">
                <h3 className="font-heading font-800 text-body-default text-brand-navy border-b border-bg-subtle pb-3 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-brand-blue" />
                  <span>{t("select_date_time")}</span>
                </h3>

                {/* Date Grid selector */}
                <div className="space-y-2">
                  <label className="block text-[11px] font-heading font-700 text-brand-navy uppercase tracking-wider">
                    {t("select_date")}
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {dates.map((date) => (
                      <button
                        key={date}
                        type="button"
                        onClick={() => setSelectedDate(date)}
                        aria-pressed={selectedDate === date}
                        className={`py-3 px-4 rounded-lg border text-body-sm font-heading font-600 transition-colors text-center ${
                          selectedDate === date
                            ? "bg-brand-blue border-brand-blue text-white shadow-sm"
                            : "border-bg-border hover:border-slate-350 bg-bg-soft text-text-secondary"
                        }`}
                      >
                        {date}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Grid selector */}
                {selectedDate && (
                  <div className="space-y-2 animate-fade-in">
                    <label className="block text-[11px] font-heading font-700 text-brand-navy uppercase tracking-wider">
                      {t("select_time")}
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {times.map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setSelectedTime(time)}
                          aria-pressed={selectedTime === time}
                          className={`py-2 rounded-lg border text-[12px] font-body transition-colors text-center ${
                            selectedTime === time
                              ? "bg-brand-blue border-brand-blue text-white shadow-sm font-600"
                              : "border-bg-border hover:border-slate-350 bg-white text-text-secondary"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Customer Details Form fields */}
                {selectedDate && selectedTime && (
                  <div className="space-y-4 pt-4 border-t border-bg-subtle animate-fade-in">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label htmlFor="name" className="block text-[11px] font-heading font-700 text-brand-navy uppercase tracking-wider">
                          {t("form_name_label")}
                        </label>
                        <input
                          type="text"
                          id="name"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder={t("form_name_placeholder")}
                          className="w-full px-3.5 py-2.5 bg-bg-soft border border-bg-border rounded-lg text-body-sm font-body text-text-primary focus:outline-none focus:border-brand-blue transition-colors"
                        />
                      </div>
                      <div className="space-y-1">
                        <label htmlFor="email" className="block text-[11px] font-heading font-700 text-brand-navy uppercase tracking-wider">
                          {t("form_email_label")}
                        </label>
                        <input
                          type="email"
                          id="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder={t("form_email_placeholder")}
                          className="w-full px-3.5 py-2.5 bg-bg-soft border border-bg-border rounded-lg text-body-sm font-body text-text-primary focus:outline-none focus:border-brand-blue transition-colors"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 px-6 bg-brand-green hover:bg-brand-green-hover text-white rounded-full font-heading font-700 text-btn transition-colors shadow-btn-green"
                    >
                      {t("form_submit")}
                    </button>
                  </div>
                )}
              </form>
            )}
          </div>

          {/* Right Column: Demo Expectations details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-card-lg border border-slate-800 space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-brand-blue/10 rounded-full blur-[50px] pointer-events-none" />
              
              <h3 className="font-heading font-800 text-body-default text-white border-b border-slate-800 pb-3">
                {t("what_happens_title")}
              </h3>

              <div className="space-y-5">
                {[1, 2, 3, 4].map((num) => (
                  <div key={num} className="flex gap-3.5 items-start">
                    <span className="w-5 h-5 bg-brand-green/20 text-brand-green rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 border border-brand-green/20">
                      ✓
                    </span>
                    <div className="space-y-1">
                      <h4 className="font-heading font-700 text-body-sm text-white leading-tight">
                        {t(`step_${num}_title`)}
                      </h4>
                      <p className="font-body text-[12px] text-slate-300 leading-relaxed">
                        {t(`step_${num}_desc`)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Support Callout */}
            <div className="border border-bg-border rounded-xl p-5 flex items-center gap-4 bg-white shadow-sm">
              <div className="w-10 h-10 rounded-full bg-brand-blue-pale text-brand-blue flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-heading font-700 text-body-sm text-brand-navy">
                  {t("direct_conversation_title")}
                </h4>
                <p className="font-body text-[11px] text-text-secondary mt-0.5">
                  {t("direct_conversation_desc_prefix")}<a href="tel:+18005550100" className="hover:underline text-brand-blue font-500">+1 800 555 0100</a>{t("direct_conversation_desc_suffix")}
                </p>
              </div>
            </div>
          </div>

        </div>
      </SectionWrapper>
    </div>
  );
}
