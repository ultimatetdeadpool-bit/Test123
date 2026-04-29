"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type { NewsArticle } from "@/lib/types";

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
}

// Generate a radial-gradient canvas texture for a glowing orb of a given color.
// Returns a data URL so Cesium can use it as a billboard image.
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
  grad.addColorStop(0,    `rgba(255,255,255,1)`);         // white-hot center
  grad.addColorStop(0.08, `rgba(255,255,255,0.9)`);       // still bright
  grad.addColorStop(0.18, `rgba(${r},${g},${b},1)`);     // pure category color
  grad.addColorStop(0.4,  `rgba(${r},${g},${b},0.5)`);   // mid glow
  grad.addColorStop(0.7,  `rgba(${r},${g},${b},0.12)`);  // soft outer halo
  grad.addColorStop(1,    `rgba(${r},${g},${b},0)`);     // transparent edge

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  const url = canvas.toDataURL();
  glowCache.set(hex, url);
  return url;
}

export default function GlobeMap({ articles, onArticleClick }: GlobeMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef    = useRef<unknown>(null);
  const articlesRef  = useRef<NewsArticle[]>(articles);
  const onClickRef   = useRef(onArticleClick);
  const entityMap    = useRef<Map<string, NewsArticle>>(new Map());
  const [is3D,       setIs3D]    = useState(true);
  const [morphing,   setMorphing] = useState(false);
  const [drawVersion, setDrawVersion] = useState(0);

  useEffect(() => { articlesRef.current = articles; },      [articles]);
  useEffect(() => { onClickRef.current  = onArticleClick; }, [onArticleClick]);
  useEffect(() => { setDrawVersion(v => v + 1); },          [articles]);

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

      const stadiaKey = process.env.NEXT_PUBLIC_STADIA_KEY;
      const tileUrl   = stadiaKey
        ? `https://tiles.stadiamaps.com/tiles/stamen_toner/{z}/{x}/{y}.png?api_key=${stadiaKey}`
        : "https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png";

      const baseLayer = Cesium.ImageryLayer.fromProviderAsync(
        Promise.resolve(new Cesium.UrlTemplateImageryProvider({ url: tileUrl }))
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
            const article = entityMap.current.get(picked.id.id);
            if (article) onClickRef.current(article);
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

    for (const article of articlesRef.current) {
      const hex   = CATEGORY_COLORS[article.category] ?? "#3b82f6";
      const image = makeGlowDataUrl(hex);

      // Each dot gets its own pulse phase & speed so they don't throb in sync
      const phase = Math.random() * Math.PI * 2;
      const speed = 0.6 + Math.random() * 0.8;

      const entity = viewer.entities.add({
        position: C.Cartesian3.fromDegrees(article.lon, article.lat),
        billboard: {
          image,
          width:  32,
          height: 32,
          // CallbackProperty is evaluated every frame by Cesium's render loop
          scale: new C.CallbackProperty(() => {
            const t = Date.now() / 1000;
            return 1.0 + 0.2 * Math.sin(t * speed + phase);
          }, false),
          verticalOrigin:   C.VerticalOrigin.CENTER,
          horizontalOrigin: C.HorizontalOrigin.CENTER,
          // Always render on top — no z-fighting with the globe surface
          eyeOffset: new C.Cartesian3(0, 0, -2000),
        },
      });

      entityMap.current.set(entity.id, article);
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
        </div>
      </div>
    </div>
  );
}
