"use client";

import { useState, useMemo } from "react";
import { Search, DollarSign, TrendingUp, Users, ChevronRight, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PACPoliticianPopup, { PACPoliticianPopupData } from "@/components/political/PACPoliticianPopup";

interface Props {
  onPoliticianClick: (name: string, type: "senator" | "representative") => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let allPACData: any[] = [];
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const data = require("@/data/all-pac-data");
  allPACData = data.allPACData || [];
} catch (_) {
  allPACData = [];
}

export default function PACSearchView({ onPoliticianClick }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [politicianSearchQuery, setPoliticianSearchQuery] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedPAC, setSelectedPAC] = useState<any | null>(null);
  const [selectedPolitician, setSelectedPolitician] = useState<string | null>(null);
  const [searchMode, setSearchMode] = useState<"pacs" | "politicians">("pacs");
  const [popupPolitician, setPopupPolitician] = useState<PACPoliticianPopupData | null>(null);

  const filteredPACs = useMemo(() => {
    if (!searchQuery) return allPACData;
    return allPACData.filter((pac: { name: string }) =>
      pac.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const allPoliticians = useMemo(() => {
    const map = new Map<string, {
      name: string; type: "senator" | "representative"; party: string;
      state: string; totalReceived: number; pacCount: number;
      pacs: Array<{ name: string; amount: number }>;
    }>();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    allPACData.forEach((pac: any) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      pac.recipients.forEach((r: any) => {
        const key = `${r.name}-${r.type}`;
        if (!map.has(key)) {
          map.set(key, { name: r.name, type: r.type, party: r.party || "U", state: r.state || "US", totalReceived: 0, pacCount: 0, pacs: [] });
        }
        const p = map.get(key)!;
        p.totalReceived += r.amount;
        p.pacCount++;
        p.pacs.push({ name: pac.name, amount: r.amount });
      });
    });
    return Array.from(map.values()).sort((a, b) => b.totalReceived - a.totalReceived);
  }, []);

  const filteredPoliticians = useMemo(() => {
    if (!politicianSearchQuery) return allPoliticians;
    return allPoliticians.filter(p =>
      p.name.toLowerCase().includes(politicianSearchQuery.toLowerCase()) ||
      p.state.toLowerCase().includes(politicianSearchQuery.toLowerCase())
    );
  }, [politicianSearchQuery, allPoliticians]);

  const openPoliticianPopup = (name: string, type: string, party: string, state: string) => {
    const pacMap = new Map<string, number>();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    allPACData.forEach((pac: any) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      pac.recipients.forEach((r: any) => {
        if (r.name === name) pacMap.set(pac.name, (pacMap.get(pac.name) ?? 0) + r.amount);
      });
    });
    const pacs = Array.from(pacMap.entries()).map(([n, amount]) => ({ name: n, amount }));
    setPopupPolitician({ name, type: type as PACPoliticianPopupData['type'], party, state, totalReceived: pacs.reduce((s, p) => s + p.amount, 0), pacs });
  };

  const getPartyColor = (party: string) =>
    party === "R" ? "#DC2626" : party === "D" ? "#2563EB" : "#6B7280";

  const selectedPoliticianData = useMemo(
    () => selectedPolitician ? allPoliticians.find(p => p.name === selectedPolitician) : null,
    [selectedPolitician, allPoliticians]
  );

  return (
    <div className="w-full h-full bg-zinc-950 overflow-y-auto">
      <div className="max-w-7xl mx-auto p-8">
        <AnimatePresence mode="wait">
          {!selectedPAC && !selectedPolitician ? (
            <motion.div key="main" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.25 }}>
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-zinc-100 mb-2">PAC Contributions Explorer</h1>
                <p className="text-zinc-500">Search by PAC or Politician to explore campaign contributions</p>
              </div>

              {/* Mode toggle */}
              <div className="flex gap-3 mb-6">
                {[
                  { id: "pacs" as const, label: "Search PACs", icon: <DollarSign size={18} /> },
                  { id: "politicians" as const, label: "Search Politicians", icon: <User size={18} /> },
                ].map(tab => (
                  <button key={tab.id} onClick={() => setSearchMode(tab.id)}
                    className={`flex-1 px-5 py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                      searchMode === tab.id
                        ? "bg-indigo-600 text-white shadow-lg"
                        : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-zinc-600 hover:text-zinc-200"
                    }`}>
                    {tab.icon}{tab.label}
                  </button>
                ))}
              </div>

              {/* Search bar */}
              <div className="mb-5">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                  <input
                    type="text"
                    value={searchMode === "pacs" ? searchQuery : politicianSearchQuery}
                    onChange={e => searchMode === "pacs" ? setSearchQuery(e.target.value) : setPoliticianSearchQuery(e.target.value)}
                    placeholder={searchMode === "pacs" ? "Search PACs by name…" : "Search politicians by name or state…"}
                    className="w-full pl-11 pr-4 py-3.5 bg-zinc-900 border border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-zinc-100 placeholder-zinc-600 text-sm"
                  />
                </div>
              </div>

              {/* Stats */}
              {(() => {
                const stats = searchMode === "pacs" ? [
                  { icon: <DollarSign size={16} />, label: "Total PACs", value: filteredPACs.length.toLocaleString() },
                  { icon: <TrendingUp size={16} />, label: "Total Amount", value: `$${(filteredPACs.reduce((s: number, p: { totalAmount: number }) => s + p.totalAmount, 0) / 1e6).toFixed(1)}M` },
                  { icon: <Users size={16} />, label: "Recipients", value: filteredPACs.reduce((s: number, p: { recipients: unknown[] }) => s + p.recipients.length, 0).toLocaleString() },
                ] : [
                  { icon: <Users size={16} />, label: "Politicians", value: filteredPoliticians.length.toLocaleString() },
                  { icon: <TrendingUp size={16} />, label: "Total Received", value: `$${(filteredPoliticians.reduce((s, p) => s + p.totalReceived, 0) / 1e6).toFixed(1)}M` },
                  { icon: <DollarSign size={16} />, label: "Avg", value: filteredPoliticians.length > 0 ? `$${(filteredPoliticians.reduce((s, p) => s + p.totalReceived, 0) / filteredPoliticians.length / 1000).toFixed(0)}K` : "$0" },
                ];
                return (
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {stats.map(({ icon, label, value }) => (
                      <div key={label} className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
                        <div className="flex items-center gap-2 text-zinc-500 mb-1">{icon}<span className="text-xs">{label}</span></div>
                        <p className="text-xl font-bold text-zinc-100">{value}</p>
                      </div>
                    ))}
                  </div>
                );
              })()}

              {/* List */}
              <div className="space-y-2">
                {searchMode === "pacs" ? (
                  filteredPACs.slice(0, 50).map((pac: { name: string; totalAmount: number; recipients: unknown[] }, i: number) => (
                    <motion.button key={pac.name} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.015 }}
                      onClick={() => { setSelectedPAC(pac); setSelectedPolitician(null); }}
                      className="w-full bg-zinc-900 p-5 rounded-xl border border-zinc-800 hover:border-indigo-500/60 hover:bg-zinc-800/60 transition-all text-left group">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-base font-bold text-zinc-200 mb-1.5 group-hover:text-indigo-400 transition-colors">{pac.name}</h3>
                          <div className="flex items-center gap-5 text-xs text-zinc-500">
                            <span className="flex items-center gap-1"><DollarSign size={13} />${(pac.totalAmount / 1000).toFixed(0)}K total</span>
                            <span className="flex items-center gap-1"><Users size={13} />{pac.recipients.length} recipients</span>
                          </div>
                        </div>
                        <ChevronRight className="text-zinc-600 group-hover:text-indigo-400 transition-colors" size={20} />
                      </div>
                    </motion.button>
                  ))
                ) : (
                  filteredPoliticians.slice(0, 50).map((pol, i) => (
                    <motion.button key={`${pol.name}-${pol.type}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.015 }}
                      onClick={() => openPoliticianPopup(pol.name, pol.type, pol.party, pol.state)}
                      className="w-full bg-zinc-900 p-5 rounded-xl border border-zinc-800 hover:border-indigo-500/60 hover:bg-zinc-800/60 transition-all text-left group">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="w-1.5 h-14 rounded-full" style={{ backgroundColor: getPartyColor(pol.party) }} />
                          <div>
                            <h3 className="text-base font-bold text-zinc-200 group-hover:text-indigo-400 transition-colors mb-0.5">{pol.name}</h3>
                            <div className="flex items-center gap-2 text-xs text-zinc-500">
                              <span className="px-1.5 py-0.5 rounded-full text-white font-bold text-[10px]" style={{ backgroundColor: getPartyColor(pol.party) }}>{pol.party}</span>
                              <span>{pol.type === "senator" ? "U.S. Senator" : "U.S. Representative"}</span>
                              <span>·</span>
                              <span>{pol.state}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-zinc-600 mb-0.5">Total Received</p>
                          <p className="text-xl font-bold text-zinc-100">${(pol.totalReceived / 1000).toFixed(0)}K</p>
                          <p className="text-[10px] text-zinc-600 mt-0.5">{pol.pacCount} PACs</p>
                        </div>
                      </div>
                    </motion.button>
                  ))
                )}
              </div>
            </motion.div>
          ) : selectedPAC ? (
            <motion.div key="pac-detail" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.25 }}>
              <button onClick={() => setSelectedPAC(null)} className="mb-5 flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-semibold text-sm">
                <ChevronRight className="rotate-180" size={16} /> Back to PACs
              </button>
              <div className="bg-gradient-to-r from-indigo-700 to-indigo-800 p-7 rounded-xl text-white mb-5">
                <h1 className="text-2xl font-bold mb-3">{selectedPAC.name}</h1>
                <div className="flex items-center gap-8">
                  <div>
                    <p className="text-indigo-300 text-xs mb-1">Total Contributions</p>
                    <p className="text-3xl font-bold">${(selectedPAC.totalAmount / 1e6).toFixed(2)}M</p>
                  </div>
                  <div>
                    <p className="text-indigo-300 text-xs mb-1">Recipients</p>
                    <p className="text-3xl font-bold">{selectedPAC.recipients.length}</p>
                  </div>
                </div>
              </div>
              <h2 className="text-xl font-bold text-zinc-100 mb-4">Politicians Receiving Funds</h2>
              <div className="space-y-2">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {selectedPAC.recipients.map((pol: any, i: number) => (
                  <motion.button key={`${pol.name}-${i}`} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                    onClick={() => openPoliticianPopup(pol.name, pol.type, pol.party, pol.state)}
                    className="w-full bg-zinc-900 p-4 rounded-xl border border-zinc-800 hover:border-indigo-500/60 hover:bg-zinc-800/60 transition-all text-left group">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-14 rounded-full" style={{ backgroundColor: getPartyColor(pol.party) }} />
                        <div>
                          <h3 className="text-base font-bold text-zinc-200 group-hover:text-indigo-400 transition-colors mb-0.5">{pol.name}</h3>
                          <div className="flex items-center gap-2 text-xs text-zinc-500">
                            <span className="px-1.5 py-0.5 rounded-full text-white font-bold text-[10px]" style={{ backgroundColor: getPartyColor(pol.party) }}>{pol.party}</span>
                            <span>{pol.type === "senator" ? "U.S. Senator" : "U.S. Representative"}</span>
                            <span>· {pol.state}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-zinc-600 mb-0.5">Received</p>
                        <p className="text-xl font-bold text-zinc-100">${pol.amount.toLocaleString()}</p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div key="pol-detail" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.25 }}>
              <button onClick={() => setSelectedPolitician(null)} className="mb-5 flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-semibold text-sm">
                <ChevronRight className="rotate-180" size={16} /> Back to Politicians
              </button>
              {selectedPoliticianData && (
                <>
                  <div className="bg-gradient-to-r from-indigo-700 to-indigo-800 p-7 rounded-xl text-white mb-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-2.5 h-20 rounded-full" style={{ backgroundColor: getPartyColor(selectedPoliticianData.party) }} />
                      <div>
                        <h1 className="text-2xl font-bold mb-1">{selectedPoliticianData.name}</h1>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs font-semibold">
                            {selectedPoliticianData.party === "R" ? "Republican" : selectedPoliticianData.party === "D" ? "Democrat" : "Independent"}
                          </span>
                          <span className="text-indigo-200">
                            {selectedPoliticianData.type === "senator" ? "U.S. Senator" : "U.S. Representative"} · {selectedPoliticianData.state}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-8">
                      <div>
                        <p className="text-indigo-300 text-xs mb-1">Total Received</p>
                        <p className="text-3xl font-bold">${(selectedPoliticianData.totalReceived / 1000).toFixed(0)}K</p>
                      </div>
                      <div>
                        <p className="text-indigo-300 text-xs mb-1">PACs</p>
                        <p className="text-3xl font-bold">{selectedPoliticianData.pacCount}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-zinc-100">Contributing PACs</h2>
                    <button onClick={() => openPoliticianPopup(selectedPoliticianData.name, selectedPoliticianData.type, selectedPoliticianData.party, selectedPoliticianData.state)}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-semibold text-sm hover:bg-indigo-500 transition-colors">
                      View PAC Chart
                    </button>
                  </div>
                  <div className="space-y-2">
                    {selectedPoliticianData.pacs.map((pac, i) => (
                      <motion.div key={`${pac.name}-${i}`} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                        className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-bold text-zinc-200">{pac.name}</h3>
                          <p className="text-lg font-bold text-zinc-100">${pac.amount.toLocaleString()}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {popupPolitician && (
        <PACPoliticianPopup politician={popupPolitician} onClose={() => setPopupPolitician(null)} />
      )}
    </div>
  );
}
