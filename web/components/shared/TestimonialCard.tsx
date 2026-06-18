import { Star } from "lucide-react";
import Image from "next/image";

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  company: string;
  country: string;
  image?: string; // Optional image path or fallback initial
  rating?: number;
}

export function TestimonialCard({
  quote,
  name,
  role,
  company,
  country,
  image,
  rating = 5,
}: TestimonialCardProps) {
  const initial = name.charAt(0);

  return (
    <div className="bg-white border border-bg-border rounded-2xl p-6 sm:p-8 shadow-card-sm hover:shadow-card-md hover:border-brand-blue/20 transition-all duration-200 flex flex-col justify-between relative group">
      <div>
        {/* Star Rating */}
        <div className="flex gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < rating ? "text-amber-400 fill-amber-400" : "text-bg-border"
              }`}
            />
          ))}
        </div>

        {/* Quote */}
        <p className="font-body text-body-sm text-text-primary italic leading-relaxed mb-6">
          &ldquo;{quote}&rdquo;
        </p>
      </div>

      {/* Author info */}
      <div className="flex items-center gap-3 mt-auto pt-4 border-t border-bg-soft">
        {image ? (
          <Image
            src={image}
            alt={name}
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover border border-bg-border"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-brand-blue-pale text-brand-blue font-heading font-700 flex items-center justify-center text-sm">
            {initial}
          </div>
        )}
        <div>
          <h4 className="font-heading font-600 text-[13px] text-text-primary leading-tight">
            {name}
          </h4>
          <p className="font-body text-[11px] text-text-secondary mt-0.5">
            {role ? `${role}, ` : ""}{company} &bull; <span className="opacity-80">{country}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
