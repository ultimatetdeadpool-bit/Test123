"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type { NewsArticle } from "@/lib/types";

const CATEGORY_COLORS: Record<string, string> = {
  politics: "#ef4444",
  economy: "#f59e0b",
  environment: "#22c55e",
  health: "#a855f7",
  technology: "#06b6d4",
  general: "#1e3a8a",
};

interface GlobeMapProps {
  articles: NewsArticle[];
  onArticleClick: (article: NewsArticle) => void;
}

export default function GlobeMap({ articles, onArticleClick }: GlobeMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<unknown>(null);
  // Keep latest articles and callback in refs so Cesium closures always see current values
  const articlesRef = useRef<NewsArticle[]>(articles);
  const onClickRef = useRef(onArticleClick);
  const entityMap = useRef<Map<string, NewsArticle>>(new Map());
  const [is3D, setIs3D] = useState(true);
  const [morphing, setMorphing] = useState(false);
  // Version counter: bumped whenever we need to re-draw dots
  const [drawVersion, setDrawVersion] = useState(0);

  useEffect(() => { articlesRef.current = articles; }, [articles]);
  useEffect(() => { onClickRef.current = onArticleClick; }, [onArticleClick]);

  // When articles arrive, bump the draw version so the draw effect re-runs
  useEffect(() => {
    setDrawVersion((v) => v + 1);
  }, [articles]);

  // --- Cesium init ---
  useEffect(() => {
    if (!containerRef.current) return;

    let destroyed = false;

    const init = async () => {
      (window as unknown as Record<string, string>).CESIUM_BASE_URL = "/cesium";

      const Cesium = await import("cesium");
      await import("cesium/Build/Cesium/Widgets/widgets.css");

      if (destroyed) return; // StrictMode cleanup happened before we finished

      Cesium.Ion.defaultAccessToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.placeholder";

      const stadiaKey = process.env.NEXT_PUBLIC_STADIA_KEY;
      const tileUrl = stadiaKey
        ? `https://tiles.stadiamaps.com/tiles/stamen_toner/{z}/{x}/{y}.png?api_key=${stadiaKey}`
        : "https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png";

      const baseLayer = Cesium.ImageryLayer.fromProviderAsync(
        Promise.resolve(
          new Cesium.UrlTemplateImageryProvider({
            url: tileUrl,
            credit: new Cesium.Credit(
              "Stamen Toner via Stadia Maps | © OpenStreetMap contributors"
            ),
          })
        )
      );

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const viewer: any = new Cesium.Viewer(containerRef.current!, {
        baseLayer,
        baseLayerPicker: false,
        geocoder: false,
        homeButton: false,
        sceneModePicker: false,
        navigationHelpButton: false,
        animation: false,
        timeline: false,
        fullscreenButton: false,
        infoBox: false,
        selectionIndicator: false,
        terrainProvider: new Cesium.EllipsoidTerrainProvider(),
        skyBox: false,
        skyAtmosphere: false,
        creditContainer: document.createElement("div"),
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

      // Draw any articles that arrived before the viewer was ready
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

  // Draw / redraw dots whenever articles change or after viewer is ready
  const drawDots = useCallback(async (CesiumArg?: unknown, viewerArg?: unknown) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const viewer: any = (viewerArg ?? viewerRef.current) as any;
    if (!viewer || viewer.isDestroyed()) return;

    const Cesium = CesiumArg ?? (await import("cesium"));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const C = Cesium as any;

    viewer.entities.removeAll();
    entityMap.current.clear();

    const currentArticles = articlesRef.current;
    for (const article of currentArticles) {
      const color = CATEGORY_COLORS[article.category] ?? "#e2e8f0";
      const cesiumColor = C.Color.fromCssColorString(color);

      const entity = viewer.entities.add({
        position: C.Cartesian3.fromDegrees(article.lon, article.lat),
        point: {
          pixelSize: 14,
          color: cesiumColor.withAlpha(0.95),
          outlineColor: cesiumColor.brighten(0.5, new C.Color()),
          outlineWidth: 3,
        },
      });

      entityMap.current.set(entity.id, article);
    }
  }, []);

  useEffect(() => {
    if (!viewerRef.current) return;
    drawDots();
  }, [drawVersion, drawDots]);

  const toggleMode = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const viewer = viewerRef.current as any;
    if (!viewer || morphing) return;
    setMorphing(true);
    if (is3D) {
      viewer.scene.morphTo2D(2.0);
    } else {
      viewer.scene.morphTo3D(2.0);
    }
    setIs3D((prev) => !prev);
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
        <p className="text-xs text-zinc-400 mb-2 font-medium uppercase tracking-wide">
          Categories
        </p>
        <div className="flex flex-col gap-1">
          {Object.entries(CATEGORY_COLORS).map(([cat, color]) => (
            <div key={cat} className="flex items-center gap-2">
              <div
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: color, boxShadow: `0 0 5px ${color}` }}
              />
              <span className="text-xs text-zinc-300 capitalize">{cat}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
