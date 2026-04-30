"use client";

import { useState, useEffect, useMemo } from "react";
import { Map, Building2, MapPinned, DollarSign } from "lucide-react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import StateInfoPopup from "@/components/political/StateInfoPopup";
import StateDetailPanel from "@/components/political/StateDetailPanel";
import SenatorChartPopup from "@/components/political/SenatorChartPopup";
import RepresentativeChartPopup from "@/components/political/RepresentativeChartPopup";
import DistrictInfoPopup from "@/components/political/DistrictInfoPopup";
import PACSearchView from "@/components/political/PACSearchView";
import PACPoliticianPopup, { PACPoliticianPopupData } from "@/components/political/PACPoliticianPopup";
import { stateSenatorData, StateInfo } from "@/lib/political/state-senators-data";
import { districtRepresentativeData, DistrictInfo } from "@/lib/political/district-representatives-data";
import { ELECTIONS, ELECTION_YEARS, ElectionYear } from "@/data/presidential-elections";
import presidentialPacRaw from "@/data/presidential-pac-data.json";

type PresidentialPacData = Record<string, Record<string, { totalReceived: number; pacs: Array<{ name: string; amount: number }> }>>;
const presidentialPacData = presidentialPacRaw as PresidentialPacData;

type CountyData = Record<string, { gop: number; dem: number; name: string }>;

async function loadCountyData(year: ElectionYear): Promise<CountyData> {
  switch (year) {
    case 2000: return (await import("@/data/county-election-2000.json")).default as unknown as CountyData;
    case 2004: return (await import("@/data/county-election-2004.json")).default as unknown as CountyData;
    case 2008: return (await import("@/data/county-election-2008.json")).default as unknown as CountyData;
    case 2012: return (await import("@/data/county-election-2012.json")).default as unknown as CountyData;
    case 2016: return (await import("@/data/county-election-2016.json")).default as unknown as CountyData;
    case 2020: return (await import("@/data/county-election-2020.json")).default as unknown as CountyData;
    case 2024: return (await import("@/data/county-election-2024.json")).default as unknown as CountyData;
  }
}

function getCountyElectionColor(fips: string, data: CountyData): string {
  const d = data[fips];
  if (!d) return "#27272a";
  const margin = d.gop - d.dem;
  if (margin > 0.4)   return "#7f1d1d";
  if (margin > 0.2)   return "#991b1b";
  if (margin > 0.05)  return "#b91c1c";
  if (margin > -0.05) return "#7c3aed";
  if (margin > -0.2)  return "#1d4ed8";
  if (margin > -0.4)  return "#1e3a8a";
  return "#172554";
}

const countiesGeoUrl  = "https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json";
const statesGeoUrl    = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";
const districtsGeoUrl = "/congressional_districts_118_simplified.geojson";

const stateFipsToAbbr: Record<string, string> = {
  "01":"AL","02":"AK","04":"AZ","05":"AR","06":"CA","08":"CO","09":"CT","10":"DE",
  "11":"DC","12":"FL","13":"GA","15":"HI","16":"ID","17":"IL","18":"IN","19":"IA",
  "20":"KS","21":"KY","22":"LA","23":"ME","24":"MD","25":"MA","26":"MI","27":"MN",
  "28":"MS","29":"MO","30":"MT","31":"NE","32":"NV","33":"NH","34":"NJ","35":"NM",
  "36":"NY","37":"NC","38":"ND","39":"OH","40":"OK","41":"OR","42":"PA","44":"RI",
  "45":"SC","46":"SD","47":"TN","48":"TX","49":"UT","50":"VT","51":"VA","53":"WA",
  "54":"WV","55":"WI","56":"WY","72":"PR",
};

interface GeoData { id: string; name: string; fips: string }

