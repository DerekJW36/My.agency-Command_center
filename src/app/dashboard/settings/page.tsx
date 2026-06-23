"use client";

import { useState } from "react";
import { Settings, Zap, Database, Globe, Key, Save, CheckCircle2, Bell, Shield, Cpu } from "lucide-react";

const SECTION = ({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) => (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900/20 p-6 backdrop-blur-md">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-zinc-800/60">
            <div className="h-8 w-8 rounded-lg bg-zinc-800 flex items-center justify-center border border-zinc-700">
                {icon}
            </div>
            <h2 className="text-xs font-black uppercase tracking-widest text-zinc-400">{title}</h2>
        </div>
        <div className="space-y-4">{children}</div>
    </div>
);

const Field = ({ label, placeholder, defaultValue, type = "text" }: { label: string; placeholder: string; defaultValue?: string; type?: string }) => (
    <div>
        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-2 block">{label}</label>
        <input
            type={type}
            defaultValue={defaultValue}
            placeholder={placeholder}
            className="w-full h-11 rounded-xl bg-black/50 border border-zinc-800 px-4 text-sm font-medium text-white placeholder:text-zinc-700 focus:outline-none focus:border-blue-500 transition-colors"
        />
    </div>
);

const Toggle = ({ label, description, defaultChecked = false }: { label: string; description: string; defaultChecked?: boolean }) => {
    const [on, setOn] = useState(defaultChecked);
    return (
        <div className="flex items-center justify-between gap-6">
            <div>
                <p className="text-sm font-bold text-white">{label}</p>
                <p className="text-xs text-zinc-600 mt-0.5">{description}</p>
            </div>
            <button
                onClick={() => setOn(!on)}
                className={`relative h-6 w-11 rounded-full transition-all duration-300 flex-shrink-0 ${on ? "bg-blue-600 shadow-[0_0_12px_rgba(59,130,246,0.5)]" : "bg-zinc-800"}`}
            >
                <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-md transition-all duration-300 ${on ? "left-5" : "left-0.5"}`} />
            </button>
        </div>
    );
};

export default function SettingsPage() {
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    };

    return (
        <div className="p-8 max-w-4xl">
            <header className="mb-12 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black tracking-tighter text-white uppercase flex items-center gap-3">
                        <Settings className="h-8 w-8 text-blue-500" />
                        System Config
                    </h1>
                    <p className="text-zinc-500 font-medium mt-1">Configure your neural agency core.</p>
                </div>
                <button
                    onClick={handleSave}
                    className={`flex items-center gap-2.5 h-12 px-6 rounded-xl font-bold text-sm transition-all ${saved
                        ? "bg-green-600/20 border border-green-500/40 text-green-400"
                        : "bg-blue-600 hover:bg-blue-700 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:scale-105 active:scale-95"
                        }`}
                >
                    {saved ? <CheckCircle2 className="h-4 w-4" /> : <Save className="h-4 w-4" />}
                    {saved ? "Saved!" : "Save Changes"}
                </button>
            </header>

            <div className="space-y-6">

                <SECTION title="Agency Identity" icon={<Zap className="h-4 w-4 text-blue-500" />}>
                    <Field label="Agency Name" placeholder="e.g. Ethertecsys DCG" defaultValue="Ethertecsys DCG" />
                    <Field label="Agency Domain" placeholder="e.g. ethertecsys.com" defaultValue="ethertecsys.com" />
                    <Field label="Sender Email" placeholder="e.g. hello@ethertecsys.com" defaultValue="hello@ethertecsys.com" type="email" />
                </SECTION>

                <SECTION title="Supabase Connection" icon={<Database className="h-4 w-4 text-purple-500" />}>
                    <Field label="Supabase Project URL" placeholder="https://xxxx.supabase.co" />
                    <Field label="Supabase Anon Key" placeholder="eyJ..." type="password" />
                    <div className="flex items-center gap-2 text-xs font-bold text-blue-500 mt-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
                        Connection active — managed via environment variables
                    </div>
                </SECTION>

                <SECTION title="Scraper & AI Engine" icon={<Cpu className="h-4 w-4 text-yellow-500" />}>
                    <Field label="Default Niche" placeholder="e.g. Restaurants, Cafes, Gyms" />
                    <Field label="Default Location" placeholder="e.g. Portland, Oregon" />
                    <Field label="NotebookLM Venv Path" placeholder="./notebooklm-venv" defaultValue="./notebooklm-venv" />
                    <Field label="Max Leads Per Scan" placeholder="e.g. 20" defaultValue="20" type="number" />
                </SECTION>

                <SECTION title="Outreach Settings" icon={<Globe className="h-4 w-4 text-green-500" />}>
                    <Field label="Default Demo Link" placeholder="e.g. https://your-showroom.vercel.app" />
                    <Field label="Email Signature" placeholder="— Derek | Ethertecsys DCG | hello@ethertecsys.com" defaultValue="— Derek | Ethertecsys DCG | hello@ethertecsys.com" />
                    <Toggle label="Auto-generate email on new lead" description="Automatically draft an outreach email when a lead is synced." defaultChecked />
                </SECTION>

                <SECTION title="Notifications & Alerts" icon={<Bell className="h-4 w-4 text-orange-500" />}>
                    <Toggle label="New lead alerts" description="Notify when the scraper captures a new high-potential lead." defaultChecked />
                    <Toggle label="Pipeline stage updates" description="Alert when a lead's status changes in the CRM pipeline." />
                    <Toggle label="Research complete alerts" description="Alert when Neural Intelligence finishes a deep research report." defaultChecked />
                </SECTION>

                <SECTION title="Security" icon={<Shield className="h-4 w-4 text-red-500" />}>
                    <Toggle label="Require confirmation on scraper trigger" description="Show a confirmation dialog before executing any Python scraper script." />
                    <Toggle label="Sanitize script inputs" description="Enforce strict URL validation before passing to child_process." defaultChecked />
                </SECTION>

            </div>
        </div>
    );
}
