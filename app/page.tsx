"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import NewsPanel from "@/components/NewsPanel";
import type { NewsArticle } from "@/lib/types";

const GlobeMap = dynamic(() => import("@/components/GlobeMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-black">
      <div className="text-zinc-500 text-sm animate-pulse">Loading globe...</div>
    </div>
  ),
});

const REFRESH_INTERVAL = 5 * 60 * 1000;

export default function Home() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [selected, setSelected] = useState<NewsArticle | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchNews = useCallback(async () => {
    try {
      const res = await fetch("/api/news");
      const data = await res.json();
      setArticles(data.articles ?? []);
      setLastUpdate(new Date());
    } catch (err) {
      console.error("Failed to fetch news:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNews();
    const interval = setInterval(fetchNews, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchNews]);

  return (
    <main className="relative w-full h-screen bg-black overflow-hidden">

      {/* Globe fills the whole screen — must be behind everything, no pointer-events wrappers */}
      <div className="absolute inset-0">
        <GlobeMap articles={articles} onArticleClick={setSelected} />
      </div>

      {/* Header — pointer-events-none so the globe still receives events underneath */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 text-center pointer-events-none">
        <h1 className="text-sm font-semibold text-zinc-300 tracking-widest uppercase">
          Global News Map
        </h1>
        {lastUpdate && (
          <p className="text-xs text-zinc-600 mt-0.5">
            Updated {lastUpdate.toLocaleTimeString()}
            {articles.length > 0 && ` · ${articles.length} stories`}
          </p>
        )}
      </div>

      {/* Loading overlay */}
      {loading && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-zinc-700 border-t-zinc-400 rounded-full animate-spin mx-auto mb-3" />
            <p className="text-zinc-500 text-xs">Fetching world news...</p>
          </div>
        </div>
      )}

      {/* News panel — absolutely positioned on the right, handles its own pointer events */}
      <NewsPanel article={selected} onClose={() => setSelected(null)} />

      {/* Refresh button */}
      <button
        onClick={fetchNews}
        className="absolute top-4 right-4 z-10 p-2 rounded-md
          bg-zinc-900/80 border border-zinc-700 text-zinc-400
          hover:text-zinc-200 hover:border-zinc-500 transition-all backdrop-blur-sm"
        title="Refresh news"
        aria-label="Refresh news"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </button>

    </main>
  );
}
