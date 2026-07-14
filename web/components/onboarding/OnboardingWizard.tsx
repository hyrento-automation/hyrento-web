"use client";

import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BadgeDollarSign,
  Building2,
  CarFront,
  Check,
  CheckCircle2,
  CircleHelp,
  Clock3,
  FileCheck2,
  LifeBuoy,
  Loader2,
  Mail,
  Palette,
  Save,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

type OnboardingData = {
  legalBusinessName: string;
  tradingName: string;
  businessAddress: string;
  country: string;
  taxId: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  languages: string[];
  totalVehicles: string;
  expectedGrowth: string;
  vehicleCategories: string[];
  vehicleList: string;
  outOfService: string;
  mileagePolicy: string;
  mileageLimit: string;
  locationCount: string;
  deliveryOffered: string;
  deliveryRules: string;
  operatingHours: string;
  logoStatus: string;
  brandColors: string;
  existingWebsite: string;
  fleetPhotosStatus: string;
  ownsDomain: string;
  domainName: string;
  registrar: string;
  registrarAccess: string;
  requestedEmails: string;
  currentDomainEmail: string;
  currentEmailSetup: string;
  rates: string;
  securityDeposit: string;
  cancellationPolicy: string;
  customCancellation: string;
  minimumAge: string;
  customMinimumAge: string;
  youngDriverSurcharge: string;
  addonPricing: string;
  longStayDiscount: string;
  discountRule: string;
  hasAgreement: string;
  agreementStatus: string;
  renterDocuments: string[];
  insuranceDetails: string;
  paymentMethods: string[];
  chargeMethod: string;
  preAuthAmount: string;
  currency: string;
  adminName: string;
  staffLogins: string;
  staffPermissions: string;
  supportLanguage: string;
};

const initialData: OnboardingData = {
  legalBusinessName: "",
  tradingName: "",
  businessAddress: "",
  country: "",
  taxId: "",
  contactName: "",
  contactEmail: "",
  contactPhone: "",
  languages: [],
  totalVehicles: "",
  expectedGrowth: "",
  vehicleCategories: [],
  vehicleList: "",
  outOfService: "",
  mileagePolicy: "",
  mileageLimit: "",
  locationCount: "",
  deliveryOffered: "",
  deliveryRules: "",
  operatingHours: "",
  logoStatus: "",
  brandColors: "",
  existingWebsite: "",
  fleetPhotosStatus: "",
  ownsDomain: "",
  domainName: "",
  registrar: "",
  registrarAccess: "",
  requestedEmails: "",
  currentDomainEmail: "",
  currentEmailSetup: "",
  rates: "",
  securityDeposit: "",
  cancellationPolicy: "",
  customCancellation: "",
  minimumAge: "",
  customMinimumAge: "",
  youngDriverSurcharge: "",
  addonPricing: "",
  longStayDiscount: "",
  discountRule: "",
  hasAgreement: "",
  agreementStatus: "",
  renterDocuments: [],
  insuranceDetails: "",
  paymentMethods: [],
  chargeMethod: "",
  preAuthAmount: "",
  currency: "",
  adminName: "",
  staffLogins: "",
  staffPermissions: "",
  supportLanguage: "",
};

const storageKey = "hyrento-onboarding-progress-v1";

const steps = [
  {
    title: "Business & contact",
    shortTitle: "Business",
    description: "Tell us who you are and how customers should reach you.",
    icon: Building2,
  },
  {
    title: "Fleet & locations",
    shortTitle: "Fleet",
    description: "Share your fleet size, vehicle mix, and pickup operations.",
    icon: CarFront,
  },
  {
    title: "Branding & domain",
    shortTitle: "Brand",
    description: "Help us prepare a storefront that feels like your business.",
    icon: Palette,
  },
  {
    title: "Pricing & policies",
    shortTitle: "Pricing",
    description: "Set the rules your booking engine and contracts should follow.",
    icon: BadgeDollarSign,
  },
  {
    title: "Support & handoff",
    shortTitle: "Handoff",
    description: "Choose your administrator, team access, and support language.",
    icon: Users,
  },
] as const;

const fieldLabels: Partial<Record<keyof OnboardingData, string>> = {
  legalBusinessName: "Legal business name",
  tradingName: "Trading / brand name",
  businessAddress: "Business address",
  country: "Country of registration",
  taxId: "VAT / Tax ID",
  contactName: "Primary contact name",
  contactEmail: "Contact email",
  contactPhone: "Phone / WhatsApp",
  languages: "Customer site languages",
  totalVehicles: "Total vehicles today",
  expectedGrowth: "Expected 12-month growth",
  vehicleCategories: "Vehicle categories",
  vehicleList: "Vehicle list",
  outOfService: "Vehicles out of service",
  mileagePolicy: "Mileage policy",
  mileageLimit: "Mileage limit",
  locationCount: "Number of locations",
  deliveryOffered: "Airport / hotel delivery",
  deliveryRules: "Delivery fee rules",
  operatingHours: "Operating hours",
  logoStatus: "Logo",
  brandColors: "Brand colours",
  existingWebsite: "Existing website",
  fleetPhotosStatus: "Fleet photos",
  ownsDomain: "Domain ownership",
  domainName: "Domain name",
  registrar: "Domain registrar",
  registrarAccess: "Registrar login access",
  requestedEmails: "Requested email addresses",
  currentDomainEmail: "Existing domain email",
  currentEmailSetup: "Current email setup",
  rates: "Rates per category",
  securityDeposit: "Security deposit",
  cancellationPolicy: "Cancellation policy",
  customCancellation: "Custom cancellation policy",
  minimumAge: "Minimum driver age",
  customMinimumAge: "Custom minimum age",
  youngDriverSurcharge: "Young-driver surcharge",
  addonPricing: "Add-on pricing",
  longStayDiscount: "Long-stay discount",
  discountRule: "Discount rule",
  hasAgreement: "Existing rental agreement",
  agreementStatus: "Rental agreement file",
  renterDocuments: "Required renter documents",
  insuranceDetails: "Insurance disclosure",
  paymentMethods: "Payment methods",
  chargeMethod: "Payment collection method",
  preAuthAmount: "Pre-authorisation amount",
  currency: "Currency",
  adminName: "Main system administrator",
  staffLogins: "Number of staff logins",
  staffPermissions: "Roles and permissions",
  supportLanguage: "Preferred support language",
};

