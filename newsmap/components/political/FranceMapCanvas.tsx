"use client";

import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { motion, AnimatePresence } from "framer-motion";
import { Map, Building2, Users } from "lucide-react";
import { FRENCH_ELECTIONS, FRENCH_ELECTION_YEARS, FrenchElectionYear } from "@/data/french-elections";
import deputesRaw from "@/data/france/deputes-by-circonscription.json";
import sénateursRaw from "@/data/france/senateurs-by-department.json";

const GEO_DEPARTMENTS = "/data/france/departments-with-overseas.geojson";

interface Depute {
  name: string; first_name: string; last_name: string;
  party: string; party_full: string; profession: string;
  photo_url: string; email: string; twitter: string;
  gender: string; birth_date: string; url_nosdeputes: string;
}
interface Circonscription {
  circonscription_id: string; departement: string;
  circonscription_number: string | number;
  circonscription_name: string; representative: Depute;
}
interface Senateur {
  name: string; first_name?: string; last_name?: string;
  party: string; party_full?: string; photo_url?: string;
  departement: string; departement_name?: string; url?: string;
}

type DeputesData   = Record<string, Circonscription>;
type SénateursData = Record<string, Senateur[]>;
type ElectionDeptData = Record<string, { left: number; right: number }>;

const deputesData   = deputesRaw   as unknown as DeputesData;
const sénateursData = sénateursRaw as unknown as SénateursData;

const PARTY_COLORS: Record<string, string> = {
  "RN":    "#1a2d5a", "REN":  "#ffeb00", "RE":   "#ffeb00",
  "LFI":   "#cc2443", "LR":   "#0066cc", "PS":   "#ff8080",
  "EELV":  "#00c000", "MODEM":"#ff9900", "SOC":  "#ff8080",
  "ECO":   "#00c000", "GDR":  "#dd0000", "HOR":  "#cccccc",
  "LIOT":  "#f4a81d", "NI":   "#999999", "DVG":  "#cc4466",
  "DVD":   "#4477cc", "UDI":  "#ff8800", "PCF":  "#dd0000",
};

const OVERSEAS = ["971","972","973","974","976"];
const INSETS: Record<string, { x: number; y: number; scale: number; label: string; center: [number,number] }> = {
  "971": { x: 20,  y: 420, scale: 2500, label: "Guadeloupe",  center: [-61.5, 16.2] },
  "972": { x: 145, y: 420, scale: 3000, label: "Martinique",  center: [-61.0, 14.6] },
  "973": { x: 270, y: 420, scale:  800, label: "Guyane",      center: [-53.0,  4.0] },
  "974": { x: 520, y: 420, scale: 1800, label: "La Réunion",  center: [ 55.5,-21.1] },
  "976": { x: 645, y: 420, scale: 4000, label: "Mayotte",     center: [ 45.2,-12.8] },
};

function getDeptElectionColor(deptCode: string, data: ElectionDeptData, election: typeof FRENCH_ELECTIONS[FrenchElectionYear]): string {
  const d = data[deptCode];
  if (!d) return "#27272a";
  const total = d.left + d.right;
  if (total === 0) return "#27272a";
  const margin = d.left / total - 0.5;
  const t = Math.max(0, Math.min(1, (margin + 0.35) / 0.7));
  return interpolateColor(election.right.partyColor, election.left.partyColor, t);
}

function interpolateColor(hex1: string, hex2: string, t: number): string {
  const r1 = parseInt(hex1.slice(1,3),16), g1 = parseInt(hex1.slice(3,5),16), b1 = parseInt(hex1.slice(5,7),16);
  const r2 = parseInt(hex2.slice(1,3),16), g2 = parseInt(hex2.slice(3,5),16), b2 = parseInt(hex2.slice(5,7),16);
  return `rgb(${Math.round(r1+(r2-r1)*t)},${Math.round(g1+(g2-g1)*t)},${Math.round(b1+(b2-b1)*t)})`;
}

