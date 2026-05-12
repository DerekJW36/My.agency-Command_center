"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Globe, Shield, BarChart3, Clock, Zap, Cpu, Mail } from "lucide-react";
import { CommandCenter } from "@/components/CommandCenter";

export default function Dashboard() {
  const [audits, setAudits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activity, setActivity] = useState<string[]>(["Initializing Neural Engines...", "Syncing with Cloud Registry..."]);

  const handleSync = async () => {
    setActivity((prev) => ["Accessing local scraper nodes...", ...prev]);
    try {
      const response = await fetch("/api/leads/sync", { method: "POST" });
      const data = await response.json();
      setActivity((prev) => [`Successfully synced ${data.totalSynced} neural leads`, ...prev].slice(0, 5));
    } catch (error) {
      console.error("Sync error:", error);
      setActivity((prev) => ["Sync operation failed. Connection unstable.", ...prev]);
    }
  };

  useEffect(() => {
    async function fetchAudits() {
      const { data, error } = await supabase
        .from("audits")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) console.error("Error fetching audits:", error);
      else setAudits(data || []);
      setLoading(false);
    }

    fetchAudits();

    const channel = supabase
      .channel("audit-updates")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "audits" }, (payload) => {
        setAudits((prev) => [payload.new, ...prev]);
        setActivity((prev) => [`New Lead detected: ${payload.new.url}`, ...prev].slice(0, 5));
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="p-8">
      <header className="mb-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tighter text-white uppercase flex items-center gap-3">
            <Cpu className="h-8 w-8 text-blue-500" />
            Intelligence Matrix
          </h1>
          <p className="text-zinc-500 font-medium mt-1">Real-time neural monitoring of agency operations.</p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="rounded-2xl bg-zinc-900/50 p-4 border border-zinc-800 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 animate-pulse rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6]" />
              <div className="text-xs font-bold uppercase tracking-widest text-zinc-500">Neural Activity</div>
            </div>
            <div className="mt-2 text-sm font-mono text-blue-400">
              {activity[0] || "Monitoring..."}
            </div>
          </div>

          <button
            onClick={handleSync}
            className="flex h-12 items-center gap-2 rounded-xl bg-blue-600 px-6 font-bold text-white transition-all hover:bg-blue-700 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(59,130,246,0.3)]"
          >
            <Zap className="h-4 w-4" />
            Sync Results
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* Sidebar / Stats */}
        <div className="space-y-6 lg:col-span-1">
          <StatBox label="Total Scanned" value={audits.length.toString()} icon={<Globe className="h-5 w-5 text-blue-500" />} />
          <StatBox label="High Potential" value={audits.filter(a => !a.seo?.has_description).length.toString()} icon={<Cpu className="h-5 w-5 text-purple-500" />} />

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/10 p-6 backdrop-blur-md">
            <h3 className="text-sm font-black uppercase tracking-widest text-zinc-500">Node Status</h3>
            <div className="mt-4 space-y-4">
              <AgentStatus name="ScraperLink" status="Operational" />
              <AgentStatus name="PitchEngine" status="Deep Learning" color="text-blue-400" />
              <AgentStatus name="CrmSync" status="Awaiting Hook" color="text-yellow-400" />
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="space-y-8 lg:col-span-3">
          <CommandCenter />

          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold uppercase tracking-widest text-zinc-500">Recent Audits</h2>
            </div>

            {loading ? (
              <div className="flex h-64 items-center justify-center">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent shadow-[0_0_15px_#3b82f6]" />
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <AnimatePresence>
                  {audits.map((audit) => (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      key={audit.id}
                      className="group relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/20 p-6 transition-all hover:border-blue-500/50 hover:bg-zinc-900/40"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                      <div className="relative mb-4 flex items-center justify-between">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                          <Globe className="h-5 w-5" />
                        </div>
                        <div className="flex gap-2">
                          <button className="h-8 w-8 rounded-lg bg-zinc-800 p-2 text-zinc-400 hover:text-white transition-colors border border-zinc-700">
                            <Mail className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      <h3 className="relative truncate text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{audit.url}</h3>
                      <p className="relative mt-1 text-xs text-zinc-500 font-medium">{audit.seo?.title || "UNIDENTIFIED SOURCE"}</p>

                      <div className="relative mt-6 flex flex-wrap gap-4">
                        <Indicator label="SEO" status={audit.seo?.has_description ? "OPTIMIZED" : "ERROR"} active={!audit.seo?.has_description} />
                        <Indicator label="UX" status={audit.ux_wow_factor?.has_3d_canvas ? "3D READY" : "LEGACY"} active={!audit.ux_wow_factor?.has_3d_canvas} />
                      </div>

                      <div className="relative mt-6 flex items-center justify-between border-t border-zinc-800/50 pt-4 text-[10px] uppercase font-bold tracking-widest text-zinc-600">
                        <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3" />
                          {new Date(audit.created_at).toLocaleDateString()}
                        </div>
                        <div className="rounded-full bg-blue-500/10 px-2 py-1 text-blue-500 border border-blue-500/20">
                          Active
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatBox({ label, value, icon }: { label: string, value: string, icon: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900/30 p-6">
      <div className="flex items-center justify-between">
        <span className="text-xs font-black uppercase tracking-widest text-zinc-500">{label}</span>
        {icon}
      </div>
      <div className="mt-4 text-4xl font-black">{value}</div>
    </div>
  );
}

function AgentStatus({ name, status, color = "text-green-400" }: { name: string, status: string, color?: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-zinc-300">{name}</span>
      <span className={`text-[10px] font-bold uppercase ${color}`}>{status}</span>
    </div>
  );
}

function Indicator({ label, status, active }: { label: string, status: string, active: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`h-1.5 w-1.5 rounded-full ${active ? "bg-red-500 animate-pulse shadow-[0_0_8px_#ef4444]" : "bg-blue-500"}`} />
      <span className="text-[10px] font-bold tracking-widest text-zinc-400">{label}: {status}</span>
    </div>
  );
}
