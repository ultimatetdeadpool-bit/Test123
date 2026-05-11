/**
 * update-results.mjs — Patch election-2026-results.json from CSV files.
 *
 * Usage:
 *   node scripts/update-results.mjs --senators senators.csv
 *   node scripts/update-results.mjs --reps reps.csv
 *   node scripts/update-results.mjs --counties counties.csv
 *   node scripts/update-results.mjs --senators senators.csv --reps reps.csv
 *
 * senators.csv columns:  state,seat,name,party,photo
 *   state  — 2-letter abbreviation (CA, TX, …)
 *   seat   — 0 or 1 (index of the senator being replaced in that state)
 *   name   — full name of the winner
 *   party  — R, D, or I
 *   photo  — optional, e.g. /senators/Jane_Doe.jpg  (leave blank if not ready)
 *
 * reps.csv columns:  district,name,party,photo
 *   district — standard code, e.g. CA-01 or AK-AL (at-large)
 *   name     — full name of the winner
 *   party    — Republican | Democratic | Independent  (or R / D / I — normalised below)
 *   photo    — optional
 *
 * counties.csv columns:  fips,name,gop,dem
 *   fips  — 5-digit FIPS code, e.g. 06001
 *   name  — county name
 *   gop   — Republican share as a decimal, e.g. 0.5423
 *   dem   — Democratic share as a decimal, e.g. 0.4350
 *   (writes directly to data/county-election-2026.json)
 */

import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dir = dirname(fileURLToPath(import.meta.url));
const root  = resolve(__dir, "..");

// ── helpers ──────────────────────────────────────────────────────────────────

function readJson(rel) {
  return JSON.parse(readFileSync(resolve(root, rel), "utf8"));
}
function writeJson(rel, data) {
  writeFileSync(resolve(root, rel), JSON.stringify(data, null, 2) + "\n", "utf8");
}

/** Parse a minimal CSV (no quoting support needed for this data). */
function parseCsv(text) {
  const [headerLine, ...rows] = text.trim().split(/\r?\n/);
  const headers = headerLine.split(",").map(h => h.trim());
  return rows
    .filter(r => r.trim())
    .map(r => {
      const cols = r.split(",").map(c => c.trim());
      return Object.fromEntries(headers.map((h, i) => [h, cols[i] ?? ""]));
    });
}

/** State abbreviation → FIPS (leading-zero strings). */
const STATE_FIPS = {
  AL:"01", AK:"02", AZ:"04", AR:"05", CA:"06", CO:"08", CT:"09", DE:"10",
  DC:"11", FL:"12", GA:"13", HI:"15", ID:"16", IL:"17", IN:"18", IA:"19",
  KS:"20", KY:"21", LA:"22", ME:"23", MD:"24", MA:"25", MI:"26", MN:"27",
  MS:"28", MO:"29", MT:"30", NE:"31", NV:"32", NH:"33", NJ:"34", NM:"35",
  NY:"36", NC:"37", ND:"38", OH:"39", OK:"40", OR:"41", PA:"42", RI:"44",
  SC:"45", SD:"46", TN:"47", TX:"48", UT:"49", VT:"50", VA:"51", WA:"53",
  WV:"54", WI:"55", WY:"56",
};

/** district code → 4-digit key used in districtRepresentativeData.
 *  CA-01  → "0601"
 *  AK-AL  → "0200"  (at-large = 00)
 */
function districtKey(code) {
  const m = code.match(/^([A-Z]{2})-(\d{2}|AL)$/i);
  if (!m) throw new Error(`Unrecognised district code: ${code}`);
  const fips   = STATE_FIPS[m[1].toUpperCase()];
  if (!fips) throw new Error(`Unknown state abbreviation: ${m[1]}`);
  const number = m[2].toUpperCase() === "AL" ? "00" : m[2].padStart(2, "0");
  return fips + number;
}

/** Normalise party shorthand to full word used in districtRepresentativeData. */
function normaliseParty(p) {
  if (!p) return "Republican";
  const u = p.trim().toUpperCase();
  if (u === "R")  return "Republican";
  if (u === "D")  return "Democratic";
  if (u === "I")  return "Independent";
  return p; // already full word — pass through
}

// ── parse args ───────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
function flag(name) {
  const i = args.indexOf(name);
  return i !== -1 ? args[i + 1] : null;
}

const senatorsFile = flag("--senators");
const repsFile     = flag("--reps");
const countiesFile = flag("--counties");

if (!senatorsFile && !repsFile && !countiesFile) {
  console.error("No input files specified. Use --senators, --reps, or --counties.");
  process.exit(1);
}

// ── load overlay ─────────────────────────────────────────────────────────────

const overlay = readJson("data/election-2026-results.json");
overlay.senators       ??= {};
overlay.representatives ??= {};

// ── process senators ─────────────────────────────────────────────────────────

if (senatorsFile) {
  const rows = parseCsv(readFileSync(resolve(process.cwd(), senatorsFile), "utf8"));
  let updated = 0;

  for (const row of rows) {
    const fips = STATE_FIPS[row.state?.toUpperCase()];
    if (!fips) { console.warn(`  SKIP: unknown state "${row.state}"`); continue; }

    const seat = String(row.seat).trim();
    if (seat !== "0" && seat !== "1") {
      console.warn(`  SKIP: seat must be 0 or 1, got "${row.seat}" for ${row.state}`);
      continue;
    }

    overlay.senators[fips]       ??= {};
    overlay.senators[fips][seat]   = {
      name:     row.name,
      party:    row.party?.toUpperCase() || "R",
      photoUrl: row.photo || "",
    };

    console.log(`  Senator  ${row.state} seat ${seat}: ${row.name} (${row.party})`);
    updated++;
  }
  console.log(`Senators: ${updated} updated.`);
}

// ── process representatives ───────────────────────────────────────────────────

if (repsFile) {
  const rows = parseCsv(readFileSync(resolve(process.cwd(), repsFile), "utf8"));
  let updated = 0;

  for (const row of rows) {
    let key;
    try { key = districtKey(row.district); }
    catch (e) { console.warn(`  SKIP: ${e.message}`); continue; }

    overlay.representatives[key] = {
      name:     row.name,
      party:    normaliseParty(row.party),
      photoUrl: row.photo || "",
    };

    console.log(`  Rep      ${row.district} (key ${key}): ${row.name} (${row.party})`);
    updated++;
  }
  console.log(`Representatives: ${updated} updated.`);
}

// ── write overlay ─────────────────────────────────────────────────────────────

if (senatorsFile || repsFile) {
  writeJson("data/election-2026-results.json", overlay);
  console.log("Saved → data/election-2026-results.json");
}

// ── process counties (separate file) ─────────────────────────────────────────

if (countiesFile) {
  const rows = parseCsv(readFileSync(resolve(process.cwd(), countiesFile), "utf8"));
  const countyData = readJson("data/county-election-2026.json");
  let updated = 0;

  for (const row of rows) {
    const fips = String(row.fips).padStart(5, "0");
    countyData[fips] = {
      name: row.name,
      gop:  parseFloat(row.gop) || 0,
      dem:  parseFloat(row.dem) || 0,
    };
    updated++;
  }

  writeJson("data/county-election-2026.json", countyData);
  console.log(`Counties: ${updated} updated → data/county-election-2026.json`);
}
