"use client";

import { StateInfo } from "@/lib/political/state-senators-data";
import { motion } from "framer-motion";

interface Props {
  stateInfo: StateInfo;
  position: { x: number; y: number };
  onClose?: () => void;
}

export default function StateInfoPopup({ stateInfo, position, onClose }: Props) {
  const flagPath = `/flags/${stateInfo.abbreviation}.jpg.jpg`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, x: -10 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className="fixed z-50 bg-zinc-950 rounded-lg shadow-2xl border border-zinc-700 w-72 overflow-hidden"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(12px, -50%)',
        pointerEvents: 'none',
      }}
    >
      {/* Header */}
      <div className="relative bg-zinc-900 border-b border-zinc-800 p-3 overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `url(${flagPath})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
        <div className="flex items-center gap-2 relative z-10">
          <div className="w-9 h-9 rounded-md overflow-hidden border border-zinc-600 flex-shrink-0">
            <img src={flagPath} alt={`${stateInfo.name} flag`} className="w-full h-full object-cover"
              onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-zinc-100">{stateInfo.name}</h3>
            <p className="text-xs text-zinc-500">{stateInfo.abbreviation}</p>
          </div>
        </div>
      </div>

      {/* Senators */}
      <div className="p-3 space-y-2">
        <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">U.S. Senators</p>
        {stateInfo.senators.map((senator, i) => {
          const partyColor = senator.party === 'R' ? '#DC2626' : senator.party === 'D' ? '#2563EB' : '#6B7280';
          return (
            <div key={i} className="flex items-center gap-2 p-2 bg-zinc-900 rounded-lg border border-zinc-800">
              <div className="w-9 h-9 rounded-full overflow-hidden bg-zinc-800 flex-shrink-0">
                <img src={senator.photoUrl} alt={senator.name} className="w-full h-full object-cover"
                  onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-zinc-200 truncate">{senator.name}</p>
                <span className="inline-block text-[10px] font-bold px-1.5 py-0.5 rounded-full text-white mt-0.5"
                  style={{ backgroundColor: partyColor }}>
                  {senator.party}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
