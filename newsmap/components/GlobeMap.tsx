"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type { NewsArticle } from "@/lib/types";
import type { LocalNewsSource } from "@/lib/local-news-sources";

const CATEGORY_COLORS: Record<string, string> = {
  politics:    "#ef4444",
  economy:     "#f59e0b",
  environment: "#22c55e",
  health:      "#a855f7",
  technology:  "#06b6d4",
  general:     "#3b82f6",
};

interface GlobeMapProps {
  articles: NewsArticle[];
  onArticleClick: (article: NewsArticle) => void;
  localSources?: LocalNewsSource[];
  onLocalSourceClick?: (sourceId: string) => void;
}

// Radial-gradient canvas texture for a glowing orb (category dots)
const glowCache = new Map<string, string>();
function makeGlowDataUrl(hex: string): string {
  if (glowCache.has(hex)) return glowCache.get(hex)!;
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const c = size / 2;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  const grad = ctx.createRadialGradient(c, c, 0, c, c, c);
  grad.addColorStop(0,    `rgba(255,255,255,1)`);
  grad.addColorStop(0.08, `rgba(255,255,255,0.9)`);
  grad.addColorStop(0.18, `rgba(${r},${g},${b},1)`);
  grad.addColorStop(0.4,  `rgba(${r},${g},${b},0.5)`);
  grad.addColorStop(0.7,  `rgba(${r},${g},${b},0.12)`);
  grad.addColorStop(1,    `rgba(${r},${g},${b},0)`);

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  const url = canvas.toDataURL();
  glowCache.set(hex, url);
  return url;
}

// Concentric-ring "beacon" texture for local news source markers
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

  // Outer ring
  ctx.beginPath();
  ctx.arc(c, c, 50, 0, Math.PI * 2);
  ctx.strokeStyle = `rgba(${r},${g},${b},0.25)`;
  ctx.lineWidth = 2;
  ctx.stroke();

  // Middle ring
  ctx.beginPath();
  ctx.arc(c, c, 34, 0, Math.PI * 2);
  ctx.strokeStyle = `rgba(${r},${g},${b},0.55)`;
  ctx.lineWidth = 2;
  ctx.stroke();

  // Inner ring
  ctx.beginPath();
  ctx.arc(c, c, 18, 0, Math.PI * 2);
  ctx.strokeStyle = `rgba(${r},${g},${b},0.9)`;
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // Center: white core fading to color
  const grad = ctx.createRadialGradient(c, c, 0, c, c, 10);
  grad.addColorStop(0,   `rgba(255,255,255,1)`);
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
  onArticleClick,
  localSources = [],
  onLocalSourceClick,
}: GlobeMapProps) {
  const containerRef        = useRef<HTMLDivElement>(null);
  const viewerRef           = useRef<unknown>(null);
  const articlesRef         = useRef<NewsArticle[]>(articles);
  const localSourcesRef     = useRef<LocalNewsSource[]>(localSources);
  const onClickRef          = useRef(onArticleClick);
  const onLocalClickRef     = useRef(onLocalSourceClick);
  const entityMap           = useRef<Map<string, NewsArticle>>(new Map());
  const localSourceMap      = useRef<Map<string, string>>(new Map()); // entityId → sourceId
  const [is3D,      setIs3D]      = useState(true);
  const [morphing,  setMorphing]  = useState(false);
  const [drawVersion, setDrawVersion] = useState(0);

  useEffect(() => { articlesRef.current    = articles;       }, [articles]);
  useEffect(() => { localSourcesRef.current = localSources;  }, [localSources]);
  useEffect(() => { onClickRef.current      = onArticleClick; }, [onArticleClick]);
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
            const article = entityMap.current.get(id);
            if (article) { onClickRef.current(article); return; }
            const sourceId = localSourceMap.current.get(id);
            if (sourceId) onLocalClickRef.current?.(sourceId);
          }
        },
        Cesium.ScreenSpaceEventType.LEFT_CLICK
      );

      viewerRef.current = viewer;
      drawDots(Cesium, viewer);
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

  // ── Draw / redraw dots ───────────────────────────────────────────────────
  const drawDots = useCallback(async (CesiumArg?: unknown, viewerArg?: unknown) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const viewer: any = (viewerArg ?? viewerRef.current) as any;
    if (!viewer || viewer.isDestroyed()) return;

    const Cesium = CesiumArg ?? (await import("cesium"));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const C = Cesium as any;

    viewer.entities.removeAll();
    entityMap.current.clear();
    localSourceMap.current.clear();

    // Article dots
    for (const article of articlesRef.current) {
      const hex   = CATEGORY_COLORS[article.category] ?? "#3b82f6";
      const image = makeGlowDataUrl(hex);
      const phase = Math.random() * Math.PI * 2;
      const speed = 0.6 + Math.random() * 0.8;

      const entity = viewer.entities.add({
        position: C.Cartesian3.fromDegrees(article.lon, article.lat),
        billboard: {
          image,
          width:  32,
          height: 32,
          scale: new C.CallbackProperty(() => {
            const t = Date.now() / 1000;
            return 1.0 + 0.2 * Math.sin(t * speed + phase);
          }, false),
          verticalOrigin:   C.VerticalOrigin.CENTER,
          horizontalOrigin: C.HorizontalOrigin.CENTER,
          eyeOffset: new C.Cartesian3(0, 0, -2000),
        },
      });

      entityMap.current.set(entity.id, article);
    }

    // Local news source beacons — drawn on top with a stronger eyeOffset
    for (const source of localSourcesRef.current) {
      const image = makeBeaconDataUrl(source.color);
      const phase = Math.random() * Math.PI * 2;

      const entity = viewer.entities.add({
        position: C.Cartesian3.fromDegrees(source.lon, source.lat),
        billboard: {
          image,
          width:  48,
          height: 48,
          // Slower, wider pulse to feel different from article dots
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
    drawDots();
  }, [drawVersion, drawDots]);

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
