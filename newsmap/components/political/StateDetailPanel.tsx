"use client";

import { StateInfo } from "@/lib/political/state-senators-data";
import { BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  stateInfo: StateInfo;
  onClose: () => void;
  onSenatorClick: (senatorName: string) => void;
}

export default function StateDetailPanel({ stateInfo, onClose, onSenatorClick }: Props) {
  const flagPath = `/flags/${stateInfo.abbreviation}.jpg.jpg`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 40, scale: 0.97 }}
      transition={{ type: "spring", duration: 0.4, bounce: 0.2 }}
      className="fixed bottom-6 left-6 z-50 bg-zinc-950 rounded-xl shadow-2xl border border-zinc-800 w-88 max-h-[calc(100vh-96px)] overflow-y-auto"
      style={{ width: '22rem' }}
    >
      {/* Header */}
      <div className="sticky top-0 bg-zinc-900 border-b border-zinc-800 p-4 flex items-center justify-between relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `url(${flagPath})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-3 relative z-10"
        >
          <div className="w-12 h-12 rounded-lg overflow-hidden border border-zinc-600 shadow-md">
            <img src={flagPath} alt={`${stateInfo.name} flag`} className="w-full h-full object-cover"
              onError={e => {
                const t = e.target as HTMLImageElement;
                t.style.display = 'none';
                if (t.parentElement) t.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-zinc-800 text-zinc-400 text-xl">${stateInfo.flag}</div>`;
              }} />
          </div>
          <div>
            <h3 className="text-base font-bold text-zinc-100">{stateInfo.name}</h3>
            <p className="text-xs text-zinc-500">{stateInfo.abbreviation}</p>
          </div>
        </motion.div>
        <button
          onClick={onClose}
          className="relative z-10 w-7 h-7 flex items-center justify-center rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-100 text-sm font-bold transition-colors"
          aria-label="Close"
        >
          ✕
        </button>
      </div>

      {/* Senators */}
      <div className="p-4 space-y-2">
        <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">U.S. Senators</h4>

        {stateInfo.senators.map((senator, i) => {
          const partyColor = senator.party === 'R' ? '#DC2626' : senator.party === 'D' ? '#2563EB' : '#6B7280';
          const partyLabel = senator.party === 'R' ? 'Republican' : senator.party === 'D' ? 'Democrat' : 'Independent';

          return (
            <motion.button
              key={i}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.08 }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => onSenatorClick(senator.name)}
              className="w-full flex items-center gap-3 p-3 bg-zinc-900 hover:bg-zinc-800 rounded-lg border border-zinc-800 hover:border-zinc-600 transition-all group text-left"
            >
              <div className="w-14 h-14 rounded-full overflow-hidden bg-zinc-800 flex-shrink-0"
                style={{ outline: `2px solid ${partyColor}40` }}>
                <img src={senator.photoUrl} alt={senator.name}
                  className="w-full h-full object-cover"
                  onError={e => {
                    const t = e.target as HTMLImageElement;
                    t.style.display = 'none';
                    if (t.parentElement) {
                      const initials = senator.name.split(' ').map(n => n[0]).join('');
                      t.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center font-bold text-white text-lg" style="background-color:${partyColor}">${initials}</div>`;
                    }
                  }} />
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p className="text-sm font-semibold text-zinc-200 truncate">{senator.name}</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full text-white"
                    style={{ backgroundColor: partyColor }}>
                    {senator.party}
                  </span>
                  <span className="text-xs text-zinc-500">{partyLabel}</span>
                </div>
                <p className="text-[10px] text-zinc-600 group-hover:text-zinc-400 transition-colors flex items-center gap-1 mt-1">
                  <BarChart3 size={10} /> View PAC data
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="px-4 pb-4 pt-2 border-t border-zinc-800">
        <p className="text-xs text-zinc-600 text-center">
          Click a senator to view their PAC contributions
        </p>
      </div>
    </motion.div>
  );
}
