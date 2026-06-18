"use client";

import { useState } from "react";
import { MessageSquare, Mail, Phone, MapPin, CheckCircle2, Clock } from "lucide-react";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { useTranslations } from "next-intl";

export default function ContactPage() {
  const t = useTranslations("ContactPage");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    fleetSize: "",
    planInterest: "general",
    message: ""
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        company: "",
        fleetSize: "",
        planInterest: "general",
        message: ""
      });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to submit contact form');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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

      {/* Main 2-column contact area */}
      <SectionWrapper theme="light" className="py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start max-w-5xl mx-auto">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-7 bg-white border border-bg-border rounded-2xl p-6 sm:p-8 shadow-card-sm">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-brand-green-pale text-brand-green rounded-full flex items-center justify-center mx-auto mb-6 border border-brand-green/10 shadow-sm animate-bounce">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-heading font-800 text-h3-desktop text-brand-navy leading-none">
                  {t("success_title")}
                </h3>
                <p className="font-body text-body-sm text-text-secondary max-w-xs mx-auto leading-relaxed">
                  {t("success_desc")}
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 inline-flex items-center gap-1 bg-slate-900 hover:bg-slate-800 text-white font-heading font-700 text-body-sm px-6 py-3 rounded-full transition-colors"
                >
                  {t("send_another")}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="name" className="block text-[11px] font-heading font-700 text-brand-navy uppercase tracking-wider">
                      {t("form_name_label")}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t("form_name_placeholder")}
                      className="w-full px-3.5 py-2.5 bg-bg-soft border border-bg-border rounded-lg text-body-sm font-body text-text-primary focus:outline-none focus:border-brand-blue transition-colors placeholder:text-text-muted"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="email" className="block text-[11px] font-heading font-700 text-brand-navy uppercase tracking-wider">
                      {t("form_email_label")}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t("form_email_placeholder")}
                      className="w-full px-3.5 py-2.5 bg-bg-soft border border-bg-border rounded-lg text-body-sm font-body text-text-primary focus:outline-none focus:border-brand-blue transition-colors placeholder:text-text-muted"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="company" className="block text-[11px] font-heading font-700 text-brand-navy uppercase tracking-wider">
                      {t("form_company_label")}
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      required
                      value={formData.company}
                      onChange={handleChange}
                      placeholder={t("form_company_placeholder")}
                      className="w-full px-3.5 py-2.5 bg-bg-soft border border-bg-border rounded-lg text-body-sm font-body text-text-primary focus:outline-none focus:border-brand-blue transition-colors placeholder:text-text-muted"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="fleetSize" className="block text-[11px] font-heading font-700 text-brand-navy uppercase tracking-wider">
                      {t("form_fleet_size_label")}
                    </label>
                    <input
                      type="number"
                      id="fleetSize"
                      name="fleetSize"
                      required
                      value={formData.fleetSize}
                      onChange={handleChange}
                      placeholder={t("form_fleet_size_placeholder")}
                      className="w-full px-3.5 py-2.5 bg-bg-soft border border-bg-border rounded-lg text-body-sm font-body text-text-primary focus:outline-none focus:border-brand-blue transition-colors placeholder:text-text-muted"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="planInterest" className="block text-[11px] font-heading font-700 text-brand-navy uppercase tracking-wider">
                    {t("form_plan_label")}
                  </label>
                  <select
                    id="planInterest"
                    name="planInterest"
                    value={formData.planInterest}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-bg-soft border border-bg-border rounded-lg text-body-sm font-body text-text-primary focus:outline-none focus:border-brand-blue transition-colors"
                  >
                    <option value="general">{t("form_plan_general")}</option>
                    <option value="starter">{t("form_plan_starter")}</option>
                    <option value="professional">{t("form_plan_professional")}</option>
                    <option value="enterprise">{t("form_plan_enterprise")}</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label htmlFor="message" className="block text-[11px] font-heading font-700 text-brand-navy uppercase tracking-wider">
                    {t("form_message_label")}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t("form_message_placeholder")}
                    className="w-full px-3.5 py-2.5 bg-bg-soft border border-bg-border rounded-lg text-body-sm font-body text-text-primary focus:outline-none focus:border-brand-blue transition-colors placeholder:text-text-muted resize-none"
                  />
                </div>

                {error && (
                  <div className="p-3.5 bg-red-50 text-status-error border border-red-200 rounded-lg text-body-sm font-body">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 bg-brand-green hover:bg-brand-green-hover text-white rounded-full font-heading font-700 text-btn transition-colors shadow-btn-green flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    t("form_submit")
                  )}
                </button>

                <p className="text-[11px] font-body text-text-muted text-center flex items-center justify-center gap-1.5 pt-2">
                  <Clock className="w-3.5 h-3.5 text-brand-blue" />
                  <span>{t("response_time")}</span>
                </p>
              </form>
            )}
          </div>

          {/* Right Column: Support details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-2">
              <h2 className="font-heading font-800 text-h3-desktop text-brand-navy">
                {t("other_ways_title")}
              </h2>
              <p className="font-body text-body-sm text-text-secondary leading-relaxed">
                {t("other_ways_desc")}
              </p>
            </div>

            <div className="space-y-6">
              {/* Live Chat info */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-brand-blue-pale text-brand-blue flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading font-700 text-body-sm text-brand-navy">
                    {t("live_chat_title")}
                  </h4>
                  <p className="font-body text-body-sm text-text-secondary mt-0.5">
                    {t("live_chat_desc")}
                  </p>
                  <p className="text-[10px] font-heading font-700 text-brand-green mt-1 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-online-dot animate-pulse" />
                    <span>{t("live_chat_response_time")}</span>
                  </p>
                </div>
              </div>

              {/* Email info */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-brand-green-pale text-brand-green flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading font-700 text-body-sm text-brand-navy">
                    {t("email_title")}
                  </h4>
                  <p className="font-body text-body-sm text-text-secondary mt-0.5">
                    <a href="mailto:hello@carrental.digital" className="hover:underline text-brand-blue font-500">
                      hello@carrental.digital
                    </a>
                  </p>
                  <p className="font-body text-[11px] text-text-muted mt-0.5">
                    {t("email_desc")}
                  </p>
                </div>
              </div>

              {/* Phone info */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading font-700 text-body-sm text-brand-navy">
                    {t("phone_title")}
                  </h4>
                  <p className="font-body text-body-sm text-text-secondary mt-0.5">
                    <a href="tel:+18005550100" className="hover:underline text-brand-blue font-500">
                      +1 800 555 0100
                    </a>
                  </p>
                  <p className="font-body text-[11px] text-text-muted mt-0.5">
                    {t("phone_desc")}
                  </p>
                </div>
              </div>

              {/* Office Locations */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading font-700 text-body-sm text-brand-navy">
                    {t("offices_title")}
                  </h4>
                  <p className="font-body text-body-sm text-text-secondary mt-0.5">
                    {t("offices_us")} <br />
                    {t("offices_eu")}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </SectionWrapper>
    </div>
  );
}
