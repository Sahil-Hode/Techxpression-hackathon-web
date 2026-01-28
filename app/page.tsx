"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Github } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#000] text-zinc-200 flex flex-col items-center selection:bg-white/20">
      
      {/* Navigation */}
      <nav className="w-full max-w-7xl flex justify-between items-center p-8 z-20">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 bg-white rounded-lg rotate-45" />
          <span className="font-bold tracking-tighter text-white">SPACE</span>
        </div>
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link href="/login" className="hover:text-white transition-colors">Sign In</Link>
          <Link 
            href="/register" 
            className="bg-white text-black px-5 py-2 rounded-full hover:bg-zinc-200 transition-all active:scale-95"
          >
            Join
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center relative px-6 text-center">
        
        {/* Ambient background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="z-10 space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Now Live v1.0
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white max-w-2xl mx-auto">
            Design for the <br /> 
            <span className="text-zinc-500">next generation.</span>
          </h1>

          <p className="max-w-[460px] mx-auto text-zinc-500 text-lg leading-relaxed">
            A minimalist starting point for your next big idea. 
            Built with speed, aesthetics, and pure vibes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link 
              href="/register" 
              className="group w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold transition-all hover:pr-10 active:scale-95"
            >
              Get Started
              <ArrowRight className="w-4 h-4 transition-all group-hover:translate-x-1" />
            </Link>
            
            <a 
              href="https://github.com" 
              target="_blank"
              className="w-full sm:w-auto flex items-center justify-center gap-2 border border-zinc-800 px-8 py-4 rounded-full font-bold hover:bg-zinc-900 transition-all"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full p-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-zinc-600 font-bold">
        <p>© 2026 SPACE STUDIOS</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
        </div>
      </footer>
    </div>
  );
}