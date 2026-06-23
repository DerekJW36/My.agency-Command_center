"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Send, Terminal, Zap, Settings } from "lucide-react";


export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    return (
        <div className="flex min-h-screen bg-black text-white selection:bg-blue-500/30">
            {/* Sidebar */}
            <aside className="fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-zinc-800 bg-zinc-900/20 backdrop-blur-xl">
                <div className="flex h-20 items-center px-8 border-b border-zinc-800/50">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-[0_0_15px_#3b82f6]">
                            <Zap className="h-5 w-5 text-white fill-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-black tracking-tighter">ETHERTECSYS</h2>
                            <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-blue-500">DCG Command</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 space-y-2 p-4 pt-8">
                    <SidebarLink href="/dashboard" icon={<LayoutDashboard className="h-5 w-5" />} label="Overview" active={pathname === "/dashboard"} />
                    <SidebarLink href="/dashboard/crm" icon={<Users className="h-5 w-5" />} label="CRM / Pipeline" active={pathname === "/dashboard/crm"} />
                    <SidebarLink href="/dashboard/outreach" icon={<Send className="h-5 w-5" />} label="Outreach Hub" active={pathname === "/dashboard/outreach"} />
                    <SidebarLink href="/dashboard/analytics" icon={<Terminal className="h-5 w-5" />} label="Neural Intelligence" active={pathname === "/dashboard/analytics"} />
                </nav>

                <div className="border-t border-zinc-800/50 p-4">
                    <SidebarLink href="/dashboard/settings" icon={<Settings className="h-5 w-5" />} label="System Config" active={pathname === "/dashboard/settings"} />
                    <div className="mt-6 rounded-2xl bg-zinc-900/50 p-4 border border-zinc-800">
                        <div className="flex items-center gap-2 text-xs font-bold text-zinc-500 uppercase tracking-widest">
                            <div className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
                            Core Online
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="ml-64 flex-1 overflow-auto">
                {children}
            </main>
        </div>
    );
}

function SidebarLink({ href, icon, label, active = false }: { href: string, icon: React.ReactNode, label: string, active?: boolean }) {
    return (
        <Link
            href={href}
            className={`flex items-center gap-4 rounded-xl px-4 py-3 text-sm font-bold transition-all hover:bg-zinc-800/50 ${active
                    ? "bg-blue-600/10 text-blue-400 shadow-[inset_0_0_10px_rgba(59,130,246,0.1)]"
                    : "text-zinc-500 hover:text-white"
                }`}
        >
            {icon}
            {label}
        </Link>
    );
}