function getDeptDeputesColor(deptCode: string): string {
  const code = deptCode.padStart(2,"0");
  const circos = Object.values(deputesData).filter(c => c.departement === code || c.departement === deptCode);
  if (circos.length === 0) return "#27272a";
  const counts: Record<string,number> = {};
  circos.forEach(c => { const p = c.representative.party; counts[p] = (counts[p]||0)+1; });
  const majority = Object.entries(counts).sort(([,a],[,b])=>b-a)[0]?.[0];
  return PARTY_COLORS[majority] || "#27272a";
}

async function loadElectionData(year: FrenchElectionYear): Promise<ElectionDeptData> {
  try {
    switch(year) {
      case 2002: return (await import("@/data/france-election-2002.json")).default as unknown as ElectionDeptData;
      case 2007: return (await import("@/data/france-election-2007.json")).default as unknown as ElectionDeptData;
      case 2012: return (await import("@/data/france-election-2012.json")).default as unknown as ElectionDeptData;
      case 2017: return (await import("@/data/france-election-2017.json")).default as unknown as ElectionDeptData;
      case 2022: return (await import("@/data/france-election-2022.json")).default as unknown as ElectionDeptData;
    }
  } catch { return {}; }
}

type ViewMode = "deputes" | "senat" | "presidentielle";

