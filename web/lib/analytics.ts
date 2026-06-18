declare global {
  interface Window {
    gtag?: (command: string, action: string, params?: Record<string, unknown>) => void;
  }
}

export const trackGAEvent = (eventName: string, params: Record<string, unknown> = {}) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params);
  } else {
    console.log(`[GA4 Tracked Event: ${eventName}]`, params);
  }
};

export const trackDemoBooked = (date: string, time: string, plan: string) => {
  trackGAEvent("demo_booked", {
    booking_date: date,
    booking_time: time,
    plan_interest: plan,
  });
};

export const trackBrochureDownloaded = (title: string, language: string, source: string) => {
  trackGAEvent("brochure_download", {
    brochure_title: title,
    language: language,
    source_page: source,
  });
};

export const trackTrialStarted = (planName: string) => {
  trackGAEvent("trial_started", {
    plan_name: planName,
  });
};
