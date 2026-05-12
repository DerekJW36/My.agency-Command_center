"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Globe, Download, Eye, Mail, X, ExternalLink, Sparkles } from "lucide-react";

export default function OutreachHub() {
    const [leads, setLeads] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedLead, setSelectedLead] = useState<any>(null);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

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
    }, []);

    const getEmailBody = (lead: any) => {
        const demoLink = lead.demo_link || "https://planetsyntec.com/demo";
        return `Hi ${lead.url} Team,

I've built a custom 3D interactive concept for your site. No templates — it's designed specifically around your brand.

Preview it here: ${demoLink}

Most sites in your space are still running flat, static layouts. This puts you ahead instantly.

Happy to walk you through it — just reply to this email.

Best,
Planet Syntec Team`;
    };

    const downloadEml = (lead: any) => {
        const subject = `A custom 3D website concept for ${lead.url}`;
        const body = getEmailBody(lead);
        const emlContent = `Subject: ${subject}\nTo: info@${lead.url}\nContent-Type: text/plain; charset=UTF-8\n\n${body}`;
        const blob = new Blob([emlContent], { type: "message/rfc822" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${lead.url.replace(/\./g, "_")}_outreach.eml`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };


    return (
        <div className="p-8">
            <header className="mb-12">
                <h1 className="text-3xl font-black tracking-tighter text-white uppercase flex items-center gap-3">
                    <Send className="h-8 w-8 text-blue-500" />
                    Outreach Hub
                </h1>
                <p className="text-zinc-500 font-medium mt-1">Review prototypes and deploy multi-channel campaigns.</p>
            </header>

            {loading ? (
                <div className="flex h-64 items-center justify-center">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent shadow-[0_0_15px_#3b82f6]" />
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {leads.map((lead) => (
                        <motion.div
                            layout
                            key={lead.id}
                            className="group rounded-3xl border border-zinc-800 bg-zinc-900/10 p-6 hover:border-blue-500/30 transition-all flex flex-col gap-6"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
                                        <Globe className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white uppercase tracking-tight">{lead.url}</h3>
                                        <p className="text-[10px] font-black text-zinc-600 tracking-widest uppercase">Target Domain</p>
                                    </div>
                                </div>
                                <div className="rounded-full bg-blue-500/10 px-3 py-1 text-[10px] font-bold text-blue-500 border border-blue-500/20 uppercase tracking-widest">
                                    {lead.status || "NEW"}
                                </div>
                            </div>

                            <div className="rounded-2xl border border-zinc-800 bg-black/40 p-4 font-mono text-xs text-zinc-400 line-clamp-4 leading-relaxed whitespace-pre-wrap">
                                {getEmailBody(lead)}
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => {
                                        setSelectedLead(lead);
                                        setIsPreviewOpen(true);
                                    }}
                                    className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-zinc-800 px-4 py-3 text-sm font-bold text-white hover:bg-zinc-700 transition-all border border-zinc-700/50"
                                >
                                    <Eye className="h-4 w-4" />
                                    Preview
                                </button>
                                <button
                                    onClick={() => downloadEml(lead)}
                                    className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white hover:bg-blue-700 transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)] border border-blue-500/50"
                                >
                                    <Download className="h-4 w-4" />
                                    Download
                                </button>
                                <button className="flex items-center justify-center h-11 w-11 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white transition-all border border-zinc-700/50">
                                    <Mail className="h-5 w-5" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Preview Modal */}
            <AnimatePresence>
                {isPreviewOpen && selectedLead && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-8 bg-black/80 backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="relative w-full max-w-6xl h-full flex flex-col rounded-3xl border border-zinc-800 bg-zinc-900 shadow-2xl overflow-hidden"
                        >
                            <div className="flex h-16 items-center justify-between px-6 border-b border-zinc-800 bg-zinc-900/50">
                                <div className="flex items-center gap-4">
                                    <Globe className="h-5 w-5 text-blue-400" />
                                    <span className="font-bold text-white uppercase tracking-widest text-xs">{selectedLead.url} — CONCEPT PREVIEW</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <a
                                        href={selectedLead.demo_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-white transition-colors"
                                    >
                                        Open in Tab <ExternalLink className="h-4 w-4" />
                                    </a>
                                    <button
                                        onClick={() => setIsPreviewOpen(false)}
                                        className="h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>

                            <div className="flex-1 bg-white">
                                <iframe
                                    src={selectedLead.demo_link}
                                    className="w-full h-full border-none"
                                    title="Website Preview"
                                />
                            </div>

                            <div className="h-20 bg-zinc-900 border-t border-zinc-800 px-6 flex items-center justify-between">
                                <div className="flex items-center gap-2 text-xs font-bold text-zinc-500">
                                    <Sparkles className="h-4 w-4 text-blue-500" />
                                    NEURAL RENDER ENGINE ACTIVE
                                </div>
                                <button
                                    onClick={() => downloadEml(selectedLead)}
                                    className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 h-12 text-sm font-bold text-white hover:bg-blue-700 shadow-[0_0_15px_#3b82f6]"
                                >
                                    <Download className="h-4 w-4" /> Download Outreach Email
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
