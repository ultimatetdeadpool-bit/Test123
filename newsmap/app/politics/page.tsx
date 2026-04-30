"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { Plus, Minus, RotateCcw } from "lucide-react";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const ACTIVE: Record<string, { name: string; route: string }> = {
  "840": { name: "United States", route: "/politics/us" },
  "250": { name: "France",        route: "/politics/france" },
};

const COUNTRY_NAMES: Record<string, string> = {
  "004":"Afghanistan","008":"Albania","012":"Algeria","024":"Angola","032":"Argentina","036":"Australia",
  "040":"Austria","050":"Bangladesh","056":"Belgium","068":"Bolivia","076":"Brazil","100":"Bulgaria",
  "116":"Cambodia","120":"Cameroon","124":"Canada","144":"Sri Lanka","152":"Chile","156":"China",
  "170":"Colombia","180":"DR Congo","188":"Costa Rica","191":"Croatia","192":"Cuba","203":"Czech Republic",
  "208":"Denmark","214":"Dominican Republic","218":"Ecuador","818":"Egypt","231":"Ethiopia",
  "246":"Finland","250":"France","276":"Germany","288":"Ghana","300":"Greece","320":"Guatemala",
  "332":"Haiti","340":"Honduras","348":"Hungary","356":"India","360":"Indonesia","364":"Iran",
  "368":"Iraq","372":"Ireland","376":"Israel","380":"Italy","392":"Japan","400":"Jordan",
  "398":"Kazakhstan","404":"Kenya","408":"North Korea","410":"South Korea","414":"Kuwait",
  "422":"Lebanon","434":"Libya","458":"Malaysia","484":"Mexico","504":"Morocco","104":"Myanmar",
  "528":"Netherlands","554":"New Zealand","566":"Nigeria","578":"Norway","586":"Pakistan",
  "591":"Panama","604":"Peru","608":"Philippines","616":"Poland","620":"Portugal","634":"Qatar",
  "642":"Romania","643":"Russia","682":"Saudi Arabia","694":"Sierra Leone","706":"Somalia",
  "710":"South Africa","724":"Spain","729":"Sudan","752":"Sweden","756":"Switzerland","760":"Syria",
  "158":"Taiwan","764":"Thailand","788":"Tunisia","792":"Turkey","804":"Ukraine",
  "784":"United Arab Emirates","826":"United Kingdom","840":"United States","858":"Uruguay",
  "862":"Venezuela","704":"Vietnam","887":"Yemen","716":"Zimbabwe",
};

const DEFAULT_POSITION = { coordinates: [0, 10] as [number, number], zoom: 1 };

