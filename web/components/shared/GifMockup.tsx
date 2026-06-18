"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { 
  BarChart3, 
  Car, 
  Calendar, 
  FileText, 
  Users, 
  TrendingUp, 
  PlusCircle,
  DollarSign
} from "lucide-react";

interface GifMockupProps {
  src?: string;
  className?: string;
  url?: string;
}

export function GifMockup({ src, className, url = "app.carrental.digital" }: GifMockupProps) {
  return (
    <div className={cn("browser-frame bg-slate-900 border border-slate-800 shadow-card-lg relative group overflow-hidden", className)}>
      {/* Browser Top Bar */}
      <div className="browser-frame__bar bg-slate-950/80 border-b border-slate-800 flex items-center px-4 py-2 gap-2">
        <div className="flex gap-1.5 shrink-0">
          <div className="w-3 h-3 rounded-full bg-[#EF4444] opacity-80" />
          <div className="w-3 h-3 rounded-full bg-[#F59E0B] opacity-80" />
          <div className="w-3 h-3 rounded-full bg-[#10B981] opacity-80" />
        </div>
        <div className="browser-frame__url flex-1 bg-slate-900 border border-slate-800/60 rounded-md py-1 px-3 text-[11px] text-slate-400 font-mono flex items-center gap-1.5 max-w-md mx-auto">
          <span className="text-slate-600 select-none">https://</span>
          <span>{url}</span>
        </div>
        <div className="w-10" /> {/* Spacer */}
      </div>

      {/* Frame Content */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-900 text-slate-100 flex font-body select-none">
        {src ? (
          <video autoPlay loop muted playsInline className="w-full h-full object-cover">
            <source src={`${src}.webm`} type="video/webm" />
            <source src={`${src}.mp4`} type="video/mp4" />
          </video>
        ) : (
          /* Premium Simulated Dashboard Mockup */
          <div className="flex w-full h-full text-[11px]">
            {/* Sidebar */}
            <aside className="w-1/5 bg-slate-950 border-r border-slate-800 p-3 flex flex-col justify-between shrink-0">
              <div className="space-y-4">
                <div className="flex items-center gap-2 px-1">
                  <div className="w-6 h-6 bg-brand-blue rounded flex items-center justify-center">
                    <Car className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="font-heading font-700 text-white tracking-tight">CarRental</span>
                </div>
                
                <nav className="space-y-1">
                  {[
                    { icon: BarChart3, label: "Dashboard", active: true },
                    { icon: Car, label: "Fleet & Vehicles" },
                    { icon: Calendar, label: "Reservations" },
                    { icon: FileText, label: "Rental Contracts" },
                    { icon: Users, label: "Customer CRM" },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className={cn(
                        "flex items-center gap-2 px-2 py-1.5 rounded transition-all cursor-pointer",
                        item.active 
                          ? "bg-brand-blue/15 text-brand-blue-light font-600 border-l-2 border-brand-blue" 
                          : "text-slate-400 hover:bg-slate-800 hover:text-white"
                      )}
                    >
                      <item.icon className="w-3.5 h-3.5 shrink-0" />
                      <span>{item.label}</span>
                    </div>
                  ))}
                </nav>
              </div>

              <div className="p-2 bg-slate-900/50 rounded border border-slate-850">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] text-slate-400">EU-West (Staging)</span>
                </div>
              </div>
            </aside>

            {/* Main Workspace */}
            <main className="flex-1 bg-slate-900 p-4 flex flex-col gap-4 overflow-y-auto">
              {/* Top Row */}
              <header className="flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-heading font-700 text-white">System Overview</h3>
                  <p className="text-[10px] text-slate-400">Real-time status of your rental operations</p>
                </div>
                <button className="flex items-center gap-1 bg-brand-blue hover:bg-brand-blue-light text-white px-2.5 py-1 rounded-md font-600 transition-colors shadow-sm">
                  <PlusCircle className="w-3 h-3" />
                  <span>New Booking</span>
                </button>
              </header>

              {/* Stats Grid */}
              <section className="grid grid-cols-4 gap-3">
                {[
                  { label: "Active Contracts", value: "32", change: "+12% today", icon: FileText, color: "text-blue-500", bg: "bg-blue-500/10" },
                  { label: "Fleet Utilization", value: "88%", change: "+4% vs. avg", icon: Car, color: "text-emerald-500", bg: "bg-emerald-500/10" },
                  { label: "Daily Revenue", value: "€4,820", change: "+20% vs. Mon", icon: DollarSign, color: "text-amber-500", bg: "bg-amber-500/10" },
                  { label: "Pending Pickups", value: "14", change: "Next: 10 mins", icon: Calendar, color: "text-indigo-500", bg: "bg-indigo-500/10" }
                ].map((stat, idx) => (
                  <div key={idx} className="bg-slate-950 p-3 rounded-lg border border-slate-800/80 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] text-slate-400 font-500">{stat.label}</span>
                      <span className={cn("p-1 rounded", stat.bg)}>
                        <stat.icon className={cn("w-3 h-3", stat.color)} />
                      </span>
                    </div>
                    <div className="mt-1">
                      <div className="text-base font-heading font-700 text-white">{stat.value}</div>
                      <div className="text-[9px] text-slate-500 flex items-center gap-0.5 mt-0.5">
                        <TrendingUp className="w-2.5 h-2.5 text-emerald-500" />
                        <span className="text-emerald-500">{stat.change}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </section>

              {/* Middle Row - Charts & Quick Actions */}
              <section className="grid grid-cols-3 gap-3 flex-1">
                {/* Simulated Chart Card */}
                <div className="col-span-2 bg-slate-950 rounded-lg border border-slate-800 p-3 flex flex-col justify-between min-h-[120px]">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-heading font-700 text-white text-[11px]">Utilization & Revenue History</span>
                    <div className="flex gap-2">
                      <span className="px-1.5 py-0.5 bg-slate-800 rounded text-[9px] text-slate-400">Weekly</span>
                      <span className="px-1.5 py-0.5 bg-brand-blue/20 text-brand-blue-light rounded text-[9px] font-600">Monthly</span>
                    </div>
                  </div>
                  {/* CSS SVG Chart */}
                  <div className="flex-1 flex items-end gap-1.5 w-full h-16 pt-2">
                    {[35, 45, 30, 50, 70, 60, 80, 75, 95, 88, 92, 100].map((h, i) => (
                      <div key={i} className="flex-1 flex flex-col justify-end h-full">
                        <motion.div 
                          className="w-full bg-gradient-to-t from-brand-blue/40 to-brand-blue-light rounded-t-sm"
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          transition={{ duration: 0.8, delay: i * 0.03 }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between text-[9px] text-slate-500 mt-2 font-mono">
                    <span>Jan</span>
                    <span>Mar</span>
                    <span>May</span>
                    <span>Jul</span>
                    <span>Sep</span>
                    <span>Nov</span>
                  </div>
                </div>

                {/* Quick Fleet Control */}
                <div className="bg-slate-950 rounded-lg border border-slate-800 p-3 flex flex-col">
                  <div className="font-heading font-700 text-white text-[11px] mb-2">Active Vehicles Status</div>
                  <div className="space-y-2 flex-1 overflow-y-auto">
                    {[
                      { model: "Tesla Model Y", status: "On Rent", color: "bg-emerald-500/10 text-emerald-400" },
                      { model: "Audi A6", status: "Ready", color: "bg-blue-500/10 text-blue-400" },
                      { model: "BMW X5", status: "On Rent", color: "bg-emerald-500/10 text-emerald-400" },
                      { model: "Mercedes C-Class", status: "In Maintenance", color: "bg-amber-500/10 text-amber-400" }
                    ].map((car, i) => (
                      <div key={i} className="flex justify-between items-center py-1 border-b border-slate-900 last:border-0">
                        <span className="text-slate-300 font-500 truncate max-w-[80px]">{car.model}</span>
                        <span className={cn("px-1.5 py-0.5 rounded text-[8px] font-600", car.color)}>{car.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </main>
          </div>
        )}
      </div>
    </div>
  );
}
