"use client";

import { useEffect, useState, useRef } from "react";
import { Terminal, Cpu, Zap, Shield, Activity, Search, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function AnalyticsPage() {
    const [leads, setLeads] = useState<any[]>([]);
    const [selectedUrl, setSelectedUrl] = useState("");
    const [isRunning, setIsRunning] = useState(false);
    const [logs, setLogs] = useState<string>("");
    const terminalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        async function fetchLeads() {
            const { data } = await supabase
                .from("audits")
                .select("url")
                .order("created_at", { ascending: false });
            if (data) setLeads(data);
        }
        fetchLeads();
    }, []);

    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [logs]);

    const handleDeepResearch = async () => {
        if (!selectedUrl || isRunning) return;

        setIsRunning(true);
        setLogs(`INITIALIZING DEEP RESEARCH TARGETING [${selectedUrl.toUpperCase()}]...\n\n`);

        try {
            const response = await fetch("/api/neural", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url: selectedUrl }),
            });

            if (!response.body) throw new Error("No response body");

            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                const text = decoder.decode(value);
                setLogs((prev) => prev + text);
            }
        } catch (error) {
            setLogs((prev) => prev + "\n[NETWORK ERROR OR SERVER UNAVAILABLE]\n");
        } finally {
            setIsRunning(false);
        }
    };

    return (
        <div className="p-8">
            <header className="mb-12">
                <h1 className="text-3xl font-black tracking-tighter text-white uppercase flex items-center gap-3">
                    <Terminal className="h-8 w-8 text-blue-500" />
                    Neural Intelligence
                </h1>
                <p className="text-zinc-500 font-medium mt-1">Deep analysis via NotebookLM architecture.</p>
            </header>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-8">
                <DataCard label="Processing Engine" value="NotebookLM" icon={<Cpu className="h-5 w-5 text-blue-500" />} />
                <DataCard label="Neural Latency" value="Active" icon={<Zap className="h-5 w-5 text-yellow-500" />} />
                <DataCard label="AI Compliance" value="Verified" icon={<Shield className="h-5 w-5 text-green-500" />} />
            </div>

            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/30 p-6 backdrop-blur-md">
                <div className="flex flex-col md:flex-row gap-4 items-end">
                    <div className="flex-1 w-full">
                        <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2 block">Select Target Domain</label>
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500" />
                            <select
                                value={selectedUrl}
                                onChange={(e) => setSelectedUrl(e.target.value)}
                                disabled={isRunning}
                                className="w-full h-12 bg-black/50 border border-zinc-800 rounded-xl pl-12 pr-4 text-white text-sm font-medium focus:outline-none focus:border-blue-500 transition-colors disabled:opacity-50 appearance-none cursor-pointer"
                            >
                                <option value="" disabled className="text-zinc-500">Select an audited lead from your CRM pipeline...</option>
                                {leads.map((lead, idx) => (
                                    <option key={idx} value={lead.url}>{lead.url}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <button
                        onClick={handleDeepResearch}
                        disabled={isRunning || !selectedUrl}
                        className="flex h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 font-bold text-white transition-all hover:bg-blue-700 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 shadow-[0_0_20px_rgba(59,130,246,0.3)] w-full md:w-auto"
                    >
                        {isRunning ? <Loader2 className="h-5 w-5 animate-spin" /> : <Activity className="h-5 w-5" />}
                        {isRunning ? "Processing..." : "Commence Deep Research"}
                    </button>
                </div>

                <div className="mt-8 relative h-[500px] w-full rounded-2xl bg-black border border-zinc-800 overflow-hidden font-mono text-[10px] sm:text-sm">
                    <div className="absolute top-0 left-0 right-0 h-8 bg-zinc-900 border-b border-zinc-800 flex items-center px-4 gap-2 z-10 shadow-sm">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                        <span className="ml-2 text-[10px] text-zinc-500 font-bold uppercase tracking-widest">notebooklm diagnostic stream</span>
                    </div>
                    <div
                        ref={terminalRef}
                        className="p-6 pt-12 h-full overflow-y-auto whitespace-pre-wrap text-blue-400 font-medium leading-relaxed pb-12"
                    >
                        {logs || "System idle. Awaiting neural synchronization."}
                    </div>
                </div>
            </div>
        </div>
    );
}

function DataCard({ label, value, icon }: { label: string, value: string, icon: React.ReactNode }) {
    return (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/20 p-6">
            <div className="flex items-center gap-3 mb-4">
                <div className="h-8 w-8 rounded-lg bg-zinc-800 flex items-center justify-center border border-zinc-700">
                    {icon}
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{label}</span>
            </div>
            <div className="text-3xl font-black text-white">{value}</div>
        </div>
    );
}
