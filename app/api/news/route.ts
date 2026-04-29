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

export async function GET() {
  try {
    const { data: html } = await axios.get("https://wn.com/world", {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml",
      },
      timeout: 10000,
    });

    const $ = cheerio.load(html);
    const articles: NewsArticle[] = [];
    const seen = new Set<string>();

    $("article, .article, .news-item, .story, [class*='article'], [class*='story']").each((_, el) => {
      const titleEl = $(el).find("h1, h2, h3, h4, a").first();
      const title = titleEl.text().trim();
      const href = titleEl.attr("href") || $(el).find("a").first().attr("href") || "";
      const desc = $(el).find("p, .description, .summary, .excerpt").first().text().trim();

      if (!title || title.length < 10 || seen.has(title)) return;
      seen.add(title);

      const fullText = title + " " + desc;
      const coords = findCountryInText(fullText);
      if (!coords) return;

      const category = categorize(title, desc);
      const url = href.startsWith("http") ? href : `https://wn.com${href}`;

      articles.push({
        id: Buffer.from(title).toString("base64").slice(0, 16),
        title,
        description: desc || title,
        url,
        category,
        lat: coords.lat + (Math.random() - 0.5) * 2,
        lon: coords.lon + (Math.random() - 0.5) * 2,
        publishedAt: new Date().toISOString(),
      });
    });

    // If we got no results from structural parsing, try a flatter approach
    if (articles.length === 0) {
      $("a").each((_, el) => {
        const title = $(el).text().trim();
        const href = $(el).attr("href") || "";
        if (!title || title.length < 15 || seen.has(title)) return;
        seen.add(title);

        const coords = findCountryInText(title);
        if (!coords) return;

        const category = categorize(title, "");
        const url = href.startsWith("http") ? href : `https://wn.com${href}`;

        articles.push({
          id: Buffer.from(title).toString("base64").slice(0, 16),
          title,
          description: title,
          url,
          category,
          lat: coords.lat + (Math.random() - 0.5) * 2,
          lon: coords.lon + (Math.random() - 0.5) * 2,
          publishedAt: new Date().toISOString(),
        });
      });
    }

    return NextResponse.json({ articles: articles.slice(0, 60) });
  } catch (err) {
    console.error("News fetch error:", err);
    // Return demo data so the map still works
    const demoArticles: NewsArticle[] = Object.entries(COUNTRY_COORDS)
      .slice(0, 20)
      .map(([country, coords]) => ({
        id: country.toLowerCase().replace(/\s/g, "-"),
        title: `Latest news from ${country}`,
        description: `Recent developments and breaking news from ${country}.`,
        url: `https://wn.com/world`,
        category: ["politics", "economy", "general"][Math.floor(Math.random() * 3)],
        lat: coords.lat + (Math.random() - 0.5),
        lon: coords.lon + (Math.random() - 0.5),
        publishedAt: new Date().toISOString(),
      }));
    return NextResponse.json({ articles: demoArticles });
  }
}
