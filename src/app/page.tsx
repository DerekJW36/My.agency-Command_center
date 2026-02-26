"use client";

import { motion } from "framer-motion";
import ThreeScene from "@/components/ThreeScene";
import { ArrowRight, Zap } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black selection:bg-blue-500/30">
      {/* 3D Planet Scene */}
      <ThreeScene />

      {/* UI Overlay */}
      <nav className="fixed top-0 z-50 flex w-full items-center justify-between px-8 py-6 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)]" />
          <span className="text-lg font-black tracking-tighter text-white">PLANET SYNTEC</span>
        </div>
      </nav>

      <main className="relative z-10 flex min-h-screen flex-col items-center justify-end pb-32 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-center"
        >
          <h1 className="text-6xl font-black tracking-tight text-white sm:text-8xl lg:text-9xl opacity-20">
            EXPLORE
          </h1>

          <div className="mt-4 max-w-xl mx-auto">
            <p className="text-lg text-blue-200/60 font-medium tracking-widest uppercase mb-8">
              State-of-the-Art Agency Systems
            </p>

            <div className="flex flex-col items-center gap-6">
              <Link href="/dashboard" className="group flex h-14 items-center justify-center gap-3 rounded-full bg-white px-10 text-lg font-bold text-black transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                Launch Agency
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>

              <div className="flex gap-8 mt-12">
                <Stat icon={<Zap className="h-4 w-4" />} label="AI AUDIT" value="READY" />
                <Stat icon={<Zap className="h-4 w-4" />} label="CLOUD" value="SYNCED" />
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="text-blue-500 mb-1">{icon}</div>
      <p className="text-[10px] font-bold text-zinc-500 tracking-tighter">{label}</p>
      <p className="text-sm font-black text-white">{value}</p>
    </div>
  );
}


function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group flex flex-col rounded-3xl border border-zinc-200 bg-white/50 p-8 backdrop-blur-md transition-all hover:border-blue-500/50 dark:border-zinc-800 dark:bg-zinc-900/50"
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-900/20 group-hover:bg-blue-600 group-hover:text-white transition-all">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-black dark:text-white">{title}</h3>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">{description}</p>
    </motion.div>
  );
}

