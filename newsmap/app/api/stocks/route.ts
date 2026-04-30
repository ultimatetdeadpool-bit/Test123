import { NextResponse } from "next/server";

export interface Quote {
  symbol:        string;
  price:         number;
  change:        number;
  changePercent: number;
  currency:      string;
  marketState:   string;
  sparkline:     number[];
}

// Yield tickers: Yahoo returns value × 10 when price > 20 (e.g. 42.5 = 4.25%)
const YIELD_SYMBOLS = new Set(["^TNX", "^IRX", "^FVX", "^TYX"]);

const SYMBOLS = [
  "^GSPC", "^IXIC", "^DJI", "^RUT", "^VIX",
  "^FTSE", "^GDAXI", "^N225", "000001.SS", "^HSI",
  "^TNX", "^IRX",
  "GC=F", "CL=F", "BTC-USD", "DX-Y.NYB",
];

async function fetchQuote(symbol: string): Promise<Quote> {
  const url =
    `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}` +
    `?interval=5m&range=1d&includePrePost=false`;

  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; newsmap/1.0)" },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${symbol}`);

  const json = await res.json();
  const result = json.chart?.result?.[0];
  if (!result) throw new Error(`empty result for ${symbol}`);

  const meta = result.meta;
  const rawCloses: (number | null)[] = result.indicators?.quote?.[0]?.close ?? [];
  let sparkline = rawCloses.filter((v): v is number => v !== null).slice(-24);

  let price: number    = meta.regularMarketPrice;
  const prevClose: number = meta.chartPreviousClose ?? meta.previousClose ?? price;

  // Normalise Yahoo's × 10 encoding for yield indices
  const isYield = YIELD_SYMBOLS.has(symbol);
  const divisor = isYield && price > 20 ? 10 : 1;
  price        = price / divisor;
  sparkline    = sparkline.map(v => v / divisor);

  const prev    = prevClose / divisor;
  const change  = price - prev;
  const changePercent = prev !== 0 ? (change / prev) * 100 : 0;

  return {
    symbol,
    price,
    change,
    changePercent,
    currency:    meta.currency ?? "USD",
    marketState: meta.marketState ?? "CLOSED",
    sparkline,
  };
}

export async function GET() {
  const settled = await Promise.allSettled(SYMBOLS.map(fetchQuote));
  const data: Record<string, Quote> = {};
  settled.forEach((r, i) => {
    if (r.status === "fulfilled") data[SYMBOLS[i]] = r.value;
  });

  return NextResponse.json(
    { data, timestamp: Date.now() },
    { headers: { "Cache-Control": "no-store" } },
  );
}
