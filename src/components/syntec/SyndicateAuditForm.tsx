"use client";

import React, { useState } from 'react';

const SyndicateAuditForm = () => {
    const [businessName, setBusinessName] = useState('');
    const [industry, setIndustry] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [resultPath, setResultPath] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMsg('');

        try {
            const response = await fetch('/api/syndicate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ businessName, industry }),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus('success');
                setResultPath(data.reportPath);
            } else {
                setStatus('error');
                setErrorMsg(data.error || 'Something went wrong');
            }
        } catch (err) {
            setStatus('error');
            setErrorMsg('Failed to connect to the Syndicate Engine.');
        }
    };

    return (
        <section id="audit-form" className="py-24 bg-zinc-950 border-y border-zinc-800">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter uppercase mb-4">
                        Fire Up the <span className="text-red-600">Syndicate Engine</span>
                    </h2>
                    <p className="text-zinc-400 text-lg">
                        Input your specs below. Our AI will tear down your market and build your domination roadmap.
                    </p>
                </div>

                <div className="bg-zinc-900/50 p-8 md:p-12 rounded-3xl border border-zinc-800 backdrop-blur-sm shadow-2xl relative overflow-hidden">
                    {/* Hot Rod Accent Decorations */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 blur-3xl rounded-full"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-600/10 blur-3xl rounded-full"></div>

                    {status === 'idle' || status === 'error' ? (
                        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-zinc-500 text-sm font-bold uppercase tracking-widest pl-1">
                                        Business Name
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. Portland Power Roofing"
                                        className="w-full bg-zinc-950 border border-zinc-800 text-white p-4 rounded-xl focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all placeholder:text-zinc-700"
                                        value={businessName}
                                        onChange={(e) => setBusinessName(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-zinc-500 text-sm font-bold uppercase tracking-widest pl-1">
                                        Primary Industry
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. Roofing / Construction"
                                        className="w-full bg-zinc-950 border border-zinc-800 text-white p-4 rounded-xl focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all placeholder:text-zinc-700"
                                        value={industry}
                                        onChange={(e) => setIndustry(e.target.value)}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-red-600 hover:bg-red-700 text-white font-black text-xl py-5 rounded-xl uppercase italic tracking-widest transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(220,38,38,0.3)]"
                            >
                                Initiate AI Audit Sequence
                            </button>

                            {status === 'error' && (
                                <p className="text-red-500 text-center font-bold mt-4 animate-pulse">
                                    {errorMsg}
                                </p>
                            )}
                        </form>
                    ) : status === 'loading' ? (
                        <div className="py-20 text-center space-y-8 animate-in fade-in zoom-in duration-500">
                            <div className="w-24 h-24 border-8 border-zinc-800 border-t-red-600 rounded-full animate-spin mx-auto"></div>
                            <div className="space-y-2">
                                <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter">
                                    Analyzing Market Torque...
                                </h3>
                                <p className="text-zinc-500 max-w-sm mx-auto">
                                    Our Syndicate AI is currently scraping competitors and building your strategic roadmap. This usually takes 30-40 seconds.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="py-12 text-center space-y-8 animate-in slide-in-from-bottom duration-700">
                            <div className="w-24 h-24 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter">
                                    Audit Complete.
                                </h3>
                                <p className="text-zinc-400 max-w-md mx-auto">
                                    The Syndicate Engine has finished your domination roadmap for <strong>{businessName}</strong>.
                                </p>
                                <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <button
                                        onClick={() => setStatus('idle')}
                                        className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-4 rounded-xl transition-all"
                                    >
                                        Run New Audit
                                    </button>
                                    <a
                                        href={`/api/results?file=${encodeURIComponent(resultPath)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(22,163,74,0.3)]"
                                    >
                                        Download Strategy
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <p className="mt-8 text-center text-zinc-600 text-sm font-mono uppercase tracking-widest">
                    POWERED BY DCG SYNTEC // RESEARCH ENGINE V1.0
                </p>
            </div>
        </section>
    );
};

export default SyndicateAuditForm;
