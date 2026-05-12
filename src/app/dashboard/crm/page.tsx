"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Filter, Plus, MoreVertical, Globe, Mail, CheckCircle2, Clock, AlertCircle } from "lucide-react";

const STAGES = ["NEW", "AUDITED", "PITCHED", "DEMO SENT", "CLOSED"];

export default function CRMPage() {
    const [leads, setLeads] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("ALL");

    useEffect(() => {
        async function fetchLeads() {
            const { data, error } = await supabase
                .from("audits")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) console.error("Error fetching leads:", error);
            else setLeads(data || []);
            setLoading(false);
        }

        fetchLeads();

        const channel = supabase
            .channel("crm-updates")
            .on("postgres_changes", { event: "*", schema: "public", table: "audits" }, (payload) => {
                if (payload.eventType === "INSERT") {
                    setLeads((prev) => [payload.new, ...prev]);
                } else if (payload.eventType === "UPDATE") {
                    setLeads((prev) => prev.map(l => l.id === payload.new.id ? payload.new : l));
                } else if (payload.eventType === "DELETE") {
                    setLeads((prev) => prev.filter(l => l.id !== payload.old.id));
                }
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const updateStatus = async (id: string, newStatus: string) => {
        const { error } = await supabase
            .from("audits")
            .update({ status: newStatus })
            .eq("id", id);

        if (error) console.error("Error updating status:", error);
    };

    const filteredLeads = filter === "ALL" ? leads : leads.filter(l => l.status === filter);

    return (
        <div className="p-8">
            <header className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black tracking-tighter text-white uppercase flex items-center gap-3">
                        <Users className="h-8 w-8 text-blue-500" />
                        Lead Pipeline
                    </h1>
                    <p className="text-zinc-500 font-medium mt-1">Manage your agency's neural connections and conversion flow.</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex rounded-xl bg-zinc-900/50 p-1 border border-zinc-800">
                        {["ALL", ...STAGES].map((stage) => (
                            <button
                                key={stage}
                                onClick={() => setFilter(stage)}
                                className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all ${filter === stage ? "bg-blue-600 text-white shadow-[0_0_15px_#3b82f6]" : "text-zinc-500 hover:text-white"
                                    }`}
                            >
                                {stage}
                            </button>
                        ))}
                    </div>
                    <button className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 font-bold text-white transition-all hover:bg-blue-700 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                        <Plus className="h-6 w-6" />
                    </button>
                </div>
            </header>

            {loading ? (
                <div className="flex h-64 items-center justify-center">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent shadow-[0_0_15px_#3b82f6]" />
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    <AnimatePresence>
                        {filteredLeads.map((lead) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                key={lead.id}
                                className="group relative flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900/10 p-6 transition-all hover:border-blue-500/30 hover:bg-zinc-900/40"
                            >
                                <div className="flex items-center gap-6 flex-1">
                                    <div className={`h-12 w-12 rounded-2xl flex items-center justify-center text-blue-400 border border-zinc-800 bg-zinc-900 group-hover:bg-blue-500/10 group-hover:border-blue-500/20 transition-all ${getStatusColor(lead.status)}`}>
                                        <Globe className="h-6 w-6" />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-bold text-white truncate group-hover:text-blue-400 transition-colors uppercase tracking-tight">{lead.url}</h3>
                                        <div className="flex items-center gap-4 mt-1 text-xs text-zinc-500 font-medium">
                                            <span className="flex items-center gap-1.5 capitalize"><Clock className="h-3 w-3" /> {new Date(lead.created_at).toLocaleDateString()}</span>
                                            <span className="flex items-center gap-1.5"><Mail className="h-3 w-3" /> Outreach Initialized</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-8">
                                    <div className="flex flex-col items-end gap-1">
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">Current Status</span>
                                        <select
                                            value={lead.status || "NEW"}
                                            onChange={(e) => updateStatus(lead.id, e.target.value)}
                                            className="bg-transparent text-xs font-bold text-blue-400 focus:outline-none cursor-pointer hover:text-blue-300 transition-colors uppercase tracking-widest"
                                        >
                                            {STAGES.map(s => <option key={s} value={s} className="bg-zinc-900 text-white">{s}</option>)}
                                        </select>
                                    </div>

                                    <div className="h-10 w-px bg-zinc-800" />

                                    <div className="flex gap-2">
                                        <button className="h-10 w-10 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-500 hover:text-white hover:bg-zinc-700 transition-all border border-zinc-700/50">
                                            <Mail className="h-5 w-5" />
                                        </button>
                                        <button className="h-10 w-10 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-500 hover:text-white hover:bg-zinc-700 transition-all border border-zinc-700/50">
                                            <Globe className="h-5 w-5" />
                                        </button>
                                        <button className="h-10 w-10 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-500 hover:text-white hover:bg-zinc-700 transition-all border border-zinc-700/50">
                                            <MoreVertical className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
}

function getStatusColor(status: string) {
    switch (status) {
        case "NEW": return "text-zinc-500";
        case "AUDITED": return "text-blue-400";
        case "PITCHED": return "text-purple-400";
        case "DEMO SENT": return "text-yellow-400 animate-pulse";
        case "CLOSED": return "text-green-400 shadow-[0_0_15px_#4ade80]";
        default: return "text-zinc-500";
    }
}