const requiredByStep: Array<Array<keyof OnboardingData>> = [
  [
    "legalBusinessName",
    "businessAddress",
    "country",
    "contactName",
    "contactEmail",
    "contactPhone",
    "languages",
  ],
  [
    "totalVehicles",
    "vehicleCategories",
    "mileagePolicy",
    "locationCount",
    "deliveryOffered",
    "operatingHours",
  ],
  ["ownsDomain"],
  [
    "rates",
    "securityDeposit",
    "cancellationPolicy",
    "minimumAge",
    "renterDocuments",
    "paymentMethods",
    "chargeMethod",
    "currency",
  ],
  ["adminName", "staffLogins", "supportLanguage"],
];

const reviewFieldsByStep: Array<Array<keyof OnboardingData>> = [
  [
    "legalBusinessName",
    "tradingName",
    "businessAddress",
    "country",
    "taxId",
    "contactName",
    "contactEmail",
    "contactPhone",
    "languages",
  ],
  [
    "totalVehicles",
    "expectedGrowth",
    "vehicleCategories",
    "vehicleList",
    "outOfService",
    "mileagePolicy",
    "mileageLimit",
    "locationCount",
    "deliveryOffered",
    "deliveryRules",
    "operatingHours",
  ],
  [
    "logoStatus",
    "brandColors",
    "existingWebsite",
    "fleetPhotosStatus",
    "ownsDomain",
    "domainName",
    "registrar",
    "registrarAccess",
    "requestedEmails",
    "currentDomainEmail",
    "currentEmailSetup",
  ],
  [
    "rates",
    "securityDeposit",
    "cancellationPolicy",
    "customCancellation",
    "minimumAge",
    "customMinimumAge",
    "youngDriverSurcharge",
    "addonPricing",
    "longStayDiscount",
    "discountRule",
    "hasAgreement",
    "agreementStatus",
    "renterDocuments",
    "insuranceDetails",
    "paymentMethods",
    "chargeMethod",
    "preAuthAmount",
    "currency",
  ],
  ["adminName", "staffLogins", "staffPermissions", "supportLanguage"],
];

const inputClass =
  "mt-2 min-h-12 w-full rounded-xl border border-bg-border bg-white px-4 py-3 text-sm text-text-primary shadow-sm transition-colors placeholder:text-text-muted focus:border-brand-blue focus:outline-none focus:ring-4 focus:ring-brand-blue/10";

type TextFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  optional?: boolean;
  help?: string;
  inputMode?: "text" | "email" | "tel" | "url" | "numeric";
};

function TextField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
  optional,
  help,
  inputMode,
}: TextFieldProps) {
  return (
    <label className="block">
      <span className="flex items-center gap-1 text-xs font-700 text-brand-navy">
        {label}
        {required && <span className="text-status-error">*</span>}
        {optional && (
          <span className="ml-1 font-500 text-text-muted">Optional</span>
        )}
      </span>
      <input
        type={type}
        inputMode={inputMode}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required={required}
        className={inputClass}
      />
      {help && (
        <span className="mt-1.5 block text-[11px] leading-4 text-text-muted">
          {help}
        </span>
      )}
    </label>
  );
}

type TextAreaFieldProps = Omit<TextFieldProps, "type" | "inputMode"> & {
  rows?: number;
};

function TextAreaField({
  label,
  value,
  onChange,
  placeholder,
  required,
  optional,
  help,
  rows = 4,
}: TextAreaFieldProps) {
  return (
    <label className="block">
      <span className="flex items-center gap-1 text-xs font-700 text-brand-navy">
        {label}
        {required && <span className="text-status-error">*</span>}
        {optional && (
          <span className="ml-1 font-500 text-text-muted">Optional</span>
        )}
      </span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className={cn(inputClass, "resize-y")}
      />
      {help && (
        <span className="mt-1.5 block text-[11px] leading-4 text-text-muted">
          {help}
        </span>
      )}
    </label>
  );
}

type SelectFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  required?: boolean;
  optional?: boolean;
};

function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder = "Select an option",
  required,
  optional,
}: SelectFieldProps) {
  return (
    <label className="block">
      <span className="flex items-center gap-1 text-xs font-700 text-brand-navy">
        {label}
        {required && <span className="text-status-error">*</span>}
        {optional && (
          <span className="ml-1 font-500 text-text-muted">Optional</span>
        )}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        className={inputClass}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

type ChoiceFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  required?: boolean;
  help?: string;
};

function ChoiceField({
  label,
  value,
  onChange,
  options,
  required,
  help,
}: ChoiceFieldProps) {
  return (
    <fieldset>
      <legend className="flex items-center gap-1 text-xs font-700 text-brand-navy">
        {label}
        {required && <span className="text-status-error">*</span>}
      </legend>
      <div className="mt-2 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
        {options.map((option) => {
          const selected = value === option;
          return (
            <button
              key={option}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(option)}
              className={cn(
                "min-h-11 rounded-xl border px-4 py-2.5 text-xs font-600 transition-all",
                selected
                  ? "border-brand-blue bg-brand-blue-pale text-brand-blue shadow-sm"
                  : "border-bg-border bg-white text-text-secondary hover:border-brand-blue/30 hover:bg-bg-soft"
              )}
            >
              {option}
            </button>
          );
        })}
      </div>
      {help && (
        <p className="mt-2 text-[11px] leading-4 text-text-muted">{help}</p>
      )}
    </fieldset>
  );
}

