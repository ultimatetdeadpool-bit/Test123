"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { NewsArticle } from "@/lib/types";

const CATEGORY_COLORS: Record<string, string> = {
  conflict: "#ef4444",
  politics: "#3b82f6",
  economy: "#f59e0b",
  environment: "#22c55e",
  health: "#a855f7",
  technology: "#06b6d4",
  general: "#e2e8f0",
};

interface NewsPanelProps {
  article: NewsArticle | null;
  onClose: () => void;
}

export default function NewsPanel({ article, onClose }: NewsPanelProps) {
  return (
    <AnimatePresence>
      {article && (
        <motion.div
          key={article.id}
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 28, stiffness: 280 }}
          className="fixed top-0 right-0 h-full w-80 z-20 flex flex-col
            bg-zinc-950/95 border-l border-zinc-800 backdrop-blur-md"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <div
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{
                  backgroundColor: CATEGORY_COLORS[article.category] ?? "#e2e8f0",
                  boxShadow: `0 0 6px ${CATEGORY_COLORS[article.category] ?? "#e2e8f0"}`,
                }}
              />
              <span className="text-xs text-zinc-400 uppercase tracking-wide font-medium">
                {article.category}
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-zinc-500 hover:text-zinc-200 transition-colors p-1 rounded hover:bg-zinc-800"
              aria-label="Close panel"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
            <h2 className="text-sm font-semibold text-zinc-100 leading-snug">
              {article.title}
            </h2>

            {article.description && article.description !== article.title && (
              <p className="text-xs text-zinc-400 leading-relaxed">
                {article.description}
              </p>
            )}

            <div className="text-xs text-zinc-600">
              {new Date(article.publishedAt).toLocaleString()}
            </div>

            <div className="mt-auto pt-4">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center py-2.5 px-4 rounded-md text-xs font-medium
                  bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-zinc-500
                  text-zinc-200 transition-all"
              >
                Read full article →
              </a>
            </div>
          </div>

          {/* Coordinates footer */}
          <div className="p-3 border-t border-zinc-800">
            <p className="text-xs text-zinc-600 font-mono">
              {article.lat.toFixed(2)}°, {article.lon.toFixed(2)}°
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
