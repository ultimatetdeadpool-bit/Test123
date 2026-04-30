"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const CHART_COLORS = [
  '#6366f1', '#3b82f6', '#22c55e', '#f59e0b', '#ef4444',
  '#8b5cf6', '#14b8a6', '#f97316', '#06b6d4', '#ec4899',
];

const MAX_SLICES = 8;

export interface PACPoliticianPopupData {
  name: string;
  type: 'senator' | 'representative' | 'presidential' | 'other';
  party: string;
  state: string;
  totalReceived: number;
  pacs: Array<{ name: string; amount: number }>;
}

interface Props {
  politician: PACPoliticianPopupData;
  onClose: () => void;
}

function getPhotoUrl(name: string, type: string): string {
  const normalized = name.replace(/ /g, '_');
  if (type === 'senator') return `/senators/${normalized}.jpg`;
  if (type === 'representative') return `/representatives/${normalized}.jpg`;
  if (type === 'presidential') return `/candidates/${normalized}.jpg`;
  return '';
}

function getPartyColor(party: string) {
  if (party === 'R') return '#DC2626';
  if (party === 'D') return '#2563EB';
  return '#6B7280';
}

function getPartyGradient(party: string) {
  if (party === 'R') return 'from-red-700 to-red-800';
  if (party === 'D') return 'from-blue-700 to-blue-800';
  return 'from-zinc-700 to-zinc-800';
}

function getPartyLabel(party: string, type: string) {
  const partyName = party === 'R' ? 'Republican' : party === 'D' ? 'Democrat' : 'Independent';
  const roleMap: Record<string, string> = {
    senator: 'U.S. Senator',
    representative: 'U.S. Representative',
    presidential: 'Presidential Candidate',
    other: 'Candidate',
  };
  return `${partyName} · ${roleMap[type] ?? 'Candidate'}`;
}

function buildSlices(pacs: Array<{ name: string; amount: number }>) {
  const sorted = [...pacs].sort((a, b) => b.amount - a.amount);
  if (sorted.length <= MAX_SLICES) {
    return sorted.map((p, i) => ({ ...p, color: CHART_COLORS[i % CHART_COLORS.length] }));
  }
  const top = sorted.slice(0, MAX_SLICES).map((p, i) => ({
    ...p,
    color: CHART_COLORS[i % CHART_COLORS.length],
  }));
  const otherAmount = sorted.slice(MAX_SLICES).reduce((s, p) => s + p.amount, 0);
  top.push({ name: `Other PACs (${sorted.length - MAX_SLICES})`, amount: otherAmount, color: '#52525b' });
  return top;
}

