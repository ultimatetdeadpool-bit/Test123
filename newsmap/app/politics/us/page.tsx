"use client";

import dynamic from "next/dynamic";

const USMapCanvas = dynamic(() => import("@/components/political/USMapCanvas"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-zinc-950">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-zinc-700 border-t-zinc-400 rounded-full animate-spin mx-auto mb-3" />
        <p className="text-zinc-500 text-xs">Loading US political map…</p>
      </div>
    </div>
  ),
});

export default function USPoliticsPage() {
  return (
    <main className="relative w-full h-screen bg-zinc-950 overflow-hidden">
      <USMapCanvas />
    </main>
  );
}
