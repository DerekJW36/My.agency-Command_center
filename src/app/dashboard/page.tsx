"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Globe, Shield, BarChart3, Clock, Zap, Cpu, Mail } from "lucide-react";

export default function Dashboard() {
  const [audits, setAudits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activity, setActivity] = useState<string[]>(["Initializing Neural Engines...", "Syncing with Cloud Registry..."]);

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
    <div className="min-h-screen bg-black p-8 text-white selection:bg-blue-500/30">
      <header className="mb-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tighter text-white">SYSTEM CORE</h1>
          <p className="text-zinc-500">State-of-the-Art Agency Nerve Center.</p>
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

          <button className="flex h-12 items-center gap-2 rounded-xl bg-blue-600 px-6 font-bold text-white transition-all hover:bg-blue-700 hover:scale-105 active:scale-95">
            <Zap className="h-4 w-4" />
            Live Scan
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* Sidebar / Stats */}
        <div className="space-y-6 lg:col-span-1">
          <StatBox label="Total Scanned" value={audits.length.toString()} icon={<Globe className="h-5 w-5 text-blue-500" />} />
          <StatBox label="High Potential" value={audits.filter(a => !a.seo?.has_description).length.toString()} icon={<Cpu className="h-5 w-5 text-purple-500" />} />

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/30 p-6">
            <h3 className="text-sm font-black uppercase tracking-widest text-zinc-500">Active Agents</h3>
            <div className="mt-4 space-y-4">
              <AgentStatus name="HunterAgent" status="Observing" />
              <AgentStatus name="AuditorAgent" status="Analyzing" color="text-blue-400" />
              <AgentStatus name="CloserAgent" status="Drafting" color="text-purple-400" />
            </div>
          </div>
        </div>

        {/* Lead Grid */}
        <div className="lg:col-span-3">
          {loading ? (
            <div className="flex h-64 items-center justify-center">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <AnimatePresence>
                {audits.map((audit) => (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    key={audit.id}
                    className="group rounded-3xl border border-zinc-800 bg-zinc-900/20 p-6 transition-all hover:border-blue-500/50 hover:bg-zinc-900/40"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                        <Globe className="h-5 w-5" />
                      </div>
                      <div className="flex gap-2">
                        <button className="h-8 w-8 rounded-lg bg-zinc-800 p-2 text-zinc-400 hover:text-white transition-colors">
                          <Mail className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <h3 className="truncate text-xl font-bold text-white">{audit.url}</h3>
                    <p className="mt-1 text-xs text-zinc-500">{audit.seo?.title || "No Title Meta"}</p>

                    <div className="mt-6 flex flex-wrap gap-4">
                      <Indicator label="SEO" status={audit.seo?.has_description ? "OPTIMIZED" : "ERROR"} active={!audit.seo?.has_description} />
                      <Indicator label="3D" status={audit.ux_wow_factor?.has_3d_canvas ? "DETECTION" : "MISSING"} active={!audit.ux_wow_factor?.has_3d_canvas} />
                    </div>

                    <div className="mt-6 flex items-center gap-2 border-t border-zinc-800 pt-4 text-[10px] text-zinc-500">
                      <Clock className="h-3 w-3" />
                      {new Date(audit.created_at).toLocaleString()}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
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
