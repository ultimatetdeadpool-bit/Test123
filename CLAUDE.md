# Test123 Project Context

## Project Structure

`test123/newsmap/` — The main Next.js 16 project (React 19, TypeScript, Tailwind v4).

## newsmap — Global News Map

A full-screen, real-time news globe with a politics section.

### Tech Stack
- **Globe**: Cesium.js 1.140 + CartoDB Dark Matter tile layer (no API key needed — replaced dead Stadia/Stamen CDN)
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
    api/local-news/       Local news source API routes
      martinique/route.ts Scrapes France Antilles Martinique homepage (h1/h2 links)
    politics/             Political tab pages
  components/
    GlobeMap.tsx          Cesium globe with article dots + local source beacons
    NewsPanel.tsx         Slide-in panel showing articles (accepts optional title prop)
    political/            All ported political map components (dark theme)
  lib/
    countries.ts          COUNTRY_COORDS map + findCountryInText()
    types.ts              NewsArticle type
    local-news-sources.ts LocalNewsSource type + LOCAL_NEWS_SOURCES config array
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
- `NEXT_PUBLIC_STADIA_KEY` env var is no longer used — tile layer is now CartoDB Dark Matter (keyless)
- Political components are dark-themed ports of `C:\Users\USER\Documents\US-map-project_2` components
- Source project: `C:\Users\USER\Documents\US-map-project_2` — original US+France political maps (light theme)
- Import path: `@/lib/political/state-senators-data` (not `@/lib/state-senators-data`)
- Import path: `@/lib/political/district-representatives-data`
- France JSON data at `@/data/france/deputes-by-circonscription.json` (webpack import)
- France GeoJSON at `/data/france/departments-with-overseas.geojson` (public URL)

### Local News Sources System
- `lib/local-news-sources.ts` defines `LocalNewsSource[]` — add entries here to place new beacons
- Each source needs: `id`, `name`, `region`, `lat`, `lon`, `color`, `apiPath`
- GlobeMap renders local sources as distinct amber concentric-ring beacons (48px, slower pulse)
- Clicking a beacon opens NewsPanel with that source's articles and the source name as title
- Clicking again toggles the panel closed
- API routes for local sources live in `app/api/local-news/[source]/route.ts`
- Martinique scrapes `h1 a, h2 a` links containing `/actualite/` from the homepage (RSS is dead)
- NewsPanel accepts optional `title` prop — overrides the country name in the header
- NewsPanel opens even with 0 articles when `title` is set (shows "No articles found" state)

### Running
```bash
cd newsmap
npm run dev   # http://localhost:3000
```

Do NOT add Co-Authored-By lines to any commit messages in this project.