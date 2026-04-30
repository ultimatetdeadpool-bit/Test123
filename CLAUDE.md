# Test123 Project Context

## Project Structure

`test123/newsmap/` — The main Next.js 16 project (React 19, TypeScript, Tailwind v4).

## newsmap — Global News Map

A full-screen, real-time news globe with a politics section.

### Tech Stack
- **Globe**: Cesium.js 1.140 + Stadia Maps / Stamen Toner tile layer
- **Political maps**: react-simple-maps 3.0 (SVG-based choropleth)
- **Animations**: Framer Motion
- **Data viz**: Recharts + custom SVG donut charts
- **Styling**: Tailwind v4 (dark aesthetic — zinc palette)

### Pages
- `/` — News globe (Cesium), articles fetched from wn.com, dots on globe per article
- `/politics` — World political map; US and France are interactive
- `/politics/us` — US political map (Counties, States, Districts, PACs)
- `/politics/france` — France political map (Députés, Sénat, Présidentielle)

### Key Directories
```
newsmap/
  app/                    Next.js App Router pages
    api/news/route.ts     Scrapes wn.com, returns ~500 articles as NewsArticle[]
    politics/             Political tab pages
  components/
    GlobeMap.tsx          Cesium globe with article dots
    NewsPanel.tsx         Slide-in panel showing country articles
    political/            All ported political map components (dark theme)
  lib/
    countries.ts          COUNTRY_COORDS map + findCountryInText()
    types.ts              NewsArticle type
    political/            Senator/representative/PAC data helpers
  data/                   Election JSON, PAC JSON, France election JSON
  public/
    cesium/               Cesium static assets (from copy-cesium.mjs postinstall)
    senators/             Senator photos (name_surname.jpg)
    representatives/      Representative photos
    candidates/           Presidential candidate photos
    flags/                State flag images (ABBR.jpg.jpg)
    data/france/          France GeoJSON (departments, regions)
    congressional_districts_118_simplified.geojson
```

### Important Notes
- Install with `npm install --legacy-peer-deps` (react-simple-maps has peer dep conflict with React 19)
- Cesium token placeholder is used (no terrain, just ellipsoid)
- Stadia Maps key: `NEXT_PUBLIC_STADIA_KEY` env var (falls back to public Stamen CDN)
- Political components are dark-themed ports of `C:\Users\USER\Documents\US-map-project_2` components
- Source project: `C:\Users\USER\Documents\US-map-project_2` — original US+France political maps (light theme)
- Import path: `@/lib/political/state-senators-data` (not `@/lib/state-senators-data`)
- Import path: `@/lib/political/district-representatives-data`
- France JSON data at `@/data/france/deputes-by-circonscription.json` (webpack import)
- France GeoJSON at `/data/france/departments-with-overseas.geojson` (public URL)

### Running
```bash
cd newsmap
npm run dev   # http://localhost:3000
```
