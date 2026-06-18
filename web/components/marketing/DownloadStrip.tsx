import { FileText, Download } from "lucide-react";

const miniBrochures = [
  {
    title: "Product Overview Brochure",
    desc: "Full system overview, vehicle panels, booking widget screenshots and setup timelines.",
    pages: "8-10 Pages",
    languages: ["EN", "DE", "FR", "ES", "NL"],
    size: "2.4 MB",
    pdfUrl: "/downloads/CarRental_Product_Overview.pdf"
  },
  {
    title: "Platform Features Deep Dive",
    desc: "Complete feature module descriptions, automation timeline and payment workflows.",
    pages: "12-16 Pages",
    languages: ["EN", "DE"],
    size: "4.1 MB",
    pdfUrl: "/downloads/CarRental_Platform_Deep_Dive.pdf"
  },
  {
    title: "Pricing & Plans Guide",
    desc: "Complete pricing matrix, quarterly and annual subscription comparison tables.",
    pages: "4-6 Pages",
    languages: ["EN", "DE", "FR", "ES", "NL"],
    size: "1.8 MB",
    pdfUrl: "/downloads/CarRental_Pricing_Guide.pdf"
  }
];

export function DownloadStrip() {
  return (
    <section className="bg-bg-soft py-16 border-t border-bg-border">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heading */}
        <div className="text-center max-w-copy mx-auto mb-10">
          <h2 className="text-h3-desktop font-heading font-800 text-brand-navy">
            Download Our Brochures
          </h2>
          <p className="font-body text-body-sm text-text-secondary mt-1">
            Need offline materials to share with partners or decision makers? Take these resources.
          </p>
        </div>

        {/* Responsive Layout: Grid on desktop, horizontal scroll snap carousel on mobile */}
        <div className="flex sm:grid sm:grid-cols-3 gap-6 overflow-x-auto sm:overflow-x-visible pb-4 sm:pb-0 snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none">
          {miniBrochures.map((item, idx) => (
            <div
              key={idx}
              className="min-w-[85vw] sm:min-w-0 bg-white border border-bg-border rounded-xl p-5 shadow-card-sm hover:shadow-card-md hover:border-brand-blue/20 transition-all duration-200 snap-center flex flex-col justify-between"
            >
              <div>
                {/* Header row */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-9 h-9 bg-red-500/10 text-red-500 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-body text-text-muted bg-slate-50 border border-bg-border px-2 py-0.5 rounded">
                    {item.pages} &bull; {item.size}
                  </span>
                </div>

                {/* Content */}
                <h3 className="font-heading font-700 text-body-default text-brand-navy leading-snug mb-1">
                  {item.title}
                </h3>
                <p className="font-body text-body-sm text-text-secondary line-clamp-2 leading-relaxed mb-4">
                  {item.desc}
                </p>
              </div>

              {/* Action and Languages row */}
              <div className="space-y-4 mt-auto pt-4 border-t border-bg-soft">
                {/* Languages list */}
                <div className="flex flex-wrap gap-1">
                  {item.languages.map((lang) => (
                    <span
                      key={lang}
                      className="text-[9px] font-heading font-700 bg-brand-blue-pale text-brand-blue px-1.5 py-0.5 rounded"
                    >
                      {lang}
                    </span>
                  ))}
                </div>

                {/* Download CTA */}
                <a
                  href={item.pdfUrl}
                  download
                  className="w-full inline-flex items-center justify-center gap-1.5 bg-brand-green hover:bg-brand-green-hover text-white text-[12px] font-heading font-700 py-2.5 rounded-full transition-colors shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
