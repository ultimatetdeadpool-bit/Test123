export interface CandidateInfo {
  name: string;
  photo: string;
}

export interface ElectionInfo {
  year: number;
  dem: CandidateInfo;
  gop: CandidateInfo;
  demEV: number;
  gopEV: number;
  winner: "dem" | "gop";
}

export const ELECTION_YEARS = [2000, 2004, 2008, 2012, 2016, 2020, 2024] as const;
export type ElectionYear = typeof ELECTION_YEARS[number];

export const ELECTIONS: Record<ElectionYear, ElectionInfo> = {
  2000: {
    year: 2000,
    dem: { name: "Al Gore",         photo: "/candidates/Al_Gore.jpg" },
    gop: { name: "George W. Bush",  photo: "/candidates/George_W._Bush.jpg" },
    demEV: 266, gopEV: 271, winner: "gop",
  },
  2004: {
    year: 2004,
    dem: { name: "John Kerry",      photo: "/candidates/John_Kerry.jpg" },
    gop: { name: "George W. Bush",  photo: "/candidates/George_W._Bush.jpg" },
    demEV: 251, gopEV: 286, winner: "gop",
  },
  2008: {
    year: 2008,
    dem: { name: "Barack Obama",    photo: "/candidates/Barack_Obama.jpg" },
    gop: { name: "John McCain",     photo: "/candidates/John_McCain.jpg" },
    demEV: 365, gopEV: 173, winner: "dem",
  },
  2012: {
    year: 2012,
    dem: { name: "Barack Obama",    photo: "/candidates/Barack_Obama.jpg" },
    gop: { name: "Mitt Romney",     photo: "/candidates/Mitt_Romney.jpg" },
    demEV: 332, gopEV: 206, winner: "dem",
  },
  2016: {
    year: 2016,
    dem: { name: "Hillary Clinton", photo: "/candidates/Hillary_Clinton.jpg" },
    gop: { name: "Donald Trump",    photo: "/candidates/Donald_Trump.jpg" },
    demEV: 227, gopEV: 306, winner: "gop",
  },
  2020: {
    year: 2020,
    dem: { name: "Joe Biden",       photo: "/candidates/Joe_Biden.jpg" },
    gop: { name: "Donald Trump",    photo: "/candidates/Donald_Trump.jpg" },
    demEV: 306, gopEV: 232, winner: "dem",
  },
  2024: {
    year: 2024,
    dem: { name: "Kamala Harris",   photo: "/candidates/Kamala_Harris.jpg" },
    gop: { name: "Donald Trump",    photo: "/candidates/Donald_Trump.jpg" },
    demEV: 226, gopEV: 312, winner: "gop",
  },
};