export default function USMapCanvas() {
  const [viewMode,           setViewMode]           = useState<"counties"|"states"|"districts"|"pacs">("counties");
  const [hoveredItem,        setHoveredItem]         = useState<GeoData | null>(null);
  const [hoveredStateInfo,   setHoveredStateInfo]    = useState<StateInfo | null>(null);
  const [hoveredDistInfo,    setHoveredDistInfo]     = useState<DistrictInfo | null>(null);
  const [selectedStateInfo,  setSelectedStateInfo]   = useState<StateInfo | null>(null);
  const [selectedSenator,    setSelectedSenator]     = useState<string | null>(null);
  const [selectedRepName,    setSelectedRepName]     = useState<string | null>(null);
  const [mousePos,           setMousePos]            = useState({ x: 0, y: 0 });
  const [selectedCounties,   setSelectedCounties]    = useState<Set<string>>(new Set());
  const [selectedStates,     setSelectedStates]      = useState<Set<string>>(new Set());
  const [countyColors,       setCountyColors]        = useState<Record<string,string>>({});
  const [stateColors,        setStateColors]         = useState<Record<string,string>>({});
  const [position,           setPosition]            = useState({ coordinates: [0,0], zoom: 1 });
  const [selectedYear,       setSelectedYear]        = useState<ElectionYear>(2024);
  const [countyElectionData, setCountyElectionData]  = useState<CountyData>({});
  const [isLoadingYear,      setIsLoadingYear]       = useState(false);
  const [selectedPresCand,   setSelectedPresCand]    = useState<PACPoliticianPopupData | null>(null);

  const geoUrl = viewMode === "counties" ? countiesGeoUrl : viewMode === "states" ? statesGeoUrl : viewMode === "districts" ? districtsGeoUrl : statesGeoUrl;

  useEffect(() => {
    setIsLoadingYear(true);
    loadCountyData(selectedYear).then(data => { setCountyElectionData(data); setIsLoadingYear(false); });
  }, [selectedYear]);

  const openCandidatePopup = (candidateName: string, party: "D"|"R") => {
    const yearData = presidentialPacData[String(selectedYear)];
    const candData = yearData?.[candidateName];
    const pacs = (candData?.pacs ?? []).filter(p => p.name && p.name.trim() !== "").map(p => ({ name: p.name, amount: p.amount }));
    setSelectedPresCand({
      name: candidateName, type: "presidential", party, state: `${selectedYear} Presidential`,
      totalReceived: candData?.totalReceived ?? 0, pacs,
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleItemClick = (geo: any) => {
    let fips = viewMode === "districts" ? (geo.properties?.GEOID || geo.id || "") : (geo.id || geo.properties?.id || "");

    if (viewMode === "counties") {
      const next = new Set(selectedCounties);
      if (next.has(fips)) { next.delete(fips); const c = {...countyColors}; delete c[fips]; setCountyColors(c); }
      else { next.add(fips); setCountyColors({ ...countyColors, [fips]: "#6366f1" }); }
      setSelectedCounties(next);
    } else if (viewMode === "states") {
      if (stateSenatorData[fips]) setSelectedStateInfo(stateSenatorData[fips]);
      const next = new Set(selectedStates);
      if (next.has(fips)) { next.delete(fips); const c = {...stateColors}; delete c[fips]; setStateColors(c); }
      else { next.add(fips); setStateColors({ ...stateColors, [fips]: "#6366f1" }); }
      setSelectedStates(next);
    } else if (viewMode === "districts") {
      const di = districtRepresentativeData[fips];
      if (di && di.representative.name !== "Vacancy") setSelectedRepName(di.representative.name);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleMouseEnter = (geo: any) => {
    let fips = "", name = "";
    if (viewMode === "counties") {
      fips = geo.id || geo.properties?.id || "";
      name = geo.properties?.name || `County ${fips}`;
    } else if (viewMode === "states") {
      fips = geo.id || geo.properties?.id || "";
      name = geo.properties?.name || `State ${fips}`;
      if (stateSenatorData[fips]) setHoveredStateInfo(stateSenatorData[fips]);
    } else {
      fips = geo.properties?.GEOID || geo.id || "";
      const stateFips = geo.properties?.STATEFP || "";
      const distNum   = geo.properties?.CD118FP || "";
      const abbr      = stateFipsToAbbr[stateFips] || stateFips;
      name = distNum === "00" ? `${abbr}-AL` : `${abbr}-${distNum}`;
      const di = districtRepresentativeData[fips];
      if (di) setHoveredDistInfo(di);
    }
    setHoveredItem({ id: geo.rsmKey || fips, name, fips });
  };

  const handleMouseLeave = () => { setHoveredItem(null); setHoveredStateInfo(null); setHoveredDistInfo(null); };
  const handleMouseMove = (e: React.MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getItemColor = (geo: any): string => {
    if (viewMode === "counties") {
      const fips = geo.id || geo.properties?.id || "";
      if (countyColors[fips]) return countyColors[fips];
      return getCountyElectionColor(fips, countyElectionData);
    }
    return "#27272a";
  };

  const election = useMemo(() => ELECTIONS[selectedYear], [selectedYear]);
  const gopWon   = election.winner === "gop";

  const tabs = [
    { id: "pacs"      as const, label: "PACs",      icon: <DollarSign size={15} /> },
    { id: "counties"  as const, label: "Counties",  icon: <Map size={15} /> },
    { id: "states"    as const, label: "States",    icon: <Building2 size={15} /> },
    { id: "districts" as const, label: "Districts", icon: <MapPinned size={15} /> },
  ];

  return (
    <div className="relative w-full h-full bg-zinc-950" onMouseMove={handleMouseMove}>
      {/* Tab bar */}
      <div className="absolute top-16 right-4 z-10 flex gap-2">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => { setViewMode(tab.id); setHoveredStateInfo(null); setHoveredDistInfo(null); }}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold shadow transition-all ${
              viewMode === tab.id
                ? "bg-indigo-600 text-white scale-105"
                : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-zinc-600 hover:text-zinc-200"
            }`}>
            {tab.icon}{tab.label}
          </button>
        ))}
      </div>

      {/* PACs view or map */}
      {viewMode === "pacs" ? (
        <PACSearchView onPoliticianClick={(name, type) => {
          if (type === "senator") setSelectedSenator(name);
          else setSelectedRepName(name);
        }} />
      ) : (
        <div className="w-full h-full">
          <ComposableMap projection="geoAlbersUsa" projectionConfig={{ scale: 1000 }} className="w-full h-full">
            <ZoomableGroup zoom={position.zoom} center={position.coordinates as [number,number]}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onMoveEnd={(p: any) => setPosition(p)}>
              <Geographies geography={geoUrl}>
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {({ geographies }: { geographies: any[] }) => geographies.map((geo: any) => {
                  let fips = viewMode === "districts" ? (geo.properties?.GEOID || geo.id || "") : (geo.id || geo.properties?.id || "");
                  const isHov = hoveredItem?.fips === fips;
                  const zf = position.zoom > 1 ? 1 / position.zoom : 1;
                  const baseStroke = viewMode === "states" ? 0.3 : 0.15;
                  const stroke = baseStroke * Math.max(0.5, zf);
                  const strokeColor = viewMode === "states" ? "#3b82f6" : viewMode === "districts" ? "#4b5563" : "#3f3f46";
                  const fillColor = stateColors[fips] || getItemColor(geo);

                  return (
                    <Geography key={geo.rsmKey} geography={geo}
                      onMouseEnter={() => handleMouseEnter(geo)}
                      onMouseLeave={handleMouseLeave}
                      onClick={() => handleItemClick(geo)}
                      style={{
                        default: { fill: fillColor, stroke: strokeColor, strokeWidth: stroke, outline: "none", cursor: "pointer", transition: "fill 0.15s" },
                        hover:   { fill: isHov ? "#4f46e5" : fillColor, stroke: strokeColor, strokeWidth: stroke, outline: "none", cursor: "pointer" },
                        pressed: { fill: "#6366f1", stroke: strokeColor, strokeWidth: stroke, outline: "none" },
                      }}
                    />
                  );
                })}
              </Geographies>

              {viewMode === "districts" && (
                <Geographies geography={statesGeoUrl}>
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {({ geographies }: { geographies: any[] }) => {
                    const zf = position.zoom > 1 ? 1 / position.zoom : 1;
                    const sw = 0.25 * Math.max(0.5, zf);
                    return geographies.map((geo: any) => (
                      <Geography key={`s-${geo.rsmKey}`} geography={geo}
                        style={{ default: { fill:"none", stroke:"#3b82f6", strokeWidth:sw, outline:"none", pointerEvents:"none" }, hover:{fill:"none",stroke:"#3b82f6",strokeWidth:sw,outline:"none",pointerEvents:"none"}, pressed:{fill:"none",stroke:"#3b82f6",strokeWidth:sw,outline:"none",pointerEvents:"none"} }}
                      />
                    ));
                  }}
                </Geographies>
              )}
            </ZoomableGroup>
          </ComposableMap>
        </div>
      )}

      {/* State hover popup */}
      {hoveredStateInfo && viewMode === "states" && (
        <StateInfoPopup stateInfo={hoveredStateInfo} position={mousePos} />
      )}

      {/* District hover popup */}
      {hoveredDistInfo && viewMode === "districts" && (
        <DistrictInfoPopup districtInfo={hoveredDistInfo} position={mousePos}
          onRepresentativeClick={name => setSelectedRepName(name)} />
      )}

      {/* State detail panel */}
      {selectedStateInfo && viewMode === "states" && (
        <StateDetailPanel stateInfo={selectedStateInfo} onClose={() => setSelectedStateInfo(null)}
          onSenatorClick={name => setSelectedSenator(name)} />
      )}

      {/* Senator PAC chart */}
      {selectedSenator && (
        <SenatorChartPopup senatorName={selectedSenator} onClose={() => setSelectedSenator(null)} />
      )}

      {/* Representative PAC chart */}
      {selectedRepName && (
        <RepresentativeChartPopup representativeName={selectedRepName} onClose={() => setSelectedRepName(null)} />
      )}

      {/* County hover tooltip */}
      {hoveredItem && viewMode === "counties" && (() => {
        const ed = countyElectionData[hoveredItem.fips];
        const gopName = election.gop.name.split(" ").pop()!;
        const demName = election.dem.name.split(" ").pop()!;
        return (
          <div className="absolute bottom-36 left-4 bg-zinc-950/95 text-zinc-200 px-4 py-3 rounded-xl shadow-2xl text-sm z-20 border border-zinc-800 min-w-[180px]">
            <div className="font-bold text-sm text-zinc-100 mb-1">{hoveredItem.name}</div>
            {ed ? (
              <>
                <div className="flex items-center justify-between gap-4 text-xs">
                  <span className="font-semibold text-red-500">{gopName}</span>
                  <span className="font-bold text-red-400">{(ed.gop * 100).toFixed(1)}%</span>
                </div>
                <div className="flex items-center justify-between gap-4 text-xs">
                  <span className="font-semibold text-blue-500">{demName}</span>
                  <span className="font-bold text-blue-400">{(ed.dem * 100).toFixed(1)}%</span>
                </div>
                <div className="mt-1 pt-1 border-t border-zinc-800 text-[10px] text-zinc-400">
                  {ed.gop > ed.dem ? gopName : demName} +{Math.abs((ed.gop - ed.dem) * 100).toFixed(1)}%
                </div>
              </>
            ) : (
              <div className="text-xs text-zinc-600 mt-1">No data</div>
            )}
          </div>
        );
      })()}

      {/* Presidential candidate popup */}
      {selectedPresCand && (
        <PACPoliticianPopup politician={selectedPresCand} onClose={() => setSelectedPresCand(null)} />
      )}

      {/* Election year bar + candidates */}
      {viewMode === "counties" && (
        <div className="absolute bottom-0 left-0 right-0 z-20 bg-zinc-950/95 backdrop-blur-sm border-t border-zinc-800 shadow-lg px-6 py-3">
          <div className="flex items-center gap-4 max-w-5xl mx-auto">

            {/* DEM candidate */}
            <div
              onClick={() => openCandidatePopup(election.dem.name, "D")}
              className={`flex items-center gap-2 flex-shrink-0 px-3 py-1.5 rounded-lg border-2 transition-all cursor-pointer hover:bg-blue-950/40 ${!gopWon ? 'border-blue-600 bg-blue-950/30' : 'border-zinc-800'}`}
            >
              <div className="relative">
                <img src={election.dem.photo} alt={election.dem.name}
                  className="w-9 h-9 rounded-full object-cover object-top border-2 border-blue-500"
                  onError={e => { e.currentTarget.style.display='none'; }} />
                {!gopWon && <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center text-white text-[8px] font-bold">✓</div>}
              </div>
              <div>
                <div className="text-xs font-bold text-blue-400 leading-tight">{election.dem.name}</div>
                <div className="text-[10px] text-blue-600">{election.demEV} EV</div>
              </div>
            </div>

            {/* Year selector */}
            <div className="flex-1 flex flex-col items-center gap-1">
              <div className="text-xs text-zinc-500 font-medium">
                {isLoadingYear ? "Loading…" : `${selectedYear} Presidential Election`}
              </div>
              <div className="flex items-center gap-1">
                {ELECTION_YEARS.map(yr => (
                  <button key={yr} onClick={() => setSelectedYear(yr)}
                    className={`px-2 py-1 rounded text-[11px] font-semibold transition-all ${
                      yr === selectedYear
                        ? (ELECTIONS[yr].winner === "gop" ? 'bg-red-700 text-white scale-110 shadow-md' : 'bg-blue-700 text-white scale-110 shadow-md')
                        : 'bg-zinc-900 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300 border border-zinc-800'
                    }`}>
                    {yr}
                  </button>
                ))}
              </div>
            </div>

            {/* GOP candidate */}
            <div
              onClick={() => openCandidatePopup(election.gop.name, "R")}
              className={`flex items-center gap-2 flex-shrink-0 px-3 py-1.5 rounded-lg border-2 transition-all cursor-pointer hover:bg-red-950/40 ${gopWon ? 'border-red-600 bg-red-950/30' : 'border-zinc-800'}`}
            >
              <div>
                <div className="text-xs font-bold text-red-400 text-right leading-tight">{election.gop.name}</div>
                <div className="text-[10px] text-red-600 text-right">{election.gopEV} EV</div>
              </div>
              <div className="relative">
                <img src={election.gop.photo} alt={election.gop.name}
                  className="w-9 h-9 rounded-full object-cover object-top border-2 border-red-500"
                  onError={e => { e.currentTarget.style.display='none'; }} />
                {gopWon && <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-[8px] font-bold">✓</div>}
              </div>
            </div>
          </div>

          {/* Color legend */}
          <div className="flex items-center justify-center gap-1 mt-2">
            {[
              { color: "#172554", label: "D +40%" }, { color: "#1e3a8a", label: "+20%" }, { color: "#1d4ed8", label: "+5%" },
              { color: "#7c3aed", label: "Tie" },
              { color: "#b91c1c", label: "+5%" }, { color: "#991b1b", label: "+20%" }, { color: "#7f1d1d", label: "R +40%" },
            ].map(({ color, label }) => (
              <div key={label} className="flex items-center gap-0.5">
                <div className="w-5 h-2.5 rounded-sm" style={{ backgroundColor: color }} />
                <span className="text-[9px] text-zinc-600">{label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
