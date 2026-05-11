"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type { NewsArticle } from "@/lib/types";
import type { LocalNewsSource } from "@/lib/local-news-sources";
import { CATEGORY_COLORS } from "@/lib/category-colors";

interface GlobeMapProps {
  articles: NewsArticle[];
  onCountryClick: (country: string) => void;
  localSources?: LocalNewsSource[];
  onLocalSourceClick?: (sourceId: string) => void;
}

// Donut-chart canvas texture — one per unique category breakdown
const donutCache = new Map<string, string>();
function makeDonutDataUrl(segments: { color: string; count: number }[], total: number): string {
  const key = segments.map(s => `${s.color}:${s.count}`).join(",");
  if (donutCache.has(key)) return donutCache.get(key)!;

  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const c = size / 2;
  const outerR = 50;
  const innerR = 22;
  const GAP = segments.length > 1 ? 0.05 : 0; // radians gap between slices

  // Dominant segment drives the glow color
  const dominant = segments.reduce((a, b) => (a.count >= b.count ? a : b));
  const dr = parseInt(dominant.color.slice(1, 3), 16);
  const dg = parseInt(dominant.color.slice(3, 5), 16);
  const db = parseInt(dominant.color.slice(5, 7), 16);

  // Outer glow
  const glow = ctx.createRadialGradient(c, c, innerR, c, c, c);
  glow.addColorStop(0,   `rgba(${dr},${dg},${db},0.40)`);
  glow.addColorStop(0.5, `rgba(${dr},${dg},${db},0.12)`);
  glow.addColorStop(1,   `rgba(${dr},${dg},${db},0)`);
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, size, size);

  // Donut slices
  let startAngle = -Math.PI / 2;
  for (const seg of segments) {
    if (seg.count === 0) continue;
    const sweep = (seg.count / total) * Math.PI * 2 - GAP;
    if (sweep <= 0) { startAngle += GAP; continue; }

    ctx.beginPath();
    ctx.arc(c, c, outerR, startAngle, startAngle + sweep);
    ctx.arc(c, c, innerR, startAngle + sweep, startAngle, true);
    ctx.closePath();
    ctx.fillStyle = seg.color;
    ctx.fill();

    startAngle += sweep + GAP;
  }

  // White inner glow (donut hole)
  const hole = ctx.createRadialGradient(c, c, 0, c, c, innerR);
  hole.addColorStop(0,   "rgba(255,255,255,0.95)");
  hole.addColorStop(0.35,"rgba(255,255,255,0.50)");
  hole.addColorStop(1,   "rgba(255,255,255,0)");
  ctx.fillStyle = hole;
  ctx.beginPath();
  ctx.arc(c, c, innerR, 0, Math.PI * 2);
  ctx.fill();

  const url = canvas.toDataURL();
  donutCache.set(key, url);
  return url;
}

// Concentric-ring beacon texture for local news sources
const beaconCache = new Map<string, string>();
function makeBeaconDataUrl(hex: string): string {
  if (beaconCache.has(hex)) return beaconCache.get(hex)!;
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const c = size / 2;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  ctx.beginPath();
  ctx.arc(c, c, 50, 0, Math.PI * 2);
  ctx.strokeStyle = `rgba(${r},${g},${b},0.25)`;
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(c, c, 34, 0, Math.PI * 2);
  ctx.strokeStyle = `rgba(${r},${g},${b},0.55)`;
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(c, c, 18, 0, Math.PI * 2);
  ctx.strokeStyle = `rgba(${r},${g},${b},0.9)`;
  ctx.lineWidth = 2.5;
  ctx.stroke();

  const grad = ctx.createRadialGradient(c, c, 0, c, c, 10);
  grad.addColorStop(0,   "rgba(255,255,255,1)");
  grad.addColorStop(0.4, `rgba(${r},${g},${b},1)`);
  grad.addColorStop(1,   `rgba(${r},${g},${b},0)`);
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(c, c, 10, 0, Math.PI * 2);
  ctx.fill();

  const url = canvas.toDataURL();
  beaconCache.set(hex, url);
  return url;
}

