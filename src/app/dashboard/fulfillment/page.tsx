"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import {
    Briefcase, Globe, Clock, ChevronRight,
    CheckCircle2, Package, Hammer, ThumbsUp, Search, Zap
} from "lucide-react";

const FULFILLMENT_STAGES = [
    "INTAKE SENT",
    "ASSETS RECEIVED",
    "BUILD IN PROGRESS",
    "SITE APPROVED",
    "SEO HANDOFF",
    "COMPLETE",
] as const;

type FulfillmentStage = typeof FULFILLMENT_STAGES[number];

const STAGE_META: Record<FulfillmentStage, { icon: React.ReactNode; color: string; glow: string; border: string }> = {
    "INTAKE SENT": {
        icon: <ChevronRight className="h-4 w-4" />,
        color: "text-blue-400",
        glow: "shadow-[0_0_12px_rgba(59,130,246,0.3)]",
        border: "border-blue-500/30",
    },
    "ASSETS RECEIVED": {
        icon: <Package className="h-4 w-4" />,
        color: "text-purple-400",
        glow: "shadow-[0_0_12px_rgba(168,85,247,0.3)]",
        border: "border-purple-500/30",
    },
    "BUILD IN PROGRESS": {
        icon: <Hammer className="h-4 w-4" />,
        color: "text-yellow-400",
        glow: "shadow-[0_0_12px_rgba(234,179,8,0.3)]",
        border: "border-yellow-500/30",
    },
    "SITE APPROVED": {
        icon: <ThumbsUp className="h-4 w-4" />,
        color: "text-green-400",
        glow: "shadow-[0_0_12px_rgba(74,222,128,0.3)]",
        border: "border-green-500/30",
    },
    "SEO HANDOFF": {
        icon: <Search className="h-4 w-4" />,
        color: "text-orange-400",
        glow: "shadow-[0_0_12px_rgba(251,146,60,0.3)]",
        border: "border-orange-500/30",
    },
    "COMPLETE": {
        icon: <CheckCircle2 className="h-4 w-4" />,
        color: "text-emerald-400",
        glow: "shadow-[0_0_20px_rgba(52,211,153,0.4)]",
        border: "border-emerald-500/40",
    },
};

