import { Zap, ShieldCheck, Cloud, PhoneCall } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrustBadgesProps {
  className?: string;
}

const badges = [
  { icon: Zap, label: "100% Speed Guaranteed", desc: "Instantly loading client engines", color: "text-amber-500", bg: "bg-amber-500/10" },
  { icon: ShieldCheck, label: "Zero Errors Policy", desc: "No double bookings, guaranteed", color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { icon: Cloud, label: "100% Cloud Based", desc: "Access anywhere, EU & US servers", color: "text-blue-500", bg: "bg-blue-500/10" },
  { icon: PhoneCall, label: "24/7 Live Support", desc: "Real humans response under 3m", color: "text-indigo-500", bg: "bg-indigo-500/10" },
];

export function TrustBadges({ className }: TrustBadgesProps) {
  return (
    <div className={cn("grid grid-cols-2 md:grid-cols-4 gap-4", className)}>
      {badges.map((badge, idx) => (
        <div 
          key={idx}
          className="flex items-start gap-3 p-4 bg-white border border-bg-border rounded-xl shadow-card-sm hover:shadow-card-md hover:border-brand-blue/30 transition-all duration-200 group"
        >
          <div className={cn("p-2 rounded-lg shrink-0 transition-transform duration-300 group-hover:scale-110", badge.bg)}>
            <badge.icon className={cn("w-4 h-4", badge.color)} />
          </div>
          <div>
            <h4 className="font-heading font-600 text-[13px] text-text-primary leading-tight">
              {badge.label}
            </h4>
            <p className="font-body text-[11px] text-text-secondary mt-0.5 leading-snug">
              {badge.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