export default function PACPoliticianPopup({ politician, onClose }: Props) {
  const [imgError, setImgError] = useState(false);

  const partyColor    = getPartyColor(politician.party);
  const partyGradient = getPartyGradient(politician.party);
  const partyLabel    = getPartyLabel(politician.party, politician.type);
  const photoUrl      = getPhotoUrl(politician.name, politician.type);
  const total         = politician.totalReceived;
  const slices        = buildSlices(politician.pacs).map(s => ({
    ...s,
    percentage: total > 0 ? (s.amount / total) * 100 : 0,
  }));

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[70] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
          className="bg-zinc-950 rounded-xl shadow-2xl border w-full max-w-4xl max-h-[90vh] overflow-hidden"
          style={{ borderColor: partyColor + '80' }}
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className={`bg-gradient-to-r ${partyGradient} p-6 flex items-center justify-between relative overflow-hidden`}>
            <div className="relative z-10 flex-1 min-w-0 pr-4">
              <h2 className="text-2xl font-bold text-white truncate">{politician.name}</h2>
              <div className="flex items-center gap-3 mt-2 flex-wrap">
                <span className="px-3 py-1 rounded-full text-xs font-bold text-white bg-white/20">
                  {partyLabel}
                </span>
                <span className="text-sm text-white/80 font-medium">{politician.state}</span>
              </div>
              <p className="text-white/70 text-sm mt-2">
                Total PAC funding:{' '}
                <span className="font-bold text-white">${total.toLocaleString()}</span>
                {' '}from <span className="font-bold text-white">{politician.pacs.length}</span> PACs
              </p>
            </div>

            <div className="relative z-10 flex items-start gap-3 flex-shrink-0">
              {photoUrl && !imgError ? (
                <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-white/30 shadow-lg flex-shrink-0">
                  <img
                    src={photoUrl}
                    alt={politician.name}
                    className="w-full h-full object-cover object-top"
                    onError={() => setImgError(true)}
                  />
                </div>
              ) : (
                <div className="w-20 h-20 rounded-xl border-2 border-white/30 shadow-lg flex-shrink-0 flex items-center justify-center bg-white/10">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="8" r="4" fill="rgba(255,255,255,0.6)" />
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
              )}
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full text-white font-bold text-lg bg-white/20 hover:bg-white/35 transition-colors"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-160px)]">
            <h3 className="text-xl font-bold mb-5" style={{ color: partyColor }}>
              PAC Contributions Breakdown
            </h3>

            <div className="flex flex-col lg:flex-row gap-8 items-start">
              <div className="flex-shrink-0 flex justify-center w-full lg:w-auto">
                <DonutChart slices={slices} total={total} accentColor={partyColor} />
              </div>

              <div className="flex-1 w-full space-y-2">
                {slices.map((slice, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.04 }}
                    className="flex items-center gap-3 p-3 bg-zinc-900 rounded-lg border border-zinc-800 hover:bg-zinc-800/60 transition-colors"
                  >
                    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: slice.color }} />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-zinc-200 text-sm truncate">{slice.name}</p>
                      <p className="text-xs text-zinc-500">{slice.percentage.toFixed(1)}% of total</p>
                    </div>
                    <p className="font-bold text-zinc-100 text-sm whitespace-nowrap">
                      ${slice.amount.toLocaleString()}
                    </p>
                  </motion.div>
                ))}

                <div className="mt-3 pt-3 border-t-2 flex justify-between items-center" style={{ borderColor: partyColor + '40' }}>
                  <span className="font-bold text-zinc-400">Total PAC Funding</span>
                  <span className="text-xl font-bold" style={{ color: partyColor }}>
                    ${total.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function DonutChart({
  slices,
  total,
  accentColor,
}: {
  slices: Array<{ name: string; amount: number; percentage: number; color: string }>;
  total: number;
  accentColor?: string;
}) {
  const [hovered, setHovered] = useState<number | null>(null);

  const size = 260;
  const sw   = 56;
  const r    = (size - sw) / 2;
  const cx   = size / 2;
  const cy   = size / 2;
  let angle  = -90;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#27272a" strokeWidth={sw} />

        {slices.map((s, i) => {
          const sweep = (s.percentage / 100) * 360;
          const start = angle;
          const end   = angle + sweep;
          angle       = end;

          const toRad = (d: number) => (d * Math.PI) / 180;
          const x1 = cx + r * Math.cos(toRad(start));
          const y1 = cy + r * Math.sin(toRad(start));
          const x2 = cx + r * Math.cos(toRad(end));
          const y2 = cy + r * Math.sin(toRad(end));
          const large = sweep > 180 ? 1 : 0;

          return (
            <path
              key={i}
              d={`M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`}
              fill="none"
              stroke={s.color}
              strokeWidth={hovered === i ? sw + 6 : sw}
              style={{
                cursor: 'pointer',
                transition: 'stroke-width 0.15s',
                opacity: hovered === null || hovered === i ? 1 : 0.4,
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            />
          );
        })}
      </svg>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center px-2">
          {hovered !== null ? (
            <>
              <div className="text-2xl font-bold text-zinc-100">
                {slices[hovered].percentage.toFixed(1)}%
              </div>
              <div className="text-xs text-zinc-400 max-w-[100px] leading-tight text-center">
                {slices[hovered].name}
              </div>
            </>
          ) : (
            <>
              <div className="text-xs text-zinc-500">Total</div>
              <div className="text-lg font-bold" style={{ color: accentColor }}>
                ${(total / 1000).toFixed(0)}K
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
