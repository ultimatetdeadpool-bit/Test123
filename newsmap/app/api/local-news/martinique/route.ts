import { NextResponse } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio";
import type { NewsArticle } from "@/lib/types";

const BASE_URL = "https://www.martinique.franceantilles.fr";

const HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  "Accept": "text/html,application/xhtml+xml,*/*",
};

function categorize(text: string): string {
  const t = text.toLowerCase();
  if (/politi|élection|gouvern|préfet|conseil|sénat|assemblée|vote|parti|ministre|mairie|maire/.test(t)) return "politics";
  if (/économi|emploi|entrepris|marché|budget|chômage|croissance|carburant|prix/.test(t)) return "economy";
  if (/cyclone|séisme|volcan|inondation|environnement|pollution|climat|tempête|pelée/.test(t)) return "environment";
  if (/santé|hôpital|maladie|covid|vaccin|médecin|cancer|virus/.test(t)) return "health";
  if (/technolog|numérique|internet|cyber|innovation/.test(t)) return "technology";
  return "general";
}

export async function GET() {
  try {
    const { data: html } = await axios.get(BASE_URL + "/", {
      headers: HEADERS,
      timeout: 12000,
    });

    const $ = cheerio.load(html);
    const seen = new Set<string>();
    const articles: NewsArticle[] = [];

    $("h1 a, h2 a").each((_, el) => {
      const title = $(el).text().trim();
      let href = $(el).attr("href") ?? "";

      if (!title || title.length < 15) return;
      if (!href.includes("/actualite/")) return;

      if (href.startsWith("/")) href = BASE_URL + href;
      if (seen.has(href)) return;
      seen.add(href);

      const category = categorize(title);
      const jitter = () => (Math.random() - 0.5) * 0.3;

      articles.push({
        id: Buffer.from(href).toString("base64").slice(0, 32),
        title,
        description: title,
        url: href,
        category,
        country: "Martinique",
        lat: 14.6415 + jitter(),
        lon: -61.0242 + jitter(),
        publishedAt: new Date().toISOString(),
      });
    });

    return NextResponse.json({ articles });
  } catch (err) {
    console.error("Martinique news fetch error:", err);
    return NextResponse.json({ articles: [], error: "Fetch failed" });
  }
}