export default function FranceMapCanvas() {
  const [viewMode,      setViewMode]      = useState<ViewMode>("deputes");
  const [selectedDept,  setSelectedDept]  = useState<{code:string;name:string}|null>(null);
  const [hoveredDept,   setHoveredDept]   = useState<string|null>(null);
  const [selectedYear,  setSelectedYear]  = useState<FrenchElectionYear>(2022);
  const [electionData,  setElectionData]  = useState<ElectionDeptData>({});
  const [isLoadingYear, setIsLoadingYear] = useState(false);
  const [dimensions,    setDimensions]    = useState({ width: 800, height: 600 });
  const [position,      setPosition]      = useState<{coordinates:[number,number];zoom:number}>({ coordinates:[2.5,46.5], zoom:1 });

  useEffect(() => {
    const update = () => setDimensions({ width: window.innerWidth, height: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (viewMode !== "presidentielle") return;
    setIsLoadingYear(true);
    loadElectionData(selectedYear).then(data => { setElectionData(data); setIsLoadingYear(false); });
  }, [viewMode, selectedYear]);

  const getDeptColor = (code: string): string => {
    if (viewMode === "presidentielle") return getDeptElectionColor(code, electionData, FRENCH_ELECTIONS[selectedYear]);
    if (viewMode === "senat") return "#312e81";
    return getDeptDeputesColor(code);
  };

  const election = FRENCH_ELECTIONS[selectedYear];

  const renderInset = (code: string) => {
    const cfg = INSETS[code];
    if (!cfg) return null;
    return (
      <div key={code} className="absolute bg-zinc-900 border border-zinc-700 rounded-lg shadow-md overflow-hidden"
        style={{ left: cfg.x, bottom: 20, width: 110, height: 110 }}>
        <div className="absolute top-0 left-0 right-0 bg-zinc-800 text-zinc-300 text-[9px] font-semibold px-1 py-0.5 z-10 text-center truncate">
          {cfg.label}
        </div>
        <ComposableMap projection="geoMercator"
          projectionConfig={{ center: cfg.center, scale: cfg.scale }}
          width={110} height={110} style={{ width:"100%", height:"100%" }}>
          <Geographies geography={GEO_DEPARTMENTS}>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {({ geographies }: { geographies: any[] }) => geographies
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              .filter((g: any) => (g.properties?.code||g.id) === code)
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              .map((g: any) => (
                <Geography key={g.rsmKey} geography={g}
                  fill={getDeptColor(code)} stroke="#3f3f46" strokeWidth={0.5}
                  style={{ default:{outline:"none"}, hover:{fill:"#4f46e5",outline:"none",cursor:"pointer"}, pressed:{outline:"none"} }}
                  onClick={() => setSelectedDept({ code, name: cfg.label })}
                  onMouseEnter={() => setHoveredDept(cfg.label)}
                  onMouseLeave={() => setHoveredDept(null)}
                />
              ))
            }
          </Geographies>
        </ComposableMap>
      </div>
    );
  };

  return (
    <div className="relative w-full h-full bg-zinc-950">

      {/* Tab bar */}
      <div className="absolute top-16 right-4 z-10 flex gap-2">
        {([
          { id:"deputes"        as const, label:"Députés",       icon:<Users size={14}/> },
          { id:"senat"          as const, label:"Sénat",          icon:<Building2 size={14}/> },
          { id:"presidentielle" as const, label:"Présidentielle", icon:<Map size={14}/> },
        ]).map(tab => (
          <button key={tab.id} onClick={() => { setViewMode(tab.id); setSelectedDept(null); }}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold shadow transition-all ${
              viewMode === tab.id
                ? "bg-indigo-600 text-white scale-105"
                : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-zinc-600 hover:text-zinc-200"
            }`}>
            {tab.icon}{tab.label}
          </button>
        ))}
      </div>

      {/* Main map */}
      <div className="relative w-full h-full flex items-center justify-center">
        <ComposableMap projection="geoMercator"
          width={dimensions.width} height={dimensions.height}
          projectionConfig={{ center:[2.5,46.5], scale: Math.min(dimensions.width*3.5, dimensions.height*4.5) }}>
          <ZoomableGroup zoom={position.zoom} center={position.coordinates} onMoveEnd={(p: { coordinates: [number,number]; zoom: number }) => setPosition(p)}>
            <Geographies geography={GEO_DEPARTMENTS}>
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {({ geographies }: { geographies: any[] }) => geographies
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .filter((g: any) => !OVERSEAS.includes(g.properties?.code||g.id||""))
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .map((g: any) => {
                  const code = g.properties?.code || g.id || "";
                  const name = g.properties?.nom  || code;
                  const isHov = hoveredDept === name;
                  return (
                    <Geography key={g.rsmKey} geography={g}
                      fill={isHov ? "#4f46e5" : getDeptColor(code)}
                      stroke="#18181b" strokeWidth={0.4}
                      style={{ default:{outline:"none",transition:"fill 0.12s"}, hover:{fill:"#4f46e5",outline:"none",cursor:"pointer"}, pressed:{outline:"none"} }}
                      onClick={() => setSelectedDept({ code, name })}
                      onMouseEnter={() => setHoveredDept(name)}
                      onMouseLeave={() => setHoveredDept(null)}
                    />
                  );
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>

        {/* Overseas insets */}
        {OVERSEAS.map(renderInset)}
      </div>

      {/* Hover tooltip */}
      {hoveredDept && !selectedDept && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-20 bg-zinc-900/90 border border-zinc-700 text-zinc-200 px-4 py-2 rounded-lg shadow-lg text-sm font-medium pointer-events-none">
          {hoveredDept}
        </div>
      )}

      {/* Info panel */}
      <AnimatePresence>
        {selectedDept && viewMode !== "presidentielle" && (
          <motion.div initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-20}}
            className="absolute top-16 left-4 z-30 bg-zinc-950 rounded-2xl shadow-2xl border border-zinc-800 w-80 max-h-[75vh] overflow-y-auto">
            <div className="sticky top-0 bg-zinc-900 border-b border-zinc-800 px-4 py-3 flex items-start justify-between z-10">
              <div>
                <h3 className="text-base font-bold text-zinc-100">{selectedDept.name}</h3>
                <p className="text-xs text-zinc-500 mt-0.5">Dép. {selectedDept.code}</p>
              </div>
              <button onClick={() => setSelectedDept(null)}
                className="w-7 h-7 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-500 hover:text-zinc-100 text-sm transition-colors">
                ✕
              </button>
            </div>
            <div className="p-4 space-y-3">
              {viewMode === "deputes" && <DeputesPanel code={selectedDept.code} />}
              {viewMode === "senat"   && <SenatPanel   code={selectedDept.code} />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Presidential bottom bar */}
      {viewMode === "presidentielle" && (
        <div className="absolute bottom-0 left-0 right-0 z-20 bg-zinc-950/95 backdrop-blur-sm border-t border-zinc-800 shadow-lg px-6 py-3">
          <div className="flex items-center gap-4 max-w-4xl mx-auto">
            {/* Left candidate */}
            <div className="flex items-center gap-2 flex-shrink-0 px-3 py-1.5 rounded-lg border-2 cursor-pointer hover:opacity-80 transition-opacity"
              style={{ borderColor: election.left.partyColor, backgroundColor: election.left.partyColor + "18" }}>
              <div className="relative">
                <img src={election.left.photo} alt={election.left.name}
                  className="w-9 h-9 rounded-full object-cover object-top border-2"
                  style={{ borderColor: election.left.partyColor }}
                  onError={e => { e.currentTarget.style.display="none"; }} />
                {election.winner === "left" && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-white text-[8px] font-bold"
                    style={{ backgroundColor: election.left.partyColor }}>✓</div>
                )}
              </div>
              <div>
                <div className="text-xs font-bold leading-tight" style={{ color: election.left.partyColor === "#ffeb00" ? "#d4a017" : election.left.partyColor }}>
                  {election.left.name}
                </div>
                <div className="text-[10px]" style={{ color: election.left.partyColor === "#ffeb00" ? "#b89016" : election.left.partyColor }}>
                  {election.left.party}
                </div>
              </div>
            </div>

            {/* Year buttons */}
            <div className="flex-1 flex flex-col items-center gap-1">
              <div className="text-xs text-zinc-500 font-medium">
                {isLoadingYear ? "Chargement…" : `Présidentielle ${selectedYear} — 2ème tour`}
              </div>
              <div className="flex items-center gap-1">
                {FRENCH_ELECTION_YEARS.map(yr => (
                  <button key={yr} onClick={() => setSelectedYear(yr)}
                    className={`px-2 py-1 rounded text-[11px] font-semibold transition-all ${
                      yr === selectedYear
                        ? "bg-indigo-700 text-white scale-110 shadow-md"
                        : "bg-zinc-900 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300 border border-zinc-800"
                    }`}>
                    {yr}
                  </button>
                ))}
              </div>
            </div>

            {/* Right candidate */}
            <div className="flex items-center gap-2 flex-shrink-0 px-3 py-1.5 rounded-lg border-2 cursor-pointer hover:opacity-80 transition-opacity"
              style={{ borderColor: election.right.partyColor, backgroundColor: election.right.partyColor + "18" }}>
              <div>
                <div className="text-xs font-bold leading-tight text-right" style={{ color: election.right.partyColor }}>
                  {election.right.name}
                </div>
                <div className="text-[10px] text-right" style={{ color: election.right.partyColor }}>
                  {election.right.party}
                </div>
              </div>
              <div className="relative">
                <img src={election.right.photo} alt={election.right.name}
                  className="w-9 h-9 rounded-full object-cover object-top border-2"
                  style={{ borderColor: election.right.partyColor }}
                  onError={e => { e.currentTarget.style.display="none"; }} />
                {election.winner === "right" && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-white text-[8px] font-bold"
                    style={{ backgroundColor: election.right.partyColor }}>✓</div>
                )}
              </div>
            </div>
          </div>

          {/* Gradient legend */}
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="text-[10px] text-zinc-600">{election.left.name.split(" ").pop()} +35%</span>
            <div className="w-40 h-2.5 rounded-full" style={{
              background: `linear-gradient(to right, ${election.right.partyColor}, #3f3f46, ${election.left.partyColor})`
            }} />
            <span className="text-[10px] text-zinc-600">{election.right.name.split(" ").pop()} +35%</span>
          </div>
        </div>
      )}

      {/* Députés legend */}
      {viewMode === "deputes" && (
        <div className="absolute bottom-4 right-4 z-20 bg-zinc-950/90 rounded-xl shadow-lg border border-zinc-800 px-3 py-3 text-xs max-w-[150px]">
          <div className="font-bold text-zinc-400 mb-2 text-[11px]">Couleur majoritaire</div>
          {Object.entries(PARTY_COLORS).slice(0,8).map(([party, color]) => (
            <div key={party} className="flex items-center gap-1.5 mb-1">
              <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: color }} />
              <span className="text-zinc-500">{party}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function DeputesPanel({ code }: { code: string }) {
  const normalized = code.padStart(2,"0");
  const circos = Object.values(deputesData).filter(c => c.departement === normalized || c.departement === code);

  if (circos.length === 0) return (
    <p className="text-sm text-zinc-500 text-center py-4">Aucun député trouvé.</p>
  );

  return (
    <>
      <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">{circos.length} Député{circos.length > 1?"s":""}</p>
      {circos.map(c => {
        const d = c.representative;
        const color = PARTY_COLORS[d.party] || "#52525b";
        const textColor = ["#ffeb00","#ff9900"].includes(color) ? "#000" : "#fff";
        return (
          <div key={c.circonscription_id}
            className="flex items-start gap-3 p-3 bg-zinc-900 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-colors">
            <img src={d.photo_url} alt={d.name}
              className="w-11 h-11 rounded-lg object-cover border border-zinc-700 shadow flex-shrink-0"
              onError={e => { e.currentTarget.style.display="none"; }} />
            <div className="flex-1 min-w-0">
              <p className="font-bold text-zinc-200 text-sm leading-tight">{d.name}</p>
              <p className="text-xs text-zinc-500 mb-1.5">{c.circonscription_name} (circ. {c.circonscription_number})</p>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold"
                style={{ backgroundColor: color, color: textColor }}>
                {d.party}
              </span>
              {d.url_nosdeputes && (
                <a href={d.url_nosdeputes} target="_blank" rel="noopener noreferrer"
                  className="text-xs text-indigo-400 hover:text-indigo-300 hover:underline mt-1 inline-block">
                  Voir la fiche →
                </a>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
}

function SenatPanel({ code }: { code: string }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const senators: Senateur[] = (sénateursData as any)[code] || (sénateursData as any)[code.padStart(2,"0")] || [];

  if (senators.length === 0) return (
    <div className="text-center py-6">
      <p className="text-3xl mb-2">🏛️</p>
      <p className="text-sm font-semibold text-zinc-300">Données sénatoriales</p>
      <p className="text-xs text-zinc-600 mt-1">Bientôt disponible</p>
    </div>
  );

  return (
    <>
      <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">{senators.length} Sénateur{senators.length>1?"s":""}</p>
      {senators.map((s, i) => {
        const color = PARTY_COLORS[s.party] || "#52525b";
        const textColor = ["#ffeb00","#ff9900"].includes(color) ? "#000" : "#fff";
        return (
          <div key={i} className="flex items-start gap-3 p-3 bg-zinc-900 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-colors">
            {s.photo_url ? (
              <img src={s.photo_url} alt={s.name}
                className="w-11 h-11 rounded-lg object-cover border border-zinc-700 shadow flex-shrink-0"
                onError={e => { e.currentTarget.style.display="none"; }} />
            ) : (
              <div className="w-11 h-11 rounded-lg bg-zinc-800 flex items-center justify-center flex-shrink-0 text-zinc-500 text-xl">👤</div>
            )}
            <div className="flex-1 min-w-0">
              <p className="font-bold text-zinc-200 text-sm">{s.name}</p>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold mt-1"
                style={{ backgroundColor: color, color: textColor }}>
                {s.party}
              </span>
              {s.url && (
                <a href={s.url} target="_blank" rel="noopener noreferrer"
                  className="text-xs text-indigo-400 hover:text-indigo-300 hover:underline mt-1 inline-block">
                  Voir la fiche →
                </a>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
}
