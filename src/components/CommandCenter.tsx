"use client";

import { useState, useRef, useEffect } from "react";
import { Terminal, Play, Loader2, Crosshair, MapPin } from "lucide-react";

export function CommandCenter() {
    const [niche, setNiche] = useState("");
    const [location, setLocation] = useState("");
    const [isRunning, setIsRunning] = useState(false);
    const [logs, setLogs] = useState<string>("");
    const terminalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [logs]);

    const handleLaunch = async () => {
        if (!niche || !location || isRunning) return;

        setIsRunning(true);
        setLogs(`INITIALIZING NEURAL SCRAPER TARGETING [${niche.toUpperCase()}] IN [${location.toUpperCase()}]...\n\n`);

        try {
            const response = await fetch("/api/leads/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ niche, location }),
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
            setLogs((prev) => prev + "\n[NETWORK ERROR OR SCRIPT FAILED TO START]\n");
        } finally {
            setIsRunning(false);
        }
    };

    return (
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/30 p-6 backdrop-blur-md flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        <Terminal className="h-5 w-5" />
                    </div>
                    <div>
                        <h3 className="text-lg font-black uppercase tracking-widest text-white">Target Command Center</h3>
                        <p className="text-xs text-zinc-500 font-medium">Acquire new leads remotely</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                    <Crosshair className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500" />
                    <input
                        type="text"
                        placeholder="Niche (e.g. Plumber)"
                        value={niche}
                        onChange={(e) => setNiche(e.target.value)}
                        disabled={isRunning}
                        className="w-full h-12 bg-black/50 border border-zinc-800 rounded-xl pl-12 pr-4 text-white text-sm font-medium focus:outline-none focus:border-blue-500 transition-colors disabled:opacity-50 placeholder:text-zinc-600"
                    />
                </div>
                <div className="relative flex gap-4">
                    <div className="relative flex-1">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500" />
                        <input
                            type="text"
                            placeholder="Location (e.g. Seattle, WA)"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            disabled={isRunning}
                            className="w-full h-12 bg-black/50 border border-zinc-800 rounded-xl pl-12 pr-4 text-white text-sm font-medium focus:outline-none focus:border-blue-500 transition-colors disabled:opacity-50 placeholder:text-zinc-600"
                        />
                    </div>
                    <button
                        onClick={handleLaunch}
                        disabled={isRunning || !niche || !location}
                        className="flex h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 font-bold text-white transition-all hover:bg-blue-700 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 shadow-[0_0_20px_rgba(59,130,246,0.3)] w-1/3"
                    >
                        {isRunning ? <Loader2 className="h-5 w-5 animate-spin" /> : <Play className="h-5 w-5 fill-current" />}
                        {isRunning ? "Running" : "Launch"}
                    </button>
                </div>
            </div>

            {/* Terminal Output */}
            <div className="relative h-64 w-full rounded-2xl bg-black border border-zinc-800 overflow-hidden font-mono text-[10px] sm:text-xs">
                <div className="absolute top-0 left-0 right-0 h-8 bg-zinc-900 border-b border-zinc-800 flex items-center px-4 gap-2 z-10 shadow-sm">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                    <span className="ml-2 text-[10px] text-zinc-500 font-bold uppercase tracking-widest">stdout stream</span>
                </div>
                <div
                    ref={terminalRef}
                    className="p-4 pt-12 h-full overflow-y-auto whitespace-pre-wrap text-blue-400 font-medium"
                >
                    {logs || "System idle. Awaiting target coordinates."}
                </div>
            </div>
        </div>
    );
}
