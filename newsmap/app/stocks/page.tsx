"use client";

import { useCallback, useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import type { Quote } from "@/app/api/stocks/route";

interface StocksResponse {
  data:      Record<string, Quote>;
  timestamp: number;
}

// ── Instrument metadata ────────────────────────────────────────────────────
const META: Record<string, { name: string; sub?: string; isYield?: boolean }> = {
  "^GSPC":     { name: "S&P 500",        sub: "Large cap benchmark" },
  "^IXIC":     { name: "NASDAQ",         sub: "Tech & growth" },
  "^DJI":      { name: "Dow Jones",      sub: "30 blue chips" },
  "^RUT":      { name: "Russell 2000",   sub: "Small caps" },
  "^VIX":      { name: "VIX",           sub: "Fear index" },
  "^FTSE":     { name: "FTSE 100",       sub: "UK" },
  "^GDAXI":    { name: "DAX",           sub: "Germany" },
  "^N225":     { name: "Nikkei 225",     sub: "Japan" },
  "000001.SS": { name: "Shanghai",       sub: "China" },
  "^HSI":      { name: "Hang Seng",      sub: "Hong Kong" },
  "^TNX":      { name: "10Y Yield",      sub: "US Treasury", isYield: true },
  "^IRX":      { name: "3M T-Bill",      sub: "Short rate",  isYield: true },
  "GC=F":      { name: "Gold",           sub: "Safe haven / USD hedge" },
  "CL=F":      { name: "WTI Crude",      sub: "Oil / geopolitical" },
  "BTC-USD":   { name: "Bitcoin",        sub: "Risk appetite" },
  "DX-Y.NYB":  { name: "DXY",           sub: "Dollar index" },
};

// ── Formatting ─────────────────────────────────────────────────────────────
function fmtPrice(price: number, symbol: string): string {
  if (META[symbol]?.isYield)        return `${price.toFixed(2)}%`;
  if (symbol === "BTC-USD")         return `$${Math.round(price).toLocaleString("en-US")}`;
  if (symbol === "GC=F")            return `$${price.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
  if (price >= 10_000)              return price.toLocaleString("en-US", { maximumFractionDigits: 0 });
  if (price >= 1_000)               return price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return price.toFixed(2);
}

function fmtChange(change: number, symbol: string): string {
  const sign = change >= 0 ? "+" : "";
  if (META[symbol]?.isYield) return `${sign}${change.toFixed(2)}%`;
  if (symbol === "BTC-USD")  return `${sign}$${Math.round(Math.abs(change)).toLocaleString("en-US")}`;
  if (Math.abs(change) >= 1_000) return `${sign}${Math.abs(change).toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
  return `${sign}${Math.abs(change).toFixed(2)}`;
}

// ── VIX level helpers ──────────────────────────────────────────────────────
function vixColor(v: number) {
  if (v < 15) return "#4ade80";
  if (v < 20) return "#facc15";
  if (v < 30) return "#fb923c";
  return "#f87171";
}
function vixLabel(v: number) {
  if (v < 15) return "Calm";
  if (v < 20) return "Normal";
  if (v < 30) return "Elevated";
  return "Fear";
}

// ── Sparkline ──────────────────────────────────────────────────────────────
function Sparkline({ data, color }: { data: number[]; color: string }) {
  if (data.length < 2) return <div className="w-[72px] h-8" />;
  const min   = Math.min(...data);
  const max   = Math.max(...data);
  const range = max - min || 0.001;
  const W = 72, H = 32;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * W;
    const y = H - ((v - min) / range) * (H - 4) - 2;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
  return (
    <svg width={W} height={H} className="overflow-visible shrink-0">
      <polyline points={pts} fill="none" stroke={color}
        strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" opacity={0.85} />
    </svg>
  );
}

// ── Market Card ────────────────────────────────────────────────────────────
function MarketCard({ symbol, quote }: { symbol: string; quote: Quote | null }) {
  const meta = META[symbol];
  if (!meta) return null;

  if (!quote) {
    return (
      <div className="flex-1 min-w-[185px] bg-zinc-900/50 border border-zinc-800/60 rounded-xl p-4 space-y-3 animate-pulse">
        <div className="h-3 bg-zinc-800 rounded w-1/2" />
        <div className="h-7 bg-zinc-800 rounded w-3/4" />
        <div className="h-3 bg-zinc-800 rounded w-1/3" />
      </div>
    );
  }

  const isVix     = symbol === "^VIX";
  const positive  = quote.changePercent >= 0;
  const mainColor = isVix ? vixColor(quote.price) : positive ? "#4ade80" : "#f87171";

  return (
    <div className="flex-1 min-w-[185px] bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex flex-col gap-3 hover:border-zinc-600 transition-colors group">
      {/* Name row */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-[11px] font-bold text-zinc-300 uppercase tracking-wide leading-none">{meta.name}</p>
          {meta.sub && <p className="text-[10px] text-zinc-600 mt-0.5 leading-none">{meta.sub}</p>}
        </div>
        {isVix ? (
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md shrink-0"
            style={{ backgroundColor: mainColor + "22", color: mainColor }}>
            {vixLabel(quote.price)}
          </span>
        ) : (
          <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md shrink-0 ${
            quote.marketState === "REGULAR"
              ? "bg-green-950/60 text-green-500"
              : "bg-zinc-800 text-zinc-600"
          }`}>
            {quote.marketState === "REGULAR" ? "OPEN" : "CLOSED"}
          </span>
        )}
      </div>

      {/* Price */}
      <p className="text-2xl font-bold text-zinc-100 leading-none tracking-tight">
        {fmtPrice(quote.price, symbol)}
      </p>

      {/* Change + sparkline */}
      <div className="flex items-center justify-between gap-2 mt-auto">
        <div className="leading-none">
          <span className="text-xs font-bold" style={{ color: mainColor }}>
            {quote.changePercent >= 0 ? "+" : ""}{quote.changePercent.toFixed(2)}%
          </span>
          <span className="text-[10px] text-zinc-600 ml-1.5">
            {fmtChange(quote.change, symbol)}
          </span>
        </div>
        <Sparkline data={quote.sparkline} color={mainColor} />
      </div>
    </div>
  );
}

// ── Yield Curve Card ───────────────────────────────────────────────────────
function YieldCurveCard({ tnx, irx }: { tnx: Quote | null; irx: Quote | null }) {
  if (!tnx || !irx) {
    return (
      <div className="flex-1 min-w-[185px] bg-zinc-900/50 border border-zinc-800/60 rounded-xl p-4 space-y-3 animate-pulse">
        <div className="h-3 bg-zinc-800 rounded w-1/2" />
        <div className="h-7 bg-zinc-800 rounded w-3/4" />
        <div className="h-3 bg-zinc-800 rounded w-1/3" />
      </div>
    );
  }
  const spread   = tnx.price - irx.price;
  const inverted = spread < 0;
  const color    = inverted ? "#f87171" : "#4ade80";

  return (
    <div className={`flex-1 min-w-[185px] bg-zinc-900 border rounded-xl p-4 flex flex-col gap-3 transition-colors ${
      inverted ? "border-red-900/50 hover:border-red-700/50" : "border-zinc-800 hover:border-zinc-600"
    }`}>
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-[11px] font-bold text-zinc-300 uppercase tracking-wide leading-none">Yield Curve</p>
          <p className="text-[10px] text-zinc-600 mt-0.5 leading-none">10Y − 3M spread</p>
        </div>
        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md shrink-0"
          style={{ backgroundColor: color + "22", color }}>
          {inverted ? "INVERTED" : "Normal"}
        </span>
      </div>

      <p className="text-2xl font-bold leading-none tracking-tight" style={{ color }}>
        {spread >= 0 ? "+" : ""}{spread.toFixed(2)}%
      </p>

      <p className="text-[10px] text-zinc-600 mt-auto">
        {inverted
          ? "⚠ Historically precedes recession by 12–18 months"
          : "Upward sloping — no inversion signal"}
      </p>
    </div>
  );
}

// ── Section wrapper ────────────────────────────────────────────────────────
function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <div className="flex items-center gap-3">
        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.15em]">{label}</span>
        <div className="flex-1 h-px bg-zinc-800" />
      </div>
      <div className="flex flex-wrap gap-3">{children}</div>
    </section>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function StocksPage() {
  const [data,       setData]       = useState<StocksResponse | null>(null);
  const [loading,    setLoading]    = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res  = await fetch("/api/stocks");
      const json = await res.json() as StocksResponse;
      setData(json);
      setLastUpdate(new Date());
    } catch (e) {
      console.error("Stock fetch failed:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const id = setInterval(fetchData, 60_000);
    return () => clearInterval(id);
  }, [fetchData]);

  const q = (sym: string) => data?.data[sym] ?? null;

  return (
    <main className="min-h-screen bg-zinc-950 pt-12 overflow-auto">
      <div className="max-w-screen-2xl mx-auto px-6 py-6 space-y-8">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-base font-bold text-zinc-100 tracking-tight">Markets</h1>
            <p className="text-[11px] text-zinc-500 mt-0.5">
              Global financial dashboard · refreshes every 60 s
            </p>
          </div>
          <div className="flex items-center gap-3">
            {lastUpdate && (
              <span className="text-[11px] text-zinc-600">
                Updated {lastUpdate.toLocaleTimeString()}
              </span>
            )}
            <button
              onClick={fetchData}
              title="Refresh"
              className="p-2 rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-400
                hover:text-zinc-200 hover:border-zinc-500 transition-colors"
            >
              <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
            </button>
          </div>
        </div>

        {/* Row 1 — US Equities + VIX */}
        <Section label="US Equities">
          {(["^GSPC", "^IXIC", "^DJI", "^RUT", "^VIX"] as const).map(sym => (
            <MarketCard key={sym} symbol={sym} quote={q(sym)} />
          ))}
        </Section>

        {/* Row 2 — Global Indices */}
        <Section label="Global Indices">
          {(["^FTSE", "^GDAXI", "^N225", "000001.SS", "^HSI"] as const).map(sym => (
            <MarketCard key={sym} symbol={sym} quote={q(sym)} />
          ))}
        </Section>

        {/* Row 3 — Macro */}
        <Section label="Macro">
          <MarketCard symbol="^TNX"      quote={q("^TNX")} />
          <MarketCard symbol="^IRX"      quote={q("^IRX")} />
          <YieldCurveCard tnx={q("^TNX")} irx={q("^IRX")} />
          <MarketCard symbol="GC=F"      quote={q("GC=F")} />
          <MarketCard symbol="CL=F"      quote={q("CL=F")} />
          <MarketCard symbol="BTC-USD"   quote={q("BTC-USD")} />
          <MarketCard symbol="DX-Y.NYB"  quote={q("DX-Y.NYB")} />
        </Section>

      </div>
    </main>
  );
}
