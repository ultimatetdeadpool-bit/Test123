"use client";

import { DistrictInfo } from "@/lib/political/district-representatives-data";
import { BarChart3, User } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  districtInfo: DistrictInfo;
  position: { x: number; y: number };
  onClose?: () => void;
  onRepresentativeClick?: (repName: string) => void;
}

export default function DistrictInfoPopup({ districtInfo, position, onRepresentativeClick }: Props) {
  const { representative, state = "", stateAbbr = "", districtCode = districtInfo.district } = districtInfo;

  const partyColor = representative.party === "Republican"
    ? "#DC2626"
    : representative.party === "Democratic"
    ? "#2563EB"
    : "#6B7280";

  const flagPath = `/flags/${stateAbbr}.jpg.jpg`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: 8 }}
      transition={{ duration: 0.15 }}
      className="fixed z-50 bg-zinc-950 rounded-xl shadow-2xl border overflow-hidden w-80"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(15px, -50%)',
        borderColor: partyColor + '60',
        pointerEvents: 'none',
      }}
    >
      {/* Header */}
      <div
        className="px-4 py-3 relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${partyColor}cc 0%, ${partyColor}99 100%)` }}
      >
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `url(${flagPath})`, backgroundSize: 'cover' }} />
        <div className="flex items-center gap-2 relative z-10">
          <div className="w-9 h-9 rounded-md overflow-hidden border border-white/30 flex-shrink-0">
            <img src={flagPath} alt={`${state} flag`} className="w-full h-full object-cover"
              onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">{districtCode}</h3>
            <p className="text-xs text-white/70">{state}</p>
          </div>
        </div>
      </div>

      {/* Representative */}
      <div className="p-4">
        <button
          onClick={() => onRepresentativeClick && representative.name !== "Vacancy" && onRepresentativeClick(representative.name)}
          disabled={representative.name === "Vacancy"}
          className="w-full flex items-center gap-3 bg-zinc-900 p-3 rounded-lg border border-zinc-800 text-left"
          style={{ pointerEvents: 'auto' }}
        >
          <div className="w-12 h-12 rounded-full overflow-hidden bg-zinc-800 flex-shrink-0">
            {representative.photoUrl && representative.name !== "Vacancy" ? (
              <img src={representative.photoUrl} alt={representative.name}
                className="w-full h-full object-cover"
                onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-zinc-500">
                <User size={24} />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-zinc-100 truncate">
              {representative.name === "Vacancy" ? "Vacant Seat" : representative.name}
            </p>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full text-white"
                style={{ backgroundColor: partyColor }}>
                {representative.party === 'Republican' ? 'R' : representative.party === 'Democratic' ? 'D' : 'I'}
              </span>
              {representative.name !== "Vacancy" && (
                <span className="text-[10px] text-zinc-500 flex items-center gap-0.5">
                  <BarChart3 size={10} /> PAC data
                </span>
              )}
            </div>
          </div>
        </button>
      </div>
    </motion.div>
  );
}
