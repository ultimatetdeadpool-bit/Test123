"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
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
  const [articles,   setArticles]   = useState<NewsArticle[]>([]);
  const [selected,   setSelected]   = useState<NewsArticle | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [loading,    setLoading]    = useState(true);

  const countryArticles = useMemo(() => {
    if (!selected) return [];
    return articles
      .filter(a => a.country === selected.country)
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }, [selected?.country, articles]); // eslint-disable-line react-hooks/exhaustive-deps

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

      <div className="absolute inset-0">
        <GlobeMap articles={articles} onArticleClick={setSelected} />
      </div>

      <div className="absolute top-14 left-1/2 -translate-x-1/2 z-10 text-center pointer-events-none">
        {lastUpdate && (
          <p className="text-xs text-zinc-600">
            Updated {lastUpdate.toLocaleTimeString()}
            {articles.length > 0 && ` · ${articles.length} stories`}
          </p>
        )}
      </div>

      {loading && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-zinc-700 border-t-zinc-400 rounded-full animate-spin mx-auto mb-3" />
            <p className="text-zinc-500 text-xs">Fetching world news...</p>
          </div>
        </div>
      )}

      <NewsPanel
        articles={countryArticles}
        selectedId={selected?.id ?? null}
        onClose={() => setSelected(null)}
      />

      <button
        onClick={fetchNews}
        className="absolute top-14 right-4 z-10 p-2 rounded-md
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
