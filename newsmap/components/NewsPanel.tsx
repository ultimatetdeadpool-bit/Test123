"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { NewsArticle } from "@/lib/types";

const CATEGORY_COLORS: Record<string, string> = {
  conflict:    "#ef4444",
  politics:    "#3b82f6",
  economy:     "#f59e0b",
  environment: "#22c55e",
  health:      "#a855f7",
  technology:  "#06b6d4",
  general:     "#e2e8f0",
};

interface NewsPanelProps {
  articles: NewsArticle[];
  selectedId: string | null;
  onClose: () => void;
  title?: string;
}

export default function NewsPanel({ articles, selectedId, onClose, title }: NewsPanelProps) {
  const country  = title ?? articles[0]?.country ?? null;
  const isOpen   = articles.length > 0 || !!title;
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Escape key to close
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  // Scroll to the highlighted article whenever it changes
  useEffect(() => {
    if (!selectedId) return;
    const el = itemRefs.current[selectedId];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [selectedId]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key={title ?? country}
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 28, stiffness: 280 }}
          className="fixed top-12 right-0 h-[calc(100vh-3rem)] w-80 z-20 flex flex-col
            bg-zinc-950/95 border-l border-zinc-800 backdrop-blur-md"
        >
          {/* Header */}
          <div className="flex-shrink-0 flex items-center justify-between px-4 py-3 border-b border-zinc-800">
            <div>
              <p className="text-sm font-semibold text-zinc-100">{country}</p>
              <p className="text-xs text-zinc-500 mt-0.5">{articles.length} article{articles.length !== 1 ? "s" : ""}</p>
            </div>
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 text-zinc-500 hover:text-zinc-100 transition-colors
                px-2 py-1 rounded hover:bg-zinc-800 text-[11px] font-medium"
              aria-label="Close panel"
            >
              <X size={13} />
              <span>ESC</span>
            </button>
          </div>

          {/* Scrollable article list */}
          <div className="flex-1 overflow-y-auto">
            {articles.length === 0 && (
              <div className="flex flex-col items-center justify-center h-40 gap-2 text-zinc-600">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v8a2 2 0 01-2 2z" />
                </svg>
                <p className="text-xs">No articles found</p>
              </div>
            )}
            {articles.map((article) => {
              const isSelected = article.id === selectedId;
              const color = CATEGORY_COLORS[article.category] ?? "#e2e8f0";

              return (
                <div
                  key={article.id}
                  ref={el => { itemRefs.current[article.id] = el; }}
                  className={`px-4 py-3 border-b border-zinc-800/60 transition-colors
                    ${isSelected ? "bg-zinc-800/50" : "hover:bg-zinc-900/40"}`}
                >
                  {/* Category + date row */}
                  <div className="flex items-center gap-2 mb-1.5">
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: color, boxShadow: isSelected ? `0 0 6px ${color}` : undefined }}
                    />
                    <span className="text-xs text-zinc-500 capitalize">{article.category}</span>
                    <span className="text-xs text-zinc-600 ml-auto">
                      {new Date(article.publishedAt).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                    </span>
                  </div>

                  {/* Title */}
                  <p className={`text-xs leading-snug ${isSelected ? "text-zinc-100 font-medium" : "text-zinc-300"}`}>
                    {article.title}
                  </p>

                  {/* Expanded detail for the selected article */}
                  {isSelected && (
                    <div className="mt-2 flex flex-col gap-2">
                      {article.description && article.description !== article.title && (
                        <p className="text-xs text-zinc-400 leading-relaxed">{article.description}</p>
                      )}
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-center py-2 px-3 rounded text-xs font-medium
                          bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-zinc-500
                          text-zinc-200 transition-all"
                      >
                        Read full article →
                      </a>
                    </div>
                  )}

                  {/* Link for non-selected articles */}
                  {!isSelected && (
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1.5 inline-block text-xs text-zinc-600 hover:text-zinc-400 transition-colors"
                    >
                      Read →
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
