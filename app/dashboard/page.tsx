"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Search, Home, Zap, BarChart3, Settings, LogOut } from "lucide-react";

export default function DemoDashboard() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem("token");
    if (!token) router.push("/login");
  }, [router]);

  if (!mounted) return <div className="min-h-screen bg-black" />;

  return (
    <div className="min-h-screen bg-[#000] text-zinc-400 font-sans flex flex-col md:flex-row">
      
      {/* Sleek Vertical Nav */}
      <nav className="w-full md:w-20 border-b md:border-b-0 md:border-r border-zinc-900 flex md:flex-col items-center justify-between p-4 md:py-8">
        <div className="h-10 w-10 bg-white rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.15)]">
          <div className="h-5 w-5 bg-black rounded-lg rotate-45" />
        </div>
        
        <div className="flex md:flex-col gap-8">
          <Home className="w-5 h-5 text-white" />
          <Zap className="w-5 h-5 hover:text-white transition-colors cursor-pointer" />
          <BarChart3 className="w-5 h-5 hover:text-white transition-colors cursor-pointer" />
          <Settings className="w-5 h-5 hover:text-white transition-colors cursor-pointer" />
        </div>

        <button 
          onClick={() => { localStorage.removeItem("token"); router.push("/login"); }}
          className="hover:text-red-400 transition-colors"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full">
        
        {/* Top Bar */}
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-2xl font-semibold text-white tracking-tight">Vibe Check</h1>
            <p className="text-sm text-zinc-600">Your daily stats are looking fire.</p>
          </div>
          <div className="flex gap-3">
            <div className="hidden sm:flex items-center bg-zinc-900 border border-zinc-800 rounded-full px-4 py-2">
              <Search className="w-4 h-4 mr-2 text-zinc-600" />
              <input className="bg-transparent outline-none text-xs" placeholder="Search..." />
            </div>
            <button className="bg-white text-black p-2 rounded-full hover:scale-110 transition-transform">
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          
          {/* Main Hero Card */}
          <div className="md:col-span-2 lg:col-span-3 bg-zinc-900/30 border border-zinc-800/50 rounded-[32px] p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8">
              <Zap className="w-12 h-12 text-zinc-800 group-hover:text-yellow-500/20 transition-colors" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">84%</h2>
            <p className="text-zinc-500 max-w-[200px]">System performance is optimal today.</p>
            <div className="mt-8 flex gap-2">
              <span className="px-3 py-1 bg-zinc-800 text-[10px] rounded-full text-zinc-300 font-bold tracking-widest uppercase">Active</span>
              <span className="px-3 py-1 bg-zinc-800 text-[10px] rounded-full text-zinc-300 font-bold tracking-widest uppercase">Secure</span>
            </div>
          </div>

          {/* Small Action Card */}
          <div className="bg-[#111] border border-zinc-800 rounded-[32px] p-8 flex flex-col justify-between hover:bg-zinc-900 transition-colors cursor-pointer">
            <div className="h-10 w-10 bg-zinc-800 rounded-xl" />
            <div>
              <p className="text-white font-medium">Analytics</p>
              <p className="text-xs text-zinc-600">View detailed reports</p>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-[32px] p-6 flex items-center justify-between">
            <span className="text-sm">Storage</span>
            <span className="text-white font-mono">12/50 GB</span>
          </div>

          <div className="md:col-span-2 lg:col-span-3 bg-gradient-to-r from-zinc-900/50 to-transparent border border-zinc-800/50 rounded-[32px] p-6 flex items-center gap-6 overflow-hidden">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-10 w-10 rounded-full border-2 border-black bg-zinc-800" />
              ))}
            </div>
            <p className="text-sm text-zinc-400">Team is active on <span className="text-white underline underline-offset-4 font-medium">3 projects</span></p>
          </div>

        </div>
      </main>
    </div>
  );
}