export default function FulfillmentPage() {
    const [clients, setClients] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchClients() {
            const { data, error } = await supabase
                .from("audits")
                .select("*")
                .eq("pipeline", "FULFILLMENT")
                .order("updated_at", { ascending: false });

            if (error) console.error("Error fetching fulfillment clients:", error);
            else setClients(data || []);
            setLoading(false);
        }

        fetchClients();

        const channel = supabase
            .channel("fulfillment-updates")
            .on("postgres_changes", { event: "*", schema: "public", table: "audits" }, (payload) => {
                if (payload.eventType === "INSERT" && payload.new.pipeline === "FULFILLMENT") {
                    setClients((prev) => [payload.new, ...prev]);
                } else if (payload.eventType === "UPDATE") {
                    if (payload.new.pipeline === "FULFILLMENT") {
                        setClients((prev) =>
                            prev.some(c => c.id === payload.new.id)
                                ? prev.map(c => c.id === payload.new.id ? payload.new : c)
                                : [payload.new, ...prev]
                        );
                    } else {
                        // Removed from fulfillment
                        setClients((prev) => prev.filter(c => c.id !== payload.new.id));
                    }
                } else if (payload.eventType === "DELETE") {
                    setClients((prev) => prev.filter(c => c.id !== payload.old.id));
                }
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const updateStage = async (id: string, newStage: FulfillmentStage) => {
        const { error } = await supabase
            .from("audits")
            .update({ fulfillment_stage: newStage })
            .eq("id", id);

        if (error) console.error("Error updating fulfillment stage:", error);
    };

    const getStageClients = (stage: FulfillmentStage) =>
        clients.filter(c => c.fulfillment_stage === stage);

    const totalActive = clients.filter(c => c.fulfillment_stage !== "COMPLETE").length;
    const totalComplete = clients.filter(c => c.fulfillment_stage === "COMPLETE").length;

    return (
        <div className="p-8 min-h-screen">
            {/* Header */}
            <header className="mb-10 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black tracking-tighter text-white uppercase flex items-center gap-3">
                        <Briefcase className="h-8 w-8 text-blue-500" />
                        Client Fulfillment
                    </h1>
                    <p className="text-zinc-500 font-medium mt-1">
                        Post-close delivery pipeline — from intake to launch.
                    </p>
                </div>

                <div className="flex items-center gap-6">
                    <div className="text-right">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">Active</p>
                        <p className="text-2xl font-black text-white">{totalActive}</p>
                    </div>
                    <div className="h-10 w-px bg-zinc-800" />
                    <div className="text-right">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">Complete</p>
                        <p className="text-2xl font-black text-emerald-400">{totalComplete}</p>
                    </div>
                    <div className="flex items-center gap-2 ml-4 px-4 py-2 rounded-xl bg-zinc-900/50 border border-zinc-800 text-[10px] font-black uppercase tracking-widest text-blue-500">
                        <div className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
                        Live
                    </div>
                </div>
            </header>

            {loading ? (
                <div className="flex h-64 items-center justify-center">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent shadow-[0_0_15px_#3b82f6]" />
                </div>
            ) : (
                <div className="grid grid-cols-6 gap-4 min-h-[600px]">
                    {FULFILLMENT_STAGES.map((stage) => {
                        const meta = STAGE_META[stage];
                        const stageClients = getStageClients(stage);
                        const isComplete = stage === "COMPLETE";

                        return (
                            <div key={stage} className="flex flex-col gap-3">
                                {/* Column header */}
                                <div className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border bg-zinc-900/30 ${meta.border}`}>
                                    <span className={meta.color}>{meta.icon}</span>
                                    <div className="flex-1 min-w-0">
                                        <p className={`text-[9px] font-black uppercase tracking-[0.15em] leading-tight ${meta.color}`}>
                                            {stage}
                                        </p>
                                    </div>
                                    <span className={`text-xs font-black ${meta.color}`}>{stageClients.length}</span>
                                </div>

                                {/* Cards */}
                                <div className="flex flex-col gap-2 flex-1">
                                    <AnimatePresence>
                                        {stageClients.map((client) => (
                                            <motion.div
                                                key={client.id}
                                                layout
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                className={`rounded-2xl border bg-zinc-900/20 p-4 transition-all hover:bg-zinc-900/50 group ${
                                                    isComplete
                                                        ? "border-emerald-500/20 bg-emerald-500/5"
                                                        : "border-zinc-800 hover:border-zinc-700"
                                                }`}
                                            >
                                                {/* Domain */}
                                                <div className="flex items-center gap-2 mb-3">
                                                    <div className={`h-7 w-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                                        isComplete
                                                            ? "bg-emerald-500/10 text-emerald-400"
                                                            : "bg-zinc-800 text-zinc-400 group-hover:bg-blue-500/10 group-hover:text-blue-400"
                                                    } transition-all`}>
                                                        {isComplete ? <CheckCircle2 className="h-4 w-4" /> : <Globe className="h-4 w-4" />}
                                                    </div>
                                                    <p className="text-xs font-bold text-white truncate group-hover:text-blue-400 transition-colors leading-tight">
                                                        {client.url?.replace(/^https?:\/\//, "").replace(/\/$/, "") || client.url}
                                                    </p>
                                                </div>

                                                {/* Score badge + date */}
                                                <div className="flex items-center justify-between mb-3">
                                                    {client.digital_presence_score !== undefined ? (
                                                        <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border ${
                                                            client.digital_presence_score >= 70
                                                                ? "text-green-400 bg-green-500/10 border-green-500/20"
                                                                : client.digital_presence_score >= 40
                                                                ? "text-yellow-400 bg-yellow-500/10 border-yellow-500/20"
                                                                : "text-red-400 bg-red-500/10 border-red-500/20"
                                                        }`}>
                                                            {client.digital_presence_score}pts
                                                        </span>
                                                    ) : <span />}
                                                    <span className="text-[9px] text-zinc-600 flex items-center gap-1">
                                                        <Clock className="h-2.5 w-2.5" />
                                                        {new Date(client.updated_at || client.created_at).toLocaleDateString()}
                                                    </span>
                                                </div>

                                                {/* Stage mover */}
                                                <select
                                                    value={client.fulfillment_stage || "INTAKE SENT"}
                                                    onChange={(e) => updateStage(client.id, e.target.value as FulfillmentStage)}
                                                    className={`w-full text-[9px] font-black uppercase tracking-widest bg-zinc-800/80 border border-zinc-700/50 rounded-lg px-2 py-1.5 focus:outline-none cursor-pointer transition-all hover:border-zinc-600 ${meta.color}`}
                                                >
                                                    {FULFILLMENT_STAGES.map(s => (
                                                        <option key={s} value={s} className="bg-zinc-900 text-white">{s}</option>
                                                    ))}
                                                </select>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>

                                    {/* Empty slot */}
                                    {stageClients.length === 0 && (
                                        <div className="flex-1 rounded-2xl border border-dashed border-zinc-800/60 flex items-center justify-center py-8">
                                            <p className="text-[9px] font-black uppercase tracking-widest text-zinc-700">Empty</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Empty state — no clients at all */}
            {!loading && clients.length === 0 && (
                <div className="mt-16 flex flex-col items-center justify-center text-center gap-4">
                    <div className="h-16 w-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                        <Zap className="h-8 w-8 text-zinc-700" />
                    </div>
                    <div>
                        <p className="text-sm font-black uppercase tracking-widest text-zinc-500">No Clients Yet</p>
                        <p className="text-xs text-zinc-700 mt-1">Close a deal in the CRM to auto-trigger the fulfillment pipeline.</p>
                    </div>
                </div>
            )}
        </div>
    );
}
