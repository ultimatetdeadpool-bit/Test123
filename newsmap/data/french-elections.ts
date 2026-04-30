export interface FrenchCandidateInfo {
  name: string;
  photo: string;
  party: string;
  partyColor: string;
}

export interface FrenchElectionInfo {
  year: number;
  left: FrenchCandidateInfo;   // candidate on the left side (first listed)
  right: FrenchCandidateInfo;  // candidate on the right side (second listed)
  winner: "left" | "right";
}

export const FRENCH_ELECTION_YEARS = [2002, 2007, 2012, 2017, 2022] as const;
export type FrenchElectionYear = typeof FRENCH_ELECTION_YEARS[number];

export const FRENCH_ELECTIONS: Record<FrenchElectionYear, FrenchElectionInfo> = {
  2002: {
    year: 2002,
    left:  { name: "Jacques Chirac",    photo: "/candidates/fr/Jacques_Chirac.jpg",    party: "RPR/UMP",  partyColor: "#003189" },
    right: { name: "Jean-Marie Le Pen", photo: "/candidates/fr/Jean-Marie_Le_Pen.jpg", party: "FN",       partyColor: "#1a2d5a" },
    winner: "left",
  },
  2007: {
    year: 2007,
    left:  { name: "Nicolas Sarkozy",  photo: "/candidates/fr/Nicolas_Sarkozy.jpg",  party: "UMP",  partyColor: "#003189" },
    right: { name: "Ségolène Royal",   photo: "/candidates/fr/Segolene_Royal.jpg",   party: "PS",   partyColor: "#e75480" },
    winner: "left",
  },
  2012: {
    year: 2012,
    left:  { name: "François Hollande", photo: "/candidates/fr/Francois_Hollande.jpg", party: "PS",   partyColor: "#e75480" },
    right: { name: "Nicolas Sarkozy",    photo: "/candidates/fr/Nicolas_Sarkozy.jpg",    party: "UMP",  partyColor: "#003189" },
    winner: "left",
  },
  2017: {
    year: 2017,
    left:  { name: "Emmanuel Macron", photo: "/candidates/fr/Emmanuel_Macron.jpg", party: "En Marche", partyColor: "#ffeb00" },
    right: { name: "Marine Le Pen",   photo: "/candidates/fr/Marine_Le_Pen.jpg",   party: "FN",        partyColor: "#1a2d5a" },
    winner: "left",
  },
  2022: {
    year: 2022,
    left:  { name: "Emmanuel Macron", photo: "/candidates/fr/Emmanuel_Macron.jpg", party: "LREM",  partyColor: "#ffeb00" },
    right: { name: "Marine Le Pen",   photo: "/candidates/fr/Marine_Le_Pen.jpg",   party: "RN",    partyColor: "#1a2d5a" },
    winner: "left",
  },
};
