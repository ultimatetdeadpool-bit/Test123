"use client";

import { districtRepresentativeData } from "@/lib/political/district-representatives-data";
import PACPoliticianPopup, { PACPoliticianPopupData } from "@/components/political/PACPoliticianPopup";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let allPACData: any[] = [];
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const mod = require("@/data/all-pac-data");
  allPACData = mod.allPACData || [];
} catch (_) {}

interface Props {
  representativeName: string;
  onClose: () => void;
}

function buildRepPopupData(name: string): PACPoliticianPopupData {
  let party = "I";
  let state = "US";
  for (const districtData of Object.values(districtRepresentativeData)) {
    if (districtData.representative.name === name) {
      const raw = districtData.representative.party;
      party = raw === "Republican" ? "R" : raw === "Democratic" ? "D" : "I";
      state = districtData.stateAbbr ?? "US";
      break;
    }
  }

  const pacMap = new Map<string, number>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  allPACData.forEach((pac: any) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pac.recipients.forEach((r: any) => {
      if (r.name === name) {
        pacMap.set(pac.name, (pacMap.get(pac.name) ?? 0) + r.amount);
      }
    });
  });

  const pacs = Array.from(pacMap.entries())
    .sort(([, a], [, b]) => b - a)
    .map(([pacName, amount]) => ({ name: pacName, amount }));

  return {
    name,
    type: "representative",
    party,
    state,
    totalReceived: pacs.reduce((s, p) => s + p.amount, 0),
    pacs,
  };
}

export default function RepresentativeChartPopup({ representativeName, onClose }: Props) {
  const data = buildRepPopupData(representativeName);
  return <PACPoliticianPopup politician={data} onClose={onClose} />;
}
