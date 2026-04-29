import { NextResponse } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio";
import { findCountryInText, COUNTRY_COORDS } from "@/lib/countries";
import type { NewsArticle } from "@/lib/types";

const CATEGORY_COLORS: Record<string, string> = {
  politics: "#ef4444",
  economy: "#f59e0b",
  environment: "#22c55e",
  health: "#a855f7",
  technology: "#06b6d4",
  general: "#1e3a8a",
};

function categorize(title: string, desc: string): string {
  const text = (title + " " + desc).toLowerCase();
  if (/war|attack|missile|bomb|troops|military|killed|conflict|fighting|battle|election|president|prime minister|government|parliament|senate|vote|minister|party|political/.test(text)) return "politics";
  if (/economy|gdp|inflation|trade|market|bank|currency|debt|recession|stocks|oil|gas/.test(text)) return "economy";
  if (/climate|flood|earthquake|storm|fire|environment|pollution|carbon|wildfire/.test(text)) return "environment";
  if (/covid|vaccine|health|hospital|disease|outbreak|cancer|drug|medical|pandemic/.test(text)) return "health";
  if (/ai|tech|software|digital|cyber|robot|space|satellite|nuclear/.test(text)) return "technology";
  return "general";
}

// Extract publish date from article URL like /view/2026/04/29/Title
function dateFromUrl(url: string): Date | null {
  const m = url.match(/\/view\/(\d{4})\/(\d{2})\/(\d{2})\//);
  if (!m) return null;
  return new Date(`${m[1]}-${m[2]}-${m[3]}T12:00:00Z`);
}

const PAGE_URL = (page: number) =>
  `https://upge.wn.com/?template=worldnews/section.txt` +
  `&article_search_query=(keyword:world or keywords:sectionworld)` +
  ` and not keyword:notfrontpage and not keyword:dbusa and not keyword:notworld` +
  `&pagenum=${page}&title=World&num=30`;

const HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
  "Accept": "text/html,application/xhtml+xml",
};

async function fetchPage(page: number): Promise<{ title: string; url: string; desc: string }[]> {
  const { data: html } = await axios.get(PAGE_URL(page), { headers: HEADERS, timeout: 12000 });
  const $ = cheerio.load(html);
  const items: { title: string; url: string; desc: string }[] = [];

  $("h4 a, h3 a, h2 a, .article a, article a").each((_, el) => {
    const title = $(el).text().trim();
    const href = $(el).attr("href") ?? "";
    if (!title || title.length < 12 || !href.includes("article.wn.com")) return;
    const desc = $(el).closest("article, .article, li, div").find("p").first().text().trim();
    items.push({ title, url: href, desc });
  });

  return items;
}

export async function GET() {
  try {
    // Fetch all 10 pages in parallel (~300 raw articles)
    const pages = await Promise.allSettled(
      Array.from({ length: 10 }, (_, i) => fetchPage(i + 1))
    );

    const seen = new Set<string>();
    const articles: NewsArticle[] = [];

    for (const result of pages) {
      if (result.status !== "fulfilled") continue;

      for (const { title, url, desc } of result.value) {
        if (seen.has(title)) continue;
        seen.add(title);

        const pubDate = dateFromUrl(url);

        const fullText = title + " " + desc;
        const coords = findCountryInText(fullText);
        if (!coords) continue;

        const category = categorize(title, desc);

        articles.push({
          id: Buffer.from(title).toString("base64").slice(0, 16),
          title,
          description: desc || title,
          url,
          category,
          lat: coords.lat + (Math.random() - 0.5) * 2,
          lon: coords.lon + (Math.random() - 0.5) * 2,
          publishedAt: pubDate?.toISOString() ?? new Date().toISOString(),
        });
      }
    }

    // Sort newest first
    articles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

    return NextResponse.json({ articles: articles.slice(0, 200) });
  } catch (err) {
    console.error("News fetch error:", err);
    const demoArticles: NewsArticle[] = Object.entries(COUNTRY_COORDS)
      .slice(0, 20)
      .map(([country, coords]) => ({
        id: country.toLowerCase().replace(/\s/g, "-"),
        title: `Latest news from ${country}`,
        description: `Recent developments from ${country}.`,
        url: `https://wn.com/world`,
        category: ["politics", "economy", "general"][Math.floor(Math.random() * 3)],
        lat: coords.lat + (Math.random() - 0.5),
        lon: coords.lon + (Math.random() - 0.5),
        publishedAt: new Date().toISOString(),
      }));
    return NextResponse.json({ articles: demoArticles });
  }
}