type MultiSelectFieldProps = {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
  options: string[];
  required?: boolean;
  help?: string;
};

function MultiSelectField({
  label,
  value,
  onChange,
  options,
  required,
  help,
}: MultiSelectFieldProps) {
  const toggle = (option: string) => {
    if (value.includes(option)) {
      onChange(value.filter((item) => item !== option));
    } else {
      onChange([...value, option]);
    }
  };

  return (
    <fieldset>
      <legend className="flex items-center gap-1 text-xs font-700 text-brand-navy">
        {label}
        {required && <span className="text-status-error">*</span>}
      </legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((option) => {
          const selected = value.includes(option);
          return (
            <button
              key={option}
              type="button"
              aria-pressed={selected}
              onClick={() => toggle(option)}
              className={cn(
                "inline-flex min-h-10 items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-600 transition-all",
                selected
                  ? "border-brand-green bg-brand-green-pale text-brand-green-hover"
                  : "border-bg-border bg-white text-text-secondary hover:border-brand-green/30"
              )}
            >
              <span
                className={cn(
                  "flex h-4 w-4 items-center justify-center rounded-full border",
                  selected
                    ? "border-brand-green bg-brand-green text-white"
                    : "border-bg-border bg-white"
                )}
              >
                {selected && <Check className="h-2.5 w-2.5" />}
              </span>
              {option}
            </button>
          );
        })}
      </div>
      {help && (
        <p className="mt-2 text-[11px] leading-4 text-text-muted">{help}</p>
      )}
    </fieldset>
  );
}

type AssetCardProps = {
  title: string;
  description: string;
  value: string;
  onChange: (value: string) => void;
};

function AssetCard({
  title,
  description,
  value,
  onChange,
}: AssetCardProps) {
  const options = ["Ready to send", "Need HyRento help", "Add later"];

  return (
    <div className="rounded-xl border border-bg-border bg-bg-soft p-4">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-brand-blue shadow-sm">
          <FileCheck2 className="h-4 w-4" />
        </div>
        <div>
          <h4 className="text-sm font-700 text-brand-navy">{title}</h4>
          <p className="mt-1 text-[11px] leading-4 text-text-secondary">
            {description}
          </p>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-[10px] font-700 transition-colors",
              value === option
                ? "border-brand-blue bg-brand-blue text-white"
                : "border-bg-border bg-white text-text-secondary hover:border-brand-blue/30"
            )}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

function ConditionalPanel({ children }: { children: React.ReactNode }) {
  return (
    <div className="animate-fade-in rounded-xl border border-brand-blue/15 bg-brand-blue-pale/60 p-4">
      {children}
    </div>
  );
}

function SectionHeading({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="border-b border-bg-border pb-4">
      <h3 className="text-base font-700 text-brand-navy">{title}</h3>
      {description && (
        <p className="mt-1 text-xs leading-5 text-text-secondary">
          {description}
        </p>
      )}
    </div>
  );
}

function isEmpty(value: string | string[]) {
  return Array.isArray(value) ? value.length === 0 : value.trim() === "";
}

