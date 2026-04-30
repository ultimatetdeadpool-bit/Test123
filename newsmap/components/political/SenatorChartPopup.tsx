"use client";

import { stateSenatorData } from "@/lib/political/state-senators-data";
import PACPoliticianPopup, { PACPoliticianPopupData } from "@/components/political/PACPoliticianPopup";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let allPACData: any[] = [];
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const mod = require("@/data/all-pac-data");
  allPACData = mod.allPACData || [];
} catch (_) {}

interface Props {
  senatorName: string;
  onClose: () => void;
}

function buildSenatorPopupData(name: string): PACPoliticianPopupData {
  let party = "I";
  let state = "US";
  for (const stateData of Object.values(stateSenatorData)) {
    const found = stateData.senators.find((s) => s.name === name);
    if (found) {
      party = found.party;
      state = stateData.abbreviation;
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
    type: "senator",
    party,
    state,
    totalReceived: pacs.reduce((s, p) => s + p.amount, 0),
    pacs,
  };
}

export default function SenatorChartPopup({ senatorName, onClose }: Props) {
  const data = buildSenatorPopupData(senatorName);
  return <PACPoliticianPopup politician={data} onClose={onClose} />;
}
