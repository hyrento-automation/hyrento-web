"use client";

import { FileText, Download, Eye } from "lucide-react";

interface DownloadCardProps {
  title: string;
  description: string;
  languages: string[];
  fileSize: string;
  uploadDate: string;
  pdfUrl: string;
  onDownload?: () => void;
}

export function DownloadCard({
  title,
  description,
  languages,
  fileSize,
  uploadDate,
  pdfUrl,
  onDownload,
}: DownloadCardProps) {
  const handleDownload = () => {
    if (onDownload) {
      onDownload();
    }
  };

  return (
    <div className="bg-white border border-bg-border rounded-xl p-5 shadow-card-sm hover:shadow-card-md hover:border-brand-blue/20 transition-all duration-200 flex flex-col sm:flex-row gap-5 items-start group">
      {/* PDF Cover Mockup Thumbnail */}
      <div className="w-[110px] h-[146px] rounded-lg bg-slate-900 border border-slate-800 shadow-sm shrink-0 flex flex-col justify-between p-3 select-none relative overflow-hidden group-hover:shadow-md transition-shadow">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-8 h-8 bg-red-600/10 rounded-bl-full" />
        <div className="flex justify-between items-start">
          <FileText className="w-5 h-5 text-red-500" />
          <span className="text-[7px] font-mono text-slate-500 font-bold bg-slate-800 px-1 py-0.5 rounded">PDF</span>
        </div>
        <div className="space-y-1.5 z-10">
          <div className="text-[9px] font-heading font-700 text-white leading-tight tracking-tight line-clamp-3">
            {title}
          </div>
          <div className="h-0.5 w-6 bg-brand-green" />
        </div>
        <div className="text-[7px] font-body text-slate-400 font-medium">
          CarRental.digital
        </div>
      </div>

      {/* Info Block */}
      <div className="flex-1 flex flex-col justify-between h-full py-0.5">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-[10px] font-body text-text-secondary bg-bg-soft px-2 py-0.5 rounded border border-bg-border">
              {fileSize}
            </span>
            <span className="text-[10px] font-body text-text-muted">
              Updated {uploadDate}
            </span>
          </div>

          <h4 className="font-heading font-700 text-body-default text-brand-navy leading-snug mb-1">
            {title}
          </h4>
          <p className="font-body text-body-sm text-text-secondary line-clamp-2 leading-relaxed mb-3">
            {description}
          </p>
        </div>

        {/* Footer actions & Language pills */}
        <div className="flex flex-col gap-3 mt-auto">
          {/* Languages */}
          <div className="flex flex-wrap gap-1.5">
            {languages.map((lang) => (
              <span
                key={lang}
                className="text-[9px] font-heading font-700 bg-brand-blue-pale text-brand-blue px-2 py-0.5 rounded"
              >
                {lang}
              </span>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-bg-soft">
            <a
              href={pdfUrl}
              download
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 bg-brand-green hover:bg-brand-green-hover text-white text-[12px] font-heading font-600 px-3.5 py-1.5 rounded-full transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Download PDF
            </a>
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 border border-bg-border hover:bg-bg-soft text-text-secondary text-[12px] font-heading font-600 px-3.5 py-1.5 rounded-full transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              Preview
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