export function OnboardingWizard() {
  const [formData, setFormData] = useState<OnboardingData>(initialData);
  const [currentStep, setCurrentStep] = useState(0);
  const [hydrated, setHydrated] = useState(false);
  const [saveNotice, setSaveNotice] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [website, setWebsite] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const saved = window.localStorage.getItem(storageKey);
        if (saved) {
          const parsed = JSON.parse(saved) as {
            formData?: Partial<OnboardingData>;
            currentStep?: number;
          };
          if (parsed.formData) {
            setFormData({ ...initialData, ...parsed.formData });
          }
          if (
            typeof parsed.currentStep === "number" &&
            parsed.currentStep >= 0 &&
            parsed.currentStep <= 5
          ) {
            setCurrentStep(parsed.currentStep);
          }
        }
      } catch {
        window.localStorage.removeItem(storageKey);
      } finally {
        setHydrated(true);
      }
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hydrated || submitted) return;
    window.localStorage.setItem(
      storageKey,
      JSON.stringify({ formData, currentStep })
    );
  }, [currentStep, formData, hydrated, submitted]);

  useEffect(() => {
    if (!saveNotice) return;
    const timer = window.setTimeout(() => setSaveNotice(false), 2400);
    return () => window.clearTimeout(timer);
  }, [saveNotice]);

  const updateField = <K extends keyof OnboardingData>(
    field: K,
    value: OnboardingData[K]
  ) => {
    setErrorMessage("");
    setFormData((previous) => {
      const next = { ...previous, [field]: value };

      if (field === "mileagePolicy" && value !== "Limited") {
        next.mileageLimit = "";
      }
      if (field === "deliveryOffered" && value !== "Yes") {
        next.deliveryRules = "";
      }
      if (field === "ownsDomain" && value !== "Yes") {
        next.domainName = "";
        next.registrar = "";
        next.registrarAccess = "";
        next.currentDomainEmail = "";
        next.currentEmailSetup = "";
      }
      if (field === "currentDomainEmail" && value !== "Yes") {
        next.currentEmailSetup = "";
      }
      if (field === "cancellationPolicy" && value !== "Custom") {
        next.customCancellation = "";
      }
      if (field === "minimumAge" && value !== "Other") {
        next.customMinimumAge = "";
      }
      if (field === "longStayDiscount" && value !== "Yes") {
        next.discountRule = "";
      }
      if (field === "chargeMethod" && value !== "Pre-authorisation") {
        next.preAuthAmount = "";
      }

      return next;
    });
  };

  const progress = currentStep >= 5 ? 100 : ((currentStep + 1) / 5) * 100;
  const activeStep = currentStep < 5 ? steps[currentStep] : null;

  const completedAnswerCount = Object.values(formData).filter(
    (value) => !isEmpty(value)
  ).length;

  const validateStep = (stepIndex: number) => {
    const required = [...requiredByStep[stepIndex]];

    if (stepIndex === 2 && formData.ownsDomain === "Yes") {
      required.push("domainName", "registrar", "registrarAccess");
    }
    if (stepIndex === 1 && formData.mileagePolicy === "Limited") {
      required.push("mileageLimit");
    }
    if (stepIndex === 1 && formData.deliveryOffered === "Yes") {
      required.push("deliveryRules");
    }
    if (stepIndex === 2 && formData.currentDomainEmail === "Yes") {
      required.push("currentEmailSetup");
    }
    if (stepIndex === 3 && formData.cancellationPolicy === "Custom") {
      required.push("customCancellation");
    }
    if (stepIndex === 3 && formData.minimumAge === "Other") {
      required.push("customMinimumAge");
    }
    if (stepIndex === 3 && formData.chargeMethod === "Pre-authorisation") {
      required.push("preAuthAmount");
    }

    const missing = required.filter((field) => isEmpty(formData[field]));
    if (missing.length > 0) {
      setErrorMessage(
        "Please complete: " +
          missing
            .map((field) => fieldLabels[field] || String(field))
            .join(", ") +
          "."
      );
      return false;
    }

    if (
      stepIndex === 0 &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)
    ) {
      setErrorMessage("Please enter a valid contact email address.");
      return false;
    }

    return true;
  };

  const goToTop = () => {
    window.setTimeout(() => {
      document
        .getElementById("onboarding-wizard")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const nextStep = () => {
    if (currentStep < 5 && !validateStep(currentStep)) return;
    setCurrentStep((step) => Math.min(step + 1, 5));
    setErrorMessage("");
    goToTop();
  };

  const previousStep = () => {
    setCurrentStep((step) => Math.max(step - 1, 0));
    setErrorMessage("");
    goToTop();
  };

  const saveForLater = () => {
    window.localStorage.setItem(
      storageKey,
      JSON.stringify({ formData, currentStep })
    );
    setSaveNotice(true);
  };

  const submitOnboarding = async () => {
    setSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: formData, website }),
      });
      const result = (await response.json()) as {
        success?: boolean;
        error?: string;
      };

      if (!response.ok || !result.success) {
        throw new Error(result.error || "We could not submit your details.");
      }

      window.localStorage.removeItem(storageKey);
      setSubmitted(true);
      goToTop();
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "We could not submit your details. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const restart = () => {
    window.localStorage.removeItem(storageKey);
    setFormData(initialData);
    setCurrentStep(0);
    setSubmitted(false);
    setErrorMessage("");
  };

  const renderStep = () => {
    if (currentStep === 0) {
      return (
        <div className="space-y-7">
          <SectionHeading
            title="Your business"
            description="These details appear on invoices, agreements, and your customer website."
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField
              label="Legal business name"
              value={formData.legalBusinessName}
              onChange={(value) => updateField("legalBusinessName", value)}
              placeholder="Example Rental Company Ltd."
              required
            />
            <TextField
              label="Trading / brand name"
              value={formData.tradingName}
              onChange={(value) => updateField("tradingName", value)}
              placeholder="The name customers see"
              optional
            />
          </div>
          <TextField
            label="Business address"
            value={formData.businessAddress}
            onChange={(value) => updateField("businessAddress", value)}
            placeholder="Street, city, postal code"
            required
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <SelectField
              label="Country of registration"
              value={formData.country}
              onChange={(value) => updateField("country", value)}
              options={[
                "Mauritius",
                "Spain",
                "France",
                "Germany",
                "Italy",
                "Netherlands",
                "Switzerland",
                "United Kingdom",
                "United States",
                "United Arab Emirates",
                "South Africa",
                "Other",
              ]}
              required
            />
            <TextField
              label="VAT / Tax ID"
              value={formData.taxId}
              onChange={(value) => updateField("taxId", value)}
              placeholder="If applicable"
              optional
            />
          </div>

          <SectionHeading
            title="Primary contact"
            description="We will use this person for setup updates and the trial handoff."
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField
              label="Full name"
              value={formData.contactName}
              onChange={(value) => updateField("contactName", value)}
              placeholder="Primary contact name"
              required
            />
            <TextField
              label="Email address"
              value={formData.contactEmail}
              onChange={(value) => updateField("contactEmail", value)}
              placeholder="you@company.com"
              type="email"
              inputMode="email"
              required
            />
            <TextField
              label="Phone / WhatsApp number"
              value={formData.contactPhone}
              onChange={(value) => updateField("contactPhone", value)}
              placeholder="+00 000 000 0000"
              type="tel"
              inputMode="tel"
              required
            />
          </div>
          <MultiSelectField
            label="Languages for your customer website"
            value={formData.languages}
            onChange={(value) => updateField("languages", value)}
            options={[
              "English",
              "German",
              "French",
              "Spanish",
              "Dutch",
              "Arabic",
              "Portuguese",
              "Other",
            ]}
            required
            help="Choose every language your customers should be able to use."
          />
        </div>
      );
    }

    if (currentStep === 1) {
      return (
        <div className="space-y-7">
          <SectionHeading
            title="Fleet overview"
            description="An estimate is enough for now. We will help import the full fleet later."
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField
              label="Total vehicles today"
              value={formData.totalVehicles}
              onChange={(value) => updateField("totalVehicles", value)}
              placeholder="25"
              type="number"
              inputMode="numeric"
              required
            />
            <TextField
              label="Expected growth over 12 months"
              value={formData.expectedGrowth}
              onChange={(value) => updateField("expectedGrowth", value)}
              placeholder="Example: 10 more vehicles"
              optional
            />
          </div>
          <MultiSelectField
            label="Vehicle categories offered"
            value={formData.vehicleCategories}
            onChange={(value) => updateField("vehicleCategories", value)}
            options={["Economy", "Compact", "Luxury", "SUV", "Van", "Sports", "Pickup", "Other"]}
            required
          />
          <TextAreaField
            label="Vehicle list"
            value={formData.vehicleList}
            onChange={(value) => updateField("vehicleList", value)}
            placeholder="Example: Toyota Yaris, 2024, plate ABC123, €45/day"
            optional
            help="Add a few vehicles now, or write “spreadsheet ready” and we will collect it securely."
          />
          <TextField
            label="Vehicles currently in maintenance or out of service"
            value={formData.outOfService}
            onChange={(value) => updateField("outOfService", value)}
            placeholder="Example: 2 vehicles in maintenance"
            optional
          />

          <SectionHeading title="Rental operations" />
          <ChoiceField
            label="Mileage policy"
            value={formData.mileagePolicy}
            onChange={(value) => updateField("mileagePolicy", value)}
            options={["Unlimited", "Limited"]}
            required
          />
          {formData.mileagePolicy === "Limited" && (
            <ConditionalPanel>
              <TextField
                label="Mileage limit"
                value={formData.mileageLimit}
                onChange={(value) => updateField("mileageLimit", value)}
                placeholder="Example: 200 km per day"
                required
              />
            </ConditionalPanel>
          )}
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField
              label="Number of pickup / drop-off locations"
              value={formData.locationCount}
              onChange={(value) => updateField("locationCount", value)}
              placeholder="3"
              type="number"
              inputMode="numeric"
              required
            />
            <ChoiceField
              label="Airport / hotel delivery offered?"
              value={formData.deliveryOffered}
              onChange={(value) => updateField("deliveryOffered", value)}
              options={["Yes", "No"]}
              required
            />
          </div>
          {formData.deliveryOffered === "Yes" && (
            <ConditionalPanel>
              <TextField
                label="Delivery fee rules"
                value={formData.deliveryRules}
                onChange={(value) => updateField("deliveryRules", value)}
                placeholder="Example: Airport free, hotels €20"
                required
              />
            </ConditionalPanel>
          )}
          <TextAreaField
            label="Operating hours"
            value={formData.operatingHours}
            onChange={(value) => updateField("operatingHours", value)}
            placeholder="Monday–Friday 08:00–18:00; Saturday 09:00–14:00; closed on..."
            required
          />
        </div>
      );
    }

    if (currentStep === 2) {
      return (
        <div className="space-y-7">
          <SectionHeading
            title="Brand assets"
            description="Nothing here blocks submission. Tell us what is ready and we will follow up securely."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <AssetCard
              title="Logo file"
              description="Vector or high-resolution logo preferred."
              value={formData.logoStatus}
              onChange={(value) => updateField("logoStatus", value)}
            />
            <AssetCard
              title="Fleet photos"
              description="Your own vehicle photos, or HyRento can source stock images."
              value={formData.fleetPhotosStatus}
              onChange={(value) => updateField("fleetPhotosStatus", value)}
            />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField
              label="Brand colours"
              value={formData.brandColors}
              onChange={(value) => updateField("brandColors", value)}
              placeholder="Example: #0A1628 and #16A34A"
              optional
            />
            <TextField
              label="Existing website to reference"
              value={formData.existingWebsite}
              onChange={(value) => updateField("existingWebsite", value)}
              placeholder="https://yourwebsite.com"
              type="url"
              inputMode="url"
              optional
            />
          </div>

          <SectionHeading
            title="Domain & business email"
            description="We will protect any email already running on your domain during the migration."
          />
          <ChoiceField
            label="Do you already own a domain?"
            value={formData.ownsDomain}
            onChange={(value) => updateField("ownsDomain", value)}
            options={["Yes", "No"]}
            required
          />
          {formData.ownsDomain === "Yes" && (
            <ConditionalPanel>
              <div className="space-y-5">
                <TextField
                  label="Domain name"
                  value={formData.domainName}
                  onChange={(value) => updateField("domainName", value)}
                  placeholder="yourrentalcompany.com"
                  required
                />
                <div className="grid gap-5 sm:grid-cols-2">
                  <SelectField
                    label="Domain registrar"
                    value={formData.registrar}
                    onChange={(value) => updateField("registrar", value)}
                    options={[
                      "GoDaddy",
                      "Namecheap",
                      "Cloudflare",
                      "Google / Squarespace Domains",
                      "Hostinger",
                      "Other",
                    ]}
                    required
                  />
                  <ChoiceField
                    label="Do you have registrar login access?"
                    value={formData.registrarAccess}
                    onChange={(value) => updateField("registrarAccess", value)}
                    options={["Yes", "No", "Not sure"]}
                    required
                  />
                </div>
                <ChoiceField
                  label="Do you currently use email at this domain?"
                  value={formData.currentDomainEmail}
                  onChange={(value) => updateField("currentDomainEmail", value)}
                  options={["Yes", "No"]}
                />
                {formData.currentDomainEmail === "Yes" && (
                  <TextAreaField
                    label="Describe the current email setup"
                    value={formData.currentEmailSetup}
                    onChange={(value) => updateField("currentEmailSetup", value)}
                    placeholder="Example: Google Workspace with info@ and bookings@"
                    required
                    help="This helps us migrate carefully so no email is lost."
                  />
                )}
              </div>
            </ConditionalPanel>
          )}
          {formData.ownsDomain === "No" && (
            <div className="flex gap-3 rounded-xl border border-brand-green/15 bg-brand-green-pale p-4">
              <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-brand-green" />
              <div>
                <h4 className="text-sm font-700 text-brand-navy">
                  No problem — we will help you register one.
                </h4>
                <p className="mt-1 text-xs leading-5 text-text-secondary">
                  Your setup specialist will suggest suitable names and guide
                  you through ownership and DNS connection.
                </p>
              </div>
            </div>
          )}
          <TextField
            label="Business email addresses wanted"
            value={formData.requestedEmails}
            onChange={(value) => updateField("requestedEmails", value)}
            placeholder="info@, bookings@, support@"
            optional
            help="We can discuss Zoho Mail, Google Workspace, or forwarding during setup."
          />
        </div>
      );
    }

    if (currentStep === 3) {
      return (
        <div className="space-y-7">
          <SectionHeading
            title="Pricing rules"
            description="Plain-language notes are perfect. Your setup specialist will confirm the final configuration."
          />
          <TextAreaField
            label="Daily / weekly / monthly rates per vehicle category"
            value={formData.rates}
            onChange={(value) => updateField("rates", value)}
            placeholder="Economy: €40/day, €240/week. SUV: €75/day..."
            required
          />
          <TextField
            label="Security deposit amount and policy"
            value={formData.securityDeposit}
            onChange={(value) => updateField("securityDeposit", value)}
            placeholder="Example: €500 hold, released after vehicle inspection"
            required
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <SelectField
              label="Cancellation policy"
              value={formData.cancellationPolicy}
              onChange={(value) => updateField("cancellationPolicy", value)}
              options={[
                "Free up to 24 hours",
                "Free up to 48 hours",
                "Non-refundable",
                "Custom",
              ]}
              required
            />
            <SelectField
              label="Minimum driver age"
              value={formData.minimumAge}
              onChange={(value) => updateField("minimumAge", value)}
              options={["18", "21", "25", "Other"]}
              required
            />
          </div>
          {(formData.cancellationPolicy === "Custom" ||
            formData.minimumAge === "Other") && (
            <ConditionalPanel>
              <div className="grid gap-5 sm:grid-cols-2">
                {formData.cancellationPolicy === "Custom" && (
                  <TextAreaField
                    label="Describe your cancellation policy"
                    value={formData.customCancellation}
                    onChange={(value) =>
                      updateField("customCancellation", value)
                    }
                    placeholder="Free cancellation window, refund rules, no-show policy..."
                    required
                    rows={3}
                  />
                )}
                {formData.minimumAge === "Other" && (
                  <TextField
                    label="Specify minimum age"
                    value={formData.customMinimumAge}
                    onChange={(value) =>
                      updateField("customMinimumAge", value)
                    }
                    placeholder="23"
                    required
                  />
                )}
              </div>
            </ConditionalPanel>
          )}
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField
              label="Young-driver surcharge"
              value={formData.youngDriverSurcharge}
              onChange={(value) =>
                updateField("youngDriverSurcharge", value)
              }
              placeholder="Example: €10/day under age 25"
              optional
            />
            <ChoiceField
              label="Long-stay discount?"
              value={formData.longStayDiscount}
              onChange={(value) => updateField("longStayDiscount", value)}
              options={["Yes", "No"]}
            />
          </div>
          {formData.longStayDiscount === "Yes" && (
            <ConditionalPanel>
              <TextField
                label="Discount rule"
                value={formData.discountRule}
                onChange={(value) => updateField("discountRule", value)}
                placeholder="Example: 15% off rentals of 7+ days"
                required
              />
            </ConditionalPanel>
          )}
          <TextAreaField
            label="Add-on pricing"
            value={formData.addonPricing}
            onChange={(value) => updateField("addonPricing", value)}
            placeholder="GPS, child seat, insurance upgrade, extra driver..."
            optional
          />

          <SectionHeading title="Contracts, insurance & payments" />
          <ChoiceField
            label="Do you have an existing rental agreement?"
            value={formData.hasAgreement}
            onChange={(value) => updateField("hasAgreement", value)}
            options={["Yes", "No"]}
          />
          {formData.hasAgreement === "Yes" && (
            <AssetCard
              title="Rental agreement"
              description="We will collect the template securely after submission."
              value={formData.agreementStatus}
              onChange={(value) => updateField("agreementStatus", value)}
            />
          )}
          {formData.hasAgreement === "No" && (
            <div className="flex gap-3 rounded-xl border border-brand-green/15 bg-brand-green-pale p-4">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-green" />
              <p className="text-xs leading-5 text-text-secondary">
                HyRento will provide a standard rental agreement template for
                your country, which you can review with your legal adviser.
              </p>
            </div>
          )}
          <MultiSelectField
            label="Required documents from renters"
            value={formData.renterDocuments}
            onChange={(value) => updateField("renterDocuments", value)}
            options={[
              "Passport",
              "Driver’s licence",
              "Proof of address",
              "Credit card",
            ]}
            required
          />
          <TextAreaField
            label="Insurance details to disclose"
            value={formData.insuranceDetails}
            onChange={(value) => updateField("insuranceDetails", value)}
            placeholder="What is included, exclusions, excess amount..."
            optional
          />
          <MultiSelectField
            label="Payment methods needed"
            value={formData.paymentMethods}
            onChange={(value) => updateField("paymentMethods", value)}
            options={[
              "Visa / Mastercard",
              "Twint",
              "SEPA",
              "Cash on pickup",
              "Bank transfer",
              "Other",
            ]}
            required
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <ChoiceField
              label="How should payment be collected?"
              value={formData.chargeMethod}
              onChange={(value) => updateField("chargeMethod", value)}
              options={["Pre-authorisation", "Full charge"]}
              required
            />
            <SelectField
              label="Pricing and invoice currency"
              value={formData.currency}
              onChange={(value) => updateField("currency", value)}
              options={[
                "EUR",
                "USD",
                "GBP",
                "CHF",
                "AED",
                "MUR",
                "ZAR",
                "Other",
              ]}
              required
            />
          </div>
          {formData.chargeMethod === "Pre-authorisation" && (
            <ConditionalPanel>
              <TextField
                label="Pre-authorisation amount"
                value={formData.preAuthAmount}
                onChange={(value) => updateField("preAuthAmount", value)}
                placeholder="Example: €500"
                required
              />
            </ConditionalPanel>
          )}
        </div>
      );
    }

    if (currentStep === 4) {
      return (
        <div className="space-y-7">
          <SectionHeading
            title="Your HyRento team"
            description="Choose the main administrator now. We can configure detailed permissions together later."
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField
              label="Main system administrator"
              value={formData.adminName}
              onChange={(value) => updateField("adminName", value)}
              placeholder="Full name"
              required
            />
            <TextField
              label="Number of staff needing logins"
              value={formData.staffLogins}
              onChange={(value) => updateField("staffLogins", value)}
              placeholder="5"
              type="number"
              inputMode="numeric"
              required
            />
          </div>
          <TextAreaField
            label="Roles and permissions needed"
            value={formData.staffPermissions}
            onChange={(value) => updateField("staffPermissions", value)}
            placeholder="Example: 2 booking agents, 1 branch manager, accountant needs reports only"
            optional
            help="Skip this if you prefer to configure roles during the setup call."
          />
          <SelectField
            label="Preferred language for support"
            value={formData.supportLanguage}
            onChange={(value) => updateField("supportLanguage", value)}
            options={[
              "English",
              "German",
              "French",
              "Spanish",
              "Dutch",
              "Other",
            ]}
            required
          />

          <div className="rounded-2xl border border-brand-blue/15 bg-brand-blue-pale p-5">
            <div className="flex items-start gap-3">
              <Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" />
              <div>
                <h4 className="text-sm font-700 text-brand-navy">
                  Your 14-day trial starts after setup
                </h4>
                <p className="mt-1 text-xs leading-5 text-text-secondary">
                  No card is required. Your trial includes the full feature set
                  for the plan you are evaluating, plus a 15-minute setup call.
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="rounded-2xl border border-brand-green/15 bg-brand-green-pale p-5">
          <div className="flex gap-3">
            <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-brand-green" />
            <div>
              <h3 className="text-base font-700 text-brand-navy">
                Your onboarding details are ready
              </h3>
              <p className="mt-1 text-xs leading-5 text-text-secondary">
                Review each section below. You can return to any step before
                sending it to the HyRento setup team.
              </p>
            </div>
          </div>
        </div>

        {steps.map((step, index) => {
          const fields = reviewFieldsByStep[index].filter(
            (field) => !isEmpty(formData[field])
          );
          return (
            <div
              key={step.title}
              className="rounded-2xl border border-bg-border bg-white p-5 shadow-card-sm"
            >
              <div className="flex items-center justify-between gap-4 border-b border-bg-border pb-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-blue-pale text-brand-blue">
                    <step.icon className="h-4 w-4" />
                  </div>
                  <h3 className="text-sm font-700 text-brand-navy">
                    {step.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setCurrentStep(index);
                    goToTop();
                  }}
                  className="text-xs font-700 text-brand-blue hover:underline"
                >
                  Edit
                </button>
              </div>
              <dl className="mt-4 grid gap-3 sm:grid-cols-2">
                {fields.map((field) => {
                  const value = formData[field];
                  return (
                    <div key={field}>
                      <dt className="text-[10px] font-700 uppercase tracking-wide text-text-muted">
                        {fieldLabels[field] || field}
                      </dt>
                      <dd className="mt-1 break-words text-xs font-600 text-text-primary">
                        {Array.isArray(value)
                          ? value.join(", ") || "Not provided"
                          : value || "Not provided"}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </div>
          );
        })}

        <div className="relative hidden" aria-hidden="true">
          <label htmlFor="company-website">Company website</label>
          <input
            id="company-website"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
          />
        </div>
      </div>
    );
  };

  if (!hydrated) {
    return (
      <div className="mx-auto flex min-h-[520px] max-w-5xl items-center justify-center rounded-2xl border border-bg-border bg-white shadow-card-sm">
        <div className="flex items-center gap-3 text-sm text-text-secondary">
          <Loader2 className="h-5 w-5 animate-spin text-brand-blue" />
          Loading your onboarding form…
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div
        id="onboarding-wizard"
        className="mx-auto max-w-3xl scroll-mt-24 overflow-hidden rounded-2xl border border-brand-green/20 bg-white shadow-card-lg"
      >
        <div className="bg-brand-navy px-6 py-10 text-center sm:px-10 sm:py-12">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-green text-white shadow-btn-green">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h2 className="mt-6 text-h2-mobile font-heading font-700 text-white sm:text-h2-desktop">
            Welcome to HyRento
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-300">
            Your onboarding details have been sent successfully. A copy and
            confirmation have also been sent to {formData.contactEmail}.
          </p>
        </div>
        <div className="p-6 sm:p-8">
          <h3 className="text-sm font-700 text-brand-navy">
            What happens next
          </h3>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {[
              ["1", "We review your answers"],
              ["2", "We schedule your setup call"],
              ["3", "Your 14-day trial begins"],
            ].map(([number, label]) => (
              <div
                key={number}
                className="rounded-xl border border-bg-border bg-bg-soft p-4 text-center"
              >
                <span className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-brand-blue text-xs font-700 text-white">
                  {number}
                </span>
                <p className="mt-3 text-xs font-600 text-brand-navy">{label}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-xl bg-brand-green-pale p-4 sm:flex-row">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-brand-green" />
              <div>
                <p className="text-xs font-700 text-brand-navy">
                  Need to add something?
                </p>
                <a
                  href="mailto:hello@hyrento.com"
                  className="text-xs text-brand-green hover:underline"
                >
                  hello@hyrento.com
                </a>
              </div>
            </div>
            <button
              type="button"
              onClick={restart}
              className="text-xs font-700 text-brand-blue hover:underline"
            >
              Start another onboarding
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      id="onboarding-wizard"
      className="mx-auto grid max-w-6xl scroll-mt-24 gap-6 lg:grid-cols-[260px_minmax(0,1fr)]"
    >
      <aside className="self-start rounded-2xl bg-brand-navy p-4 text-white shadow-card-lg sm:p-5 lg:sticky lg:top-24">
        <div className="flex items-center gap-2 text-[10px] font-700 uppercase tracking-[0.16em] text-brand-blue-light">
          <Sparkles className="h-4 w-4" />
          Guided setup
        </div>
        <h2 className="mt-3 text-xl font-700 text-white lg:mt-4">
          About 10 minutes
        </h2>
        <p className="mt-1 text-xs leading-5 text-slate-300 lg:mt-2">
          Only relevant questions appear. Optional files and details can always
          be added later.
        </p>

        <ol className="mt-5 grid grid-cols-5 gap-1 lg:mt-6 lg:block lg:space-y-2">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const complete = currentStep > index;
            const active = currentStep === index;
            return (
              <li key={step.title}>
                <button
                  type="button"
                  disabled={index > currentStep && currentStep < 5}
                  onClick={() => {
                    if (index <= currentStep || currentStep === 5) {
                      setCurrentStep(index);
                      goToTop();
                    }
                  }}
                  className={cn(
                    "flex w-full flex-col items-center justify-center gap-1 rounded-xl px-1 py-2 text-center transition-colors lg:flex-row lg:justify-start lg:gap-3 lg:px-3 lg:py-2.5 lg:text-left",
                    active
                      ? "bg-white/10 text-white"
                      : "text-slate-400 hover:bg-white/5 hover:text-white",
                    index > currentStep && currentStep < 5 && "cursor-default"
                  )}
                >
                  <span
                    className={cn(
                      "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border lg:h-8 lg:w-8",
                      complete
                        ? "border-brand-green bg-brand-green text-white"
                        : active
                          ? "border-brand-blue bg-brand-blue text-white"
                          : "border-white/10 bg-white/5"
                    )}
                  >
                    {complete ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Icon className="h-4 w-4" />
                    )}
                  </span>
                  <span className="text-[9px] font-600 lg:text-xs">
                    {step.shortTitle}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        <div className="mt-6 hidden border-t border-white/10 pt-5 lg:block">
          <div className="flex items-start gap-3">
            <LifeBuoy className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />
            <div>
              <p className="text-[11px] font-700 text-white">Need help?</p>
              <a
                href="mailto:hello@hyrento.com"
                className="mt-0.5 block text-[11px] text-slate-400 hover:text-white"
              >
                hello@hyrento.com
              </a>
            </div>
          </div>
        </div>
      </aside>

      <div className="overflow-hidden rounded-2xl border border-bg-border bg-white shadow-card-md">
        <div className="border-b border-bg-border bg-bg-soft px-5 py-5 sm:px-7">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[10px] font-700 uppercase tracking-[0.16em] text-brand-blue">
                {currentStep < 5
                  ? "Step " + (currentStep + 1) + " of 5"
                  : "Review & submit"}
              </p>
              <h2 className="mt-1 text-xl font-700 text-brand-navy sm:text-2xl">
                {activeStep ? activeStep.title : "Review your answers"}
              </h2>
              <p className="mt-1 text-xs leading-5 text-text-secondary">
                {activeStep
                  ? activeStep.description
                  : completedAnswerCount + " details ready to send."}
              </p>
            </div>
            <div className="inline-flex items-center gap-2 self-start rounded-full border border-brand-green/15 bg-brand-green-pale px-3 py-1.5 text-[10px] font-700 text-brand-green-hover">
              <Save className="h-3.5 w-3.5" />
              Auto-saved
            </div>
          </div>
          <div className="mt-5 h-2 overflow-hidden rounded-full bg-bg-border">
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand-blue to-brand-green transition-all duration-500"
              style={{ width: progress + "%" }}
            />
          </div>
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (currentStep === 5) void submitOnboarding();
          }}
        >
          <div className="p-5 sm:p-7 lg:p-8">{renderStep()}</div>

          {errorMessage && (
            <div
              role="alert"
              className="mx-5 mb-5 flex gap-3 rounded-xl border border-status-error/20 bg-red-50 p-4 text-xs text-status-error sm:mx-7 lg:mx-8"
            >
              <CircleHelp className="h-4 w-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="flex flex-col-reverse gap-3 border-t border-bg-border bg-bg-soft px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <div className="flex items-center gap-3">
              {currentStep > 0 && (
                <button
                  type="button"
                  onClick={previousStep}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-bg-border bg-white px-5 py-2.5 text-xs font-700 text-brand-navy transition-colors hover:border-brand-blue/30"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>
              )}
              <button
                type="button"
                onClick={saveForLater}
                className="inline-flex min-h-11 items-center justify-center gap-2 px-2 py-2.5 text-xs font-700 text-text-secondary transition-colors hover:text-brand-blue"
              >
                <Save className="h-4 w-4" />
                Save & continue later
              </button>
            </div>

            {currentStep < 5 ? (
              <button
                type="button"
                onClick={nextStep}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand-green px-6 py-3 text-sm font-700 text-white shadow-btn-green transition-colors hover:bg-brand-green-hover"
              >
                {currentStep === 4 ? "Review answers" : "Continue"}
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand-green px-6 py-3 text-sm font-700 text-white shadow-btn-green transition-colors hover:bg-brand-green-hover disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    Submit onboarding
                    <CheckCircle2 className="h-4 w-4" />
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </div>

      {saveNotice && (
        <div
          role="status"
          className="fixed bottom-5 left-1/2 z-[70] flex -translate-x-1/2 items-center gap-2 rounded-full bg-brand-navy px-5 py-3 text-xs font-600 text-white shadow-card-lg"
        >
          <CheckCircle2 className="h-4 w-4 text-brand-green" />
          Progress saved on this device
        </div>
      )}
    </div>
  );
}