export default function GlobeMap({
  articles,
  onCountryClick,
  localSources = [],
  onLocalSourceClick,
}: GlobeMapProps) {
  const containerRef       = useRef<HTMLDivElement>(null);
  const viewerRef          = useRef<unknown>(null);
  const articlesRef        = useRef<NewsArticle[]>(articles);
  const localSourcesRef    = useRef<LocalNewsSource[]>(localSources);
  const onCountryClickRef  = useRef(onCountryClick);
  const onLocalClickRef    = useRef(onLocalSourceClick);
  const countryMap         = useRef<Map<string, string>>(new Map()); // entityId → country name
  const localSourceMap     = useRef<Map<string, string>>(new Map()); // entityId → sourceId
  const [is3D,     setIs3D]     = useState(true);
  const [morphing, setMorphing] = useState(false);
  const [drawVersion, setDrawVersion] = useState(0);

  useEffect(() => { articlesRef.current    = articles;         }, [articles]);
  useEffect(() => { localSourcesRef.current = localSources;   }, [localSources]);
  useEffect(() => { onCountryClickRef.current = onCountryClick; }, [onCountryClick]);
  useEffect(() => { onLocalClickRef.current = onLocalSourceClick; }, [onLocalSourceClick]);
  useEffect(() => { setDrawVersion(v => v + 1); }, [articles]);

  // ── Cesium init ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!containerRef.current) return;
    let destroyed = false;

    const init = async () => {
      (window as unknown as Record<string, string>).CESIUM_BASE_URL = "/cesium";
      const Cesium = await import("cesium");
      await import("cesium/Build/Cesium/Widgets/widgets.css");
      if (destroyed) return;

      Cesium.Ion.defaultAccessToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.placeholder";

      const baseLayer = Cesium.ImageryLayer.fromProviderAsync(
        Promise.resolve(new Cesium.UrlTemplateImageryProvider({
          url:          "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
          subdomains:   ["a", "b", "c", "d"],
          maximumLevel: 18,
        }))
      );

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const viewer: any = new Cesium.Viewer(containerRef.current!, {
        baseLayer,
        baseLayerPicker:       false,
        geocoder:              false,
        homeButton:            false,
        sceneModePicker:       false,
        navigationHelpButton:  false,
        animation:             false,
        timeline:              false,
        fullscreenButton:      false,
        infoBox:               false,
        selectionIndicator:    false,
        terrainProvider:       new Cesium.EllipsoidTerrainProvider(),
        skyBox:                false,
        skyAtmosphere:         false,
        creditContainer:       document.createElement("div"),
      });

      viewer.scene.backgroundColor = Cesium.Color.BLACK;
      viewer.scene.globe.enableLighting = false;
      viewer.scene.globe.baseColor = Cesium.Color.fromCssColorString("#0a0a0a");

      viewer.screenSpaceEventHandler.setInputAction(
        (click: { position: unknown }) => {
          const picked = viewer.scene.pick(click.position);
          if (picked?.id?.id) {
            const id = picked.id.id as string;
            const country = countryMap.current.get(id);
            if (country) { onCountryClickRef.current(country); return; }
            const sourceId = localSourceMap.current.get(id);
            if (sourceId) onLocalClickRef.current?.(sourceId);
          }
        },
        Cesium.ScreenSpaceEventType.LEFT_CLICK
      );

      viewerRef.current = viewer;
      drawMarkers(Cesium, viewer);
    };

    init().catch(console.error);

    return () => {
      destroyed = true;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const v = viewerRef.current as any;
      if (v && !v.isDestroyed()) v.destroy();
      viewerRef.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Draw / redraw country beacons ────────────────────────────────────────
  const drawMarkers = useCallback(async (CesiumArg?: unknown, viewerArg?: unknown) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const viewer: any = (viewerArg ?? viewerRef.current) as any;
    if (!viewer || viewer.isDestroyed()) return;

    const Cesium = CesiumArg ?? (await import("cesium"));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const C = Cesium as any;

    viewer.entities.removeAll();
    countryMap.current.clear();
    localSourceMap.current.clear();

    // Group articles by country
    const byCountry = new Map<string, NewsArticle[]>();
    for (const article of articlesRef.current) {
      const arr = byCountry.get(article.country) ?? [];
      arr.push(article);
      byCountry.set(article.country, arr);
    }

    // One donut beacon per country
    for (const [country, countryArticles] of byCountry) {
      const total = countryArticles.length;
      const { lat, lon } = countryArticles[0];

      // Tally articles per category
      const catCounts = new Map<string, number>();
      for (const a of countryArticles) {
        catCounts.set(a.category, (catCounts.get(a.category) ?? 0) + 1);
      }

      const segments = Object.entries(CATEGORY_COLORS)
        .map(([cat, color]) => ({ color, count: catCounts.get(cat) ?? 0 }))
        .filter(s => s.count > 0);

      const image = makeDonutDataUrl(segments, total);

      // Billboard size scales logarithmically with article count (32–80 px)
      const billboardSize = Math.min(80, 32 + 48 * (Math.log(total + 1) / Math.log(51)));

      const phase = Math.random() * Math.PI * 2;
      const speed = 0.35 + Math.random() * 0.25;

      const entity = viewer.entities.add({
        position: C.Cartesian3.fromDegrees(lon, lat),
        billboard: {
          image,
          width:  billboardSize,
          height: billboardSize,
          scale: new C.CallbackProperty(() => {
            const t = Date.now() / 1000;
            return 1.0 + 0.07 * Math.sin(t * speed + phase);
          }, false),
          verticalOrigin:   C.VerticalOrigin.CENTER,
          horizontalOrigin: C.HorizontalOrigin.CENTER,
          eyeOffset: new C.Cartesian3(0, 0, -2000),
        },
      });

      countryMap.current.set(entity.id, country);
    }

    // Local news source beacons
    for (const source of localSourcesRef.current) {
      const image = makeBeaconDataUrl(source.color);
      const phase = Math.random() * Math.PI * 2;

      const entity = viewer.entities.add({
        position: C.Cartesian3.fromDegrees(source.lon, source.lat),
        billboard: {
          image,
          width:  48,
          height: 48,
          scale: new C.CallbackProperty(() => {
            const t = Date.now() / 1000;
            return 1.0 + 0.15 * Math.sin(t * 0.8 + phase);
          }, false),
          verticalOrigin:   C.VerticalOrigin.CENTER,
          horizontalOrigin: C.HorizontalOrigin.CENTER,
          eyeOffset: new C.Cartesian3(0, 0, -1000),
        },
      });

      localSourceMap.current.set(entity.id, source.id);
    }
  }, []);

  useEffect(() => {
    if (!viewerRef.current) return;
    drawMarkers();
  }, [drawVersion, drawMarkers]);

  // ── 2D / 3D toggle ───────────────────────────────────────────────────────
  const toggleMode = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const viewer = viewerRef.current as any;
    if (!viewer || morphing) return;
    setMorphing(true);
    if (is3D) viewer.scene.morphTo2D(2.0);
    else       viewer.scene.morphTo3D(2.0);
    setIs3D(p => !p);
    setTimeout(() => setMorphing(false), 2200);
  }, [is3D, morphing]);

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="w-full h-full" />

      <button
        onClick={toggleMode}
        disabled={morphing}
        className="absolute top-4 left-4 z-10 px-4 py-2 rounded-md text-sm font-medium
          bg-zinc-900/80 border border-zinc-700 text-zinc-200
          hover:bg-zinc-800 hover:border-zinc-500 transition-all
          disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
      >
        {morphing ? "Morphing…" : is3D ? "Switch to 2D" : "Switch to 3D"}
      </button>

      <div className="absolute bottom-4 left-4 z-10 bg-zinc-900/80 border border-zinc-700 rounded-md p-3 backdrop-blur-sm">
        <p className="text-xs text-zinc-400 mb-2 font-medium uppercase tracking-wide">Categories</p>
        <div className="flex flex-col gap-1">
          {Object.entries(CATEGORY_COLORS).map(([cat, color]) => (
            <div key={cat} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{
                  background: `radial-gradient(circle, white 10%, ${color} 45%, transparent 80%)`,
                  boxShadow:  `0 0 6px 1px ${color}`,
                }}
              />
              <span className="text-xs text-zinc-300 capitalize">{cat}</span>
            </div>
          ))}

          {localSources.length > 0 && (
            <>
              <div className="border-t border-zinc-700 my-1" />
              <p className="text-xs text-zinc-400 font-medium uppercase tracking-wide mb-1">Local sources</p>
              {localSources.map(src => (
                <div key={src.id} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0 ring-1"
                    style={{
                      background: src.color,
                      boxShadow:  `0 0 6px 2px ${src.color}`,
                    }}
                  />
                  <span className="text-xs text-zinc-300">{src.region}</span>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