export default function PoliticsPage() {
  const router = useRouter();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [position, setPosition]   = useState(DEFAULT_POSITION);

  // Track whether the mouse moved enough to count as a drag (not a click)
  const dragRef      = useRef(false);
  const mouseDownPos = useRef<{ x: number; y: number } | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleMoveEnd = (pos: any) => setPosition(pos);

  const handleZoom = (delta: number) =>
    setPosition(p => ({ ...p, zoom: Math.min(8, Math.max(1, p.zoom + delta)) }));

  const handleClick = (geoId: string) => {
    if (dragRef.current) return;
    const active = ACTIVE[geoId];
    if (active) router.push(active.route);
  };

  const getFill = (geoId: string) => {
    if (geoId === hoveredId) return ACTIVE[geoId] ? "#6366f1" : "#3f3f46";
    return ACTIVE[geoId] ? "#4338ca" : "#1c1c1e";
  };

  const hoveredName    = hoveredId ? (COUNTRY_NAMES[hoveredId] ?? `Country ${hoveredId}`) : null;
  const isActiveHover  = hoveredId ? !!ACTIVE[hoveredId] : false;

  return (
    <main className="relative w-full h-screen bg-zinc-950 overflow-hidden">

      {/* World map */}
      <div
        className="absolute inset-0"
        onMouseDown={e => { mouseDownPos.current = { x: e.clientX, y: e.clientY }; dragRef.current = false; }}
        onMouseMove={e => {
          if (!mouseDownPos.current) return;
          const dx = e.clientX - mouseDownPos.current.x;
          const dy = e.clientY - mouseDownPos.current.y;
          if (Math.sqrt(dx * dx + dy * dy) > 4) dragRef.current = true;
        }}
        onMouseUp={() => { mouseDownPos.current = null; }}
      >
        <ComposableMap
          projection="geoNaturalEarth1"
          projectionConfig={{ scale: 160, center: [0, 10] }}
          style={{ width: "100%", height: "100%" }}
        >
          <ZoomableGroup
            zoom={position.zoom}
            center={position.coordinates}
            minZoom={1}
            maxZoom={8}
            onMoveEnd={handleMoveEnd}
          >
            <Geographies geography={GEO_URL}>
              {({ geographies }: { geographies: any[] }) =>
                geographies.map((geo: any) => {
                  const geoId = String(geo.id ?? "");
                  const active = !!ACTIVE[geoId];
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onClick={() => handleClick(geoId)}
                      onMouseEnter={() => setHoveredId(geoId)}
                      onMouseLeave={() => setHoveredId(null)}
                      style={{
                        default: {
                          fill: getFill(geoId),
                          stroke: "#2a2a2e",
                          strokeWidth: 0.4,
                          outline: "none",
                          cursor: active ? "pointer" : "grab",
                          transition: "fill 0.12s",
                        },
                        hover: {
                          fill: active ? "#6366f1" : "#3f3f46",
                          stroke: active ? "#818cf8" : "#3f3f46",
                          strokeWidth: 0.4,
                          outline: "none",
                          cursor: active ? "pointer" : "grab",
                        },
                        pressed: {
                          fill: active ? "#4f46e5" : "#3f3f46",
                          stroke: "#818cf8",
                          strokeWidth: 0.4,
                          outline: "none",
                        },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>

      {/* Zoom controls */}
      <div className="absolute bottom-8 left-6 z-10 flex flex-col gap-1">
        <button
          onClick={() => handleZoom(0.75)}
          className="w-8 h-8 bg-zinc-900/90 border border-zinc-700 rounded-t-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 flex items-center justify-center backdrop-blur-sm transition-colors"
        >
          <Plus size={13} />
        </button>
        <button
          onClick={() => handleZoom(-0.75)}
          className="w-8 h-8 bg-zinc-900/90 border border-zinc-700 rounded-b-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 flex items-center justify-center backdrop-blur-sm transition-colors"
        >
          <Minus size={13} />
        </button>
        <button
          onClick={() => setPosition(DEFAULT_POSITION)}
          title="Reset view"
          className="w-8 h-8 mt-1 bg-zinc-900/90 border border-zinc-700 rounded-lg text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800 flex items-center justify-center backdrop-blur-sm transition-colors"
        >
          <RotateCcw size={11} />
        </button>
      </div>

      {/* Hover tooltip */}
      {hoveredName && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
          <div className={`px-4 py-2 rounded-lg text-sm font-semibold border backdrop-blur-sm flex items-center gap-2 ${
            isActiveHover
              ? "bg-indigo-950/90 border-indigo-600/70 text-indigo-200"
              : "bg-zinc-900/90 border-zinc-700 text-zinc-400"
          }`}>
            {isActiveHover && <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />}
            {hoveredName}
            {isActiveHover && <span className="text-xs text-indigo-400 font-normal">→ click to open</span>}
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-8 right-6 z-10 flex flex-col gap-2 bg-zinc-900/70 backdrop-blur-sm border border-zinc-800 rounded-lg px-3 py-2.5">
        <div className="flex items-center gap-2">
          <div className="w-3.5 h-3 rounded-sm bg-[#4338ca]" />
          <span className="text-[11px] text-zinc-400">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3.5 h-3 rounded-sm bg-[#1c1c1e] border border-zinc-700" />
          <span className="text-[11px] text-zinc-600">Coming soon</span>
        </div>
      </div>

    </main>
  );
}
